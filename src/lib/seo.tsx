import type { FaqItem } from "@/components/site/FaqSection";
import { SITE_ORIGIN } from "@/content/site";

export function jsonLdScripts(opts: {
  appName: string;
  path: string;
  description: string;
  faqs: FaqItem[];
  howToName: string;
  howToSteps: string[];
}) {
  const url = `${SITE_ORIGIN}${opts.path === "/" ? "" : opts.path}`;
  const app = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: opts.appName,
    url,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description: opts.description,
    featureList: ["Create invoice", "Download PDF", "No signup", "No watermark", "Client-side PDF"],
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: opts.faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
  const howTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: opts.howToName,
    description: opts.description,
    step: opts.howToSteps.map((text, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      text,
    })),
  };
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Nota",
    url: SITE_ORIGIN,
    inLanguage: "en",
    publisher: { "@type": "Organization", name: "Ultimatum", email: "ultaultimatum@gmail.com", url: SITE_ORIGIN },
  };
  return [
    { type: "application/ld+json", children: JSON.stringify(website) },
    { type: "application/ld+json", children: JSON.stringify(app) },
    { type: "application/ld+json", children: JSON.stringify(faq) },
    { type: "application/ld+json", children: JSON.stringify(howTo) },
  ];
}

export function toolHead(opts: {
  title: string;
  description: string;
  path: string;
  appName: string;
  faqs?: FaqItem[];
  howToName?: string;
  howToSteps?: string[];
}) {
  const canonical = `${SITE_ORIGIN}${opts.path === "/" ? "" : opts.path}`;
  const scripts =
    opts.faqs && opts.howToName && opts.howToSteps
      ? jsonLdScripts({
          appName: opts.appName,
          path: opts.path,
          description: opts.description,
          faqs: opts.faqs,
          howToName: opts.howToName,
          howToSteps: opts.howToSteps,
        })
      : [];
  return {
    meta: [
      { title: opts.title },
      { name: "description", content: opts.description },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:title", content: opts.title },
      { property: "og:description", content: opts.description },
      { property: "og:url", content: canonical },
      { property: "og:image", content: `${SITE_ORIGIN}/og.jpg` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: `${SITE_ORIGIN}/og.jpg` },
    ],
    links: [{ rel: "canonical", href: canonical }],
    scripts,
  };
}
