// GLSL for the Ember Field GPGPU pass. Ported from the read-only particle lab
// (src/scenes/simulation/shaders.ts) with the glow plane removed, a tighter
// fire sprite and a smaller point-size ceiling. No em or en dashes.

export const SIM_VERTEX = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`

export const SIM_FRAGMENT = /* glsl */ `
precision highp float;

uniform sampler2D uPositions;
uniform float uDt;
uniform float uTime;
uniform float uTurbulence;
uniform float uBuoyancy;
uniform float uSpeed;
uniform float uLifeRate;
uniform float uNoiseScale;
uniform float uBaseRadius;
uniform float uPlumeHeight;
uniform vec2 uPointer;
uniform float uPointerStrength;
uniform float uPointerRadius;
uniform float uCalm;

varying vec2 vUv;

const float TAU = 6.28318530718;

float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

// Divergence free curl of two smooth octaves: the plume has no sinks.
vec3 curlFlow(vec3 p, float t) {
  vec3 q = p * uNoiseScale;
  float ph = t * 0.35;
  vec3 a = vec3(
    sin(q.z + ph) + 0.9 * cos(q.y - 0.7 * ph),
    sin(q.x + 0.8 * ph) + cos(q.z + ph),
    sin(q.y - 0.7 * ph) + 0.9 * cos(q.x + 0.8 * ph)
  );
  vec3 r = p * (uNoiseScale * 2.17) + 13.7;
  vec3 b = vec3(
    sin(r.z - 1.3 * ph) + cos(r.y + ph),
    sin(r.x + ph) + cos(r.z - 1.3 * ph),
    sin(r.y + ph) + cos(r.x + ph)
  );
  return 0.5 * a + 0.22 * b;
}

void main() {
  vec4 data = texture2D(uPositions, vUv);
  vec3 pos = data.rgb;
  float life = data.a;

  float calmK = mix(1.0, 0.35, uCalm);
  float seed = hash12(vUv * 317.7);
  vec3 flowP = pos + vec3(seed * 4.3, seed * 2.1, seed * 3.7);
  vec3 vel = curlFlow(flowP, uTime + seed * 6.0) * uTurbulence * calmK;

  vec3 jitter = vec3(
    hash12(vUv * 51.3 + uTime * 0.37),
    hash12(vUv * 73.1 - uTime * 0.41),
    hash12(vUv * 97.7 + uTime * 0.29)
  ) - 0.5;
  vel += jitter * uTurbulence * 1.1 * calmK;

  float heat = 1.0 - life;
  vel.y += uBuoyancy * (0.35 + heat * 1.4);

  float h = clamp(pos.y / uPlumeHeight, 0.0, 1.0);
  vec2 radial = pos.xz;
  float r = length(radial) + 1e-4;
  vec2 rdir = radial / r;
  vel.xz += rdir * mix(-0.4, 1.7, h) * 0.85 * uBuoyancy;

  vec2 d = pos.xy - uPointer;
  float dist2 = dot(d, d);
  float push = exp(-dist2 / (uPointerRadius * uPointerRadius)) * uPointerStrength;
  vel.xy += (d / (sqrt(dist2) + 1e-3)) * push * 24.0;

  float stepScale = uSpeed * mix(1.0, 0.45, uCalm) * uDt;
  pos += vel * stepScale;
  life += uDt * uLifeRate * mix(1.0, 0.55, uCalm);

  if (life >= 1.0) {
    float s = uTime * 0.731 + life * 7.13;
    float ang = hash12(vUv * 91.7 + s) * TAU;
    float rad = sqrt(hash12(vUv * 47.3 - s)) * uBaseRadius;
    pos = vec3(cos(ang) * rad, 0.02, sin(ang) * rad);
    life = hash12(vUv * 13.1 + s) * 0.015;
  }

  gl_FragColor = vec4(pos, life);
}
`

export const POINT_VERTEX = /* glsl */ `
precision highp float;

uniform sampler2D uPositions;
uniform float uSizeScale;
uniform float uSize;

varying float vLife;
varying float vSeed;

void main() {
  // position.xy is this particle's texel reference, not a world position.
  vec4 data = texture2D(uPositions, position.xy);
  vec3 p = data.rgb;
  vLife = clamp(data.a, 0.0, 1.0);
  vSeed = fract(sin(dot(position.xy, vec2(12.9898, 78.233))) * 43758.5453);

  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;

  float grow = mix(0.6, 1.7, smoothstep(0.0, 1.0, vLife));
#ifdef SMOKE
  float baseSize = uSize * 1.3;
  if (vLife < 0.30) gl_PointSize = 1.0;
#else
  float baseSize = uSize;
  if (vLife > 0.88) gl_PointSize = 1.0;
#endif
  gl_PointSize = clamp(baseSize * grow * uSizeScale / max(-mv.z, 0.001), 1.0, 48.0);
}
`

export const POINT_FRAGMENT = /* glsl */ `
precision highp float;

uniform vec3 uColors[4];
uniform vec3 uSmokeColor;
uniform float uOpacity;
uniform float uTime;

varying float vLife;
varying float vSeed;

void main() {
  float d = length(gl_PointCoord - vec2(0.5)) * 2.0;
  float l = clamp(vLife, 0.0, 1.0);

#ifdef SMOKE
  float soft = pow(smoothstep(1.0, 0.0, d), 2.2);
  float appear = smoothstep(0.32, 0.55, l);
  float fade = 1.0 - smoothstep(0.78, 1.0, l);
  float alpha = uOpacity * soft * appear * fade;
  if (alpha <= 0.002) discard;
  vec3 col = mix(uSmokeColor, uSmokeColor * 1.3, (1.0 - l) * 0.35);
  gl_FragColor = vec4(col, alpha);
#else
  // Tighter than the lab's 1.6 so flecks stay distinct without bloom.
  float soft = pow(smoothstep(1.0, 0.0, d), 2.0);
  vec3 col = mix(uColors[0], uColors[1], smoothstep(0.0, 0.10, l));
  col = mix(col, uColors[2], smoothstep(0.10, 0.30, l));
  col = mix(col, uColors[3], smoothstep(0.30, 0.60, l));
  float flick = 0.8 + 0.2 * sin(uTime * 13.0 + vSeed * 40.0);
  float alpha = uOpacity * soft * (1.0 - smoothstep(0.25, 0.72, l)) * flick;
  if (alpha <= 0.002) discard;
  gl_FragColor = vec4(col * (1.0 + (1.0 - l) * 0.35), alpha);
#endif
}
`
