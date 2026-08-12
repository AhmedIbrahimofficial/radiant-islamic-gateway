import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import { PageHeader } from "../components/site/PageHeader";
import { divineNames } from "../lib/asma-ul-husna";

export const Route = createFileRoute("/names")({
  head: () => ({
    meta: [
      { title: "99 Names of Allah (Asma ul Husna) — Nur al-Huda" },
      {
        name: "description",
        content:
          "Explore the 99 beautiful names of Allah in Arabic with English and Urdu meanings, in an interactive searchable grid.",
      },
      { property: "og:title", content: "99 Names of Allah — Asma ul Husna" },
      {
        property: "og:description",
        content: "The 99 names of Allah with Arabic, English and Urdu meanings.",
      },
    ],
  }),
  component: NamesPage,
});

function NamesPage() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<number | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return divineNames;
    return divineNames.filter((n) =>
      [n.arabic, n.transliteration, n.english, n.urdu, String(n.number)].some((f) =>
        f.toLowerCase().includes(q),
      ),
    );
  }, [query]);

  return (
    <>
      <PageHeader
        eyebrow="Asma ul Husna"
        arabic="وَلِلَّهِ الْأَسْمَاءُ الْحُسْنَىٰ فَادْعُوهُ بِهَا"
        title="The 99 Names of Allah"
        subtitle="To Allah belong the most beautiful names — so call upon Him by them."
      />

      <section className="relative bg-background py-16">
        <div className="islamic-pattern absolute inset-0 opacity-20" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-5">
          <label className="relative mx-auto block max-w-xl">
            <span className="sr-only">Search the 99 names</span>
            <Search className="absolute top-1/2 left-4 size-5 -translate-y-1/2 text-gold" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search a name — Ar-Rahman, mercy, نور…"
              className="w-full rounded-2xl border border-gold/30 bg-card py-4 pr-4 pl-12 text-foreground shadow-luxe outline-none transition focus:border-gold"
            />
          </label>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {results.map((n) => (
              <button
                key={n.number}
                type="button"
                onClick={() => setActive(active === n.number ? null : n.number)}
                aria-expanded={active === n.number}
                className="group glass rounded-[1.5rem] border-gold/30 p-5 text-center transition-all duration-300 hover:-translate-y-2 hover:border-gold hover:shadow-gold"
              >
                <span className="grid size-9 place-items-center rounded-full border border-gold/40 text-xs text-gold mx-auto">
                  {n.number}
                </span>
                <p className="font-arabic mt-4 text-3xl text-primary transition-colors group-hover:text-gold">
                  {n.arabic}
                </p>
                <p className="mt-3 text-sm font-semibold text-foreground">{n.transliteration}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{n.english}</p>
                <p
                  className={`font-urdu overflow-hidden text-base leading-[2.4] text-gold transition-all duration-500 ${
                    active === n.number ? "mt-3 max-h-24 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  {n.urdu}
                </p>
              </button>
            ))}
          </div>
          {results.length === 0 && (
            <p className="mt-10 text-center text-muted-foreground">No name matches that search.</p>
          )}
        </div>
      </section>
    </>
  );
}
