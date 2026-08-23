import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-colors duration-150 disabled:pointer-events-none disabled:opacity-40 select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-copper text-copper-fg hover:bg-ink shadow-soft min-h-11 px-5 rounded-md",
        secondary:
          "bg-surface text-ink border border-line hover:border-ink/40 min-h-11 px-4 rounded-md",
        ghost: "text-ink hover:bg-ink/5 min-h-11 px-3 rounded-md",
        danger: "bg-danger text-copper-fg hover:opacity-90 min-h-11 px-4 rounded-md",
      },
      size: {
        md: "text-sm",
        sm: "text-sm min-h-10 px-3",
        icon: "size-11 p-0 rounded-md",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type Props = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, ...props }: Props) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
