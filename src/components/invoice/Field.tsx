import { cn } from "@/lib/utils";
import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

export function Field({
  label,
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted">{label}</span>
      <input
        {...props}
        className={cn(
          "mt-1 min-h-11 w-full min-w-0 rounded-md border border-line bg-surface px-3 text-sm text-ink placeholder:text-subtle",
          className,
        )}
      />
    </label>
  );
}

export function Area({
  label,
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted">{label}</span>
      <textarea
        {...props}
        className={cn(
          "mt-1 min-h-24 w-full resize-y rounded-md border border-line bg-surface px-3 py-2 text-sm text-ink placeholder:text-subtle",
          className,
        )}
      />
    </label>
  );
}
