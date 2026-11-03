// Serves the static export in out/ the way GitHub Pages does, with or without the
// repo subpath: node scripts/serve-out.mjs [port]  (then open /two-men-bagel-house/ or /)
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../out", import.meta.url));
const prefix = "/two-men-bagel-house";
const port = Number(process.argv[2] ?? process.env.PORT ?? 3210);
const types = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".json": "application/json",
  ".txt": "text/plain; charset=utf-8", ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml",
  ".mp4": "video/mp4", ".woff2": "font/woff2", ".ico": "image/x-icon",
};

createServer(async (req, res) => {
  let path = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (path === prefix || path.startsWith(prefix + "/")) path = path.slice(prefix.length) || "/";
  let file = join(root, normalize(path));
  if (!file.startsWith(root)) return res.writeHead(403).end();
  try {
    if ((await stat(file)).isDirectory()) file = join(file, "index.html");
    const body = await readFile(file);
    res.writeHead(200, { "Content-Type": types[extname(file)] ?? "application/octet-stream" }).end(body);
  } catch {
    const notFound = await readFile(join(root, "404.html")).catch(() => "Not found");
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" }).end(notFound);
  }
}).listen(port, () => console.log(`serving out/ on http://localhost:${port}${prefix}/`));
