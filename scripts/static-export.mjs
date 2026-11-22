// Renders every public page of the Node build (.output) to plain HTML files in static/,
// ready to upload to static hosting such as Hostinger (public_html).
// Usage: npm run build:static
import { spawn } from "node:child_process";
import { cp, mkdir, rm, writeFile, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const OUT = "static";
const PORT = 4317;
const BASE = `http://localhost:${PORT}`;

// Pages come from the live sitemap, so every indexable route is exported and nothing drifts.
let PAGES = [];
const FILES = ["/robots.txt", "/sitemap.xml", "/llms.txt"];
// Public but not indexable (noindex), so not in the sitemap.
const EXTRA_PAGES = ["/embed/gpa-calculator/"];

const server = spawn("node", [".output/server/index.mjs"], {
  env: { ...process.env, PORT: String(PORT), HOST: "127.0.0.1", NITRO_PORT: String(PORT) },
  stdio: ["ignore", "inherit", "inherit"],
});

async function waitForServer() {
  for (let i = 0; i < 100; i++) {
    try {
      const r = await fetch(`${BASE}/robots.txt`);
      if (r.ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 200));
  }
  throw new Error("Server did not start");
}

async function save(path, body) {
  const file = join(OUT, path);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, body);
}

try {
  await waitForServer();
  await rm(OUT, { recursive: true, force: true });
  await cp(".output/public", OUT, { recursive: true });

    const sitemap = await (await fetch(`${BASE}/sitemap.xml`)).text();
  const inSitemap = [...sitemap.matchAll(/<loc>https:\/\/gpacalculatorlab\.com([^<]*)<\/loc>/g)].map((m) => m[1]);
  PAGES = [...inSitemap, ...EXTRA_PAGES];
  if (!PAGES.includes("/")) throw new Error("Sitemap is missing the homepage");

  for (const path of PAGES) {
    const r = await fetch(`${BASE}${path}`, { redirect: "manual" });
    if (r.status !== 200) throw new Error(`${path} returned ${r.status}`);
    await save(path === "/" ? "index.html" : `${path}index.html`, await r.text());
    console.log(`200 ${path}`);
  }
  for (const path of FILES) {
    const r = await fetch(`${BASE}${path}`);
    if (r.status !== 200) throw new Error(`${path} returned ${r.status}`);
    await save(path, await r.text());
    console.log(`200 ${path}`);
  }

  const nf = await fetch(`${BASE}/this-page-does-not-exist/`);
  if (nf.status !== 404) throw new Error(`404 check returned ${nf.status}`);
  let html = await nf.text();
  if (!html.includes('name="robots" content="noindex"')) {
    html = html.replace("</head>", '<meta name="robots" content="noindex"></head>');
  }
  await save("404.html", html);
  console.log("404 /404.html");

  await save(".htaccess", await readFile("scripts/static.htaccess", "utf8"));
  console.log(`Static site written to ${OUT}/`);
} finally {
  server.kill();
}
