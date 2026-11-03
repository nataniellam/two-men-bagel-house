"use client";

import { useEffect, useRef, useState } from "react";

// Static export on GitHub Pages serves from a subpath; lib/image-loader adds it for
// next/image, so plain <video> sources need it added here
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// A muted looping clip for the Community strip. It plays only while mostly on screen,
// never under prefers-reduced-motion (the poster frame shows instead), and a tap or click
// pauses or resumes it, which is the pause control for content that moves on its own.
export default function CommunityVideo({ src, poster, label }: { src: string; poster: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !paused) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.5 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, [paused]);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) {
      setPaused(false);
      video.play().catch(() => {});
    } else {
      setPaused(true);
      video.pause();
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`${label}. ${playing ? "Pause" : "Play"} video`}
      className="block w-full cursor-pointer"
    >
      <video
        ref={ref}
        src={`${base}${src}`}
        poster={`${base}${poster}`}
        muted
        loop
        playsInline
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="pointer-events-none aspect-[4/5] w-full object-cover"
      />
    </button>
  );
}
