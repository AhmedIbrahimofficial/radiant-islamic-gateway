import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "../components/site/PageHeader";
import { historyMilestones } from "../lib/islamic-content";

export const Route = createFileRoute("/history")({
  head: () => ({
    meta: [
      { title: "Islamic History Timeline — Nur al-Huda" },
      {
        name: "description",
        content:
          "A timeline of Islamic history from the birth of the Prophet ﷺ to the golden ages of Baghdad and Al-Andalus.",
      },
      { property: "og:title", content: "Islamic History Timeline — Nur al-Huda" },
      {
        property: "og:description",
        content: "Milestones of Islamic civilisation, from Makkah to Cordoba.",
      },
    ],
  }),
  component: HistoryPage,
});

function HistoryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Civilisation"
        arabic="وَتِلْكَ الْأَيَّامُ نُدَاوِلُهَا بَيْنَ النَّاسِ"
        title="Islamic History"
        subtitle="Moments that shaped faith, knowledge and civilisation."
      />
      <section className="relative bg-cream py-16">
        <div className="islamic-pattern absolute inset-0 opacity-25" aria-hidden />
        <div className="relative mx-auto max-w-3xl px-5">
          <div className="relative border-l border-gold/40 pl-8">
            {historyMilestones.map((m) => (
              <div key={m.year} className="relative pb-10 last:pb-0">
                <span className="absolute top-1.5 -left-[41px] grid size-4 place-items-center rounded-full bg-gradient-gold shadow-gold" />
                <p className="text-xs tracking-[0.26em] text-primary uppercase">{m.year}</p>
                <h2 className="mt-2 text-xl font-semibold text-foreground">{m.title}</h2>
                <p className="mt-2 leading-relaxed text-muted-foreground">{m.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}