// next/image loader for the static export: files are served as-is, so this only prefixes
// the base path. The width query keeps next/image's srcset entries distinct.
export default function imageLoader({ src, width }: { src: string; width: number }) {
  if (/^https?:\/\//.test(src)) return src;
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${src}?w=${width}`;
}
