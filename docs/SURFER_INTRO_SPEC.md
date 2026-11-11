# Surfer Intro: Master Spec (for Cursor agents)

> One file, three parts: **the rules**, **the phases**, **the reference code**.
> Agent: read this whole file before doing anything. Then do **only** the phase you are told to do, and STOP at the end of it.

---

## 0. How the human drives this (Aditya, read this part)

1. Add this file to the project as `docs/SURFER_INTRO_SPEC.md` (or paste it into project docs).
2. Attach `reference-frames.png` (3 moments of the approved idea) to your first message.
3. Send these short messages, one at a time, and wait for Cursor agents's report after each:

| Step | Message to send |
|---|---|
| 1 | `Read docs/SURFER_INTRO_SPEC.md completely. Do Phase 0 only, then stop.` |
| 2 | `go. Do Phase 1 only, then stop.` |
| 3 | `go. Do Phase 2 only, then stop.` |
| 4 | `go. Do Phase 3 only, then stop.` |

If a result is off, jump to **Section 6 (Fix-it messages)**.

---

## 1. Rules for Cursor agents (binding)

- This file is the single source of truth. If your own idea conflicts with it, follow the file.
- Work **phase by phase**. At the end of each phase: list the files you changed, report the acceptance checks as pass or fail, then **STOP and wait for "go"**.
- If something in this spec conflicts with the existing code, do not improvise. Tell the human and wait.
- Never "simplify", "modernise" or "improve" the maths in the reference component (Appendix A).

---

## 2. Guardrails

### 2.1 Scope
Only the homepage intro animation.
Do NOT change homepage content, layout, copy, routes, fonts or colour tokens.
Do NOT add dependencies.
Do NOT edit files unrelated to the intro.

### 2.2 What the intro is (the one thing to get right)
A full-screen overlay of wavy stripes (the site's existing palette) covers the homepage.
A big, **still** image of the surfer girl travels in **one straight line from the TOP-RIGHT corner of the viewport to the BOTTOM-LEFT corner**.
The stripes part like water along that line:

- The opening starts as a **rounded tip right under her board** and widens behind her into a **triangle**.
- Every stripe is pushed away from the cut to **both sides** and bends smoothly. A thin cream foam line follows the fresh edge.
- The real homepage is visible **through** the opening.
- When the paper is fully gone, the overlay unmounts.

### 2.3 Forbidden approaches (the common wrong guesses)
- **NO** growing circle / iris / radial mask / clip-path circle.
- **NO** slicing the screen into rectangular strips or blocks. Edges must be smooth curves.
- **NO** character movement: the surfer image is NOT rotated, flipped over time, bobbed, scaled or animated. It only translates along the diagonal.
- **NO** horizontal or vertical travel. The path is the viewport diagonal (corner to corner), at any screen size.
- **NO** redrawing or replacing the surfer image. Use the provided asset as is.
- **NO** new colours. Use the existing palette tokens only.

### 2.4 Implementation rules
- Use the `SurferIntro` canvas component from **Appendix A** exactly as given.
- The canvas is `position: fixed; inset: 0`, above the homepage. The existing "Skip intro" button must sit above it and call `onDone`.
- Respect `prefers-reduced-motion` (skip straight to the homepage).
- Must work on desktop and phone sizes, and recompute on resize.
- Keep the old intro code in place until the human approves deleting it (Phase 3).

---

## 3. The effect in plain words

```
 top-right corner
        ● ← she starts just off-screen here
         \
          \     stripes on this side are pushed up-left, bending smoothly
           \
            ◉ ← HER BOARD. The opening's rounded tip is exactly here.
           / \
          /   \      the opening widens behind her (a triangle)
         /     \     and the homepage shows through it
        /       \
       ●         → she exits at the bottom-left corner
 bottom-left corner
        stripes on this side are pushed down-right
```

Timeline (seconds, same on every screen size):

| Time | What happens |
|---|---|
| 0.0 – 0.6 | Full-screen stripes, gently waving. Nothing else. |
| 0.6 | She enters at the top-right corner. |
| 0.6 – 3.4 | She glides along the diagonal. The opening appears under her board and widens behind her. |
| 3.4 | She leaves at the bottom-left corner. |
| ~5.0 | The stripes are fully gone. Overlay unmounts. Homepage is all that is left. |

Her size: about 40% of the shorter screen side (so she is clearly big, not tiny).

---

## 4. Phases

### Phase 0: Read-only check (NO code changes)

Steps:
1. Read this file completely and look at the attached `reference-frames.png`.
2. Inspect the project and report:
   1. Which file(s) contain the current intro, and how the circle opening is done.
   2. Where the surfer image is imported (path, pixel size) and which direction she faces (left or right).
   3. Where the stripe colours / palette are defined (token names or hex values).
   4. Where the "Skip intro" button lives and what it calls.
   5. How the homepage mounts relative to the intro.
3. Explain the new intro back in 5 lines, in your own words: the path, where the opening starts, its shape, what the stripes do, what the surfer does.

Acceptance: report only. Zero files changed.

**STOP. Wait for "go".**

---

### Phase 1: Add the component and wire it in

Steps:
1. Create `src/components/SurferIntro.tsx` with **exactly** the code in **Appendix A**.
2. Render it above the homepage while the intro is not done:
   ```tsx
   {!introDone && (
     <SurferIntro surferSrc={/* the existing surfer image import */} onDone={() => setIntroDone(true)} />
   )}
   ```
3. Stop rendering the old circle intro. **Do not delete its file yet.**

Acceptance criteria:
- Build passes, no console errors.
- The overlay covers the full screen at the start. The homepage is visible through the opening as it widens.
- The surfer travels in a straight line from the **top-right corner to the bottom-left corner**, is clearly big, and does not rotate or animate.
- The opening starts **right under her board** and widens behind her as a triangle.
- No circle anywhere. No rectangular blocks or strips.

**STOP. List the files you changed. Wait for "go".**

---

### Phase 2: Fit it to the real assets

Only adjust the items below.

1. **Colours:** replace the `PALETTE` hex array and `FOAM` in `SurferIntro.tsx` with the project's existing palette tokens. Keep the same 5 colours in the same order (red, mustard, teal, sage, pink) and the cream for `FOAM`. Add no new colours.
2. **Surfer image:** use the existing image, unmodified. She travels toward the bottom-left, so she must face **left**.
   - If the image faces right: `flipX = true` (the default).
   - If it already faces left: `flipX = false`.
   - Tune the `FEET` constant so her feet/board sit exactly on the tip of the opening (the point where the stripes first part).
3. **Skip intro:** keep the existing button. Give it a higher z-index than the canvas (`z-index: 60`) and make it call `onDone`.
4. The homepage must be fully rendered and visible underneath from the start. Do not hide, fade or delay it. It is revealed only through the opening.

Acceptance criteria:
- Her feet/board sit at the tip of the opening at every moment. The tip never trails behind her or runs ahead of her.
- She faces the direction she travels.
- Colours match the site exactly. Skip intro works.

**STOP. Report what changed. Wait for "go".**

---

### Phase 3: Verify and clean up

Verify, and fix only what fails:
1. Viewports: 1920x1080, 1440x900, 768x1024 (portrait), 390x844 (phone). At every size the path is the corner-to-corner diagonal (top-right to bottom-left), she is big, and the whole screen is cleared by the end.
2. Resize the window during the intro: nothing breaks.
3. `prefers-reduced-motion`: the intro is skipped.
4. After the intro ends: the overlay is gone, the page scrolls normally, no console errors.
5. The intro plays once per page load, exactly like the old intro did.

Then delete the old circle intro code and any now-unused imports and assets. Touch nothing else.

Report each check as pass or fail.

**STOP when done.**

---

## 5. Tuning knobs (in `SurferIntro.tsx`)

| Constant | What it does |
|---|---|
| `T_START`, `T_END` | When she enters and leaves (seconds). Increase `T_END` to make it slower. |
| `FEET` | Fraction of the image height where her feet/board are. Raise it if she floats above the tip, lower it if she sinks into it. |
| `flipX` (prop) | Mirror the image so she faces the direction she travels (left). |
| `0.4` in `const h = clamp(Math.min(W, H) * 0.4, 180, 400)` | Her size. |
| `PALETTE`, `FOAM` | Colours. Must come from the site's tokens. |

---

## 6. Fix-it messages (send the one that matches the problem)

- **It built a circle or a mask:**
  `Remove the circle/mask. Use only the SurferIntro canvas from Appendix A of docs/SURFER_INTRO_SPEC.md, unchanged. Re-read Section 2.3 (Forbidden approaches).`
- **Blocky or sliced edges:**
  `The edges must be smooth curves. Restore SurferIntro.tsx exactly as in Appendix A; do not replace it with clip-path strips or CSS.`
- **The surfer moves, rotates or bobs:**
  `She must be completely still. Only her position along the diagonal changes. Remove any rotation, bobbing or flip.`
- **The opening does not start under her:**
  `Tune FEET only. Do not change the geometry or timing.`
- **The path is horizontal or vertical:**
  `The path is the viewport diagonal, from the top-right corner to the bottom-left corner, at every screen size. Restore the geometry from Appendix A.`
- **Homepage hidden or fading in separately:**
  `The homepage must be fully visible underneath from the start. It is revealed only through the opening. Remove any extra fade or hide.`

---

## Appendix A: Reference component (use EXACTLY as given)

File: `src/components/SurferIntro.tsx`

```tsx
import { useEffect, useRef } from "react";

/**
 * Corner-to-corner surfer intro.
 * A full-screen <canvas> overlay draws the striped "paper" and the surfer.
 * The real homepage is rendered UNDERNEATH and is revealed through the opening
 * (the canvas is transparent wherever the paper has parted).
 */
const PALETTE = ["#c0675d", "#e9cc82", "#5b9096", "#a9c0a8", "#dca08f"]; // replace with the project's existing colour tokens, same order
const FOAM = "#f7ecd0";   // cream edge / foam (use the project's cream)
const T_START = 0.6;      // seconds: surfer enters the screen
const T_END = 3.4;        // seconds: surfer leaves the screen
const FEET = 0.92;        // fraction of the surfer image height where her feet/board sit (tune to the real image)

const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const easeInOutQ = (x: number) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);

type Props = { surferSrc: string; flipX?: boolean; onDone: () => void };

export default function SurferIntro({ surferSrc, flipX = true, onDone }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { onDone(); return; }
    const cv = ref.current!;
    const ctx = cv.getContext("2d")!;
    const img = new Image();
    document.body.style.overflow = "hidden";

    // geometry in CSS px, recomputed on resize. The "frame" has its origin at the TOP-RIGHT corner,
    // u runs along the diagonal to the BOTTOM-LEFT corner, v is perpendicular to it.
    let W = 0, H = 0, L = 1, S = 1, TH = 0, COS = 1, SIN = 0, TB = 26, NS = 0, JN = 0, maxD = 0, dpr = 1;
    let UA = new Float32Array(0), TP = new Float32Array(0);
    let OFF: Float32Array[] = [];
    let EDG: Float32Array[][] = [];
    let raf = 0, t0 = 0, finished = false;

    const surferU = (t: number) => {
      const s = clamp((t - T_START) / (T_END - T_START));
      return -170 * S + (L + 340 * S) * (0.5 * s + 0.5 * easeInOutQ(s));
    };
    // time at which the surfer passes position u on the diagonal
    const tPass = (u: number) => {
      let lo = 0, hi = T_END + 1;
      for (let i = 0; i < 40; i++) { const m = (lo + hi) / 2; if (surferU(m) >= u) hi = m; else lo = m; }
      return hi;
    };
    const toScreen = (u: number, v: number) => [W + COS * u - SIN * v, SIN * u + COS * v];
    // stripes stay calm right at the cut and swell more the further away they are
    const warp = (u: number, o: number, sg: number, c: number) => {
      const e = Math.min(1, o / (280 * S)), k = e * e * (3 - 2 * e);
      return S * k * (
        20 * Math.sin(u / (240 * S) - c * 0.45 + (sg * o) / (190 * S)) +
        9 * Math.sin(u / (105 * S) + c * 0.7 - (sg * o) / (120 * S)) +
        4 * Math.sin(u / (48 * S) - c * 1.1 + o / (70 * S)));
    };

    const setup = () => {
      W = window.innerWidth; H = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      L = Math.hypot(W, H); S = L / 1469;
      TH = Math.atan2(H, -W); COS = Math.cos(TH); SIN = Math.sin(TH);
      TB = 26 * S; maxD = (W * H) / L;               // maxD = distance from the diagonal to the far corners
      const DU = 14 * S, U0 = -90 * S, U1 = L + 90 * S;
      NS = Math.ceil((U1 - U0) / DU) + 1;
      UA = Float32Array.from({ length: NS }, (_, i) => U0 + i * DU);
      TP = Float32Array.from(UA, (u) => tPass(u));
      OFF = [new Float32Array(NS), new Float32Array(NS)];
      JN = Math.ceil((maxD + 120 * S) / TB) + 1;
      EDG = [0, 1].map(() => Array.from({ length: JN + 1 }, () => new Float32Array(NS)));
    };

    const finish = () => { finished = true; document.body.style.overflow = ""; onDone(); };

    const frame = (now: number) => {
      if (finished) return;
      const t = (now - t0) / 1000;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      // 1) width of the opening at every point along the diagonal.
      //    Rounded bow right under the board, then a triangle that widens; the edges ripple a little.
      let minOff = 1e9, n = 0;
      for (let i = 0; i < NS; i++) {
        const age = t - TP[i];
        const w = age > 0 ? (34 * Math.sqrt(age) + 130 * age + 380 * age * age) * S : 0;
        const env = Math.min(1, w / (70 * S)), u = UA[i] / S;
        OFF[0][i] = w > 0 ? w + env * S * (9 * Math.sin(u / 70 - t * 4.2) + 4 * Math.sin(u / 29 - t * 6.5 + 1)) : 0;
        OFF[1][i] = w > 0 ? w + env * S * (9 * Math.sin(u / 66 - t * 4.6 + 2) + 4 * Math.sin(u / 31 - t * 6 + 3)) : 0;
        minOff = Math.min(minOff, OFF[0][i], OFF[1][i]);
        if (w > 1.5) n = i + 1;
      }
      // 2) every stripe edge = (its original distance from the cut) pushed away by the opening width + a gentle warp
      const SG = [-1, 1];
      for (let s = 0; s < 2; s++) for (let j = 0; j <= JN; j++) {
        const o = j * TB, E = EDG[s][j];
        for (let i = 0; i < NS; i++) E[i] = SG[s] * (o + OFF[s][i]) + warp(UA[i], o, SG[s], t);
      }

      ctx.save();
      ctx.translate(W, 0); ctx.rotate(TH);
      ctx.lineCap = "round"; ctx.lineJoin = "round";
      const run = (E: Float32Array, a: number, b: number, dv = 0) => {
        ctx.beginPath();
        for (let i = a; i <= b; i++) (i === a ? ctx.moveTo(UA[i], E[i] + dv) : ctx.lineTo(UA[i], E[i] + dv));
        ctx.stroke();
      };
      // soft shadow where the paper edge lifts off the page
      if (n > 2) {
        [[40, 0.05], [28, 0.06], [16, 0.08]].forEach(([lw, a]) => {
          ctx.strokeStyle = `rgba(60,38,28,${a})`; ctx.lineWidth = lw * S;
          for (let s = 0; s < 2; s++) run(EDG[s][0], 0, n - 1, SG[s] * lw * S * 0.18);
        });
      }
      // stripes
      for (let s = 0; s < 2; s++) {
        for (let j = 0; j < JN; j++) {
          if (j * TB + minOff > maxD + 120 * S) break;
          ctx.fillStyle = PALETTE[(((SG[s] < 0 ? -1 - j : j) % 5) + 5) % 5];
          const A = EDG[s][j], B = EDG[s][j + 1];
          ctx.beginPath();
          for (let i = 0; i < NS; i++) (i ? ctx.lineTo(UA[i], A[i]) : ctx.moveTo(UA[i], A[i]));
          for (let i = NS - 1; i >= 0; i--) ctx.lineTo(UA[i], B[i] + SG[s] * 0.9);
          ctx.closePath(); ctx.fill();
        }
      }
      // foam along the fresh edge, fading with age
      if (n > 2) {
        ctx.strokeStyle = FOAM;
        [[0, 0.5, 0.4], [0.5, 1.1, 0.22], [1.1, 1.9, 0.1]].forEach(([a0, a1, al]) => {
          let i0 = -1, i1 = -1;
          for (let i = 0; i < NS; i++) { const age = t - TP[i]; if (age >= a0 && age < a1) { if (i0 < 0) i0 = i; i1 = i; } }
          if (i0 < 0) return;
          ctx.globalAlpha = al; ctx.lineWidth = 26 * S;
          for (let s = 0; s < 2; s++) run(EDG[s][0], Math.max(0, i0 - 1), Math.min(NS - 1, i1 + 1));
        });
        ctx.globalAlpha = 1; ctx.lineWidth = 5 * S;
        for (let s = 0; s < 2; s++) run(EDG[s][0], 0, n - 1);
      }
      ctx.restore();

      // 3) the surfer: big, upright, STILL (no rotation, no flips, no bobbing). Her feet/board sit on the tip of the opening.
      const su = surferU(t);
      if (img.complete && img.naturalWidth && su > -200 * S && su < L + 200 * S) {
        const [x, y] = toScreen(su, 0);
        const h = clamp(Math.min(W, H) * 0.4, 180, 400), w = (h * img.naturalWidth) / img.naturalHeight;
        ctx.save(); ctx.translate(x, y); if (flipX) ctx.scale(-1, 1);
        ctx.drawImage(img, -w / 2, -h * FEET, w, h);
        ctx.restore();
      }

      if (minOff > maxD + 60 * S || t > T_END + 5) return finish();
      raf = requestAnimationFrame(frame);
    };

    setup();
    window.addEventListener("resize", setup);
    const start = () => { t0 = performance.now(); raf = requestAnimationFrame(frame); };
    img.onload = start; img.onerror = start; img.src = surferSrc;

    return () => {
      finished = true; cancelAnimationFrame(raf);
      window.removeEventListener("resize", setup);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <canvas ref={ref} aria-hidden="true" style={{ position: "fixed", inset: 0, width: "100vw", height: "100vh", zIndex: 50 }} />;
}
```

How the maths works (for understanding only, do not rewrite it):
- The screen is split along the diagonal into two sides. Each side is a stack of wavy stripe bands.
- For every point along the diagonal, the opening width `w` grows with the time since she passed that point: `34·√age + 130·age + 380·age²` (scaled to the screen). The √ term gives the rounded tip under her board. The rest widens it into a triangle.
- Every stripe edge is its original distance from the cut **plus** `w`, so the stripes are pushed away from the cut and bend around the opening.
- A small multi-wave `warp` makes stripes swell naturally the further they are from the cut. It is zero at the cut, so the tip stays clean and straight under her.
- The canvas is cleared every frame, and only stripes are painted, so the homepage shows through wherever the paper has parted.
