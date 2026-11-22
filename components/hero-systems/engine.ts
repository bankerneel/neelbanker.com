/**
 * Pinned sub hero engine. Ported from design/hero-systems/final.html
 * (poisson / makeNet / agents / drawing / eras / chain head).
 *
 * Canvas code only: this module reads CSS custom properties for every colour.
 * The two new ember and glow tokens are owned by another child, so their
 * fallbacks stay here rather than in any component or stylesheet.
 */

export type Rect = { x: number; y: number; w: number; h: number; narrow?: boolean }
export type Point = { x: number; y: number }
export type Pointer = { x: number; y: number; vx: number; vy: number; in: boolean }
export type Palette = {
  dark: boolean
  panel: string
  ink: string
  inkSoft: string
  accent: string
  shadowSolid: string
  butter: string
  skyT: string
  rose: string
  lilac: string
  sage: string
  terra: string
  ember: string
  glow: string
}

export type NetNode = {
  hx: number
  hy: number
  x: number
  y: number
  ph: number
  inf: number
  nb: number[]
}

type Msg = { a: number; b: number; t0: number; dur: number; ax?: number; ay?: number }
type Net = {
  n: NetNode[]
  e: Array<[number, number]>
  msgs: Msg[]
  round: number
  count: number
  done: boolean
  fin: number
  next: number
  rs: number
  onInform: ((i: number, now: number) => void) | null
  nearest: (x: number, y: number, k: number) => number[]
  inform: (i: number, now: number, from: number) => void
  start: (now: number, from: number | Point) => void
  update: (now: number) => void
  head: (m: Msg, now: number) => [number, number, number, number] | null
  status: (unit?: string, verb?: string) => string
}

type Agent = { name: string; x: number; y: number; act?: number; lead?: boolean }
type EraNode = NetNode & {
  ag: number
  oa: number
  orr: number
  os: number
  v: Array<[number, number]>
  tone: string
  rot: number
}
type Packet = { A: Point; B: Point & { name?: string; act?: number }; t0: number; dur: number; text: string }
type Spark = { x: number; y: number; vx: number; vy: number; l: number; d: number }

export type EraSystem = {
  R: Rect
  N: number
  cell: number
  /** Reused every frame so the scrub never allocates a weights tuple. */
  weights: [number, number, number]
  p: EraNode[]
  net: Net
  agents: Agent[]
  msgs: Packet[]
  mc: number
  tok: number
  q: number
  next2: number
  block: number
  hash: string
  fresh: number
  freshAt: number
  nextMine: number
  ar: number
  sp: Spark[]
  scrub: number | null
  w: (ef: number) => [number, number, number]
  update: (now: number, ef: number) => void
  draw: (c: CanvasRenderingContext2D, now: number, ef: number, pal: Palette, ptr: Pointer) => void
  label: (ef: number) => string
  obstacles: (ef: number) => Array<{ x: number; y: number; r: number }>
  burst: (x: number, y: number, now: number, ef: number) => void
}

export type Chain = { n: number; hash: string; at: number; live: boolean; busy: boolean; last: number }

const TAU = 6.2832
export const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v))
const rnd = (a = 0, b = 1) => a + Math.random() * (b - a)
const ease = (t: number) => {
  const x = clamp(t, 0, 1)
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2
}
const hex4 = () => Math.floor(Math.random() * 65536).toString(16).padStart(4, '0')
const hash = () => '0x' + hex4() + '…' + hex4()
export const fmt = (n: number) => Math.round(n).toLocaleString('en-US')
// System mono stack. No CDN font, no external font request.
const MONO = (px: number) =>
  `500 ${px}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`

/** Read every colour from --dm-* tokens. Only the canvas owns the fallbacks. */
export function readPalette(root: HTMLElement): Palette {
  const css = getComputedStyle(root)
  const v = (name: string) => css.getPropertyValue(name).trim()
  return {
    dark: root.dataset.theme === 'dark',
    panel: v('--dm-panel'),
    ink: v('--dm-ink'),
    inkSoft: v('--dm-ink-soft'),
    accent: v('--dm-accent-ink'),
    shadowSolid: v('--dm-shadow'),
    butter: v('--dm-butter'),
    skyT: v('--dm-sky'),
    rose: v('--dm-rose'),
    lilac: v('--dm-lilac'),
    sage: v('--dm-sage'),
    terra: v('--dm-terra'),
    ember: v('--dm-ember') || '#ffb36b',
    glow: v('--dm-glow') || '#ff7a2e',
  }
}

/* ── engine: gossip network ─────────────────────────────────────────── */
export function poisson(R: Rect, n: number, k = 0.66): NetNode[] {
  const md = Math.sqrt((R.w * R.h) / n) * k
  const out: NetNode[] = []
  let tries = 0
  while (out.length < n && tries++ < 30000) {
    const x = rnd(R.x, R.x + R.w)
    const y = rnd(R.y, R.y + R.h)
    if (out.every((p) => (p.hx - x) ** 2 + (p.hy - y) ** 2 > md * md)) {
      out.push({ hx: x, hy: y, x, y, ph: rnd(0, TAU), inf: -1, nb: [] })
    }
  }
  while (out.length < n) {
    const x = rnd(R.x, R.x + R.w)
    const y = rnd(R.y, R.y + R.h)
    out.push({ hx: x, hy: y, x, y, ph: rnd(0, TAU), inf: -1, nb: [] })
  }
  return out
}

export function makeNet(nodes: NetNode[], pos: (p: NetNode, i: number) => [number, number] = (p) => [p.hx, p.hy]): Net {
  const net = {
    n: nodes,
    e: [] as Array<[number, number]>,
    msgs: [] as Msg[],
    round: 0,
    count: 0,
    done: true,
    fin: 0,
    next: 0,
    rs: 0,
    onInform: null as ((i: number, now: number) => void) | null,
  } as Net
  nodes.forEach((p) => {
    p.inf = -1
    p.nb = []
  })
  const P0 = nodes.map((p, i) => pos(p, i))
  const seen = new Set<string>()
  nodes.forEach((p, i) => {
    P0.map((q, j) => [(q[0] - P0[i][0]) ** 2 + (q[1] - P0[i][1]) ** 2, j] as [number, number])
      .sort((a, b) => a[0] - b[0])
      .slice(1, 3)
      .forEach(([, j]) => {
        const key = i < j ? i + ':' + j : j + ':' + i
        if (!seen.has(key)) {
          seen.add(key)
          net.e.push([i, j])
          p.nb.push(j)
          nodes[j].nb.push(i)
        }
      })
  })
  net.nearest = (x, y, k) =>
    nodes
      .map((p, j) => [(p.x - x) ** 2 + (p.y - y) ** 2, j] as [number, number])
      .sort((a, b) => a[0] - b[0])
      .slice(0, k)
      .map((v) => v[1])
  net.inform = (i, now, from) => {
    const p = nodes[i]
    if (p.inf >= 0) return
    p.inf = now
    net.count++
    if (net.onInform) net.onInform(i, now)
    const delay = rnd(40, 150)
    p.nb.forEach((j) => {
      if (j === from || nodes[j].inf >= 0) return
      const q = nodes[j]
      net.msgs.push({ a: i, b: j, t0: now + delay, dur: Math.hypot(q.x - p.x, q.y - p.y) / 0.3 })
    })
  }
  net.start = (now, from) => {
    net.round++
    net.rs = now
    net.done = false
    net.count = 0
    net.msgs = []
    nodes.forEach((p) => (p.inf = -1))
    if (typeof from === 'number') net.inform(from, now, -1)
    else
      net.nearest(from.x, from.y, 4).forEach((j) => {
        const q = nodes[j]
        net.msgs.push({ a: -1, ax: from.x, ay: from.y, b: j, t0: now, dur: Math.hypot(q.x - from.x, q.y - from.y) / 0.3 })
      })
  }
  net.update = (now) => {
    if (net.done && now > net.next) net.start(now, (Math.random() * nodes.length) | 0)
    // Compact in place. inform() appends to net.msgs, so only the messages
    // present at the start of this frame are considered.
    const count = net.msgs.length
    let kept = 0
    for (let i = 0; i < count; i += 1) {
      const m = net.msgs[i]
      if (now >= m.t0 + m.dur) net.inform(m.b, now, m.a)
      else net.msgs[kept++] = m
    }
    net.msgs.length = kept
    if (!net.done && net.msgs.length === 0) {
      net.done = true
      net.fin = now - net.rs
      net.next = now + 2600
    }
  }
  net.head = (m, now) => {
    if (now < m.t0) return null
    const u = clamp((now - m.t0) / m.dur, 0, 1)
    const sx = m.a < 0 ? (m.ax ?? 0) : nodes[m.a].x
    const sy = m.a < 0 ? (m.ay ?? 0) : nodes[m.a].y
    const b = nodes[m.b]
    return [sx, sy, sx + (b.x - sx) * u, sy + (b.y - sy) * u]
  }
  net.status = (unit = 'nodes', verb = 'gossip') =>
    `round ${net.round} · ${nodes.length} ${unit} · ` + (!net.done ? `${verb} ${net.count}/${nodes.length}` : net.fin > 0 ? `finality ${fmt(net.fin)} ms` : 'waiting for a round')
  return net
}

/* ── agents: shared drawing and script ────────────────────────────────── */
const AGENTS = ['planner', 'coder', 'tools', 'reviewer', 'auditor']
const ROLES: Record<string, string> = {
  planner: 'breaks the work down',
  coder: 'writes the diff',
  tools: 'fireblocks · hsm · rpc',
  reviewer: 'reads every line',
  auditor: 'signs off on chain',
  'buyer agent': 'wants one gpu hour',
  'seller agent': 'sells compute',
}
// The real stack, kept from the approved source.
const SCRIPT: Array<[string, string, string]> = [
  ['planner', 'coder', 'spec: erc-4337 wallet'],
  ['coder', 'tools', 'fireblocks ncw: sign'],
  ['tools', 'coder', 'sig ok · hsm'],
  ['coder', 'reviewer', 'diff +42 -7 · userop'],
  ['reviewer', 'coder', 'nit: check paymaster'],
  ['coder', 'reviewer', 'diff +3 -1'],
  ['reviewer', 'auditor', 'approve'],
  ['auditor', 'planner', 'op stack: batch posted'],
]

function bez(A: Point, B: Point, t: number): [number, number] {
  const mx = (A.x + B.x) / 2
  const my = (A.y + B.y) / 2
  const dx = B.x - A.x
  const dy = B.y - A.y
  const cx = mx - dy * 0.22
  const cy = my + dx * 0.22
  const u = 1 - t
  return [u * u * A.x + 2 * u * t * cx + t * t * B.x, u * u * A.y + 2 * u * t * cy + t * t * B.y]
}

function drawPacket(c: CanvasRenderingContext2D, A: Point, B: Point, t: number, text: string | undefined, colour: string | undefined, pal: Palette, bounds?: Rect) {
  const a0 = c.globalAlpha
  c.strokeStyle = colour || pal.accent
  c.lineWidth = 1.2
  c.globalAlpha = a0 * 0.5
  c.beginPath()
  for (let k = 0; k <= 14; k++) {
    const [x, y] = bez(A, B, (t * k) / 14)
    if (k) c.lineTo(x, y)
    else c.moveTo(x, y)
  }
  c.stroke()
  c.globalAlpha = a0
  const [x, y] = bez(A, B, t)
  c.fillStyle = colour || pal.accent
  c.fillRect(x - 5, y - 3, 10, 6)
  if (text) {
    c.font = MONO(10.5)
    const w = c.measureText(text).width
    const a = Math.sin(Math.PI * clamp(t, 0, 1))
    const boxW = w + 10
    let bx = x + 9
    if (bounds) bx = Math.min(Math.max(bx, bounds.x), Math.max(bounds.x, bounds.x + bounds.w - boxW))
    c.globalAlpha = a0 * a * 0.92
    c.fillStyle = pal.panel
    c.fillRect(bx, y - 19, boxW, 16)
    c.globalAlpha = a0 * a
    c.fillStyle = pal.ink
    c.textBaseline = 'middle'
    c.fillText(text, bx + 5, y - 11)
    c.globalAlpha = a0
  }
}

function clampLabel(x: number, width: number, bounds?: Rect): number {
  if (!bounds) return x
  const left = bounds.x + width / 2
  const right = Math.max(left, bounds.x + bounds.w - width / 2)
  return Math.min(Math.max(x, left), right)
}

function drawAgent(c: CanvasRenderingContext2D, a: Agent, now: number, pal: Palette, ptr: Pointer, r = 16, label = a.name.toUpperCase(), bounds?: Rect) {
  const a0 = c.globalAlpha
  const hot = now - (a.act ?? -1e9) < 650
  const hover = ptr.in && Math.hypot(ptr.x - a.x, ptr.y - a.y) < r + 10
  c.fillStyle = pal.shadowSolid
  c.beginPath()
  c.arc(a.x + 3, a.y + 3, r, 0, TAU)
  c.fill()
  c.fillStyle = pal.panel
  c.beginPath()
  c.arc(a.x, a.y, r, 0, TAU)
  c.fill()
  c.strokeStyle = hot || hover || a.lead ? pal.accent : pal.ink
  c.lineWidth = hot || hover || a.lead ? 2 : 1.4
  c.stroke()
  c.fillStyle = hot ? pal.accent : pal.ink
  c.beginPath()
  c.arc(a.x, a.y, Math.max(1.5, r * 0.19), 0, TAU)
  c.fill()
  if (hot) {
    const age = (now - (a.act ?? now)) / 650
    c.globalAlpha = a0 * (1 - age) * 0.5
    c.strokeStyle = pal.accent
    c.lineWidth = 1
    c.beginPath()
    c.arc(a.x, a.y, r + age * 14, 0, TAU)
    c.stroke()
    c.globalAlpha = a0
  }
  c.font = MONO(10)
  c.textAlign = 'center'
  c.textBaseline = 'top'
  c.fillStyle = pal.inkSoft
  c.fillText(label, clampLabel(a.x, c.measureText(label).width, bounds), a.y + r + 7)
  if (hover && ROLES[a.name]) {
    const role = ROLES[a.name]
    c.fillStyle = pal.accent
    c.fillText(role, clampLabel(a.x, c.measureText(role).width, bounds), a.y + r + 21)
  }
  c.textAlign = 'left'
}

function drawBlock(c: CanvasRenderingContext2D, x: number, y: number, s: number, fresh: boolean, pal: Palette) {
  c.fillStyle = pal.shadowSolid
  c.fillRect(x - s / 2 + 3, y - s / 2 + 3, s, s)
  c.fillStyle = pal.panel
  c.fillRect(x - s / 2, y - s / 2, s, s)
  c.strokeStyle = fresh ? pal.accent : pal.ink
  c.lineWidth = fresh ? 2 : 1.2
  c.strokeRect(x - s / 2, y - s / 2, s, s)
}

export function drawLedger(c: CanvasRenderingContext2D, blocks: Array<{ born: number }>, endX: number, y: number, now: number, pal: Palette, label = 'LEDGER') {
  const n = blocks.length
  c.strokeStyle = pal.ink
  c.globalAlpha = 0.45
  c.lineWidth = 1.2
  c.beginPath()
  c.moveTo(endX - (n - 1) * 30, y)
  c.lineTo(endX, y)
  c.stroke()
  c.globalAlpha = 1
  blocks.forEach((b, i) => {
    const age = now - b.born
    drawBlock(c, endX - (n - 1 - i) * 30 + (1 - ease(age / 500)) * 30, y, 18, age < 900, pal)
  })
  c.font = MONO(10)
  c.fillStyle = pal.inkSoft
  c.textBaseline = 'middle'
  c.fillText(label, endX - (n - 1) * 30 - 14 - c.measureText(label).width, y)
}

export function drawTicker(c: CanvasRenderingContext2D, R: Rect, ws: [number, number, number], scrub: number | null, pal: Palette) {
  c.font = MONO(11)
  c.textBaseline = 'top'
  let x = R.x
  const k = ws.indexOf(Math.max(...ws))
  const names = ['blockchain', 'web3', 'ai agents']
  names.forEach((name, i) => {
    const s = name.toUpperCase()
    c.globalAlpha = i === k ? 1 : 0.55
    c.fillStyle = i === k ? pal.accent : pal.inkSoft
    c.fillText(s, x, R.y + 2)
    x += c.measureText(s).width + 8
    if (i < 2) {
      c.fillStyle = pal.inkSoft
      c.globalAlpha = 0.55
      c.fillText('→', x, R.y + 2)
      x += c.measureText('→').width + 8
    }
  })
  c.globalAlpha = 1
  if (scrub != null) {
    const w = x - 8 - R.x
    c.strokeStyle = pal.inkSoft
    c.globalAlpha = 0.4
    c.lineWidth = 1
    c.beginPath()
    c.moveTo(R.x, R.y + 20)
    c.lineTo(R.x + w, R.y + 20)
    c.stroke()
    c.globalAlpha = 1
    c.fillStyle = pal.accent
    c.beginPath()
    c.arc(R.x + w * scrub, R.y + 20, 3.5, 0, TAU)
    c.fill()
  }
}

/* ── engine: career eras (blockchain → web3 → ai agents) ─────────────── */
const circ = (a: number, b: number) => {
  const d = (((a - b) % 3) + 3) % 3
  return Math.min(d, 3 - d)
}
const eraW = (ef: number, k: number, wrap: boolean) => clamp(1 - (wrap ? circ(ef, k) : Math.abs(ef - k)), 0, 1)

/** Exact plateau map from final.html: 0 on 0-20%, morph to 20-40%, 1 on
 *  40-60%, morph to 60-80%, 2 on 80-100%. */
export const sstep = (t: number) => t * t * (3 - 2 * t)
export const eraFromP = (p: number) => {
  const s = p * 5
  return s < 1 ? 0 : s < 2 ? sstep(s - 1) : s < 3 ? 1 : s < 4 ? 1 + sstep(s - 3) : 2
}

export function makeEras(
  R: Rect,
  N: number,
  options: { style?: 'ink' | 'ember'; ticker?: boolean; wrap?: boolean; K?: number; radF?: number } = {},
): EraSystem {
  const { style = 'ink', ticker = true, wrap = true, K = 1, radF = 0.33 } = options
  const top = R.y + (ticker ? 32 : 4)
  const h = R.h - (ticker ? 32 : 4)
  const cols = N >= 40 ? 8 : N >= 24 ? 6 : 4
  const rows = Math.ceil(N / cols)
  const cell = Math.min(R.w / (cols + 0.5), h / (rows + 0.5))
  const gx0 = R.x + (R.w - cols * cell) / 2 + cell / 2
  const gy0 = top + (h - rows * cell) / 2 + cell / 2
  const T0: Array<[number, number]> = []
  for (let i = 0; i < N; i++) {
    const row = Math.floor(i / cols)
    const c = i % cols
    const col = row % 2 ? cols - 1 - c : c
    T0.push([gx0 + col * cell, gy0 + row * cell])
  }
  const T1 = poisson({ x: R.x, y: top, w: R.w, h }, N).map((p) => [p.hx, p.hy] as [number, number])
  const cx = R.x + R.w / 2
  const cy = top + h / 2
  const rad = Math.min(R.w, h) * radF
  const ar = clamp(rad * 0.2, 9, 16 * K)
  const agents: Agent[] = AGENTS.map((name, i) => ({
    name,
    x: cx + Math.cos(-Math.PI / 2 + i * 1.2566) * rad,
    y: cy + Math.sin(-Math.PI / 2 + i * 1.2566) * rad,
  }))
  const tones = ['butter', 'rose', 'skyT', 'lilac', 'sage', 'panel']
  const p: EraNode[] = []
  for (let i = 0; i < N; i++) {
    const v: Array<[number, number]> = []
    const r = rnd(4.5, 7)
    for (let k = 0; k < 6; k++) {
      const a = (k / 6) * TAU + rnd(-0.3, 0.3)
      const rr = r * rnd(0.75, 1.15)
      v.push([Math.cos(a) * rr, Math.sin(a) * rr])
    }
    p.push({
      hx: T1[i][0],
      hy: T1[i][1],
      x: T0[i][0],
      y: T0[i][1],
      ph: rnd(0, TAU),
      inf: -1,
      nb: [],
      ag: i % 5,
      oa: rnd(0, TAU),
      orr: i < 5 ? 0 : rnd(ar + 8, ar + 24),
      os: rnd(0.0004, 0.0009) * (Math.random() < 0.5 ? -1 : 1),
      rot: rnd(-0.4, 0.4),
      v,
      tone: tones[i % tones.length],
    })
  }
  const net = makeNet(p, (q, i) => T1[i])
  const E = {
    R,
    N,
    cell,
    weights: [0, 0, 0] as [number, number, number],
    p,
    net,
    agents,
    msgs: [] as Packet[],
    mc: 0,
    tok: 0,
    q: 0,
    next2: 0,
    block: 18440,
    hash: hash(),
    fresh: -1,
    freshAt: 0,
    nextMine: 0,
    ar,
    sp: [] as Spark[],
    scrub: null as number | null,
  } as EraSystem
  if (style === 'ember')
    net.onInform = (i) => {
      const q = p[i]
      for (let k = 0; k < 4; k++)
        E.sp.push({
          x: q.x + rnd(-5, 5),
          y: q.y + rnd(-5, 5),
          vx: rnd(-0.5, 0.5),
          vy: rnd(-1.5, -0.4),
          l: 1,
          d: rnd(0.015, 0.03),
        })
    }
  // Two reusable targets keep the update from allocating a pair per node per
  // frame. Callers must consume them before the next call.
  const targetA: [number, number] = [0, 0]
  const targetB: [number, number] = [0, 0]
  const tgt = (i: number, k: number, now: number, out: [number, number]): void => {
    const q = p[i]
    if (k === 0) {
      out[0] = T0[i][0]
      out[1] = T0[i][1]
    } else if (k === 1) {
      out[0] = T1[i][0] + Math.sin(now * 0.0004 + q.ph) * 4
      out[1] = T1[i][1] + Math.cos(now * 0.00033 + q.ph) * 4
    } else {
      const a = agents[q.ag]
      const ang = q.oa + now * q.os
      out[0] = a.x + Math.cos(ang) * q.orr
      out[1] = a.y + Math.sin(ang) * q.orr
    }
  }
  E.w = (ef) => {
    E.weights[0] = eraW(ef, 0, wrap)
    E.weights[1] = eraW(ef, 1, wrap)
    E.weights[2] = eraW(ef, 2, wrap)
    return E.weights
  }
  E.update = (now, ef) => {
    const base = Math.floor(ef)
    const fr = ease(ef - base)
    const k0 = ((base % 3) + 3) % 3
    const k1 = wrap ? (k0 + 1) % 3 : Math.min(2, k0 + 1)
    for (let i = 0; i < p.length; i += 1) {
      const q = p[i]
      tgt(i, k0, now, targetA)
      tgt(i, k1, now, targetB)
      q.x = targetA[0] + (targetB[0] - targetA[0]) * fr
      q.y = targetA[1] + (targetB[1] - targetA[1]) * fr
    }
    const [wB, wN, wA] = E.w(ef)
    if (wB > 0.9 && now > E.nextMine) {
      E.fresh = (E.fresh + 1) % N
      E.freshAt = now
      E.block++
      E.hash = hash()
      E.nextMine = now + 650
    }
    if (wN > 0.9) net.update(now)
    else {
      net.done = true
      net.msgs = []
      net.next = now + 600
      if (net.count) {
        p.forEach((q) => (q.inf = -1))
        net.count = 0
      }
    }
    if (wA > 0.9 && now > E.next2) {
      const [a, b, text] = SCRIPT[E.q % SCRIPT.length]
      E.q++
      const A = agents.find((g) => g.name === a)
      const B = agents.find((g) => g.name === b)
      if (A && B) {
        E.msgs.push({ A, B, t0: now, dur: 900, text })
        A.act = now
        E.mc++
        E.tok += 80 + ((Math.random() * 380) | 0)
        E.next2 = now + rnd(420, 760)
      }
    }
    if (wA > 0.9) {
      let kept = 0
      for (let i = 0; i < E.msgs.length; i += 1) {
        const m = E.msgs[i]
        if (now - m.t0 > m.dur) {
          if (m.B.name) m.B.act = now
        } else {
          E.msgs[kept++] = m
        }
      }
      E.msgs.length = kept
    } else {
      E.msgs.length = 0
    }
    let keptSparks = 0
    for (let i = 0; i < E.sp.length; i += 1) {
      const s = E.sp[i]
      s.x += s.vx
      s.y += s.vy
      s.l -= s.d
      if (s.l > 0) E.sp[keptSparks++] = s
    }
    E.sp.length = keptSparks
  }
  E.draw = (c, now, ef, palette, pointer) => {
    const [wB, wN, wA] = E.w(ef)
    const ember = style === 'ember'
    if (ticker) drawTicker(c, R, E.weights, E.scrub, palette)
    // Cubed edge fade, kept exactly from the source: morph edges dissolve
    // long before the core does.
    if (wB > 0.02) {
      c.strokeStyle = palette.ink
      c.lineWidth = 1.2
      c.globalAlpha = 0.45 * wB * wB * wB
      c.beginPath()
      p.forEach((q, i) => (i ? c.lineTo(q.x, q.y) : c.moveTo(q.x, q.y)))
      c.stroke()
      c.globalAlpha = 1
    }
    if (wN > 0.02) {
      c.strokeStyle = palette.ink
      c.lineWidth = 0.8 * K
      c.globalAlpha = (ember ? 0.3 : 0.24) * wN * wN * wN
      c.beginPath()
      for (const [i, j] of net.e) {
        c.moveTo(p[i].x, p[i].y)
        c.lineTo(p[j].x, p[j].y)
      }
      c.stroke()
      c.globalAlpha = 1
      if (wN > 0.9)
        for (const m of net.msgs) {
          const hd = net.head(m, now)
          if (!hd) continue
          c.beginPath()
          c.moveTo(hd[0], hd[1])
          c.lineTo(hd[2], hd[3])
          // A wide translucent pass gives the same halo as shadowBlur without
          // asking the canvas to blur a new region on every message.
          if (ember) {
            c.strokeStyle = palette.glow
            c.lineWidth = 5 * K
            c.globalAlpha = 0.22
            c.stroke()
          }
          c.strokeStyle = ember ? palette.ember : palette.accent
          c.lineWidth = ember ? 1.6 : 1.3
          c.globalAlpha = 0.8
          c.stroke()
          c.globalAlpha = 1
          c.fillStyle = ember ? palette.ember : palette.accent
          c.beginPath()
          c.arc(hd[2], hd[3], 2.3 * K, 0, TAU)
          c.fill()
        }
    }
    p.forEach((q, i) => {
      if (wB > 0.02) {
        c.globalAlpha = wB
        drawBlock(c, q.x, q.y, E.cell * 0.56 * wB + 4 * (1 - wB), i === E.fresh && now - E.freshAt < 500, palette)
        c.globalAlpha = 1
      }
      const da = (1 - wB) * (i < 5 ? 1 - wA : 1)
      if (da < 0.02) return
      const on = wN > 0.9 && q.inf >= 0
      c.globalAlpha = da
      if (ember) {
        const co = Math.cos(q.rot)
        const si = Math.sin(q.rot)
        const sc = wA > 0.5 && i >= 5 ? 0.6 : 1
        for (let pass = 0; pass < 2; pass += 1) {
          const o = pass === 0 ? 2.5 : 0
          c.fillStyle = pass === 0 ? palette.shadowSolid : (palette[q.tone as keyof Palette] as string)
          c.beginPath()
          for (let k = 0; k < q.v.length; k += 1) {
            const vx = q.v[k][0]
            const vy = q.v[k][1]
            const X = q.x + (vx * co - vy * si) * sc + o
            const Y = q.y + (vx * si + vy * co) * sc + o
            if (k) c.lineTo(X, Y)
            else c.moveTo(X, Y)
          }
          c.closePath()
          c.fill()
        }
        if (on) {
          const g = Math.max(0, 1 - (now - q.inf) / 900)
          c.strokeStyle = palette.glow
          c.lineWidth = 6 + g * 8
          c.globalAlpha = da * 0.28
          c.stroke()
          c.strokeStyle = palette.ember
          c.lineWidth = 1.2 + g
          c.globalAlpha = da
          c.stroke()
        }
      } else {
        c.fillStyle = on ? palette.accent : palette.ink
        if (!on) c.globalAlpha = da * 0.6
        c.beginPath()
        c.arc(q.x, q.y, (wA > 0.5 ? 1.7 : on ? 2.7 : 2.1) * K, 0, TAU)
        c.fill()
        if (on) {
          const age = now - q.inf
          if (age < 700) {
            c.globalAlpha = da * (1 - age / 700) * 0.6
            c.strokeStyle = palette.accent
            c.lineWidth = 1
            c.beginPath()
            c.arc(q.x, q.y, 2.7 * K + (age / 700) * 14 * K, 0, TAU)
            c.stroke()
          }
        }
      }
      c.globalAlpha = 1
    })
    if (wA > 0.02) {
      c.globalAlpha = wA
      for (const m of E.msgs) drawPacket(c, m.A, m.B, (now - m.t0) / m.dur, m.text, ember ? palette.glow : undefined, palette, R)
      for (const a of agents) {
        c.globalAlpha = wA
        drawAgent(c, a, now, palette, pointer, ar * wA, a.name.toUpperCase(), R)
      }
      c.globalAlpha = 1
    }
    if (E.sp.length) {
      c.globalCompositeOperation = palette.dark ? 'lighter' : 'source-over'
      for (const s of E.sp) {
        c.globalAlpha = s.l
        c.fillStyle = palette.dark ? palette.ember : palette.glow
        c.beginPath()
        c.arc(s.x, s.y, 1.3, 0, TAU)
        c.fill()
      }
      c.globalAlpha = 1
      c.globalCompositeOperation = 'source-over'
    }
  }
  E.label = (ef) => {
    const w = E.w(ef)
    const k = w.indexOf(Math.max(...w))
    return k === 0
      ? `blockchain · block #${fmt(E.block)} · ${E.hash}`
      : k === 1
        ? `web3 · ${net.status()}`
        : `ai agents · ${AGENTS.length} agents · ${fmt(E.mc)} msgs · ${(E.tok / 1000).toFixed(1)}k tokens`
  }
  E.obstacles = (ef) => {
    const [wB, , wA] = E.w(ef)
    const out = p.map((q) => ({ x: q.x, y: q.y, r: 4 + wB * E.cell * 0.3 }))
    if (wA > 0.3) for (const a of agents) out.push({ x: a.x, y: a.y, r: ar * wA + 3 })
    return out
  }
  E.burst = (x, y, now, ef) => {
    const [, wN, wA] = E.w(ef)
    if (wN > 0.5) net.start(now, { x, y })
    if (wA > 0.5) {
      E.msgs.push({ A: { x, y }, B: agents[0], t0: now, dur: 900, text: 'task: from you' })
      E.mc++
    }
  }
  return E
}

/** One public read every 12 s, only while the blockchain era is visible.
 *  The caller owns the 12 s gate; this owns the 3 s timeout. */
export async function chainHead(chain: Chain): Promise<void> {
  if (chain.busy) return
  chain.busy = true
  chain.last = performance.now()
  const ac = new AbortController()
  const timer = setTimeout(() => ac.abort(), 3000)
  try {
    const r = await fetch('https://ethereum-rpc.publicnode.com', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'eth_getBlockByNumber', params: ['latest', false] }),
      signal: ac.signal,
    })
    if (!r.ok) return
    const j = (await r.json()) as { result?: { number?: string; hash?: string } }
    if (j?.result?.number && j.result.hash) {
      chain.n = parseInt(j.result.number, 16)
      chain.hash = j.result.hash.slice(0, 6) + '…' + j.result.hash.slice(-4)
      chain.at = performance.now()
      chain.live = true
    }
  } catch {
    // Keep the readout labelled simulated.
  } finally {
    clearTimeout(timer)
    chain.busy = false
  }
}
