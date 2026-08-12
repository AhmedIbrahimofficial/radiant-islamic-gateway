import { createFileRoute } from "@tanstack/react-router";
import { Search, Volume2, Square } from "lucide-react";
import { useMemo, useState } from "react";

import { PageHeader } from "../components/site/PageHeader";
import { duaCategories, duaCollection, type DuaEntry } from "../lib/dua-collection";
import { speakArabic, stopSpeaking } from "../lib/speak";

export const Route = createFileRoute("/duas")({
  head: () => ({
    meta: [
      { title: "Dua Collection Center — Nur al-Huda" },
      {
        name: "description",
        content:
          "Searchable dua collection by category — morning, evening, travel, sleeping, eating, masjid, protection and Ramadan — with Arabic, transliteration, English, Urdu and audio.",
      },
      { property: "og:title", content: "Dua Collection Center — Nur al-Huda" },
      {
        property: "og:description",
        content: "Duas by category with transliteration, translations and audio playback.",
      },
    ],
  }),
  component: DuasPage,
});

function DuaCard({ d }: { d: DuaEntry }) {
  const [playing, setPlaying] = useState(false);
  return (
    <article className="glass rounded-[1.75rem] border-gold/40 p-7 shadow-luxe transition-transform duration-300 hover:-translate-y-1.5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-primary">{d.title}</h3>
          <p className="mt-1 text-[11px] tracking-[0.22em] text-gold uppercase">{d.category}</p>
        </div>
        <button
          type="button"
          aria-label={playing ? `Stop ${d.title} audio` : `Play ${d.title} audio`}
          onClick={() => {
            if (playing) {
              stopSpeaking();
              setPlaying(false);
              return;
            }
            const ok = speakArabic(d.arabic, () => setPlaying(false));
            setPlaying(ok);
          }}
          className="grid size-11 shrink-0 place-items-center rounded-2xl border border-gold/40 text-gold transition-colors hover:bg-gold/15"
        >
          {playing ? <Square className="size-4" /> : <Volume2 className="size-5" />}
        </button>
      </div>
      <p className="font-arabic mt-6 text-right text-3xl leading-[2.4] text-foreground">
        {d.arabic}
      </p>
      <p className="mt-4 text-sm text-gold/90 italic">{d.transliteration}</p>
      <p className="font-urdu mt-4 text-right text-base leading-[2.6] text-muted-foreground">
        {d.urdu}
      </p>
      <p className="mt-4 text-sm leading-relaxed text-foreground/80">{d.english}</p>
      <p className="mt-5 text-xs tracking-[0.22em] text-gold uppercase">{d.source}</p>
    </article>
  );
}

function DuasPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return duaCollection.filter((d) => {
      const inCat = category === "All" || d.category === category;
      const inQuery =
        !q ||
        [d.title, d.english, d.transliteration, d.urdu, d.arabic, d.source, d.category].some((f) =>
          f.toLowerCase().includes(q),
        );
      return inCat && inQuery;
    });
  }, [query, category]);

  return (
    <>
      <PageHeader
        eyebrow="Supplication"
        arabic="وَقَالَ رَبُّكُمُ ادْعُونِي أَسْتَجِبْ لَكُمْ"
        title="Dua Collection Center"
        subtitle="Search duas by moment and category — with transliteration, translations and audio."
      />

      <section className="relative bg-cream py-16">
        <div className="islamic-pattern absolute inset-0 opacity-25" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-5">
          <label className="relative block">
            <span className="sr-only">Search duas</span>
            <Search className="absolute top-1/2 left-4 size-5 -translate-y-1/2 text-gold" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search duas — protection, travel, forgiveness…"
              className="w-full rounded-2xl border border-gold/30 bg-card py-4 pr-4 pl-12 text-foreground shadow-luxe outline-none transition focus:border-gold"
            />
          </label>

          <div className="mt-6 flex flex-wrap gap-2">
            {["All", ...duaCategories].map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                aria-pressed={category === c}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  category === c
                    ? "border-gold bg-gradient-gold text-gold-foreground shadow-gold"
                    : "border-gold/30 text-primary hover:bg-gold/10"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            {results.length} dua{results.length === 1 ? "" : "s"} found
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {results.map((d) => (
              <DuaCard key={d.id} d={d} />
            ))}
          </div>
          {results.length === 0 && (
            <p className="mt-10 text-center text-muted-foreground">
              No duas match that search. Try another word.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
