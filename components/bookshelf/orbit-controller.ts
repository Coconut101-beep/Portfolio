import type { OrbitBook } from "@/data/books";
import { createOrbitRenderer, type BookPose } from "./orbit-renderer";

export type OrbitHit = NonNullable<ReturnType<NonNullable<ReturnType<typeof createOrbitRenderer>>["pick"]>>;

type Callbacks = {
  onFront: (index: number, automatic?: boolean) => void;
  onHover: (hit: OrbitHit | null) => void;
  onOpen: (book: OrbitBook) => void;
  onAvailability: (available: boolean) => void;
};

const circle = Math.PI * 2;
const ringSize = 10;
const dragThreshold = 6;
const wrap = (value: number, count: number) => ((value % count) + count) % count;
const alignAngle = (angle: number, reference: number) => angle + Math.round((reference - angle) / circle) * circle;
const unit = (value: number) => Math.min(1, Math.max(0, value));
const easeOut = (t: number) => 1 - (1 - unit(t)) ** 3;
const smooth = (value: number) => {
  const t = unit(value);
  return t * t * (3 - 2 * t);
};
const lerp = (from: number, to: number, t: number) => from + (to - from) * t;

function opacity(depth: number) {
  if (depth < 0.4) return 0.35 * smooth((depth - 0.2) / 0.2);
  if (depth < 0.65) return 0.35 + 0.5 * smooth((depth - 0.4) / 0.25);
  return 0.85 + 0.15 * smooth((depth - 0.65) / 0.35);
}

function ringPoses(books: OrbitBook[], position: number) {
  const count = books.length;
  if (!count) return [];
  const step = circle / Math.min(count, ringSize);
  const first = count <= ringSize ? 0 : Math.round(position) - ringSize / 2;
  return Array.from({ length: Math.min(count, ringSize + 1) }, (_, slot) => {
    const index = first + slot;
    const angle = alignAngle((index - position) * step, 0);
    return { book: books[wrap(index, count)], angle };
  });
}

function poseAt(book: OrbitBook, angle: number, presence: number, highlight: number): BookPose {
  const depth = (1 + Math.cos(angle)) / 2;
  return {
    book,
    angle,
    depth,
    opacity: lerp(opacity(depth), 1, highlight) * presence,
    scale: lerp(0.72, 1.08, depth) * lerp(0.85, 1, presence) * lerp(1, 1.05, highlight),
    highlight,
  };
}

export function mountOrbit(canvas: HTMLCanvasElement, initial: OrbitBook[], callbacks: Callbacks) {
  const style = getComputedStyle(canvas);
  const timing = (name: string) => {
    const value = style.getPropertyValue("--orbit-" + name).trim();
    return parseFloat(value) * (value.endsWith("ms") ? 1 : 1000);
  };
  const durations = {
    settle: timing("settle"),
    lap: timing("lap"),
    exit: timing("depth-fade"),
    entry: timing("enter"),
    reflow: timing("reflow"),
    hover: timing("hover"),
  };
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let books = initial;
  let current = 0;
  let target = 0;
  let rotation: { from: number; start: number } | null = null;
  let filtering: { from: Map<string, BookPose>; start: number } | null = null;
  let poses: BookPose[] = [];
  let frame = 0;
  let hover: OrbitHit | null = null;
  let hoverTimer = 0;
  let highlightId: string | undefined;
  let highlight = 0;
  let lastFrame = 0;
  let lastWheel = 0;
  let lastStep = -Infinity;
  let wheelSum = 0;
  let visible = false;
  let autoPaused = false;
  let lastAutoFrame: number | null = null;
  let hoverPosition: { x: number; y: number } | null = null;
  let pointer: { id: number; x: number; y: number; start: number; drag: boolean; cancelClick: boolean } | null = null;
  let renderer = createOrbitRenderer(canvas, requestFrame);
  callbacks.onAvailability(Boolean(renderer));

  function requestFrame() {
    if (!frame) frame = requestAnimationFrame(draw);
  }

  function canRotateAutomatically() {
    return Boolean(
      renderer && visible && !document.hidden && !reducedMotion.matches && books.length
      && !autoPaused && !pointer && !hover && !rotation && !filtering,
    );
  }

  function draw(now: number) {
    frame = 0;
    const reduce = reducedMotion.matches;
    if (canRotateAutomatically() && lastAutoFrame !== null) {
      const elapsed = Math.min(64, Math.max(0, now - lastAutoFrame));
      // Increasing position moves the front book left, clockwise when viewed from above.
      current += elapsed * Math.min(books.length, ringSize) / durations.lap;
      const nearest = Math.round(current);
      if (nearest !== target) {
        target = nearest;
        callbacks.onFront(wrap(nearest, books.length), true);
      }
    }
    if (rotation) {
      const progress = reduce ? 1 : (now - rotation.start) / durations.settle;
      current = lerp(rotation.from, target, easeOut(progress));
      if (progress >= 1) rotation = null;
    }
    const desiredHighlight = hover?.book.id;
    if (desiredHighlight && desiredHighlight !== highlightId) {
      highlightId = desiredHighlight;
      highlight = 0;
    }
    const highlightTarget = desiredHighlight ? 1 : 0;
    const delta = reduce ? 1 : Math.max(0, Math.min(32, now - lastFrame)) / durations.hover;
    highlight += Math.sign(highlightTarget - highlight) * Math.min(Math.abs(highlightTarget - highlight), delta);
    lastFrame = now;

    const elapsed = filtering && !reduce ? Math.max(0, now - filtering.start) : Infinity;
    const remaining = ringPoses(books, current);
    poses = remaining.map(({ book, angle }) => {
      const before = filtering?.from.get(book.id);
      const point = before ? lerp(before.angle, alignAngle(angle, before.angle), smooth(elapsed / durations.reflow)) : angle;
      const presence = before || !filtering ? 1 : smooth(elapsed / durations.entry);
      const next = poseAt(book, point, presence, book.id === highlightId ? highlight : 0);
      if (before) {
        const original = poseAt(book, before.angle, 1, 0);
        const fade = 1 - smooth(elapsed / durations.reflow);
        next.opacity = unit(next.opacity + (before.opacity - original.opacity) * fade);
        next.scale += (before.scale - original.scale) * fade;
      }
      return next;
    });
    if (filtering) {
      const activeIds = new Set(remaining.map(({ book }) => book.id));
      const exiting = 1 - smooth(elapsed / durations.exit);
      if (exiting > 0) {
        for (const [id, before] of filtering.from) {
          if (activeIds.has(id)) continue;
          poses.push({ ...before, opacity: before.opacity * exiting, scale: before.scale * lerp(0.85, 1, exiting) });
        }
      }
      if (elapsed >= Math.max(durations.reflow, durations.entry, durations.exit)) filtering = null;
    }
    renderer?.render(poses);
    updateHover();
    lastAutoFrame = canRotateAutomatically() ? now : null;
    if (lastAutoFrame !== null || rotation || filtering || highlight !== highlightTarget) requestFrame();
  }

  function dismissPreview() {
    window.clearTimeout(hoverTimer);
    callbacks.onHover(null);
  }

  function clearHover() {
    if (!hover) return;
    dismissPreview();
    hover = null;
    canvas.removeAttribute("data-hover");
    requestFrame();
  }

  function clearPointerHover() {
    hoverPosition = null;
    clearHover();
  }

  function updateHover() {
    if (!hoverPosition || pointer || rotation || filtering) return;
    const hit = renderer?.pick(hoverPosition.x, hoverPosition.y) ?? null;
    if (hit?.book.id === hover?.book.id) return;
    clearHover();
    if (!hit) return;
    hover = hit;
    canvas.setAttribute("data-hover", "");
    hoverTimer = window.setTimeout(() => callbacks.onHover(hit), reducedMotion.matches ? 0 : durations.hover);
    requestFrame();
  }

  function setAutoPaused(paused: boolean) {
    autoPaused = paused;
    lastAutoFrame = null;
    requestFrame();
  }

  function goTo(position: number) {
    if (!books.length) return;
    clearHover();
    target = position;
    rotation = { from: current, start: performance.now() };
    callbacks.onFront(wrap(position, books.length));
    requestFrame();
  }

  function step(direction: number) {
    if (books.length < 2 || pointer?.drag) return;
    goTo(target + direction);
  }

  function setBooks(next: OrbitBook[]) {
    clearHover();
    const ids = new Set(next.map((book) => book.id));
    let closest: OrbitBook | undefined;
    let distance = Infinity;
    for (const [index, book] of books.entries()) {
      if (!ids.has(book.id)) continue;
      const rest = index + Math.round((current - index) / books.length) * books.length;
      const travel = Math.abs(rest - current);
      if (travel < distance) {
        closest = book;
        distance = travel;
      }
    }
    filtering = { from: new Map(poses.map((pose) => [pose.book.id, pose])), start: performance.now() };
    books = next;
    current = target = Math.max(0, books.findIndex((book) => book.id === closest?.id));
    rotation = null;
    pointer = null;
    canvas.removeAttribute("data-drag");
    callbacks.onFront(current);
    requestFrame();
  }

  function wheel(event: WheelEvent) {
    if (event.ctrlKey || books.length < 2 || pointer) return;
    event.preventDefault();
    const now = performance.now();
    const raw = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    if (now - lastWheel > 115) wheelSum = 0;
    lastWheel = now;
    wheelSum += raw * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? 100 : 1);
    if (Math.abs(wheelSum) < 32 || now - lastStep < 115) return;
    step(Math.sign(wheelSum));
    lastStep = now;
    wheelSum = 0;
  }

  function down(event: PointerEvent) {
    if (!event.isPrimary || event.button !== 0) return;
    pointer = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      start: current,
      drag: false,
      cancelClick: false,
    };
    lastAutoFrame = null;
  }

  function move(event: PointerEvent) {
    if (event.pointerType !== "touch") hoverPosition = { x: event.clientX, y: event.clientY };
    if (pointer?.id === event.pointerId) {
      const dx = event.clientX - pointer.x;
      const dy = event.clientY - pointer.y;
      if (Math.hypot(dx, dy) > dragThreshold) pointer.cancelClick = true;
      if (!pointer.drag && books.length > 1 && Math.abs(dx) > dragThreshold && Math.abs(dx) > Math.abs(dy)) {
        pointer.drag = true;
        pointer.start = current;
        rotation = null;
        filtering = null;
        clearHover();
        canvas.setPointerCapture(event.pointerId);
        canvas.setAttribute("data-drag", "");
      }
      if (pointer.drag) {
        const travel = Math.max(65, canvas.clientWidth / 4.5);
        current = pointer.start - dx / travel;
        requestFrame();
      }
      return;
    }
    if (event.pointerType === "touch") return;
    updateHover();
    requestFrame();
  }

  function finish(event: PointerEvent) {
    if (pointer?.id !== event.pointerId) return;
    const interaction = pointer;
    pointer = null;
    canvas.removeAttribute("data-drag");
    if (interaction.drag) {
      goTo(Math.round(current));
    } else if (!interaction.cancelClick && event.type === "pointerup") {
      const hit = renderer?.pick(event.clientX, event.clientY);
      if (hit) {
        clearPointerHover();
        callbacks.onOpen(hit.book);
      }
    }
    requestFrame();
  }

  function leave() {
    clearPointerHover();
    if (!pointer?.drag) pointer = null;
    requestFrame();
  }

  function resize() {
    renderer?.resize();
    clearPointerHover();
    requestFrame();
  }

  function contextLost(event: Event) {
    event.preventDefault();
    renderer?.dispose();
    renderer = null;
    clearHover();
    callbacks.onAvailability(false);
  }

  function contextRestored() {
    renderer = createOrbitRenderer(canvas, requestFrame);
    callbacks.onAvailability(Boolean(renderer));
    resize();
  }

  const observer = new ResizeObserver(resize);
  observer.observe(canvas);
  const visibility = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    lastAutoFrame = null;
    requestFrame();
  });
  visibility.observe(canvas);
  resize();
  canvas.addEventListener("wheel", wheel, { passive: false });
  canvas.addEventListener("pointerdown", down);
  canvas.addEventListener("pointermove", move);
  canvas.addEventListener("pointerup", finish);
  canvas.addEventListener("pointercancel", finish);
  canvas.addEventListener("lostpointercapture", finish);
  canvas.addEventListener("pointerleave", leave);
  canvas.addEventListener("webglcontextlost", contextLost);
  canvas.addEventListener("webglcontextrestored", contextRestored);
  reducedMotion.addEventListener("change", requestFrame);
  document.addEventListener("visibilitychange", requestFrame);

  function dispose() {
    observer.disconnect();
    visibility.disconnect();
    reducedMotion.removeEventListener("change", requestFrame);
    document.removeEventListener("visibilitychange", requestFrame);
    canvas.removeEventListener("wheel", wheel);
    canvas.removeEventListener("pointerdown", down);
    canvas.removeEventListener("pointermove", move);
    canvas.removeEventListener("pointerup", finish);
    canvas.removeEventListener("pointercancel", finish);
    canvas.removeEventListener("lostpointercapture", finish);
    canvas.removeEventListener("pointerleave", leave);
    canvas.removeEventListener("webglcontextlost", contextLost);
    canvas.removeEventListener("webglcontextrestored", contextRestored);
    window.clearTimeout(hoverTimer);
    cancelAnimationFrame(frame);
    renderer?.dispose();
  }

  return { step, setBooks, clearHover: clearPointerHover, dismissPreview, setAutoPaused, dispose };
}
