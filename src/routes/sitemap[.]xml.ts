import { createFileRoute } from "@tanstack/react-router";
import { SITE_ORIGIN } from "@/content/site";
import { SITEMAP_LASTMOD, SITEMAP_PATHS } from "@/lib/seo";

function xml() {
  const html = SITEMAP_PATHS.map((path) => {
    const loc = path === "/" ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${path}`;
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${SITEMAP_LASTMOD}</lastmod>\n    <changefreq>weekly</changefreq>\n  </url>`;
  });
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${html.join("\n")}\n</urlset>\n`;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () =>
        new Response(xml(), {
          headers: { "content-type": "application/xml; charset=utf-8" },
        }),
    },
  },
});
