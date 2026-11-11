"use client";

import { useEffect, useRef } from "react";
import { LEFT_SVG, RIGHT_SVG } from "./art";

type State = "walking" | "waving" | "idle" | "static";

const SPEED = 70; // px per second
const WAVE_MS = 2400;
// Rest after a wave before strolling on: a short random beat, shorter after a cursor wave
const REST_MS = [400, 1000];
const REST_AFTER_CURSOR_MS = 400;
const EDGE = 16;

// The bagel boys stroll along the bottom of the screen, stop, wave (the right one waves, the
// left one raises his coffee) and stroll on. The strip is sticky at the bottom of the
// viewport and parks on the top edge of the footer (see .bagel-boys in globals.css).
// Moving the cursor near them makes them stop and wave. Decorative: hidden from assistive
// tech, clicks pass through, and under prefers-reduced-motion they stand still.
export default function BagelBoys() {
  const root = useRef<HTMLDivElement>(null);
  const pair = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    const p = pair.current;
    if (!el || !p) return;
    const setState = (s: State) => (el.dataset.state = s);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setState("static");
      return;
    }

    let x = -p.offsetWidth; // start just off the left edge
    let target = EDGE;
    let move: Animation | null = null;
    let timer = 0;
    let lastWave = 0;

    const bounds = () => [EDGE, Math.max(EDGE, el.clientWidth - p.offsetWidth - EDGE)];
    const place = () => (p.style.transform = `translate3d(${x}px,0,0)`);

    // Freeze the pair where it is mid-stroll
    const halt = () => {
      if (!move) return;
      x = new DOMMatrixReadOnly(getComputedStyle(p).transform).m41;
      move.cancel();
      move = null;
      place();
    };

    const walk = () => {
      const [a, b] = bounds();
      // Pick a stop a proper stroll away: 160px, or half the room on narrow screens
      const minTrip = Math.min(160, (b - a) / 2);
      let t = a + Math.random() * (b - a);
      for (let i = 0; i < 12 && Math.abs(t - x) < minTrip; i++) t = a + Math.random() * (b - a);
      if (Math.abs(t - x) < minTrip) t = x - a > b - x ? a : b; // fall back to the far edge
      target = t;
      el.dataset.dir = target > x ? "right" : "left";
      setState("walking");
      // The stroll itself runs as a Web Animation, off the main thread
      move = p.animate(
        [{ transform: `translate3d(${x}px,0,0)` }, { transform: `translate3d(${target}px,0,0)` }],
        { duration: (Math.abs(target - x) / SPEED) * 1000, easing: "linear", fill: "forwards" },
      );
      move.onfinish = () => {
        x = target;
        move?.cancel();
        move = null;
        place();
        arrive();
      };
    };

    const wave = (pause: number) => {
      halt();
      setState("waving");
      lastWave = performance.now();
      timer = window.setTimeout(() => {
        setState("idle");
        timer = window.setTimeout(walk, pause);
      }, WAVE_MS);
    };

    const arrive = () => wave(REST_MS[0] + Math.random() * (REST_MS[1] - REST_MS[0]));

    // Cursor close by: stop and wave, at most every 8 seconds
    const onMove = (e: MouseEvent) => {
      if (el.dataset.state !== "walking" || performance.now() - lastWave < 8000) return;
      const r = p.getBoundingClientRect();
      if (e.clientX > r.left - 100 && e.clientX < r.right + 100 && e.clientY > r.top - 100 && e.clientY < r.bottom + 40) {
        wave(REST_AFTER_CURSOR_MS);
      }
    };

    // Stop while the tab is hidden; pick up again when it returns
    const onVisibility = () => {
      clearTimeout(timer);
      halt();
      el.dataset.paused = String(document.hidden);
      if (document.hidden) setState("idle");
      else timer = window.setTimeout(walk, 600);
    };

    // Keep them on screen when the window narrows (without pulling them in from off-screen)
    const onResize = () => {
      const [, b] = bounds();
      if (target > b) {
        halt();
        clearTimeout(timer);
        x = Math.min(x, b);
        place();
        setState("idle");
        timer = window.setTimeout(walk, 300);
      }
    };

    place();
    timer = window.setTimeout(walk, 1200);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      move?.cancel();
      clearTimeout(timer);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div ref={root} className="bagel-boys" aria-hidden="true" data-state="idle">
      <div ref={pair} className="bagel-boys-pair">
        <div className="bagel-boy bagel-boy--left" dangerouslySetInnerHTML={{ __html: LEFT_SVG }} />
        <div className="bagel-boy bagel-boy--right" dangerouslySetInnerHTML={{ __html: RIGHT_SVG }} />
      </div>
    </div>
  );
}
