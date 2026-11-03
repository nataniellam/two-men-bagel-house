// Visible arrow plus screen-reader text so leaving the site is never a surprise.
export default function ExternalLabel({ platform }: { platform?: string }) {
  return (
    <>
      <span aria-hidden="true"> ↗</span>
      <span className="sr-only"> (opens {platform ?? "an external site"} in a new tab)</span>
    </>
  );
}
