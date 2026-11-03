const LINE = "Made the hard way, still.";

// Decorative: hidden from assistive tech (the line appears once as real text in the story section).
// Pauses on hover; stops under prefers-reduced-motion (both in globals.css).
export default function Marquee() {
  const run = Array.from({ length: 4 }, (_, i) => (
    <span key={i} className="display shrink-0 pr-[0.4em] text-xxl">
      {LINE}
    </span>
  ));

  return (
    <div className="marquee overflow-hidden bg-ink py-6 text-paper md:py-10">
      <div aria-hidden="true" className="marquee-track flex w-max">
        {run}
        {run}
      </div>
    </div>
  );
}
