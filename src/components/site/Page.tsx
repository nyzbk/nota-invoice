import type { ReactNode } from "react";
import { AppShell } from "@/components/layout/AppShell";

export function Page({
  title,
  lede,
  children,
}: {
  title: string;
  lede?: string;
  children: ReactNode;
}) {
  return (
    <AppShell>
      <main className="mx-auto max-w-2xl px-4 py-10">
        <h1 className="font-display text-3xl font-medium tracking-tight">{title}</h1>
        {lede ? <p className="mt-3 text-base leading-relaxed text-muted">{lede}</p> : null}
        <div className="prose-nota mt-8 space-y-5 text-sm leading-relaxed text-ink/90">{children}</div>
      </main>
    </AppShell>
  );
}
