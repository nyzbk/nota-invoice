import { cn } from "@/lib/utils";

type Slot = "after-success" | "mid" | "footer";

type Props = {
  slot: Slot;
  className?: string;
};

export function AdUnit({ slot, className }: Props) {
  return (
    <aside
      data-ad-slot={slot}
      aria-label="Advertisement placeholder"
      className={cn(
        "flex min-h-20 items-center justify-center rounded-lg border border-dashed border-line bg-surface/70 px-4 py-6 text-center",
        className,
      )}
    >
      <p className="text-xs uppercase tracking-[0.14em] text-subtle">Advertisement</p>
    </aside>
  );
}
