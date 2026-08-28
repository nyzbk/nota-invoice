import { createFileRoute } from "@tanstack/react-router";
import { SITE_ORIGIN, SITEMAP_PATHS } from "@/content/site";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${SITEMAP_PATHS.map(
  (path) => `  <url>
    <loc>${SITE_ORIGIN}${path === "/" ? "" : path}</loc>
    <changefreq>weekly</changefreq>
  </url>`,
).join("\n")}
</urlset>
`;
        return new Response(body, {
          headers: { "content-type": "application/xml; charset=utf-8" },
        });
      },
    },
  },
});
