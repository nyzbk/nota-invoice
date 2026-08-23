import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [{ title: "About — Nota" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <AppShell>
      <main className="mx-auto max-w-2xl px-4 py-10">
        <h1 className="font-display text-3xl font-medium tracking-tight">About this free tool</h1>
        <div className="mt-8 space-y-5 text-sm leading-relaxed text-ink/90">
          <p>
            Nota is a free invoice PDF generator that runs in your browser. No account, no
            watermark, no upload.
          </p>
          <p>Other free tools from the same workshop:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <a className="underline decoration-line underline-offset-4" href="https://folio-pdf-toolkit.vercel.app">
                Folio — PDF Toolkit
              </a>{" "}
              — merge, split, compress
            </li>
            <li>
              <a className="underline decoration-line underline-offset-4" href="https://heic-local.vercel.app">
                HEIC Local
              </a>{" "}
              — convert iPhone photos on-device
            </li>
          </ul>
          <p>
            Built as a public utility alongside $10k websites, brand identity systems and custom web
            applications.
          </p>
        </div>
      </main>
    </AppShell>
  );
}
