#!/usr/bin/env node
/**
 * 3 проверки Nota: security signals + errors + real PDF output.
 * GitHub: microsoft/playwright, Hopding/pdf-lib.
 */
import { chromium } from "playwright";
import { PDFDocument } from "pdf-lib";
import { readFile, writeFile } from "node:fs/promises";
import { inflateSync } from "node:zlib";

const BASE = process.env.CHECK_URL || "http://127.0.0.1:8080";
const fail = [];
const ok = [];

function streamText(buf) {
  const chunks = [];
  const re = /stream\r?\n([\s\S]*?)\r?\nendstream/g;
  let m;
  while ((m = re.exec(buf.toString("latin1")))) {
    const raw = Buffer.from(m[1], "latin1");
    try {
      chunks.push(inflateSync(raw).toString("latin1"));
    } catch {
      chunks.push(raw.toString("latin1"));
    }
  }
  return chunks.join("\n");
}

function hexToAscii(s) {
  return s.replace(/<([0-9A-Fa-f]+)>/g, (_, h) => {
    const out = [];
    for (let i = 0; i < h.length; i += 2) out.push(String.fromCharCode(parseInt(h.slice(i, i + 2), 16)));
    return out.join("");
  });
}

const browser = await chromium.launch({ args: ["--no-sandbox"] });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
const pageErrors = [];
page.on("pageerror", (e) => pageErrors.push(e.message));

async function visit(path) {
  const res = await page.goto(`${BASE}${path}`, { waitUntil: "domcontentloaded", timeout: 30000 });
  if (!res || res.status() >= 400) fail.push(`${path} status ${res?.status()}`);
  else ok.push(`${path} ${res.status()}`);
}

await visit("/");
await visit("/privacy");
await visit("/terms");
await visit("/about");
await visit("/contact");
await visit("/how-to");
await visit("/faq");
await visit("/ads.txt");

const ads = await (await page.goto(`${BASE}/ads.txt`)).text();
if (!ads.includes("pub-7636435144500691")) fail.push("ads.txt missing pub");
else ok.push("ads.txt pub");

await visit("/");
await page.evaluate(() => localStorage.clear());
await page.reload({ waitUntil: "domcontentloaded" });
await page.getByRole("button", { name: "Download PDF" }).waitFor({ timeout: 10000 });
const h1 = await page.locator("h1").innerText();
if (!/invoice/i.test(h1)) fail.push(`unexpected h1: ${h1}`);
else ok.push(`h1 ${h1}`);
const brand = await page.locator("header").innerText();
if (/Folio/i.test(brand)) fail.push("brand still Folio");
else ok.push("brand is not Folio");

await page.getByLabel("Name").nth(0).fill("Студия Атабек");
await page.getByLabel("Name").nth(1).fill("ТОО Акация");
await page.getByLabel("Description").fill("Бренд-идентити");
await page.getByLabel("Qty").fill("2");
await page.getByLabel("Price").fill("1500");
await page.getByLabel("Tax %").fill("12");
await page.getByLabel("Discount (amount)").fill("100");

const [download] = await Promise.all([
  page.waitForEvent("download", { timeout: 20000 }),
  page.getByRole("button", { name: "Download PDF" }).click(),
]);
const pdfPath = "/tmp/nota-three-checks.pdf";
await download.saveAs(pdfPath);
const bytes = await readFile(pdfPath);
if (bytes.length < 2000) fail.push(`PDF too small: ${bytes.length}`);
else ok.push(`PDF ${bytes.length} bytes`);
if (!bytes.subarray(0, 5).equals(Buffer.from("%PDF-"))) fail.push("not a PDF");
else ok.push("%PDF header");

const pdf = await PDFDocument.load(bytes);
if (pdf.getPageCount() < 1) fail.push("no pages");
else ok.push(`${pdf.getPageCount()} page`);

const decoded = hexToAscii(streamText(bytes));
const preview = await page.locator("article").first().innerText();
if (!preview.includes("3,248.00") && !preview.includes("$3248")) {
  if (!preview.includes("3,248")) fail.push(`preview totals missing: ${preview.slice(-200)}`);
  else ok.push("preview total 3,248");
} else ok.push("preview total 3,248.00");

if (!/NotoSans/.test(decoded) && !bytes.includes(Buffer.from("NotoSans"))) fail.push("NotoSans not embedded");
else ok.push("NotoSans embedded");

const operators = streamText(bytes);
if (!operators.includes("0421")) fail.push("cyrillic glyph missing from ToUnicode");
else ok.push("cyrillic in ToUnicode");


if (pageErrors.length) fail.push(`pageerror: ${pageErrors.join(" | ")}`);
else ok.push("no pageerror");

const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 2);
if (overflow) fail.push("horizontal overflow 390");
else ok.push("no overflow 390");

await writeFile(
  "/tmp/nota-three-checks.json",
  JSON.stringify({ ok, fail, pageErrors, pdfBytes: bytes.length }, null, 2),
);
await browser.close();

console.log("PASS", ok);
if (fail.length) {
  console.error("FAIL", fail);
  process.exit(1);
}
console.log("THREE CHECKS GREEN");
