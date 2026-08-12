import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "../components/site/PageHeader";
import { duas } from "../lib/islamic-content";

export const Route = createFileRoute("/duas")({
  head: () => ({
    meta: [
      { title: "Daily Duas & Supplications — Nur al-Huda" },
      {
        name: "description",
        content:
          "Beautiful daily duas from the Qur'an and Sunnah with Arabic text, English and Urdu translation.",
      },
      { property: "og:title", content: "Daily Duas & Supplications — Nur al-Huda" },
      {
        property: "og:description",
        content: "Duas for guidance, knowledge, forgiveness, protection and ease.",
      },
    ],
  }),
  component: DuasPage,
});

function DuasPage() {
  return (
    <>
      <PageHeader
        eyebrow="Supplication"
        arabic="وَقَالَ رَبُّكُمُ ادْعُونِي أَسْتَجِبْ لَكُمْ"
        title="Duas for Every Moment"
        subtitle="Call upon Allah with the words He and His Messenger ﷺ taught us."
      />
      <section className="relative bg-cream py-16">
        <div className="islamic-pattern absolute inset-0 opacity-25" aria-hidden />
        <div className="relative mx-auto grid max-w-6xl gap-6 px-5 md:grid-cols-2">
          {duas.map((d) => (
            <article
              key={d.title}
              className="glass rounded-[1.75rem] p-7 shadow-luxe transition-transform duration-300 hover:-translate-y-1.5"
            >
              <h2 className="text-lg font-semibold text-primary">{d.title}</h2>
              <p className="font-arabic mt-5 text-right text-3xl leading-[2.4] text-foreground">
                {d.arabic}
              </p>
              <p className="font-urdu mt-5 text-right text-base leading-[2.6] text-muted-foreground">
                {d.urdu}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-foreground/80 italic">{d.english}</p>
              <p className="mt-5 text-xs tracking-[0.22em] text-gold uppercase">{d.source}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}