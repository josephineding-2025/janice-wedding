/* Scroll story (the landing experience).
   Fine-line ink illustrations with soft watercolour washes.
   Each chapter is a tall block with a sticky stage. While you scroll through it, one CSS variable --p (0..1)
   drives every animation, using only transform and opacity so it stays smooth on phones.
   Only chapters near the screen are updated, and nothing loads from the network. */
(function () {
  "use strict";
  const W = window.WEDDING;
  const INK = "#2d2b38", SKIN = "#f8e7da", HAIR = "#25222f";
  const LAV = "#cfc3f3", BLU = "#b9cdf2", BLUSH = "#f4cfda", NAVY = "#56608f", SAGE = "#dbe8dc", GOLD = "#f6e2b0", GREY = "#a9aec6";

  /* ---------- tiny helpers for scroll-driven CSS ---------- */
  const S = (a, b) => `clamp(0, calc((var(--p) - ${a}) / ${b - a}), 1)`; // 0..1 between a and b
  const px = (a, b, n) => `calc(${S(a, b)} * ${n}px)`;
  const op = (a, b) => `opacity:${S(a, b)}`;
  const tf = (x, y, extra) => `transform:translate(${x},${y}) ${extra || ""}`;
  // hand-drawn line: the path plus a faint offset copy, like a pen going over a pencil sketch
  const sk = (d, w, extra) => `<path d="${d}" fill="none" stroke="${INK}" stroke-width="${w || 1.1}" stroke-linecap="round" stroke-linejoin="round" ${extra || ""}/><path d="${d}" fill="none" stroke="${INK}" stroke-width=".6" opacity=".28" transform="translate(.9 .7)" stroke-linecap="round"/>`;
  const st = (w) => `stroke="${INK}" stroke-width="${w || 1}" stroke-linecap="round" stroke-linejoin="round"`;
  const wash = (cx, cy, rx, ry, id, o) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#${id})"${o ? ` opacity="${o}"` : ""}/>`;

  /* ---------- people: slim, faceless-ish fashion sketches. Recognised by hair, glasses and outfit.
     Min Zheng: short black hair with a small tuft, black-framed glasses in the student years.
     Janice: long straight black hair, side-swept fringe, thin glasses in the student years. */
  function arm(x1, y1, x2, y2, c) {
    return `<path d="M${x1} ${y1} L${x2} ${y2}" stroke="${c}" stroke-width="6" stroke-linecap="round" opacity=".9"/>
      <path d="M${x1} ${y1} L${x2} ${y2}" stroke="${INK}" stroke-width="1" stroke-linecap="round" fill="none"/>
      <circle cx="${x2}" cy="${y2}" r="2.7" fill="${SKIN}" ${st(0.9)}/>`;
  }
  const POSES = {
    down: [[-12, -109, -17, -70], [12, -109, 17, -70]],
    up: [[-12, -109, -29, -146], [12, -109, 29, -146]],
    wave: [[-12, -109, -17, -70], [12, -109, 30, -142]],
    hold: [[-12, -109, -5, -84], [12, -109, 5, -84]],
    point: [[-12, -109, -17, -70], [12, -109, 46, -108]],
    mouth: [[-12, -109, -17, -70], [12, -109, 5, -122]],
    out: [[-12, -109, -26, -92], [12, -109, 26, -92]],
  };

  function person(k, o) {
    o = o || {};
    const x = o.x || 0, y = o.y || 0, s = o.s || 1, flip = o.flip || 1;
    const jn = k === "jn";
    const top = o.top || (jn ? LAV : BLU), bottom = o.bottom || (jn ? LAV : "#9097b8");
    const pose = POSES[o.pose || "down"];
    let g = "";
    // legs
    if (jn && o.dress) {
      g += `<path d="M-4 -30 V-4 M4 -30 V-4" stroke="${SKIN}" stroke-width="3.4" stroke-linecap="round"/><path d="M-4 -30 V-4 M4 -30 V-4" ${st(0.9)}/>`;
    } else {
      g += `<path d="M-11 -70 L11 -70 L9 -4 L1.2 -4 L0 -52 L-1.2 -4 L-9 -4Z" fill="${bottom}" fill-opacity=".85" ${st(1)}/>`;
    }
    g += `<ellipse cx="-5.5" cy="-2" rx="6" ry="2.4" fill="${INK}"/><ellipse cx="5.5" cy="-2" rx="6" ry="2.4" fill="${INK}"/>`;
    // torso
    if (o.gown && !jn) {
      g += `<path d="M-14 -112 Q0 -117 14 -112 L18 -22 L-18 -22Z" fill="${top}" fill-opacity=".92" ${st(1)}/><path d="M-4 -113 L0 -92 L4 -113" fill="none" ${st(0.8)}/>`;
    } else if (jn && o.dress) {
      const w = o.dress === "gown" ? 36 : o.dress === "gown2" ? 30 : 23, yb = o.dress === "gown" ? -2 : -28;
      g += `<path d="M-11 -112 Q0 -117 11 -112 L9 -84 Q${w - 3} -50 ${w} ${yb} L${-w} ${yb} Q${-w + 3} -50 -9 -84Z" fill="${top}" fill-opacity=".9" ${st(1)}/>`;
      if (o.dress === "gown") g += `<path d="M-6 -70 Q-10 -40 -14 -6 M0 -70 V-4 M6 -70 Q10 -40 14 -6 M-20 -60 Q-24 -30 -26 -4 M20 -60 Q24 -30 26 -4" fill="none" stroke="${INK}" stroke-width=".5" opacity=".35"/>`;
    } else {
      g += `<path d="M-13 -112 Q0 -117 13 -112 L11 -68 L-11 -68Z" fill="${top}" fill-opacity=".9" ${st(1)}/><path d="M-3.5 -113.5 L0 -105 L3.5 -113.5" fill="none" ${st(0.8)}/>`;
    }
    if (o.extraBody) g += o.extraBody;
    g += pose.map((p) => arm(p[0], p[1], p[2], p[3], top)).join("");
    g += `<path d="M-2.6 -123 V-114 M2.6 -123 V-114" ${st(0.9)}/>`;
    // head
    let head = o.back || "";
    if (jn) head += `<path d="M-12.5 -139 Q-14 -153 0 -153 Q14 -153 12.5 -139 L15 -98 Q8 -94 6 -108 L-6 -108 Q-8 -94 -15 -98Z" fill="${HAIR}" ${st(0.9)}/>`;
    head += `<ellipse cx="0" cy="-134" rx="${10 + (o.round || 0) * 0.6}" ry="12" fill="${SKIN}" ${st(1.05)}/>`;
    if (jn) head += `<path d="M-11 -137 Q-11 -149 1 -148.5 Q11 -148 11 -137 Q5 -145 -2 -143 Q-8 -141 -11 -137Z" fill="${HAIR}" ${st(0.8)}/>`;
    else head += `<path d="M-11 -136 Q-13 -150 -1 -150 Q12 -151 11 -136 Q8 -143 2 -143 Q-6 -146 -11 -136Z" fill="${HAIR}" ${st(0.8)}/><path d="M-4 -149 L-1 -157 L3 -149 L6 -155 L7 -148" fill="${HAIR}" ${st(0.8)}/>`;
    head += `<circle cx="-4.2" cy="-133.5" r="0.95" fill="${INK}"/><circle cx="4.2" cy="-133.5" r="0.95" fill="${INK}"/>`;
    if (o.glasses) {
      const w = jn ? 0.9 : 1.5;
      head += `<g fill="none" ${st(w)}><rect x="-8.4" y="-137" width="7.6" height="6.2" rx="2.6"/><rect x="0.8" y="-137" width="7.6" height="6.2" rx="2.6"/><path d="M-0.8 -134.4 H0.8"/></g>`;
    }
    if (o.mask) head += `<path d="M-10 -131 Q0 -129 10 -131 Q9 -120 0 -117 Q-9 -120 -10 -131Z" fill="#dbe9f8" ${st(0.8)}/>`;
    else head += `<path d="M-3.6 -127 Q0 -123.6 3.6 -127" fill="none" ${st(0.8)}/>`;
    g += head + (o.hat ? `<g transform="translate(0 -134)">${o.hat}</g>` : "");
    if (o.prop) g += o.prop;
    return `<g transform="translate(${x} ${y}) scale(${s * flip} ${s})">${g}</g>`;
  }
  const MZ = (o) => person("mz", o);
  const JN = (o) => person("jn", o);

  /* ---------- botanical details ---------- */
  const leaf = (x, y, r, s) => `<path transform="translate(${x} ${y}) rotate(${r}) scale(${s || 1})" d="M0 0 Q6 -4.5 12 0 Q6 4.5 0 0Z" fill="${SAGE}" stroke="${INK}" stroke-width=".7"/>`;
  const blossom = (x, y, r, c) => `<g transform="translate(${x} ${y})">${[0, 72, 144, 216, 288].map((a) => `<ellipse cy="${-r * 0.7}" rx="${r * 0.5}" ry="${r * 0.75}" fill="${c}" fill-opacity=".9" stroke="${INK}" stroke-width=".7" transform="rotate(${a})"/>`).join("")}<circle r="${r * 0.28}" fill="#f6e2a8" stroke="${INK}" stroke-width=".5"/></g>`;
  const WF = [LAV, BLU, BLUSH, "#ffffff", LAV];
  function sprig(x, y, h, lean, c, s) {
    const tx = x + lean, ty = y - h;
    return `<g transform="scale(${s || 1})" style="transform-origin:${x}px ${y}px"><path d="M${x} ${y} Q${x + lean * 0.2} ${y - h * 0.5} ${tx} ${ty}" fill="none" ${st(0.9)}/>
      ${leaf(x + lean * 0.15, y - h * 0.3, -35, 0.9)}${leaf(x + lean * 0.3, y - h * 0.5, 215, 0.8)}${leaf(x + lean * 0.5, y - h * 0.7, -30, 0.7)}${blossom(tx, ty, 4.6, c)}</g>`;
  }
  const wildflowers = (y, n, x0, x1) => Array.from({ length: n }, (_, i) => sprig(x0 + ((x1 - x0) * (i + 0.5)) / n, y + ((i * 5) % 7), 22 + ((i * 13) % 20), ((i % 3) - 1) * 7, WF[i % 5], 1)).join("");
  const hill = (y, id) => `${wash(180, y + 36, 250, 60, id || "wLav", 0.8)}${sk(`M-10 ${y} Q90 ${y - 20} 180 ${y - 4} T370 ${y - 8}`, 1)}`;
  const cypress = (x, y, s, id) => `<g transform="translate(${x} ${y}) scale(${s || 1})">${wash(0, -48, 22, 56, id || "wSage", 0.9)}${sk("M0 0 Q-15 -48 0 -102 Q15 -48 0 0Z", 1)}
    <path d="M-4 -10 V-40 M3 -16 V-52 M-3 -48 V-72 M2 -62 V-84 M-8 -30 V-50 M8 -28 V-46" stroke="${INK}" stroke-width=".7" opacity=".5"/></g>`;
  const tree = (x, y, s, id) => `<g transform="translate(${x} ${y}) scale(${s || 1})">${wash(0, -64, 38, 38, id || "wSage", 0.95)}
    ${sk("M0 0 Q-3 -24 1 -44 M1 -26 Q-14 -38 -22 -52 M1 -36 Q14 -48 24 -62", 1.1)}
    ${[[-22, -52, 200], [-14, -46, 210], [24, -62, -20], [14, -52, -30], [1, -44, -80], [-8, -58, 190], [10, -66, -60], [-26, -60, 230], [18, -72, -45]].map((l) => leaf(l[0], l[1], l[2], 1.2)).join("")}</g>`;
  const butterfly = (x, y, s, c) => `<g class="fly" transform="translate(${x} ${y}) scale(${s || 1})"><ellipse cx="-5" cy="-3" rx="5.5" ry="3.6" transform="rotate(-24 -5 -3)" fill="${c || BLU}" fill-opacity=".8" ${st(0.7)}/><ellipse cx="5" cy="-3" rx="5.5" ry="3.6" transform="rotate(24 5 -3)" fill="${c || BLU}" fill-opacity=".8" ${st(0.7)}/><ellipse cx="-3.5" cy="3" rx="3.6" ry="2.4" transform="rotate(24)" fill="${c || BLU}" fill-opacity=".6" ${st(0.6)}/><ellipse cx="3.5" cy="3" rx="3.6" ry="2.4" transform="rotate(-24)" fill="${c || BLU}" fill-opacity=".6" ${st(0.6)}/><path d="M0 -4 V5" ${st(0.8)}/></g>`;
  const dove = (x, y, s, flip) => `<g transform="translate(${x} ${y}) scale(${(s || 1) * (flip || 1)} ${s || 1})"><path d="M-16 4 Q-8 -14 4 -18 Q-2 -6 8 -2 Q16 -6 22 -2 Q16 4 8 4 Q0 10 -16 4Z" fill="#fff" ${st(0.9)}/><path d="M-4 -4 Q4 -22 18 -26 Q10 -14 8 -4Z" fill="#fff" ${st(0.9)}/><path d="M20 -2 L26 -1 L21 1" fill="${GOLD}" ${st(0.6)}/><path d="M-16 4 Q-22 6 -28 4" ${st(0.8)}/><circle cx="18" cy="-3" r=".8" fill="${INK}"/></g>`;
  const lantern = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s || 1})">${wash(0, 20, 22, 26, "wGold", 0.9)}<path d="M0 -60 V-14" ${st(0.8)}/><circle cx="0" cy="-12" r="3" fill="none" ${st(0.9)}/>${sk("M-9 -6 L0 -14 L9 -6Z M-9 -6 H9 M-9 -6 L-11 24 H11 L9 -6 M-3 -6 V24 M3 -6 V24 M-11 24 H11", 1)}<path d="M0 6 q-2 -5 0 -9 q2 4 0 9" fill="${GOLD}" ${st(0.6)}/></g>`;
  const heart = (x, y, s, c) => `<path transform="translate(${x} ${y}) scale(${s || 1})" d="M0 6 C-12 -4 -7 -15 0 -8 C7 -15 12 -4 0 6Z" fill="${c || BLUSH}" fill-opacity=".9" ${st(1)}/>`;
  const sparkle = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s || 1})" ${st(1)} fill="none"><path d="M0 -9 V9 M-9 0 H9 M-5 -5 L5 5 M5 -5 L-5 5" opacity=".9"/></g>`;
  const cap = (x, y, r) => `<g transform="translate(${x} ${y}) rotate(${r || 0})"><path d="M-17 0 L0 -7 L17 0 L0 7Z" fill="${NAVY}" ${st(1)}/><path d="M-9 3 V9 Q0 13 9 9 V3" fill="${NAVY}" ${st(0.9)}/><path d="M13 1 V11" ${st(0.9)}/></g>`;
  const ink = (txt, x, y, size, anchor, extra) => `<text x="${x}" y="${y}" text-anchor="${anchor || "middle"}" class="sk" font-size="${size || 20}" fill="${INK}" ${extra || ""}>${txt}</text>`;

  /* ---------- scenes ---------- */
  const SCENES = {};
  const HOOKS = {};

  SCENES.cover = () => `
    ${wash(70, 80, 150, 110, "wLav", 0.85)}${wash(300, 150, 150, 120, "wBlu", 0.8)}${wash(200, 360, 230, 90, "wBlush", 0.6)}
    ${lantern(300, 130, 1.1)}
    <g style="${tf("0", px(0, 1, -18))}">${cypress(36, 360, 1.15)}${cypress(326, 366, 1.3, "wLav")}${tree(88, 366, 0.9)}</g>
    ${butterfly(80, 190, 1.2, LAV)}${butterfly(250, 230, 1, BLU)}${butterfly(205, 120, 0.9, BLUSH)}
    <g style="${tf(px(0, 1, 30), px(0, 1, -10))}">${dove(60, 120, 1, 1)}</g>
    <g style="${tf(px(0, 1, -26), px(0, 1, -6))}">${dove(300, 70, 0.8, -1)}</g>
    ${hill(372, "wLav")}${wildflowers(402, 14, 6, 354)}
    ${MZ({ x: 146, y: 392, s: 1.25, glasses: true, pose: "down", top: BLU, bottom: "#8f95b8" })}
    ${JN({ x: 214, y: 392, s: 1.25, glasses: true, pose: "down", dress: "gown2", top: LAV })}
    <g style="${tf("0", px(0, 0.5, -10))}">${heart(180, 196, 1.6)}</g>`;

  SCENES.sunway = () => {
    const cols = [118, 150, 210, 242].map((x) => `<path d="M${x - 6} 156 V214 M${x + 6} 156 V214" ${st(1)} fill="none"/><path d="M${x - 3} 158 V212 M${x} 158 V212 M${x + 3} 158 V212" stroke="${INK}" stroke-width=".4" opacity=".35"/>`).join("");
    const wins = (x0, x1) => [0, 1, 2].map((r) => Array.from({ length: Math.floor((x1 - x0) / 18) }, (_, i) => `<rect x="${x0 + 4 + i * 18}" y="${176 + r * 15}" width="9" height="9" fill="${BLU}" fill-opacity=".45" stroke="${INK}" stroke-width=".7"/>`).join("")).join("");
    return `
    ${wash(80, 90, 170, 90, "wBlu", 0.9)}${wash(300, 120, 120, 80, "wLav", 0.7)}
    ${sk("M-10 150 H105 V218 H-10 M255 150 H370 M255 150 V218 H370")}${wins(0, 105)}${wins(255, 360)}
    ${sk("M100 154 L180 108 L260 154Z M100 154 H260 V164 H100Z M100 216 H260 V222 H100Z")}${cols}${blossom(180, 138, 6, GOLD)}
    ${ink("Sunway University", 180, 98, 22)}
    ${sk("M150 222 L130 304 H230 L210 222")}<path d="M146 238 H214 M141 258 H219 M136 280 H224" stroke="${INK}" stroke-width=".5" opacity=".35"/>${wash(180, 270, 70, 40, "wBlush", 0.8)}
    ${hill(332, "wLav")}${wildflowers(352, 10, 10, 350)}${cypress(22, 336, 0.8)}${cypress(340, 336, 0.9, "wLav")}
    <g style="${tf(px(0, 0.7, 150), "0")}">${MZ({ x: -10, y: 394, s: 0.88, glasses: true, pose: "wave", gown: true, top: NAVY, extraBody: `<path d="M-12 -112 L10 -70 M12 -112 L-10 -70" stroke="${BLUSH}" stroke-width="3" opacity=".95"/>` })}</g>
    <g style="${tf(px(0, 0.7, -150), "0")}">${JN({ x: 370, y: 394, s: 0.88, glasses: true, pose: "wave", dress: "gown2", top: NAVY, extraBody: "" })}</g>
    <g style="${op(0.72, 0.85)}">${ink("graduated three months apart", 180, 70, 21)}</g>
    <g style="${tf("0", px(0.78, 1, -64))};${op(0.78, 0.84)}">${cap(146, 288, -20)}${cap(216, 296, 25)}</g>
    <g style="${op(0.8, 0.9)}">${heart(180, 214, 1.4)}</g>`;
  };

  SCENES.library = () => {
    const books = (y) => Array.from({ length: 17 }, (_, i) => `<rect x="${10 + i * 20.5}" y="${y - 22 - ((i * 7) % 8)}" width="${10 + (i % 3) * 2}" height="${22 + ((i * 7) % 8)}" fill="${[LAV, BLU, BLUSH, "#fff"][i % 4]}" fill-opacity=".8" stroke="${INK}" stroke-width=".8"/>`).join("");
    return `
    ${wash(60, 140, 170, 140, "wLav", 0.7)}${wash(300, 230, 140, 130, "wBlush", 0.6)}
    <path d="M0 98 H360 M0 178 H360 M0 258 H360" ${st(1.1)} fill="none"/>${books(98)}${books(178)}${books(258)}
    <rect x="22" y="262" width="150" height="82" rx="2" fill="#fff" ${st(1.1)}/><rect x="26" y="266" width="142" height="74" rx="1" fill="none" stroke="${INK}" stroke-width=".5" opacity=".4"/>
    ${ink("1 + 1 = ?", 98, 306, 30, "middle", `style="${op(0.1, 0.3)}"`)}${ink("= 2 !", 98, 336, 28, "middle", `style="${op(0.5, 0.65)}"`)}
    ${MZ({ x: 208, y: 392, s: 0.95, flip: -1, glasses: true, pose: "point", top: BLU, prop: `<path d="M46 -108 L92 -105" stroke="#b9996a" stroke-width="2" stroke-linecap="round"/>` })}
    ${JN({ x: 292, y: 378, s: 0.85, glasses: true, pose: "hold", dress: true, top: LAV })}
    <path d="M246 326 H350 M252 326 V392 M344 326 V392" ${st(1.2)} fill="none"/><path d="M246 326 H350 V332 H246Z" fill="#e9d9bf" ${st(1)}/>
    <path d="M268 318 L289 312 L310 318 V326 H268Z" fill="#fff" ${st(0.9)}/><path d="M289 312 V326" ${st(0.8)}/>
    <g style="${op(0.25, 0.4)}"><ellipse cx="316" cy="236" rx="28" ry="17" fill="#fff" ${st(1)}/><path d="M298 248 l-6 9 l13 -5" fill="#fff" ${st(0.9)}/>${ink("?", 316, 245, 24)}</g>
    <g style="${op(0.6, 0.75)}"><ellipse cx="316" cy="236" rx="28" ry="17" fill="${GOLD}" fill-opacity=".6" ${st(1)}/>${ink("A+", 316, 246, 24)}</g>
    <g style="${tf("0", px(0.7, 1, -40))};${op(0.7, 0.8)}">${heart(254, 300, 1)}${heart(304, 292, 1.2)}${heart(338, 304, 0.8, LAV)}</g>
    <g>${wildflowers(402, 4, 4, 60)}</g>`;
  };

  SCENES.map = () => `
    ${wash(70, 120, 130, 120, "wBlu", 0.9)}${wash(250, 280, 120, 110, "wLav", 0.7)}
    ${sk("M118 58 Q166 46 188 88 Q212 138 238 190 Q268 252 254 322 Q234 364 200 348 Q170 304 160 244 Q132 192 112 142 Q102 92 118 58Z", 1.2)}
    ${wash(190, 200, 70, 130, "wSage", 0.5)}<circle cx="96" cy="124" r="13" fill="none" ${st(1)}/>
    <path d="M178 96 Q200 140 214 184 M168 206 Q196 238 206 290" fill="none" stroke="${INK}" stroke-width=".6" stroke-dasharray="2 5" opacity=".5"/>
    ${cypress(150, 178, 0.55, "wSage")}${cypress(222, 290, 0.55, "wLav")}${tree(238, 236, 0.5)}
    <path id="mapRoad" d="M98 128 C150 150 126 206 150 236 S176 260 196 254" fill="none" stroke="${INK}" stroke-width="1.5" stroke-dasharray="6 6" stroke-linecap="round"/>
    <circle cx="98" cy="128" r="5" fill="${LAV}" ${st(1)}/><circle cx="196" cy="254" r="5" fill="${BLU}" ${st(1)}/>
    ${ink("Penang", 54, 158, 22)}${ink("Kuala Lumpur", 262, 262, 22, "start")}
    <g id="mapBus"><path d="M-16 -9 H14 Q17 -9 17 -5 V6 H-16Z" fill="${GOLD}" fill-opacity=".8" ${st(1)}/><path d="M-12 -6 H-4 V0 H-12Z M-2 -6 H6 V0 H-2Z M8 -6 H14 V0 H8Z" fill="#fff" ${st(0.7)}/><circle cx="-8" cy="7" r="3.4" fill="${INK}"/><circle cx="9" cy="7" r="3.4" fill="${INK}"/></g>
    ${ink("about 350 km, and many many trips", 180, 330, 20, "middle", `style="${op(0.5, 0.7)}"`)}
    <g style="${op(0.35, 0.55)}">
      <rect x="40" y="338" width="108" height="72" rx="10" fill="#fff" ${st(1.1)}/>${MZ({ x: 94, y: 408, s: 0.36, glasses: true, pose: "down" })}
      <rect x="212" y="338" width="108" height="72" rx="10" fill="#fff" ${st(1.1)}/>${JN({ x: 266, y: 408, s: 0.36, glasses: true, pose: "down", dress: true })}
      <path d="M152 372 Q180 354 208 372" fill="none" stroke="${INK}" stroke-width=".9" stroke-dasharray="2 5"/>${heart(180, 360, 1.2)}</g>`;
  HOOKS.map = (p, root) => {
    const road = root.querySelector("#mapRoad"), bus = root.querySelector("#mapBus");
    if (!road || !bus) return;
    const L = road.getTotalLength(), d = Math.min(1, p / 0.9) * L;
    const a = road.getPointAtLength(d), b = road.getPointAtLength(Math.min(L, d + 2));
    bus.setAttribute("transform", `translate(${a.x} ${a.y - 9}) rotate(${(Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI / 2})`);
  };

  SCENES.keys = () => `
    ${wash(80, 70, 150, 80, "wLav", 0.8)}${wash(290, 90, 110, 70, "wBlu", 0.7)}${wash(180, 270, 170, 120, "wBlush", 0.35)}
    ${hill(150, "wLav")}
    ${MZ({ x: 96, y: 150, s: 0.7, glasses: true, pose: "hold", top: BLU, mask: true })}
    <g transform="translate(40 122)"><rect x="0" y="0" width="22" height="30" rx="3" fill="${BLUSH}" fill-opacity=".8" ${st(1)}/><path d="M5 0 V-6 H17 V0" fill="none" ${st(1)}/></g>
    ${JN({ x: 266, y: 150, s: 0.7, glasses: true, pose: "hold", dress: true, top: LAV, mask: true })}
    <g style="${tf(px(0.05, 0.3, 80), px(0.05, 0.3, 4))}"><g ${st(1.1)} fill="${GOLD}"><circle cx="124" cy="104" r="5.5"/><path d="M129 104 H150 M144 104 V110 M139 104 V108" fill="none"/></g></g>
    ${ink("&ldquo;Take care of my car!&rdquo;", 180, 36, 23, "middle", `style="${op(0.05, 0.2)}"`)}
    <g style="${op(0.35, 0.5)}"><g transform="translate(180 238) rotate(-4) scale(.8)"><rect x="-82" y="-50" width="164" height="124" rx="2" fill="#fff" ${st(1.2)}/><rect x="-72" y="-40" width="144" height="86" fill="${BLU}" fill-opacity=".35" ${st(0.8)}/>
      ${MZ({ x: -28, y: 44, s: 0.38, glasses: true, pose: "down", mask: true })}${JN({ x: 28, y: 44, s: 0.38, glasses: true, pose: "down", dress: true, mask: true })}
      ${ink("mask-era selfie", 0, 66, 18)}</g>${heart(262, 190, 1.2)}</g>
    <g style="${op(0.65, 0.8)}">
      <path id="flyRoute" d="M70 366 Q180 296 290 366" fill="none" stroke="${INK}" stroke-width="1.2" stroke-dasharray="5 6" stroke-linecap="round"/>
      <circle cx="70" cy="366" r="4.5" fill="${LAV}" ${st(1)}/><circle cx="290" cy="366" r="4.5" fill="${BLU}" ${st(1)}/>
      ${JN({ x: 46, y: 404, s: 0.34, glasses: false, pose: "down", dress: true, top: LAV })}${MZ({ x: 314, y: 404, s: 0.34, pose: "down" })}
      ${ink("Kuala Lumpur", 84, 392, 17, "middle")}${ink("Singapore", 276, 392, 17, "middle")}
      ${ink("2.5 years apart", 180, 318, 23)}
      <g id="flyPlane"><path d="M-12 0 L10 -4 L14 0 L10 4Z M-2 0 L-8 -10 M-2 0 L-8 10" fill="#fff" ${st(1)}/></g></g>`;
  HOOKS.keys = (p, root) => {
    const r = root.querySelector("#flyRoute"), pl = root.querySelector("#flyPlane");
    if (!r || !pl) return;
    const t = Math.max(0, Math.min(1, (p - 0.65) / 0.3)), L = r.getTotalLength();
    const a = r.getPointAtLength(t * L), b = r.getPointAtLength(Math.min(L, t * L + 2));
    pl.setAttribute("transform", `translate(${a.x} ${a.y}) rotate(${(Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI})`);
  };

  SCENES.usa = () => {
    const stripes = Array.from({ length: 7 }, (_, i) => `<rect x="0" y="${i * 7}" width="70" height="7" fill="${i % 2 ? "#fff" : BLUSH}"/>`).join("");
    const case_ = (x, y, w, h, c) => `<g transform="translate(${x} ${y})"><rect x="0" y="${-h}" width="${w}" height="${h}" rx="3" fill="${c}" fill-opacity=".8" ${st(1)}/><path d="M${w * 0.3} ${-h} V${-h - 5} H${w * 0.7} V${-h}" fill="none" ${st(0.9)}/><path d="M0 ${-h * 0.5} H${w}" stroke="${INK}" stroke-width=".5" opacity=".4"/><rect x="${w / 2 - 3}" y="${-h * 0.5 - 2}" width="6" height="4" fill="${GOLD}" ${st(0.6)}/></g>`;
    return `
    ${wash(70, 80, 170, 80, "wBlu", 0.95)}${wash(300, 170, 110, 90, "wLav", 0.6)}
    <g style="${tf(px(0, 1, 420), "0")}"><g transform="translate(-170 92)">${sk("M-8 0 L110 -2 L120 6 L110 14 L-8 12Z", 1.1)}${sk("M30 0 L60 -32 L74 -30 L60 0 M30 12 L60 44 L74 42 L60 12", 1)}<circle cx="96" cy="6" r="2.5" fill="${BLU}" ${st(0.7)}/>
      <path d="M-8 6 H-48" ${st(0.9)}/><path d="M-48 -6 H-134 L-130 18 H-48Z" fill="${GOLD}" fill-opacity=".5" ${st(0.9)}/>${ink("USA &middot; Aug 2022", -92, 8, 15)}</g></g>
    ${hill(332, "wLav")}
    <g transform="translate(252 316)"><g>${stripes}</g><rect x="0" y="0" width="30" height="28" fill="${NAVY}" fill-opacity=".7"/>${[0, 1, 2].map((r) => [0, 1, 2].map((c) => `<circle cx="${6 + c * 9}" cy="${6 + r * 8}" r="1.2" fill="#fff"/>`).join("")).join("")}<rect width="70" height="49" fill="none" ${st(1)}/><path d="M0 0 V74" ${st(1.4)}/></g>
    ${case_(40, 396, 34, 44, LAV)}${case_(66, 396, 40, 30, BLU)}
    ${MZ({ x: 142, y: 394, s: 0.9, pose: "wave", top: "#bfe0da", bottom: "#8f95b8" })}
    ${JN({ x: 206, y: 394, s: 0.9, pose: "up", dress: true, top: BLUSH })}
    <g style="${op(0.55, 0.75)}"><g transform="translate(300 218) rotate(-12)"><circle r="32" fill="none" stroke="#b97a8d" stroke-width="1.6" stroke-dasharray="3 3"/><circle r="26" fill="none" stroke="#b97a8d" stroke-width=".9"/>${ink("USA", 0, -2, 17, "middle", `fill="#b97a8d"`)}<text y="14" text-anchor="middle" class="sk" font-size="13" fill="#b97a8d">08.2022</text></g></g>
    ${wildflowers(404, 8, 236, 354)}${butterfly(100, 250, 1, LAV)}`;
  };

  SCENES.sg = () => `
    ${wash(80, 110, 170, 100, "wLav", 0.8)}${wash(290, 160, 120, 90, "wBlu", 0.8)}
    <g>${sk("M70 300 V152 H106 V300 M118 300 V132 H154 V300 M166 300 V152 H202 V300")}${sk("M54 132 Q108 112 214 126 L222 140 L62 146Z")}</g>
    ${[0, 1, 2, 3, 4, 5].map((i) => `<path d="M${76 + (i % 3) * 48} ${170 + Math.floor(i / 3) * 40} h24 M${76 + (i % 3) * 48} ${181 + Math.floor(i / 3) * 40} h24" stroke="${INK}" stroke-width=".7" opacity=".4"/>`).join("")}
    ${sk("M228 300 V192 H258 V300 M262 300 V170 H296 V300 M300 300 V206 H340 V300")}
    <path d="M-10 332 Q60 324 120 334 T260 330 T380 334 V420 H-10Z" fill="${BLU}" fill-opacity=".25"/>${sk("M-10 332 Q60 324 120 334 T260 330 T380 334")}
    <path d="M0 362 q20 -7 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0" fill="none" stroke="${INK}" stroke-width=".8" opacity=".5"/>
    ${ink("June 2023", 180, 44, 30, "middle", `style="${op(0.05, 0.25)}"`)}
    <g style="${tf(px(0, 0.7, -140), "0")}">${JN({ x: 360, y: 326, s: 0.85, pose: "wave", dress: true, top: LAV, prop: `<g transform="translate(-48 0)"><rect x="0" y="-32" width="26" height="32" rx="3" fill="${GOLD}" fill-opacity=".7" ${st(1)}/><path d="M9 -32 V-38 H17 V-32" fill="none" ${st(0.9)}/></g>` })}</g>
    ${MZ({ x: 90, y: 326, s: 0.85, pose: "wave", top: BLU })}
    <g style="${op(0.72, 0.85)}">${heart(165, 230, 1.8)}${heart(135, 200, 1.1, LAV)}${heart(200, 205, 1.2, BLU)}</g>
    <g style="${op(0.15, 0.4)}"><path d="M30 394 H330" stroke="${INK}" stroke-width="1.2" stroke-dasharray="5 6"/><circle cx="30" cy="394" r="4.5" fill="${BLU}" ${st(1)}/><circle cx="330" cy="394" r="4.5" fill="${LAV}" ${st(1)}/>${ink("Singapore", 30, 412, 16, "start")}${ink("KL", 330, 412, 16, "end")}</g>
    ${ink("same city. finally.", 180, 380, 22, "middle", `style="${op(0.78, 0.92)}"`)}`;

  SCENES.life = () => `
    ${wash(80, 90, 170, 90, "wBlu", 0.8)}${wash(290, 330, 130, 100, "wBlush", 0.7)}${wash(70, 330, 120, 90, "wLav", 0.6)}
    <rect x="22" y="26" width="316" height="130" rx="4" fill="#fff" ${st(1.1)}/><path d="M180 26 V156" ${st(0.9)}/>
    ${sk("M34 152 V104 H56 V152 M62 152 V82 H88 V152 M94 152 V110 H118 V152 M128 152 V90 H156 V152 M196 152 V100 H220 V152 M226 152 V76 H256 V152 M262 152 V106 H284 V152 M290 152 V92 H324 V152", 1)}
    ${[0, 1, 2, 3, 4, 5].map((i) => `<rect class="fly" x="${70 + i * 44}" y="${98 + (i % 3) * 14}" width="4" height="4" fill="${GOLD}" style="animation-delay:${i * 0.5}s"/>`).join("")}
    <path d="M16 188 H156 M204 188 H344" ${st(1.4)}/><path d="M60 188 v-26 h52 v26 M248 188 v-26 h52 v26" fill="#fff" ${st(1)}/>
    <g style="${tf("0", px(0, 0.4, 3))}">${MZ({ x: 58, y: 272, s: 0.6, pose: "hold", top: BLU })}${JN({ x: 300, y: 272, s: 0.6, pose: "hold", dress: true, top: LAV })}</g>
    ${ink("work hard", 180, 226, 26, "middle", `style="${op(0.1, 0.3)}"`)}
    <path d="M30 304 H330 M52 304 V384 M308 304 V384" ${st(1.3)} fill="none"/><path d="M30 304 H330 V311 H30Z" fill="#e9d9bf" ${st(1)}/>
    ${[78, 150, 222, 294].map((x, i) => `<g transform="translate(${x} 304)"><path d="M-22 0 Q-22 -24 0 -24 Q22 -24 22 0Z" fill="${[GOLD, BLUSH, SAGE, LAV][i]}" fill-opacity=".8" ${st(1)}/><path class="steam" d="M-6 -28 q-5 -8 0 -14 q5 -6 0 -12 M8 -28 q-5 -8 0 -14 q5 -6 0 -12" fill="none" stroke="${INK}" stroke-width=".9" opacity=".5" style="animation-delay:${i * 0.4}s"/></g>`).join("")}
    ${MZ({ x: 112, y: 392, s: 0.62, pose: "up", top: BLU, round: 1 })}${JN({ x: 256, y: 392, s: 0.62, pose: "up", dress: true, top: LAV })}
    ${ink("EAT!", 182, 350, 30, "middle", `fill="#b97a8d" style="${op(0.45, 0.65)}"`)}${heart(180, 268, 1.2)}`;

  SCENES.proposal = () => `
    <defs><linearGradient id="sunset" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${LAV}"/><stop offset=".55" stop-color="${BLUSH}"/><stop offset="1" stop-color="#fdebd3"/></linearGradient></defs>
    <rect width="360" height="300" fill="url(#sunset)"/>
    <g style="${tf("0", px(0, 1, 38))}"><circle cx="180" cy="186" r="32" fill="#fff6d8" ${st(1)}/><circle cx="180" cy="186" r="46" fill="none" stroke="#f3d9a0" stroke-width="1" opacity=".7"/></g>
    ${sk("M0 214 Q30 182 70 200 Q100 172 140 214Z M250 214 Q280 150 330 168 Q350 152 370 190 V214", 1.1)}${wash(70, 205, 70, 24, "wLav", 0.8)}${wash(310, 190, 70, 40, "wBlu", 0.8)}
    <rect x="0" y="214" width="360" height="206" fill="${BLU}" fill-opacity=".35"/><path d="M0 214 H360" ${st(1)}/>
    <path d="M0 240 q20 -6 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 M0 266 q20 -6 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0" fill="none" stroke="#fff" stroke-width="1.6"/>
    <path d="M-10 332 L370 332 L370 420 L-10 420Z" fill="#fff" fill-opacity=".85"/>${sk("M-10 332 H370 M-10 350 H370", 1.2)}
    <path d="M300 332 V262 M62 332 V252 M300 262 L340 330 M62 252 L22 330" ${st(1)} fill="none"/>
    <g class="flag"><path d="M62 252 Q92 242 114 254 Q92 264 62 278Z" fill="#f5d77a" fill-opacity=".85" ${st(0.9)}/></g><g class="flag" style="animation-delay:.5s"><path d="M300 262 Q330 252 352 264 Q330 274 300 288Z" fill="#f5d77a" fill-opacity=".85" ${st(0.9)}/></g>
    <g style="${tf(px(0.05, 0.45, 40), "0")}">${MZ({ x: 90, y: 402, s: 1.0, pose: "hold", top: "#bfe0da", prop: `<g transform="translate(0 -86)"><path d="M-16 4 L0 -26 L16 4Z" fill="#fff" ${st(1)}/><circle cx="-6" cy="-22" r="6" fill="${BLUSH}" ${st(0.9)}/><circle cx="5" cy="-24" r="6" fill="#f2b7c8" ${st(0.9)}/><circle cx="0" cy="-14" r="5.5" fill="${BLUSH}" ${st(0.9)}/>${leaf(-14, -12, 200, 1.2)}${leaf(8, -10, -20, 1.2)}</g>` })}</g>
    ${JN({ x: 258, y: 402, s: 1.0, pose: "mouth", dress: "gown2", top: "#fbeedd" })}
    <g style="${op(0.5, 0.65)}">${sparkle(290, 318, 0.9)}${sparkle(300, 300, 0.5)}</g>
    <g style="${op(0.6, 0.8)};${tf("0", px(0.6, 1, -30))}">${heart(180, 250, 1.8)}${heart(140, 280, 1)}${heart(222, 276, 1.2, LAV)}</g>`;

  SCENES.wedding = () => {
    const arch = (cx) => `<path d="M${cx - 15} 214 V160 a15 15 0 0 1 30 0 V214" fill="${BLU}" fill-opacity=".25" ${st(1)}/><path d="M${cx - 15} 214 H${cx + 15}" ${st(1)}/>`;
    return `
    ${wash(70, 90, 160, 100, "wLav", 0.8)}${wash(300, 110, 120, 90, "wBlu", 0.7)}${wash(180, 330, 200, 100, "wBlush", 0.45)}
    ${sk("M44 98 H316 M60 98 L180 54 L300 98 M60 98 V222 M300 98 V222 M44 222 H316 M52 108 H308")}
    <path d="M66 106 H294" stroke="${INK}" stroke-width=".5" opacity=".35" stroke-dasharray="1 3"/>
    ${[0, 1, 2, 3, 4, 5].map((i) => `<path d="M${70 + i * 8} 62 L${70 + i * 8} 62" stroke="none"/>`).join("")}
    ${[84, 130, 230, 276].map((cx) => `<path d="M${cx - 12} 190 V138 a12 12 0 0 1 24 0 V190 Z" fill="${BLU}" fill-opacity=".3" ${st(0.9)}/>`).join("")}
    ${[116, 150, 210, 244].map((x) => `<path d="M${x - 4} 108 V222 M${x + 4} 108 V222" ${st(1)} fill="none"/>`).join("")}
    ${[150, 180, 210].map((cx) => arch(cx - 0)).join("")}
    ${ink("E&amp;O", 180, 84, 22)}
    <g style="transform-box:fill-box;transform-origin:0 50%;transform:scaleX(calc(1 - ${S(0.72, 0.92)} * 0.95))"><rect x="165" y="160" width="15" height="54" fill="${LAV}" fill-opacity=".75" ${st(0.9)}/></g>
    <g style="transform-box:fill-box;transform-origin:100% 50%;transform:scaleX(calc(1 - ${S(0.72, 0.92)} * 0.95))"><rect x="180" y="160" width="15" height="54" fill="${LAV}" fill-opacity=".75" ${st(0.9)}/></g>
    ${wash(180, 190, 22, 30, "wGold", 0.9)}
    <g ${st(0.8)} fill="none">${[0, 1, 2, 3].map((i) => `<path d="M${130 - i * 6} ${224 + i * 8} H${230 + i * 6}"/>`).join("")}</g>
    <path d="M164 224 H196 L296 420 H64Z" fill="#d9889a" fill-opacity=".85" ${st(1.1)}/><path d="M172 236 L104 420 M188 236 L256 420" stroke="#fff" stroke-width="1" opacity=".5"/>
    ${cypress(40, 340, 1.0)}${cypress(320, 340, 1.1, "wLav")}${tree(84, 366, 0.7)}${tree(284, 368, 0.7)}
    ${wildflowers(406, 8, 8, 108)}${wildflowers(406, 8, 252, 352)}
    <g transform="translate(180 410)"><g style="transform-origin:0 0;transform:translateY(${px(0.05, 0.8, -170)}) scale(calc(1 - ${S(0.05, 0.8)} * 0.55))">
      <g transform="translate(-30 0)">${MZ({ s: 0.88, pose: "hold", top: "#3a3a58", bottom: "#3a3a58", extraBody: `<path d="M-5 -112 L0 -106 L5 -112 L0 -116Z" fill="#b97a8d" ${st(0.8)}/>` })}</g>
      <g transform="translate(32 0)">${JN({ s: 0.88, pose: "hold", dress: "gown", top: "#ffffff", back: `<path d="M-16 -146 Q-34 -80 -32 -10 Q0 4 32 -10 Q34 -80 16 -146Z" fill="#fff" fill-opacity=".9" stroke="${INK}" stroke-width=".8"/>`, hat: `<g transform="translate(0 -17)">${[-9, -4.5, 0, 4.5, 9].map((x, k) => `<circle cx="${x}" cy="${Math.abs(x) / 5}" r="2.6" fill="${WF[k]}" stroke="${INK}" stroke-width=".6"/>`).join("")}</g>`, prop: `<g transform="translate(-4 -84)">${blossom(0, 0, 4.5, LAV)}${blossom(8, 3, 4, BLUSH)}${leaf(-8, 6, 200, 1)}</g>` })}</g>
      <g style="${op(0.7, 0.9)}">${heart(0, -176, 1.3)}</g></g></g>
    ${[...Array(8)].map((_, i) => `<g transform="translate(${20 + i * 44} 0)"><path class="petal" d="M0 0 q4 -6 8 0 q-4 6 -8 0" fill="${WF[i % 5]}" stroke="${INK}" stroke-width=".4" style="animation-delay:${i * 0.7}s"/></g>`).join("")}`;
  };


  /* ---------- illustrated scenes ----------
     Each scene is the artwork from scenes/web plus a few cut-out pieces (people, doves, a bus, a plane) that move as you scroll.
     Positions are percentages of the artwork so everything stays lined up on any screen. */
  const PIECE = (n) => `scenes/web/${n}.webp`;
  const FX = {
    // slide in from a side and settle: from (dx% of own width) to 0 between p a..b
    slide: (dx, a, b) => `transform:translateX(calc((1 - ${S(a, b)}) * ${dx}%))`,
    rise: (dy, a, b) => `transform:translateY(calc((1 - ${S(a, b)}) * ${dy}%));opacity:${S(a, Math.min(b, a + 0.2))}`,
    fade: (a, b) => `opacity:${S(a, b)}`,
    cross: (from, to, a, b) => `transform:translateX(calc(${from}% + ${S(a, b)} * ${to - from}%))`,
    swap: (a, b) => `opacity:calc(1 - ${S(a, b)})`,
  };
  const tuft = (x, w, extra) => [
    { src: PIECE("lavender"), x, b: -1, w: w * 0.5, cls: "sway", fx: extra },
    { src: PIECE("bluebell"), x: x + w * 0.4, b: -1, w: w * 0.55, cls: "sway b", fx: extra },
  ];
  // A generated full-length figure dropped in as scenes/web/fig_<scene>.webp (see tools/cut_figure.py) replaces the placeholder people.
  const FIGSLOT = (id, d) => (window.FIGS && window.FIGS[id] ? [Object.assign({ src: `scenes/web/fig_${id}.webp`, fig: 1 }, d)] : null);
  // Every scene is shown as a PORTRAIT crop of its painting (crop = [x0, y0, x1, y1] in pixels of scenes/web/<scene>.webp),
  // so on a phone the subject fills the screen. Piece positions (x = left %, b = bottom %, w = width %) are relative to that crop.
  const IMG_ART = {
    cover: { layers: [
      { src: PIECE("dove1"), x: 3, b: 76, w: 16, fx: `transform:translate(calc(${S(0, 1)} * 90px), calc(${S(0, 1)} * 40px))` },
      { src: PIECE("butterfly2"), x: 74, b: 50, w: 7, blend: 1, cls: "float" },
      { src: PIECE("butterfly1"), x: 10, b: 34, w: 8, blend: 1, cls: "float b" },
      { src: PIECE("butterfly5"), x: 84, b: 70, w: 8, cls: "float" },
      { src: PIECE("butterfly4"), x: 24, b: 62, w: 6, cls: "float b" },
    ] },
    sunway: { crop: [340, 0, 1080, 815], layers: FIGSLOT("sunway", { x: 22, b: 2, w: 56, fx: FX.rise(40, 0.05, 0.5) }) || [
      { src: PIECE("grads"), x: 25, b: 4, w: 50, cls: "cropfade", fx: FX.rise(40, 0.05, 0.5) },
      ...tuft(18, 22, FX.fade(0.2, 0.5)), ...tuft(60, 22, FX.fade(0.2, 0.5)),
      { src: PIECE("dove1"), x: 70, b: 84, w: 16, fx: `transform:translate(calc(${S(0, 1)} * -160px), calc(${S(0, 1)} * 24px))` },
    ] },
    library: { crop: [170, 0, 1090, 1141], layers: [
      { src: PIECE("butterfly3"), x: 8, b: 66, w: 8, blend: 1, cls: "float" },
    ] },
    map: { crop: [0, 0, 1010, 1233], route: { d: "M345 288 C430 372 468 440 505 500 S590 730 650 918", s: 1, sprite: PIECE("bus"), w: 15 }, layers: [] },
    keys: { crop: [180, 0, 1150, 1102], layers: [
      { src: PIECE("him_key"), x: 5, b: 10, w: 22, cls: "cropfade", fx: FX.slide(-130, 0.05, 0.5) },
      { src: PIECE("her_case"), x: 70, b: 10, w: 21, cls: "cropfade", fx: FX.slide(130, 0.05, 0.5) },
      ...tuft(3, 22, FX.fade(0.2, 0.5)), ...tuft(68, 22, FX.fade(0.2, 0.5)),
      { src: PIECE("plane"), x: 52, b: 86, w: 36, fx: `transform:translateX(calc(${S(0.5, 1)} * -190% + 120%));opacity:${S(0.5, 0.6)}` },
    ] },
    // the couple really travel: they walk the whole width of the scene from left to right as you scroll, with a walking bob
    usa: { crop: [0, 0, 1400, 770], layers: [
      ...(FIGSLOT("usa", { x: 0, b: 9, w: 20, fx: `transform:translateX(calc(-125% + ${S(0.04, 0.96)} * 650%)) translateY(var(--bob, 0px)) rotate(var(--sway, 0deg));opacity:${S(0, 0.04)}` }) || [
        { src: PIECE("couple"), x: 10, b: 14, w: 22, cls: "cropfade", fx: FX.rise(40, 0.1, 0.55) },
      ]),
      { src: PIECE("plane"), x: 2, b: 84, w: 26, fx: `transform:translateX(calc(${S(0, 1)} * 300%));opacity:${S(0, 0.08)}` },
      { src: PIECE("dove1"), x: 52, b: 76, w: 9, fx: `transform:translate(calc(${S(0, 1)} * 80px), calc(${S(0, 1)} * -20px))` },
    ] },
    // moving in: luggage arrives. A generated "moving in" figure (fig_sg) walks in as well.
    sg: { crop: [450, 0, 1130, 770], layers: [
      ...(FIGSLOT("sg", { x: 4, b: 2, w: 66, fx: FX.slide(-120, 0.05, 0.6) }) || []),
      { src: PIECE("suitcase"), x: 58, b: 4, w: 28, fx: FX.slide(260, 0.05, 0.55) },
      { src: PIECE("rollcase"), x: 38, b: 3, w: 22, fx: FX.slide(320, 0.1, 0.6) },
      { src: PIECE("books"), x: 24, b: 3, w: 13, fx: FX.slide(260, 0.15, 0.6) },
      { src: PIECE("butterfly2"), x: 14, b: 72, w: 8, blend: 1, cls: "float" },
    ] },
    life: { crop: [320, 0, 1040, 758], layers: [
      { src: PIECE("butterfly1"), x: 4, b: 50, w: 8, blend: 1, cls: "float" },
      { src: PIECE("butterfly2"), x: 88, b: 60, w: 7, blend: 1, cls: "float b" },
    ] },
    proposal: { layers: FIGSLOT("proposal", { x: 8, b: 4, w: 52, fx: FX.rise(30, 0.1, 0.6) }) || [
      { src: PIECE("kneel"), x: 6, b: 6, w: 24, fx: FX.slide(-90, 0.1, 0.6) },
      { src: PIECE("her_hands"), x: 34, b: 6, w: 13, fx: FX.slide(120, 0.1, 0.6) },
      ...tuft(4, 14, FX.fade(0.3, 0.6)),
      { src: PIECE("dove1"), x: 60, b: 76, w: 14, fx: `transform:translate(calc(${S(0, 1)} * -140px), calc(${S(0, 1)} * 40px))` },
    ] },
    // walk the wedding couple up the aisle (needs fig_wedding.webp)
    wedding: { crop: [140, 0, 1260, 1394], zoom: { o: "50% 44%", k: 0.5 }, layers: [
      ...(FIGSLOT("wedding", { x: 30, b: 2, w: 40, fx: `transform-origin:50% 100%;transform:translateY(calc(${S(0.05, 0.9)} * -44%)) scale(calc(1 - ${S(0.05, 0.9)} * 0.55));opacity:${S(0, 0.1)}` }) || []),
      { src: PIECE("dove1"), x: 2, b: 78, w: 15, fx: `transform:translate(calc(${S(0, 1)} * 180px), calc(${S(0, 1)} * -20px))` },
      { src: PIECE("dove3"), x: 82, b: 86, w: 13, blend: 1, fx: `transform:translate(calc(${S(0, 1)} * -150px), calc(${S(0, 1)} * 30px))` },
      { src: PIECE("butterfly3"), x: 70, b: 50, w: 7, blend: 1, cls: "float b" },
    ] },
  };
  const hasImg = (id) => !!(W.sceneImages && W.sceneImages[id] && window.SCENE_META && window.SCENE_META[id]);
  function imgScene(id, cover) {
    const m = window.SCENE_META[id], art = IMG_ART[id] || { layers: [] };
    const ref = art.crop || [0, 0, m.w, m.h], rw = ref[2] - ref[0];
    const cr = art.view || [0, 0, m.w, m.h], cw = cr[2] - cr[0], ch = cr[3] - cr[1];
    const remap = (l) => ({ ...l, x: ((ref[0] + (l.x / 100) * rw - cr[0]) / cw) * 100, w: ((l.w / 100) * rw / cw) * 100 });
    const z = art.zoom ? `transform-origin:${art.zoom.o};transform:scale(calc(1 + var(--p) * ${art.zoom.k}))` : `transform:translateY(calc(var(--p) * -1.5%)) scale(calc(1 + var(--p) * .06))`;
    const layers = (art.layers || []).map(remap).map((l) => `<img class="ov ${l.blend ? "mul" : ""} ${l.cls || ""}" src="${l.src}" alt="" decoding="async" style="left:${l.x}%;bottom:${l.b}%;width:${l.w}%;${l.fx || ""}">`).join("");
    let route = "";
    if (art.route) {
      const r = art.route;
      route = `<svg class="routeSvg" viewBox="${cr[0]} ${cr[1]} ${cw} ${ch}" aria-hidden="true"><path id="imgRoute" d="${r.d}" fill="none" stroke="none"/></svg>
        <img id="imgBus" class="ov" src="${r.sprite}" alt="" style="width:${r.w}%;left:0;top:0">`;
    }
    const bgStyle = `width:${(m.w / cw) * 100}%;height:auto;left:${(-cr[0] / cw) * 100}%;top:${(-cr[1] / ch) * 100}%;max-width:none;position:absolute`;
    return `<div class="scene img" data-ar="${cw / ch}" style="--ar:${cw / ch}"><div class="stack" style="${z}"><div class="crop"><img class="bg" src="${W.sceneImages[id]}" alt="" decoding="async" loading="${cover ? "eager" : "lazy"}" style="${bgStyle}"></div>${layers}${route}</div></div>`;
  }
  // walking bob for the travelling couple: two steps for every little bit of scrolling, so they only "walk" while you scroll
  HOOKS.usa_img = (p, root) => {
    const ph = p * 46;
    root.style.setProperty("--bob", (-Math.abs(Math.sin(ph)) * 7).toFixed(1) + "px");
    root.style.setProperty("--sway", (Math.sin(ph) * 1.1).toFixed(2) + "deg");
  };
  HOOKS.map_img = (p, root) => {
    const path = root.querySelector("#imgRoute"), bus = root.querySelector("#imgBus"), svg = root.querySelector(".routeSvg");
    if (!path || !bus || !svg) return;
    const L = path.getTotalLength(), d = Math.min(1, p / 0.9) * L;
    const m = window.SCENE_META.map, tx = (q) => ({ x: (q.x - m.ox) * m.s, y: (q.y - m.oy) * m.s });
    const a = tx(path.getPointAtLength(d)), b = tx(path.getPointAtLength(Math.min(L, d + 3)));
    const vb = svg.viewBox.baseVal;
    const bw = bus.getBoundingClientRect().width, bh = bus.getBoundingClientRect().height, st = svg.getBoundingClientRect();
    const k = st.width / vb.width;
    bus.style.transform = `translate(${(a.x - vb.x) * k - bw / 2}px, ${(a.y - vb.y) * k - bh * 0.7}px) rotate(${(Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI / 4}deg)`;
  };

  /* ---------- chapters (text lives in data.js) ---------- */
  const ORDER = ["sunway", "library", "map", "keys", "usa", "sg", "life", "proposal", "wedding"];
  const BG = {
    cover: "linear-gradient(#fffdfb,#f4effc)", sunway: "linear-gradient(#fffdfb,#eef3fc)", library: "linear-gradient(#fffdfb,#f6f1fb)",
    map: "linear-gradient(#fffdfb,#eef3fc)", keys: "linear-gradient(#fffdfb,#f5f0fc)", usa: "linear-gradient(#fffdfb,#eaf1fc)",
    sg: "linear-gradient(#fffdfb,#f2eefb)", life: "linear-gradient(#fffdfb,#f9f1f6)", proposal: "linear-gradient(#fffdfb,#fbeef0)", wedding: "linear-gradient(#fffdfb,#f3effc)",
  };

const DEFS = `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>${[["wLav", LAV], ["wBlu", BLU], ["wBlush", BLUSH], ["wSage", "#cfe3d6"], ["wGold", GOLD]].map(([id, c]) => `<radialGradient id="${id}"><stop offset="0" stop-color="${c}" stop-opacity=".85"/><stop offset=".6" stop-color="${c}" stop-opacity=".35"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient>`).join("")}</defs></svg>`;

  /* ---------- transitions between chapters ----------
     One fixed "veil" sits over the story. Around each chapter boundary a number --c rises from 0 to 1 and back, and --t runs 0 to 1.
     Every transition is built only from your artwork: rose/lavender bush panels that part, a wisteria arch you pass through,
     and flocks of doves and butterflies. The next chapter arrives while the veil is at its fullest, so there is no hard cut. */
  const KINDS = ["arch", "bushA", "flock", "bushB", "plane", "bushA", "arch", "bushB", "arch"]; // boundary i = chapter i -> i+1 (0 is cover -> first chapter)
  function rng(seed) { let a = seed; return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  function veilHtml() {
    const r = rng(11);
    const birds = ["dove1", "butterfly1", "butterfly2", "butterfly4", "dove2", "butterfly3", "butterfly5", "dove3", "butterfly6"];
    const flock = Array.from({ length: 16 }, (_, i) => {
      const src = birds[i % birds.length], big = src.indexOf("dove") === 0;
      const w = big ? 54 + r() * 30 : 30 + r() * 26;
      return `<img src="scenes/web/${src}.webp" alt="" style="--x0:${(-30 + r() * 20).toFixed(0)}vw;--y0:${(30 + r() * 70).toFixed(0)}vh;--dx:${(110 + r() * 60).toFixed(0)}vw;--dy:${(-60 - r() * 60).toFixed(0)}vh;--w:${w.toFixed(0)}px;--rot:${(-12 + r() * 24).toFixed(0)}deg;--k:${(0.8 + r() * 0.5).toFixed(2)}">`;
    }).join("");
    return `<div class="veil" id="veil" aria-hidden="true" data-kind="">
      <div class="v-bush a l"><img src="scenes/web/bush_pink_l.webp" alt="" decoding="async"></div><div class="v-bush a r"><img src="scenes/web/bush_pink_r.webp" alt="" decoding="async"></div>
      <div class="v-bush b l"><img src="scenes/web/bush_purple_l.webp" alt="" decoding="async"></div><div class="v-bush b r"><img src="scenes/web/bush_purple_r.webp" alt="" decoding="async"></div>
      <div class="v-fade"></div><div class="v-flock">${flock}</div>
      <div class="v-arch"><img src="scenes/web/arch.webp" alt="" decoding="async"></div>
      <div class="v-plane"><div class="sky"></div>
        <img class="cl c1" src="scenes/web/cloud1.webp" alt=""><img class="cl c2" src="scenes/web/cloud2.webp" alt=""><img class="cl c3" src="scenes/web/cloud3.webp" alt=""><img class="cl c4" src="scenes/web/cloud4.webp" alt="">
        <img class="jet" src="scenes/web/plane.webp" alt="">
        <div class="elev"><span>ELEVATION</span><b id="elev">0 FT</b></div></div></div>`;
  }
  /* ---------- corner foliage ---------- */
  function decoHtml(i, cover) {
    const pink = i % 2 === 0;
    const A = pink ? ["bush_pink_l", "bush_purple_r"] : ["bush_purple_l", "bush_pink_r"];
    const big = cover ? " big" : "";
    return `<div class="deco${big}" aria-hidden="true">
      <div class="d bl" style="transform:translate(calc((1 - ${S(0, 0.2)}) * -35%), calc(var(--p) * -28px))"><img class="sway" src="scenes/web/${A[0]}.webp" alt="" decoding="async" loading="lazy"></div>
      <div class="d tr" style="transform:translate(calc((1 - ${S(0, 0.2)}) * 35%), calc(var(--p) * 26px)) rotate(180deg)"><img class="sway b" src="scenes/web/${A[1]}.webp" alt="" decoding="async" loading="lazy"></div>
      <div class="d lav" style="transform:translateY(calc(var(--p) * -16px))"><img class="sway" src="scenes/web/lavender.webp" alt="" decoding="async" loading="lazy"></div>
      <div class="d blu" style="transform:translateY(calc(var(--p) * -22px))"><img class="sway b" src="scenes/web/bluebell.webp" alt="" decoding="async" loading="lazy"></div>
    </div>`;
  }

  let obs = null, raf = 0, chaps = [], active = new Set(), tops = [], vh = 0, lastY = -1;
  const T = (o, lang) => (o ? o[lang] || o.en : "");

  // If data.js lists an illustration for this chapter (sceneImages.<id>), show it with a slow zoom and drift;
  // otherwise fall back to the drawn SVG scene.
  function sceneHtml(id, cover) {
    if (hasImg(id)) return imgScene(id, cover);
    return `<svg class="scene" viewBox="0 0 360 420" preserveAspectRatio="${cover ? "xMidYMax" : "xMidYMid"} meet" aria-hidden="true">${SCENES[id]()}</svg>`;
  }

  function html(lang) {
    const ch = W.chapters;
    const t = (k) => T(W.storyUi[k], lang);
    const cover = `<section class="chap cover ${hasImg("cover") ? "imgc" : ""}" data-id="cover" style="--bg:${hasImg("cover") ? "#fff" : BG.cover}"><div class="stage">
      ${sceneHtml("cover", true)}${decoHtml(0, true)}
      <div class="cap top"><div class="eyebrow">${t("kicker")}</div><h1>${T(W.couple.names, lang).replace(" & ", " <i>&amp;</i> ")}</h1><p>${t("sub")}</p></div>
      <div class="scrollcue" aria-hidden="true"><span></span>${t("scroll")}</div></div></section>`;
    const body = ORDER.map((id, i) => `<section class="chap ${hasImg(id) ? "imgc" : ""}" data-id="${id}" style="--bg:${hasImg(id) ? "#fff" : BG[id]}"><div class="stage">
      ${sceneHtml(id)}${decoHtml(i + 1)}
      <div class="cap"><div class="num">${i + 1} / ${ORDER.length}</div><h2>${T(ch[i].title, lang)}</h2><p>${T(ch[i].text, lang)}</p>
      ${id === "wedding" ? `<button class="enter" data-act="enter">${t("enter")}</button>` : ""}</div></div></section>`).join("");
    return `${DEFS}${veilHtml()}<div class="story-bar"><div class="bar-fill"></div>
        <div class="bar-ctl"><button data-lang="en" class="${lang === "en" ? "on" : ""}">EN</button><button data-lang="zh" class="${lang === "zh" ? "on" : ""}">中文</button>
        <button class="skip" data-act="enter">${t("skip")}</button></div></div>${cover}${body}`;
  }

  function fitScenes() {
    document.querySelectorAll("#story .scene.img").forEach((sc) => {
      const stack = sc.firstElementChild, ar = +sc.dataset.ar, cw = sc.clientWidth, isCover = !!sc.closest(".cover");
      const avail = isCover ? sc.clientHeight : window.innerHeight * 0.62 - 34, full = avail * ar;
      let w, h;
      if (full > cw) { w = cw; h = cw / ar; } else { w = full; h = avail; }
      stack.style.width = w + "px"; stack.style.height = h + "px";
      if (!isCover) { sc.style.flex = "0 0 " + h + "px"; sc.style.height = h + "px"; }
      const st = sc.closest(".stage");
      st.style.setProperty("--sbb", st.clientHeight - sc.offsetTop - sc.offsetHeight + "px"); // foliage hugs the painting's corners
      st.style.setProperty("--sbt", sc.offsetTop + "px");
    });
  }
  function measure() {
    vh = window.innerHeight;
    fitScenes();
    tops = chaps.map((c) => ({ top: c.offsetTop, h: c.offsetHeight }));
  }
  let veilEl = null, curKind = "";
  function driveVeil(y) {
    if (!veilEl) veilEl = document.getElementById("veil");
    if (!veilEl) return;
    let b = -1, t = 0;
    for (let i = 0; i < chaps.length - 1; i++) {
      const E = tops[i].top + tops[i].h;
      if (y > E - vh && y < E) { b = i; t = (y - (E - vh)) / vh; break; }
    }
    const kind = b >= 0 ? KINDS[b] || "wash" : "";
    if (kind !== curKind) { curKind = kind; veilEl.dataset.kind = kind; }
    if (!kind) return;
    let c = 1 - Math.abs(2 * t - 1);
    c = Math.min(1, c * 1.5);
    c = c * c * (3 - 2 * c); // smoothstep: hold the cover a little longer in the middle
    veilEl.style.setProperty("--c", c.toFixed(3));
    veilEl.style.setProperty("--t", t.toFixed(3));
    if (kind === "plane") { const el = veilEl.querySelector("#elev"); if (el) el.textContent = Math.round(Math.sin(Math.PI * t) * 29400 / 100) * 100 .toLocaleString() ? (Math.round(Math.sin(Math.PI * t) * 294) * 100).toLocaleString("en-US") + " FT" : ""; }
  }
  function frame() {
    raf = 0;
    const y = window.scrollY;
    if (y === lastY) return;
    lastY = y;
    const doc = document.getElementById("story");
    const fill = doc.querySelector(".bar-fill");
    if (fill) fill.style.transform = `scaleX(${Math.min(1, y / Math.max(1, doc.offsetHeight - vh))})`;
    driveVeil(y);
    active.forEach((i) => {
      const c = chaps[i], m = tops[i];
      const p = Math.max(0, Math.min(1, (y - m.top) / Math.max(1, m.h - vh)));
      if (Math.abs(p - (c._p || -1)) > 0.0015) {
        c._p = p;
        c.style.setProperty("--p", p.toFixed(4));
        const hook = hasImg(c.dataset.id) ? HOOKS[c.dataset.id + "_img"] : HOOKS[c.dataset.id];
        if (hook) hook(p, c);
      }
    });
  }
  const onScroll = () => { if (!raf) raf = requestAnimationFrame(frame); };

  function show(lang) {
    const root = document.getElementById("story");
    root.hidden = false;
    root.innerHTML = html(lang);
    chaps = [...root.querySelectorAll(".chap")];
    active = new Set();
    lastY = -1;
    measure();
    if (obs) obs.disconnect();
    obs = new IntersectionObserver((es) => {
      es.forEach((e) => {
        const i = chaps.indexOf(e.target);
        e.target.classList.toggle("on", e.isIntersecting);
        e.isIntersecting ? active.add(i) : active.delete(i);
      });
      lastY = -1;
      onScroll();
    }, { rootMargin: "30% 0px 30% 0px" });
    chaps.forEach((c) => obs.observe(c));
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", () => { measure(); lastY = -1; onScroll(); });
    const at = new URLSearchParams(location.search).get("at"); // debug: ?at=3.5 jumps into chapter 3 at 50%
    if (at !== null) setTimeout(() => { const i = Math.floor(+at), f = +at - i; measure(); window.scrollTo(0, tops[i].top + f * (tops[i].h - vh)); }, 60);
    onScroll();
  }
  function hide() {
    window.removeEventListener("scroll", onScroll);
    veilEl = null; curKind = "";
    if (obs) obs.disconnect();
    const root = document.getElementById("story");
    root.hidden = true;
    root.innerHTML = "";
  }
  window.Story = { show, hide };
})();
