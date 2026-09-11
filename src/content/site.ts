export const SITE_ORIGIN = "https://nota-invoice-mu.vercel.app";
export const CONTACT_EMAIL = "ultaultimatum@gmail.com";
export const APP_NAME = "Nota";

export const NAV = [
  { href: "/", label: "Invoice" },
  { href: "/estimate", label: "Estimate" },
  { href: "/how-to", label: "How it works" },
  { href: "/faq", label: "FAQ" },
  { href: "/use-cases", label: "Use cases" },
  { href: "/fields", label: "Invoice fields" },
  { href: "/tax", label: "Tax & discount" },
  { href: "/iphone", label: "iPhone" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
] as const;

export const SITEMAP_PATHS = NAV.map((item) => item.href);
