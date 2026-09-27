// The living sky: the dream sky as one fragment shader. Same palette as
// --dm-dream, but alive — the glows orbit, breathe and shift between two
// colours each, a fourth glow wanders across the middle, and the whole sky
// travels from dawn (top of the page) to dusk (the footer's final frame).
// Half resolution, capped at 30fps, and it only draws while some part of the
// sky is actually on screen ([data-sky-window]). No library.

type Palette = Record<'a' | 'a2' | 'b' | 'b2' | 'c' | 'c2' | 'e' | 'top' | 'mid' | 'bot', number[]>

const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255)
const palette = (p: Record<keyof Palette, string>) =>
  Object.fromEntries(Object.entries(p).map(([k, v]) => [k, hex(v)])) as Palette

const SKIES: Record<'light' | 'dark', { dawn: Palette; dusk: Palette }> = {
  light: {
    dawn: palette({ a: '#ffd9a0', a2: '#ffc2cf', b: '#ffb3c7', b2: '#dcc6f2', c: '#b9c6ff', c2: '#e3c8f0', e: '#fff0c8', top: '#fbe7d2', mid: '#ecdcf5', bot: '#d7dfff' }),
    dusk: palette({ a: '#ffc3a1', a2: '#f7a8b8', b: '#e8a5c4', b2: '#c8b3ec', c: '#a9b4ee', c2: '#cdb6ea', e: '#ffd9b0', top: '#f8d8cc', mid: '#e4cdea', bot: '#c8cdf2' }),
  },
  dark: {
    dawn: palette({ a: '#4a2f3f', a2: '#43305a', b: '#3b2a4d', b2: '#2c3452', c: '#24304d', c2: '#3d2847', e: '#4a3a2c', top: '#2a1f2b', mid: '#241d33', bot: '#1b1b2e' }),
    dusk: palette({ a: '#5a2f3c', a2: '#4a2f5e', b: '#3d2a58', b2: '#2a3558', c: '#1f3050', c2: '#452a4e', e: '#5a4030', top: '#231a2c', mid: '#1e1830', bot: '#151728' }),
  },
}

const VERT = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}'
const FRAG = `precision mediump float;
uniform vec2 r;uniform float t;uniform vec3 a,a2,b,b2,c,c2,e,top,mid,bot;
float glow(vec2 uv,vec2 at,vec2 size){vec2 q=(uv-at)/size;return smoothstep(1.,0.,length(q));}
void main(){
  vec2 uv=gl_FragCoord.xy/r;uv.y=1.-uv.y;
  vec3 col=uv.y<.52?mix(top,mid,uv.y/.52):mix(mid,bot,(uv.y-.52)/.48);
  vec2 pa=vec2(.2+.2*sin(t*.5),.16+.15*cos(t*.62));
  vec2 pb=vec2(.8+.18*cos(t*.45),.12+.17*sin(t*.58));
  vec2 pc=vec2(.5+.3*sin(t*.33),.92+.12*cos(t*.5));
  vec2 pe=vec2(.5+.36*sin(t*.27),.5+.26*sin(t*.41+1.3));
  vec3 ca=mix(a,a2,.5+.5*sin(t*.35));
  vec3 cb=mix(b,b2,.5+.5*sin(t*.3+2.));
  vec3 cc=mix(c,c2,.5+.5*sin(t*.26+4.));
  col=mix(col,ca,.95*glow(uv,pa,vec2(.7,.55)*(1.+.16*sin(t*.9))));
  col=mix(col,cb,.9*glow(uv,pb,vec2(.6,.5)*(1.+.16*cos(t*.8))));
  col=mix(col,cc,.9*glow(uv,pc,vec2(.85,.7)*(1.+.1*sin(t*.7))));
  col=mix(col,e,.6*glow(uv,pe,vec2(.42,.36)));
  gl_FragColor=vec4(col,1.);
}`

export function startShaderSky() {
  const canvas = document.createElement('canvas')
  canvas.className = 'sky-canvas'
  canvas.setAttribute('aria-hidden', 'true')
  const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' })
  if (!gl) return () => {}

  const shader = (type: number, src: string) => {
    const s = gl.createShader(type)!
    gl.shaderSource(s, src)
    gl.compileShader(s)
    return s
  }
  const prog = gl.createProgram()!
  gl.attachShader(prog, shader(gl.VERTEX_SHADER, VERT))
  gl.attachShader(prog, shader(gl.FRAGMENT_SHADER, FRAG))
  gl.linkProgram(prog)
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return () => {}
  gl.useProgram(prog)
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
  const loc = gl.getAttribLocation(prog, 'p')
  gl.enableVertexAttribArray(loc)
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
  const uniforms = new Map<string, WebGLUniformLocation | null>()
  const u = (name: string) => {
    if (!uniforms.has(name)) uniforms.set(name, gl.getUniformLocation(prog, name))
    return uniforms.get(name)!
  }

  // dawn → dusk with scroll progress; only re-upload when it moves
  let journey = -1
  let theme = ''
  const setSky = () => {
    const max = document.documentElement.scrollHeight - innerHeight
    const raw = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0
    const k = raw * raw * (3 - 2 * raw)
    const mode = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
    if (Math.abs(k - journey) < 0.003 && mode === theme) return
    journey = k
    theme = mode
    const { dawn, dusk } = SKIES[mode]
    for (const key of Object.keys(dawn) as Array<keyof Palette>)
      gl.uniform3fv(u(key), dawn[key].map((v, i) => v + (dusk[key][i] - v) * k))
  }
  const resize = () => {
    canvas.width = Math.max(1, Math.round(innerWidth / 2))
    canvas.height = Math.max(1, Math.round(innerHeight / 2))
    gl.viewport(0, 0, canvas.width, canvas.height)
    gl.uniform2f(u('r'), canvas.width, canvas.height)
  }
  resize()
  setSky()
  addEventListener('resize', resize)

  // draw only while some of the sky is visible between the bands
  let raf = 0
  let last = 0
  const t0 = performance.now()
  const frame = (now: number) => {
    raf = requestAnimationFrame(frame)
    if (now - last < 33) return // ~30fps is plenty for a slow sky
    last = now
    setSky()
    gl.uniform1f(u('t'), (now - t0) / 1000)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
  }
  const visible = new Set<Element>()
  const windows = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) visible.add(e.target)
      else visible.delete(e.target)
    }
    if (visible.size && !raf) raf = requestAnimationFrame(frame)
    if (!visible.size && raf) {
      cancelAnimationFrame(raf)
      raf = 0
    }
  })
  document.querySelectorAll('[data-sky-window]').forEach((el) => windows.observe(el))

  // paint one frame before showing the canvas, so it never flashes blank
  gl.uniform1f(u('t'), 0)
  gl.drawArrays(gl.TRIANGLES, 0, 3)
  document.body.prepend(canvas)

  return () => {
    cancelAnimationFrame(raf)
    windows.disconnect()
    removeEventListener('resize', resize)
    canvas.remove()
  }
}
