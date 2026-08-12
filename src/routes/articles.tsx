import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "../components/site/PageHeader";
import { articles } from "../lib/islamic-content";

export const Route = createFileRoute("/articles")({
  head: () => ({
    meta: [
      { title: "Islamic Articles & Reflections — Nur al-Huda" },
      {
        name: "description",
        content:
          "Thoughtful Islamic articles on worship, Qur'an etiquette, spirituality and community life.",
      },
      { property: "og:title", content: "Islamic Articles & Reflections — Nur al-Huda" },
      {
        property: "og:description",
        content: "Reflections on worship, Qur'an, sabr, shukr and sadaqah.",
      },
    ],
  }),
  component: ArticlesPage,
});

function ArticlesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Knowledge"
        arabic="وَقُل رَّبِّ زِدْنِي عِلْمًا"
        title="Islamic Articles"
        subtitle="Slow, careful writing on worship, character and the life of the heart."
      />
      <section className="bg-background py-16">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 md:grid-cols-2">
          {articles.map((a) => (
            <article
              key={a.slug}
              className="group overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-luxe transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/40"
            >
              <div className="islamic-pattern h-32 bg-gradient-emerald opacity-90" aria-hidden />
              <div className="p-7">
                <div className="flex flex-wrap items-center gap-3 text-xs tracking-[0.2em] uppercase">
                  <span className="rounded-full bg-accent px-3 py-1 text-accent-foreground">
                    {a.category}
                  </span>
                  <span className="text-gold">{a.readTime}</span>
                </div>
                <h2 className="mt-4 text-xl font-semibold text-foreground group-hover:text-primary">
                  {a.title}
                </h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">{a.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}