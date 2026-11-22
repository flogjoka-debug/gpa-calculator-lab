import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import { isNoindexHost } from "./lib/seo-files";
import { NOT_FOUND_TITLE, notFoundHead } from "./lib/site";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

/** Host of the incoming request. x-forwarded-host is trusted only behind the sandbox's localhost proxy. */
function requestHost(request: Request) {
  const url = new URL(request.url);
  return (url.hostname === "localhost" ? request.headers.get("x-forwarded-host") : null) ?? url.host;
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

/** Runtime indexing rules: preview hosts send noindex; 404 pages get noindex and the home social image. */
async function applyIndexingRules(request: Request, response: Response): Promise<Response> {
  const isHtml = (response.headers.get("content-type") ?? "").includes("text/html");
  const preview = isNoindexHost(requestHost(request));
  if (!preview && !(response.status === 404 && isHtml)) return response;
  const headers = new Headers(response.headers);
  if (preview || response.status === 404) headers.set("x-robots-tag", "noindex");
  if (response.status === 404 && isHtml) {
    const tags = notFoundHead().meta.map((m) => ("title" in m ? "" : `<meta ${"name" in m ? `name="${m.name}"` : `property="${m.property}"`} content="${esc(m.content)}">`)).join("");
    const html = (await response.text()).replace(/<title>[^<]*<\/title>/, `<title>${esc(NOT_FOUND_TITLE)}</title>`).replace("</head>", `${tags}</head>`);
    headers.delete("content-length");
    return new Response(html, { status: 404, headers });
  }
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}

// Hosting compresses every response at the edge. Never compress a body (gzip, brotli,
// CompressionStream) or set content-encoding here or in a server route: the body gets encoded
// twice and renders garbled.
export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await applyIndexingRules(request, await normalizeCatastrophicSsrResponse(response));
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
