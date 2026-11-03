"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Specimen } from "@/lib/content";

// The line-up: cut-out sandwiches and bagels on a shallow arc. Native horizontal scroll with
// centre snapping; each item's scale and opacity follow its distance from the centre.
// Swipe, drag, click a sibling, or use the arrow keys. It also advances every 10 seconds,
// pausing while hovered, focused or hidden, and never under prefers-reduced-motion.
export default function HeroLineup({ items }: { items: Specimen[] }) {
  const rowRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [current, setCurrent] = useState(2);
  // Where a key or click is taking the row; cleared once the reader swipes
  const target = useRef<number | null>(null);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [touched, setTouched] = useState(0);

  const layout = useCallback(() => {
    const row = rowRef.current;
    if (!row) return;
    const centre = row.scrollLeft + row.clientWidth / 2;
    // Centre boost: 20% on phones; on desktop a further 25% on top (1.2 × 1.25 = 1.5)
    const boost = window.matchMedia("(min-width: 768px)").matches ? 0.5 : 0.2;
    let nearest = 0;
    let best = Infinity;
    itemRefs.current.forEach((li, i) => {
      if (!li) return;
      const mid = li.offsetLeft + li.offsetWidth / 2;
      const d = (mid - centre) / li.offsetWidth;
      const a = Math.min(Math.abs(d), 3);
      // The boost fades out by the next position
      li.style.setProperty("--s", String((1 - a * 0.22) * (1 + boost * Math.max(0, 1 - a))));
      li.style.setProperty("--o", String(1 - a * 0.22));
      li.style.setProperty("--y", `${a * 18 * (i % 2 ? 1 : -0.6)}px`);
      if (Math.abs(d) < best) {
        best = Math.abs(d);
        nearest = i;
      }
    });
    if (target.current !== null) {
      if (nearest !== target.current) return;
      target.current = null;
    }
    setCurrent(nearest);
  }, []);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(layout);
    };
    // Open on the third item so siblings stand on both sides of the centre
    const start = itemRefs.current[2];
    if (start) row.scrollLeft = start.offsetLeft + start.offsetWidth / 2 - row.clientWidth / 2;
    layout();
    const release = () => {
      target.current = null;
      setTouched((n) => n + 1);
    };
    row.addEventListener("scroll", onScroll, { passive: true });
    row.addEventListener("pointerdown", release);
    row.addEventListener("wheel", release, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      row.removeEventListener("scroll", onScroll);
      row.removeEventListener("pointerdown", release);
      row.removeEventListener("wheel", release);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [layout]);

  const goTo = (i: number, focus = false) => {
    const n = Math.max(0, Math.min(items.length - 1, i));
    const li = itemRefs.current[n];
    const row = rowRef.current;
    if (!li || !row) return;
    // Focus first: moving focus after a smooth scroll starts can cancel the scroll
    if (focus) li.querySelector("button")?.focus({ preventScroll: true });
    target.current = n;
    setCurrent(n);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    row.scrollTo({ left: li.offsetLeft + li.offsetWidth / 2 - row.clientWidth / 2, behavior: reduce ? "auto" : "smooth" });
  };

  const onKey = (e: React.KeyboardEvent) => {
    const from = target.current ?? current;
    if (e.key === "ArrowRight") { e.preventDefault(); goTo(from + 1, true); }
    if (e.key === "ArrowLeft") { e.preventDefault(); goTo(from - 1, true); }
    if (e.key === "Home") { e.preventDefault(); goTo(0, true); }
    if (e.key === "End") { e.preventDefault(); goTo(items.length - 1, true); }
  };

  // Auto-advance: restarts the 10s count whenever the item changes or the reader touches the row
  useEffect(() => {
    if (hovered || focused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => {
      if (document.visibilityState === "visible") goTo((current + 1) % items.length);
      else setTouched((n) => n + 1);
    }, 10000);
    return () => window.clearTimeout(id);
    // goTo is stable in behaviour; re-running on it would reset the timer every render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, hovered, focused, touched, items.length]);

  const item = items[current];

  return (
    // Desktop gap puts the third item from centre on each side half off-screen (centre 25vw apart).
    // On desktop the 1.5× centre item overflows the row's padding; the clipped part is the
    // cut-outs' transparent margin, so the bun itself is never cropped
    <div
      className="group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
      }}
    >
      <ul
        ref={rowRef}
        aria-label="Bagels and signature sandwiches"
        onKeyDown={onKey}
        className="drag-row flex snap-x snap-mandatory items-center overflow-x-auto overflow-y-hidden px-[calc(50%-28vw)] py-8 md:gap-[max(0px,calc(25vw-340px))] md:py-8 md:px-[calc(50%-170px)]"
      >
        {items.map((s, i) => (
          <li
            key={s.name}
            ref={(el) => { itemRefs.current[i] = el; }}
            className="lineup-item w-[56vw] shrink-0 snap-center md:w-[340px]"
            style={{
              transform: "translate3d(0, var(--y, 0), 0) scale(var(--s, 1))",
              opacity: "var(--o, 1)",
              transition: "transform 200ms var(--ease-out), opacity 200ms",
            }}
          >
            <button
              type="button"
              tabIndex={i === current ? 0 : -1}
              aria-current={i === current ? "true" : undefined}
              onClick={() => goTo(i)}
              className="block w-full cursor-grab outline-none focus-visible:outline-none active:cursor-grabbing"
            >
              <Image
                src={s.src}
                alt={s.alt}
                width={864}
                height={864}
                priority={i < 3}
                sizes="(min-width: 768px) 340px, 56vw"
                className="pointer-events-none aspect-square w-full select-none object-contain"
                draggable={false}
              />
            </button>
          </li>
        ))}
      </ul>
      {/* Announce changes only when the reader is driving the row, not on each auto-advance */}
      <p aria-live={focused ? "polite" : "off"} className="px-4 text-center">
        <span className="display block text-[2rem] md:text-[2.5rem]">
          {item.name}
        </span>
        <span className="block text-b">{item.fact}</span>
      </p>
    </div>
  );
}
