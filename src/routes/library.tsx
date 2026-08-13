import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Bookmark, Search, Star } from "lucide-react";
import { useMemo, useState } from "react";

import { PageHeader } from "../components/site/PageHeader";
import { FloatingPatterns } from "../components/site/Decor";
import { SectionHeading } from "../components/site/Section";
import { bookCategories, books, readingPaths } from "../lib/library-content";
import { useLocalState, toggleInList } from "../lib/local-store";

export const Route = createFileRoute("/library")({
  head: () => ({
    meta: [
      { title: "Islamic Book Library — Nur al-Huda" },
      {
        name: "description",
        content:
          "Search a curated Islamic library across Qur'an studies, hadith, Seerah, history, character building and children's books with reading recommendations.",
      },
      { property: "og:title", content: "Islamic Book Library — Nur al-Huda" },
      { property: "og:description", content: "Curated Islamic books by category with featured titles and reading paths." },
    ],
  }),
  component: LibraryPage,
});

function LibraryPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [shelf, setShelf] = useLocalState<string[]>("nuralhuda:library-shelf", []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return books.filter(
      (b) =>
        (category === "all" || b.category === category) &&
        (!q ||
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          b.summary.toLowerCase().includes(q)),
    );
  }, [query, category]);

  const featured = books.filter((b) => b.featured);

  return (
    <>
      <PageHeader
        eyebrow="Knowledge"
        title="Islamic Book Library"
        arabic="اقْرَأْ بِاسْمِ رَبِّكَ"
        subtitle="A curated shelf of trusted works — from tafsir and hadith methodology to character building and books for children."
      />

      <section className="relative overflow-hidden py-14 sm:py-16">
        <FloatingPatterns />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow="Featured" title="Start with these" subtitle="Hand-picked titles loved across our study circles." />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((b) => (
              <article
                key={b.id}
                className="rise-in rounded-3xl border border-gold/30 bg-gradient-emerald p-6 text-cream transition-transform duration-300 hover:-translate-y-1 hover:shadow-luxe"
              >
                <Star className="size-5 text-gold" />
                <h3 className="mt-4 text-lg font-semibold">{b.title}</h3>
                <p className="mt-1 text-xs tracking-[0.16em] text-gold uppercase">{b.author}</p>
                <p className="mt-3 text-sm text-cream/80">{b.summary}</p>
              </article>
            ))}
          </div>

          <div className="glass mt-16 flex flex-wrap items-center gap-3 rounded-3xl p-5 shadow-luxe">
            <span className="flex flex-1 items-center gap-3 rounded-full border border-border bg-card px-5 py-3">
              <Search className="size-4 text-gold" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by title, author or topic…"
                className="w-full bg-transparent text-sm outline-none"
              />
            </span>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {["all", ...bookCategories].map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                  category === c
                    ? "bg-gradient-gold text-gold-foreground shadow-gold"
                    : "border border-border text-muted-foreground hover:border-gold/50 hover:text-foreground"
                }`}
              >
                {c === "all" ? "All categories" : c}
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((b) => (
              <article
                key={b.id}
                className="glass rise-in flex flex-col rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-luxe"
              >
                <div className="flex items-start justify-between gap-3">
                  <BookOpen className="size-5 text-gold" />
                  <button
                    type="button"
                    aria-label="Save to my shelf"
                    onClick={() => setShelf((prev) => toggleInList(prev, b.id))}
                    className={`transition-colors ${shelf.includes(b.id) ? "text-gold" : "text-muted-foreground hover:text-gold"}`}
                  >
                    <Bookmark className={`size-5 ${shelf.includes(b.id) ? "fill-current" : ""}`} />
                  </button>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">{b.title}</h3>
                <p className="mt-1 text-xs tracking-[0.16em] text-muted-foreground uppercase">{b.author}</p>
                <p className="mt-3 flex-1 text-sm text-muted-foreground">{b.summary}</p>
                <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">{b.category}</span>
                  <span>{b.level} · {b.pages} pages</span>
                </div>
              </article>
            ))}
            {filtered.length === 0 && (
              <p className="glass rounded-3xl p-8 text-center text-sm text-muted-foreground md:col-span-2 lg:col-span-3">
                No books match that search.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow="Recommendations" title="Reading paths" subtitle="Three curated journeys depending on where you are today." />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {readingPaths.map((p) => (
              <article key={p.title} className="glass rounded-3xl p-6">
                <h3 className="text-lg font-semibold text-foreground">{p.title}</h3>
                <ol className="mt-4 grid gap-2 text-sm text-muted-foreground">
                  {p.books.map((b, i) => (
                    <li key={b}>
                      <span className="text-gold">{i + 1}.</span> {b}
                    </li>
                  ))}
                </ol>
              </article>
            ))}
          </div>
          <p className="mt-10 text-center text-xs text-muted-foreground">
            {shelf.length > 0 ? `${shelf.length} book${shelf.length > 1 ? "s" : ""} saved to your shelf on this device.` : "Tap the bookmark icon to build your personal shelf."}
          </p>
        </div>
      </section>
    </>
  );
}
