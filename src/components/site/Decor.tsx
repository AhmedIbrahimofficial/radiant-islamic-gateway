export function Lantern({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  return (
    <div
      className={`animate-sway pointer-events-none absolute ${className}`}
      style={{ animationDelay: `${delay}s` }}
      aria-hidden
    >
      <div className="mx-auto h-10 w-px bg-gold/50" />
      <div className="relative grid place-items-center">
        <div className="animate-glow absolute size-20 rounded-full bg-gold/25 blur-2xl" />
        <div className="relative h-14 w-9 rounded-[45%] border border-gold/60 bg-gradient-gold/20 shadow-gold" />
      </div>
      <div className="mx-auto size-2 rotate-45 border border-gold/60" />
    </div>
  );
}

export function FloatingPatterns() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {[
        "left-[6%] top-[12%] size-24",
        "right-[8%] top-[28%] size-16",
        "left-[18%] bottom-[14%] size-20",
        "right-[22%] bottom-[8%] size-28",
      ].map((pos, i) => (
        <span
          key={pos}
          className={`animate-sway absolute rotate-45 rounded-[28%] border border-gold/20 ${pos}`}
          style={{ animationDelay: `${i * 1.4}s`, animationDuration: `${9 + i}s` }}
        />
      ))}
    </div>
  );
}

export function LoadingScreen({ label = "Loading" }: { label?: string }) {
  return (
    <div className="grid place-items-center py-20">
      <div className="relative grid place-items-center">
        <span className="absolute size-24 animate-ping rounded-full border border-gold/30" />
        <span className="size-14 rotate-45 rounded-[28%] border-2 border-gold/70" />
      </div>
      <p className="mt-8 text-xs tracking-[0.3em] text-muted-foreground uppercase">{label}</p>
      <p className="font-arabic mt-3 text-xl text-gold">اللَّهُ نُورُ السَّمَاوَاتِ وَالْأَرْضِ</p>
    </div>
  );
}
