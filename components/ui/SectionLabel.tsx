import { cn } from "@/lib/utils";

export interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
  tone?: "gold" | "navy";
}

/**
 * Compact eyebrow label used above section headings.
 */
export function SectionLabel({
  children,
  className,
  tone = "gold",
}: SectionLabelProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]",
        tone === "gold"
          ? "bg-accent/15 text-[hsl(42_85%_28%)]"
          : "bg-primary/8 text-primary",
        className
      )}
    >
      {children}
    </span>
  );
}
