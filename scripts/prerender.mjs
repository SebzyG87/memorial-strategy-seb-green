#!/usr/bin/env node
// Static prerender for a Vite single-page app (Seb Green sites).
//
// Runs after `vite build`. For every route in seo.config.json it:
//   1. loads the built app in headless Chrome and saves the rendered page
//      text into dist/<route>/index.html (React re-renders on load, so the
//      app behaves exactly as before for visitors with JavaScript);
//   2. writes a per-page <title>, description, canonical and social tags;
//   3. adds the JSON-LD structured data from the config to the homepage.
// It then writes dist/sitemap.xml and makes sure dist/robots.txt points to it.
//
// Needs Google Chrome (or set CHROME_PATH). SKIP_PRERENDER=1 skips this step.
import { createServer } from "node:http";
import { readFile, writeFile, mkdir, stat, mkdtemp, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { execFile } from "node:child_process";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const config = JSON.parse(await readFile(path.join(root, "seo.config.json"), "utf8"));

if (process.env.SKIP_PRERENDER === "1") {
  console.log("prerender: skipped (SKIP_PRERENDER=1)");
  process.exit(0);
}

const fail = (msg) => {
  console.error(`prerender: FAIL ${msg}`);
  process.exit(1);
};

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
].filter(Boolean);
const chrome = CHROME_CANDIDATES.find((p) => existsSync(p));
if (!chrome) fail("Google Chrome not found. Install Chrome or set CHROME_PATH.");

const siteUrl = config.siteUrl.replace(/\/+$/, "");
// Google Search Console HTML-tag verification. Set GOOGLE_SITE_VERIFICATION (or
// VITE_GOOGLE_SITE_VERIFICATION) to the tag's content value in Vercel; empty = no tag.
async function envValue(name) {
  if (process.env[name]) return process.env[name];
  for (const file of [".env.production.local", ".env.production", ".env.local", ".env", ".vercel/.env.production.local"]) {
    try {
      const m = (await readFile(path.join(root, file), "utf8")).match(new RegExp(`^${name}=["']?([^"'\\n]*)`, "m"));
      if (m && m[1]) return m[1];
    } catch { /* file not present */ }
  }
  return "";
}
const verification = ((await envValue("GOOGLE_SITE_VERIFICATION")) || (await envValue("VITE_GOOGLE_SITE_VERIFICATION"))).trim().replace(/[^A-Za-z0-9_-]/g, "");

let template = await readFile(path.join(dist, "index.html"), "utf8");

// Vercel Web Analytics is opt-in: the snippet in index.html is removed unless
// VITE_VERCEL_ANALYTICS=1, so live pages never request a script Vercel isn't serving.
const analyticsOn = /^(1|true|yes)$/i.test((await envValue("VITE_VERCEL_ANALYTICS")).trim());
if (!analyticsOn) {
  template = template.replace(/[ \t]*<!-- Vercel Web Analytics[\s\S]*?<\/script>\n?/, "");
  await writeFile(path.join(dist, "index.html"), template);
}
console.log(`prerender: Vercel Analytics ${analyticsOn ? "on" : "off (set VITE_VERCEL_ANALYTICS=1 to enable)"}`);

// ---------- tiny static server over dist (SPA fallback to the template) ----------
const MIME = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".mjs": "text/javascript",
  ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png",
  ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".gif": "image/gif",
  ".ico": "image/x-icon", ".woff": "font/woff", ".woff2": "font/woff2", ".txt": "text/plain",
  ".xml": "application/xml", ".mp4": "video/mp4", ".webm": "video/webm", ".glb": "model/gltf-binary",
  ".wasm": "application/wasm",
};
const server = createServer(async (req, res) => {
  const urlPath = decodeURIComponent(new URL(req.url, "http://x").pathname);
  const file = path.join(dist, urlPath);
  try {
    if (file.startsWith(dist) && (await stat(file)).isFile()) {
      res.writeHead(200, { "Content-Type": MIME[path.extname(file).toLowerCase()] || "application/octet-stream" });
      res.end(await readFile(file));
      return;
    }
  } catch { /* fall through to the SPA template */ }
  res.writeHead(200, { "Content-Type": MIME[".html"] });
  res.end(template);
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const origin = `http://127.0.0.1:${server.address().port}`;

// ---------- helpers ----------
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const decode = (s) => String(s).replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
const headOf = (html) => (html.match(/<head[^>]*>([\s\S]*?)<\/head>/i) || [, ""])[1];
const titleOf = (html) => { const m = headOf(html).match(/<title[^>]*>([\s\S]*?)<\/title>/i); return m ? decode(m[1].trim()) : ""; };
const metaOf = (html, key) => {
  const re = new RegExp(`<meta\\s[^>]*(?:name|property)=["']${key}["'][^>]*>`, "i");
  const tag = headOf(html).match(re);
  if (!tag) return "";
  const c = tag[0].match(/content=["']([^"']*)["']/i);
  return c ? decode(c[1]) : "";
};

function setTag(html, re, tag) {
  return re.test(html) ? html.replace(re, () => tag) : html.replace(/<\/head>/i, () => `    ${tag}\n  </head>`);
}
function setMeta(html, attr, key, value) {
  const re = new RegExp(`<meta\\s[^>]*(?:name|property)=["']${key.replace(/[:.]/g, "\\$&")}["'][^>]*>`, "i");
  return setTag(html, re, `<meta ${attr}="${key}" content="${esc(value)}" />`);
}

// Extract the inner HTML of <div id="root"> from a serialized DOM.
function rootInner(dom) {
  const open = dom.match(/<div id="root"[^>]*>/i);
  if (!open) return null;
  const start = open.index + open[0].length;
  const re = /<div\b|<\/div>/gi;
  re.lastIndex = start;
  let depth = 1, m;
  while ((m = re.exec(dom))) {
    depth += m[0].toLowerCase() === "</div>" ? -1 : 1;
    if (depth === 0) return dom.slice(start, m.index);
  }
  return null;
}

// Inline animation start states (opacity 0, offsets) would hide text for
// visitors without JavaScript. React replaces this markup on load anyway.
function revealInlineStyles(html) {
  return html.replace(/\sstyle="([^"]*)"/g, (all, css) => {
    const cleaned = css
      .split(";")
      .filter((d) => !/^\s*(opacity|transform|filter|visibility|will-change)\s*:/i.test(d))
      .join(";")
      .trim();
    return cleaned ? ` style="${cleaned}"` : "";
  });
}

const textLength = (html) => html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().length;

function render(route) {
  return new Promise(async (resolve, reject) => {
    const profile = await mkdtemp(path.join(tmpdir(), "prerender-"));
    execFile(
      chrome,
      [
        "--headless=new", "--disable-gpu", "--no-first-run", "--no-default-browser-check",
        "--disable-extensions", "--mute-audio", "--hide-scrollbars", "--disable-background-networking",
        `--user-data-dir=${profile}`, "--window-size=1280,4000",
        `--virtual-time-budget=${config.virtualTimeBudget ?? 8000}`,
        "--dump-dom", `${origin}${route}`,
      ],
      { maxBuffer: 64 * 1024 * 1024, timeout: 90_000 },
      async (err, stdout) => {
        await rm(profile, { recursive: true, force: true }).catch(() => {});
        if (err) reject(new Error(`${route}: ${err.message}`));
        else resolve(stdout);
      },
    );
  });
}

// ---------- routes ----------
const configured = new Map((config.routes || []).map((r) => [r.path, r]));
const include = (config.crawl?.include || []).map((s) => new RegExp(s));
const exclude = (config.crawl?.exclude || []).map((s) => new RegExp(s));
const maxPages = config.crawl?.maxPages ?? 200;
const queue = [...configured.keys()];
const seen = new Set(queue);
const results = [];
const templateTitle = titleOf(template);
const templateDescription = metaOf(template, "description");

async function processRoute(route) {
  const dom = await render(route);
  const inner = rootInner(dom);
  if (inner == null) throw new Error(`${route}: could not find #root in rendered page`);
  const body = revealInlineStyles(inner);
  const chars = textLength(body);
  if (chars < (config.minTextChars ?? 200)) throw new Error(`${route}: rendered only ${chars} characters of text`);
  const h1 = (body.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || [, ""])[1].replace(/<[^>]+>/g, "").trim();
  if (/^(404|page not found|not found)\b/i.test(h1)) throw new Error(`${route}: rendered a not-found page`);

  if (include.length) {
    for (const m of dom.matchAll(/href="(\/[^"#?]*)"/g)) {
      const href = m[1].replace(/\/+$/, "") || "/";
      if (seen.has(href) || seen.size >= maxPages) continue;
      if (include.some((r) => r.test(href)) && !exclude.some((r) => r.test(href))) {
        seen.add(href);
        queue.push(href);
      }
    }
  }

  const cfg = configured.get(route) || {};
  const domTitle = titleOf(dom);
  const domDescription = metaOf(dom, "description");
  const title = cfg.title || (domTitle && domTitle !== templateTitle ? domTitle : "") || (route === "/" ? templateTitle : "");
  const description = cfg.description || (domDescription && domDescription !== templateDescription ? domDescription : "") || (route === "/" ? templateDescription : "");
  if (!title || !description) throw new Error(`${route}: no page-specific title/description (add it to seo.config.json routes)`);
  const canonicalPath = cfg.canonical || route;
  const canonical = `${siteUrl}${canonicalPath === "/" ? "/" : canonicalPath}`;

  let html = template;
  html = setTag(html, /<title[^>]*>[\s\S]*?<\/title>/i, `<title>${esc(title)}</title>`);
  html = setMeta(html, "name", "description", description);
  html = setTag(html, /<link\s[^>]*rel=["']canonical["'][^>]*>/i, `<link rel="canonical" href="${esc(canonical)}" />`);
  html = setMeta(html, "property", "og:title", title);
  html = setMeta(html, "property", "og:description", description);
  html = setMeta(html, "property", "og:url", canonical);
  html = setMeta(html, "name", "twitter:title", title);
  html = setMeta(html, "name", "twitter:description", description);
  for (const key of ["og:image", "twitter:image"]) {
    const value = metaOf(html, key);
    if (value && value.startsWith("/")) html = setMeta(html, key.startsWith("og:") ? "property" : "name", key, `${siteUrl}${value}`);
  }
  if (verification) html = setMeta(html, "name", "google-site-verification", verification);
  if (route === "/" && config.jsonLd) {
    const ld = JSON.stringify(config.jsonLd).replace(/</g, "\\u003c");
    html = html.replace(/<\/head>/i, () => `    <script type="application/ld+json">${ld}</script>\n  </head>`);
  }
  html = html.replace(/<div id="root"([^>]*)><\/div>/i, (_, attrs) => `<div id="root"${attrs}>${body}</div>`);
  if (!html.includes(body.slice(0, 50))) throw new Error(`${route}: template has no empty <div id="root"></div>`);

  // Every JSON-LD block must parse; a broken one fails the build.
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch (e) { throw new Error(`${route}: invalid JSON-LD (${e.message})`); }
  }
  if (!/<html[^>]*lang="en-GB"/.test(html)) throw new Error(`${route}: <html lang="en-GB"> missing`);
  const out = route === "/" ? path.join(dist, "index.html") : path.join(dist, route, "index.html");
  await mkdir(path.dirname(out), { recursive: true });
  await writeFile(out, html);
  results.push({ route, title, chars, noindex: Boolean(cfg.noindex || cfg.canonical) });
}

try {
  const concurrency = config.concurrency ?? 4;
  while (queue.length) {
    const batch = queue.splice(0, concurrency);
    await Promise.all(batch.map(processRoute));
  }
} catch (e) {
  server.close();
  fail(e.message);
}
server.close();
results.sort((a, b) => a.route.localeCompare(b.route));

// ---------- vercel.json must serve each prerendered route ----------
const vercelPath = path.join(root, "vercel.json");
if (existsSync(vercelPath)) {
  const vercel = JSON.parse(await readFile(vercelPath, "utf8"));
  const rewrites = vercel.rewrites || [];
  const catchAll = rewrites.findIndex((r) => r.source === "/(.*)");
  if (catchAll !== -1) {
    const missing = results
      .filter((r) => r.route !== "/")
      .filter((r) => {
        const i = rewrites.findIndex((w) => w.source === r.route && w.destination === `${r.route}/index.html`);
        return i === -1 || i > catchAll;
      });
    if (missing.length) fail(`vercel.json needs these rewrites before "/(.*)": ${missing.map((r) => r.route).join(", ")}`);
  }
}

// ---------- sitemap.xml + robots.txt ----------
const today = new Date().toISOString().slice(0, 10);
const urls = results.filter((r) => !r.noindex).map((r) => `  <url>\n    <loc>${esc(`${siteUrl}${r.route === "/" ? "/" : r.route}`)}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`);
await writeFile(path.join(dist, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`);
const robotsPath = path.join(dist, "robots.txt");
let robots = existsSync(robotsPath) ? await readFile(robotsPath, "utf8") : "User-agent: *\nAllow: /\n";
if (!/^sitemap:/im.test(robots)) robots = `${robots.trimEnd()}\n\nSitemap: ${siteUrl}/sitemap.xml\n`;
await writeFile(robotsPath, robots);

for (const r of results) console.log(`prerender: ${r.route.padEnd(40)} ${String(r.chars).padStart(6)} chars  ${r.title}`);
console.log(`prerender: OK ${results.length} pages, sitemap ${urls.length} URLs`);
