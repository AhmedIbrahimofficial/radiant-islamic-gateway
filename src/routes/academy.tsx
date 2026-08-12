import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Columns3, Heart, Home, Star, Users } from "lucide-react";

import { PageHeader } from "../components/site/PageHeader";
import { academySections } from "../lib/academy-content";

const icons = { book: BookOpen, columns: Columns3, users: Users, star: Star, heart: Heart, home: Home };

export const Route = createFileRoute("/academy")({
  head: () => ({
    meta: [
      { title: "Islamic Learning Academy — Nur al-Huda" },
      {
        name: "description",
        content:
          "Learn the basics of Islam, the five pillars, stories of the prophets and Sahaba, Islamic manners and family character building.",
      },
      { property: "og:title", content: "Islamic Learning Academy — Nur al-Huda" },
      {
        property: "og:description",
        content: "Structured Islamic learning tracks from belief to character building.",
      },
    ],
  }),
  component: AcademyPage,
});

function AcademyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Learn"
        arabic="وَقُل رَّبِّ زِدْنِي عِلْمًا"
        title="Islamic Learning Academy"
        subtitle="Six structured tracks that take you from belief to beautiful character."
      />
      <section className="relative bg-background py-16">
        <div className="islamic-pattern absolute inset-0 opacity-20" aria-hidden />
        <div className="relative mx-auto grid max-w-6xl gap-6 px-5 md:grid-cols-2">
          {academySections.map((s) => {
            const Icon = icons[s.icon];
            return (
              <article
                key={s.slug}
                className="glass rounded-[1.75rem] border-gold/30 p-7 shadow-luxe transition-all duration-300 hover:-translate-y-2 hover:border-gold hover:shadow-gold"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="grid size-12 place-items-center rounded-2xl bg-gradient-gold shadow-gold">
                    <Icon className="size-6 text-gold-foreground" />
                  </span>
                  <p className="font-arabic text-xl text-gold">{s.arabic}</p>
                </div>
                <h2 className="mt-5 text-xl font-semibold text-primary">{s.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{s.tagline}</p>
                <ul className="mt-5 grid gap-3">
                  {s.lessons.map((l) => (
                    <li
                      key={l.title}
                      className="rounded-2xl border border-gold/20 bg-card/70 p-4 transition-colors hover:border-gold/50"
                    >
                      <p className="text-sm font-semibold text-foreground">{l.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {l.summary}
                      </p>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
