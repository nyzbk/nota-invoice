import type { FaqItem } from "@/components/site/FaqSection";

export function jsonLdScripts(opts: {
  appName: string;
  path: string;
  description: string;
  faqs: FaqItem[];
  howToName: string;
  howToSteps: string[];
}) {
  const origin = typeof window === "undefined" ? "" : window.location.origin;
  const url = `${origin}${opts.path}`;
  const app = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: opts.appName,
    url,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description: opts.description,
    featureList: ["Create invoice", "Download PDF", "No signup", "No watermark", "Works offline in the browser"],
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
  return [
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
  faqs: FaqItem[];
  howToName: string;
  howToSteps: string[];
}) {
  return {
    meta: [
      { title: opts.title },
      { name: "description", content: opts.description },
      { name: "robots", content: "index, follow, max-image-preview:large" },
    ],
    links: [{ rel: "canonical", href: opts.path }],
    scripts: jsonLdScripts(opts),
  };
}
