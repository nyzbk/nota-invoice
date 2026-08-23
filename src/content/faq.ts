import type { FaqItem } from "@/components/site/FaqSection";

export const invoiceFaq: FaqItem[] = [
  {
    q: "What should be on an invoice?",
    a: "Your details, the client’s details, a unique invoice number, issue and due dates, line items with quantities and prices, tax if you charge it, the total, and payment notes. Nota fills that layout for you.",
  },
  {
    q: "Is this invoice generator free?",
    a: "Yes. Create and download as many invoices as you need. No account, no daily cap, no watermark on the PDF.",
  },
  {
    q: "Do I have to sign up?",
    a: "No. The form and download work immediately. A draft is saved only on this device in local storage.",
  },
  {
    q: "Does my invoice leave this device?",
    a: "No. The PDF is built in your browser. We do not upload invoice data to a server.",
  },
  {
    q: "Can I add tax or a discount?",
    a: "Yes. Optional tax is a percentage on the amount after discount. Discount is a flat amount in the selected currency.",
  },
  {
    q: "Which currencies are supported?",
    a: "USD, EUR, GBP and KZT. The PDF uses Helvetica, so the tenge symbol is written as KZT on the file.",
  },
  {
    q: "Can I edit after download?",
    a: "The PDF itself is a snapshot. Your last draft stays in this browser, so you can change fields and download again.",
  },
  {
    q: "Will the PDF have a watermark?",
    a: "No. A tiny “Created with Nota” line sits in the footer only — it does not stamp over your totals.",
  },
  {
    q: "Does it work on iPhone?",
    a: "Yes. Use Safari, fill the form, then Download PDF. Files stay on the phone.",
  },
  {
    q: "Is this legal advice or an official tax form?",
    a: "No. You are responsible for required fields in your country. Nota is a layout tool, not an accountant.",
  },
];
