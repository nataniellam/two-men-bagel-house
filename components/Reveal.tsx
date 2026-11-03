"use client";

import { useEffect, useRef } from "react";

// Staggers the .reveal-item children in once as the section enters.
// Content stays visible without script, under reduced motion, and when already on screen.
export default function Reveal({ as: Tag = "div", className, children, ...rest }: {
  as?: "div" | "section" | "footer";
  className?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;
    el.dataset.reveal = "pending";
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.reveal = "done";
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref as React.Ref<HTMLDivElement>} className={className} {...rest}>
      {children}
    </Tag>
  );
}
