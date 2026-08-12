export function PageHeader({
  eyebrow,
  title,
  arabic,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  arabic?: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-emerald pt-32 pb-20 text-cream">
      <div className="islamic-pattern absolute inset-0 opacity-40" aria-hidden />
      <div className="relative mx-auto max-w-4xl px-5 text-center">
        <p className="text-xs tracking-[0.3em] text-gold uppercase">{eyebrow}</p>
        {arabic && <p className="font-arabic mt-5 text-3xl text-gold sm:text-4xl">{arabic}</p>}
        <h1 className="mt-4 text-3xl font-semibold sm:text-5xl">{title}</h1>
        {subtitle && (
          <p className="mx-auto mt-5 max-w-2xl text-cream/75 sm:text-lg">{subtitle}</p>
        )}
        <div className="mx-auto mt-7 h-px w-28 bg-gradient-gold" />
      </div>
    </section>
  );
}