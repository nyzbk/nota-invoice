import { createFileRoute } from "@tanstack/react-router";
import { SITE_ORIGIN, SITEMAP_PATHS } from "@/content/site";

/** lastmod only on URLs this Gate C pass actually changed. Home kept at prior content date. */
const LASTMOD: Record<string, string> = {
  "/": "2026-08-28",
  "/how-to": "2026-09-08",
  "/faq": "2026-09-08",
  "/fields": "2026-09-08",
  "/tax": "2026-09-08",
  "/iphone": "2026-09-08",
  "/contact": "2026-09-08",
  "/privacy": "2026-09-08",
  "/terms": "2026-09-08",
};

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${SITEMAP_PATHS.map((path) => {
  const lastmod = LASTMOD[path];
  const lastmodLine = lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : "";
  return `  <url>\n    <loc>${SITE_ORIGIN}${path === "/" ? "" : path}</loc>${lastmodLine}\n    <changefreq>weekly</changefreq>\n  </url>`;
}).join("\n")}\n</urlset>\n`;
        return new Response(body, {
          headers: { "content-type": "application/xml; charset=utf-8" },
        });
      },
    },
  },
});
