import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <p className="text-xs tracking-[0.3em] text-gold uppercase">{eyebrow}</p>
      )}
      <h2 className="mt-3 text-3xl font-semibold text-foreground sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-4 text-muted-foreground">{subtitle}</p>}
      <div
        className={`mt-5 h-px w-24 bg-gradient-gold ${align === "center" ? "mx-auto" : ""}`}
      />
    </div>
  );
}

export function Ornament({ children }: { children?: ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-3 text-gold">
      <span className="h-px w-12 bg-gold/50" />
      <span className="rotate-45 border border-gold/60 p-1.5" />
      {children}
      <span className="rotate-45 border border-gold/60 p-1.5" />
      <span className="h-px w-12 bg-gold/50" />
    </div>
  );
}