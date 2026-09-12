import type { FaqItem } from "@/components/site/FaqSection";
import { ADSENSE_CLIENT, CONTACT_EMAIL, HUB_URL, SITE_ORIGIN } from "@/content/site";

export const SITE_NAME = "Nota";
export const SITEMAP_LASTMOD = "2026-09-12";
export const OG_IMAGE = `${SITE_ORIGIN}/og.jpg`;

export const SITEMAP_PATHS = [
  "/",
  "/estimate",
  "/how-to",
  "/faq",
  "/use-cases",
  "/fields",
  "/tax",
  "/iphone",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
] as const;

export type SitemapPath = (typeof SITEMAP_PATHS)[number];

export const PAGE_SEO: Record<SitemapPath, { title: string; description: string }> = {
  "/": {
    title: "Free Invoice Generator — Create Invoice PDF, No Signup",
    description:
      "Make a professional invoice PDF in your browser. Integer-cent totals, tax after discount, Latin and Cyrillic names. No account, no watermark, no upload.",
  },
  "/estimate": {
    title: "Free Estimate PDF — Not a Tax Invoice | Nota",
    description:
      "Write an estimate PDF in the browser. ESTIMATE title, EST- number, Valid until. Same cent math as Nota invoices. Not a tax invoice, no upload.",
  },
  "/how-to": {
    title: "How to create an invoice PDF without uploading — Nota",
    description:
      "Step-by-step: fill From and Bill to, add priced lines, apply tax after a flat discount, download an A4 PDF that never leaves the browser.",
  },
  "/faq": {
    title: "Invoice generator FAQ — Nota",
    description:
      "Does the invoice leave the device? Accounts, watermarks, tax math, Cyrillic, iPhone Safari, ads placeholders, and how to write to the operator.",
  },
  "/use-cases": {
    title: "Who uses a browser invoice PDF — Nota",
    description:
      "Freelance designers, contractors billing in tenge, iPhone-only trades, agencies, and anyone who needs one A4 invoice today without a SaaS account.",
  },
  "/fields": {
    title: "What belongs on an invoice — Nota field list",
    description:
      "Sender, buyer, unique number, issue and due dates, line items, discount, tax, notes. What Nota prints, and what you must still add for your country.",
  },
  "/tax": {
    title: "Invoice tax and discount math — Nota",
    description:
      "Qty × price in integer cents. Flat discount capped at subtotal. Tax percent after discount. This page explains the formula — it is not tax software.",
  },
  "/iphone": {
    title: "Create an invoice PDF on iPhone Safari — Nota",
    description:
      "Fill the invoice on iOS Safari, download the PDF to Files, no app install. What to do if the download sheet does not appear.",
  },
  "/about": {
    title: "About Nota — local-first invoice PDF",
    description:
      "Nota is a browser invoice generator: A4 PDF, integer-cent math, Noto Sans for Latin and Cyrillic. No accounts, no cloud invoice store, no watermark.",
  },
  "/contact": {
    title: "Contact Nota — invoice generator support",
    description: `Email ${CONTACT_EMAIL} about the invoice PDF tool. Include the page URL and browser. Do not attach invoices or logos.`,
  },
  "/privacy": {
    title: "Privacy Policy — Nota invoice generator",
    description:
      "Nota builds invoice PDFs in the browser. Invoice fields are not uploaded. Drafts sit in local storage. AdSense cookies only after ads go live.",
  },
  "/terms": {
    title: "Terms of Service — Nota",
    description:
      "Nota is provided as-is. You are responsible for tax and legal fields. No accounts. Do not use the tool for illegal activity.",
  },
};

const CRUMB: Record<SitemapPath, string> = {
  "/": "Invoice",
  "/estimate": "Estimate",
  "/how-to": "How it works",
  "/faq": "FAQ",
  "/use-cases": "Use cases",
  "/fields": "Invoice fields",
  "/tax": "Tax & discount",
  "/iphone": "iPhone",
  "/about": "About",
  "/contact": "Contact",
  "/privacy": "Privacy",
  "/terms": "Terms",
};

const publisher = {
  "@type": "Organization",
  name: "Ultimatum",
  email: CONTACT_EMAIL,
  url: HUB_URL,
  sameAs: [HUB_URL],
};

export function canonical(path: string) {
  if (path === "/") return `${SITE_ORIGIN}/`;
  return `${SITE_ORIGIN}${path}`;
}

export function absUrl(path: string) {
  return canonical(path);
}

function socialMeta(title: string, description: string, url: string) {
  return [
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:locale", content: "en_US" },
    { property: "og:url", content: url },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: OG_IMAGE },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: SITE_NAME },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: OG_IMAGE },
  ];
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: `${SITE_ORIGIN}/`,
    description: PAGE_SEO["/"].description,
    inLanguage: "en",
    publisher,
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: canonical(item.path),
    })),
  };
}

export function faqJsonLd(items: readonly FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

function webApplicationJsonLd(description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Nota — Free Invoice Generator",
    url: `${SITE_ORIGIN}/`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript. Invoice bytes stay in this tab.",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description,
    featureList: [
      "Create invoice PDF in the browser",
      "Integer-cent totals",
      "Latin and Cyrillic names",
      "No signup",
      "No watermark",
      "No upload",
    ],
    publisher,
    screenshot: OG_IMAGE,
  };
}

function howToJsonLd(name: string, description: string, steps: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    totalTime: "PT3M",
    step: steps.map((text, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      text,
    })),
  };
}

export const HOWTO_STEPS = [
  "Enter your name and address in From, then the client in Bill to.",
  "Set the invoice number, issue date and due date (default is 14 days).",
  "Add line items with a quantity and a unit price. Tax is a percent after a flat discount.",
  "Check the live preview. Download PDF — the file is built in this browser, not on a server.",
];

export const ESTIMATE_HOWTO_STEPS = [
  "Open /estimate — not the invoice home.",
  "Fill From and Prepared for. Default number is EST- and Valid until is +30 days.",
  "Add priced lines. Totals use the same integer-cent math as invoices.",
  "Download estimate PDF. The file is titled ESTIMATE and is not a tax invoice.",
  "If the client accepts, issue INV- on the invoice generator.",
];

export const IPHONE_HOWTO_STEPS = [
  "Open Nota in Safari on the iPhone that holds the client details.",
  "Fill From, Bill to and one priced line.",
  "Tap Download PDF. If the sheet does not appear, tap again.",
  "Save to Files. Photos is not a PDF library.",
];

type PageHeadExtra = {
  faqs?: readonly FaqItem[];
  howToName?: string;
  howToSteps?: string[];
  includeApp?: boolean;
  legal?: boolean;
};

export function pageHead(path: SitemapPath, extra: PageHeadExtra = {}) {
  const seo = PAGE_SEO[path];
  const url = canonical(path);
  const scripts: { type: string; children: string }[] = [];

  if (!extra.legal) {
    scripts.push({
      type: "application/ld+json",
      children: JSON.stringify(websiteJsonLd()),
    });
    const crumbs =
      path === "/"
        ? [{ name: "Nota", path: "/" as const }]
        : [
            { name: "Nota", path: "/" as const },
            { name: CRUMB[path], path },
          ];
    scripts.push({
      type: "application/ld+json",
      children: JSON.stringify(breadcrumbJsonLd(crumbs)),
    });
    if (extra.includeApp) {
      scripts.push({
        type: "application/ld+json",
        children: JSON.stringify(webApplicationJsonLd(seo.description)),
      });
    }
    if (extra.faqs?.length) {
      scripts.push({
        type: "application/ld+json",
        children: JSON.stringify(faqJsonLd(extra.faqs)),
      });
    }
    if (extra.howToName && extra.howToSteps?.length) {
      scripts.push({
        type: "application/ld+json",
        children: JSON.stringify(howToJsonLd(extra.howToName, seo.description, extra.howToSteps)),
      });
    }
  }

  return {
    meta: [
      { title: seo.title },
      { name: "description", content: seo.description },
      { name: "google-adsense-account", content: ADSENSE_CLIENT },
      { name: "theme-color", content: "#f3efe8" },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      ...socialMeta(seo.title, seo.description, url),
    ],
    links: [{ rel: "canonical", href: url }],
    scripts,
  };
}

/** Compat for older route heads. Prefer pageHead(path, extra). */
export function toolHead(opts: {
  title: string;
  description: string;
  path: string;
  appName: string;
  faqs?: FaqItem[];
  howToName?: string;
  howToSteps?: string[];
}) {
  const path = opts.path as SitemapPath;
  const legal = path === "/privacy" || path === "/terms";
  return pageHead(path, {
    faqs: opts.faqs,
    howToName: opts.howToName,
    howToSteps: opts.howToSteps,
    includeApp: path === "/",
    legal,
  });
}

export function jsonLdScripts(opts: {
  appName: string;
  path: string;
  description: string;
  faqs: FaqItem[];
  howToName: string;
  howToSteps: string[];
}) {
  const path = (opts.path === "/" || SITEMAP_PATHS.includes(opts.path as SitemapPath)
    ? opts.path
    : "/") as SitemapPath;
  return pageHead(path, {
    faqs: opts.faqs,
    howToName: opts.howToName,
    howToSteps: opts.howToSteps,
    includeApp: path === "/",
  }).scripts;
}
