import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { BookOpen, Bookmark, Flame, History, Search, Star } from "lucide-react";
import { useMemo, useState } from "react";

import { PageHeader } from "../components/site/PageHeader";
import { dailyVerses, pickByDay } from "../lib/islamic-content";
import { popularSurahs, surahListQuery, type Surah } from "../lib/quran-api";
import { useQuranPrefs } from "../lib/quran-prefs";

export const Route = createFileRoute("/quran/")({
  head: () => ({
    meta: [
      { title: "Read the Qur'an — All 114 Surahs | Nur al-Huda" },
      {
        name: "description",
        content:
          "Browse and search all 114 Surahs of the Holy Qur'an with Arabic text, Urdu and English translation, audio recitation and bookmarks.",
      },
      { property: "og:title", content: "Read the Qur'an — All 114 Surahs" },
      {
        property: "og:description",
        content: "Search all 114 Surahs with translation, recitation and bookmarks.",
      },
    ],
  }),
  component: QuranIndex,
});

function SurahCard({
  surah,
  bookmarked,
  onBookmark,
}: {
  surah: Surah;
  bookmarked: boolean;
  onBookmark: () => void;
}) {
  return (
    <div className="group relative rounded-2xl border border-border bg-card p-5 shadow-luxe transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/50">
      <Link
        to="/quran/$surahId"
        params={{ surahId: String(surah.number) }}
        className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4"
      >
        <span className="grid size-12 shrink-0 rotate-45 place-items-center rounded-lg bg-gradient-emerald">
          <span className="-rotate-45 text-sm font-semibold text-cream">{surah.number}</span>
        </span>
        <span className="min-w-0">
          <span className="block truncate font-display text-base font-semibold text-foreground">
            {surah.englishName}
          </span>
          <span className="block truncate text-xs text-muted-foreground">
            {surah.englishNameTranslation} · {surah.numberOfAyahs} verses
          </span>
          <span className="font-urdu mt-1 block truncate text-base text-primary">{surah.name}</span>
        </span>
      </Link>
      <button
        type="button"
        aria-label="Bookmark surah"
        onClick={onBookmark}
        className="absolute top-4 right-4 text-muted-foreground transition-colors hover:text-gold"
      >
        <Bookmark className={`size-4 ${bookmarked ? "fill-gold text-gold" : ""}`} />
      </button>
    </div>
  );
}

function QuranIndex() {
  const { data: surahs, isLoading, isError } = useQuery(surahListQuery);
  const { bookmarks, recent, lastRead, toggleBookmark } = useQuranPrefs();
  const [term, setTerm] = useState("");
  const verse = pickByDay(dailyVerses, 1);

  const filtered = useMemo(() => {
    if (!surahs) return [];
    const q = term.trim().toLowerCase();
    if (!q) return surahs;
    return surahs.filter(
      (s) =>
        String(s.number) === q ||
        s.englishName.toLowerCase().includes(q) ||
        s.englishNameTranslation.toLowerCase().includes(q) ||
        s.name.includes(term.trim()),
    );
  }, [surahs, term]);

  const byNumber = (n: number) => surahs?.find((s) => s.number === n);

  return (
    <>
      <PageHeader
        eyebrow="Al-Qur'an Al-Kareem"
        arabic="إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ وَإِنَّا لَهُ لَحَافِظُونَ"
        title="The Noble Qur'an"
        subtitle="All 114 Surahs with Arabic, Urdu and English — search, listen, bookmark and continue where you left off."
      />

      <section className="relative bg-cream py-14">
        <div className="islamic-pattern absolute inset-0 opacity-25" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-5">
          {/* Daily verse + continue reading */}
          <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
            <div className="glass rounded-[1.75rem] p-7 shadow-luxe">
              <p className="text-xs tracking-[0.28em] text-gold uppercase">Verse of the day</p>
              <p className="font-arabic mt-4 text-right text-3xl leading-[2.4] text-primary">
                {verse.arabic}
              </p>
              <p className="mt-4 text-sm text-muted-foreground italic">“{verse.english}”</p>
              <p className="mt-3 text-xs tracking-[0.2em] text-gold uppercase">
                {verse.reference}
              </p>
            </div>

            <div className="grid gap-5">
              <div className="rounded-[1.75rem] bg-gradient-emerald p-7 text-cream shadow-luxe">
                <p className="text-xs tracking-[0.28em] text-gold uppercase">Continue reading</p>
                {lastRead && byNumber(lastRead) ? (
                  <>
                    <p className="mt-3 text-2xl font-semibold">{byNumber(lastRead)!.englishName}</p>
                    <Link
                      to="/quran/$surahId"
                      params={{ surahId: String(lastRead) }}
                      className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-gold px-5 py-2.5 text-sm font-semibold text-gold-foreground"
                    >
                      <BookOpen className="size-4" /> Resume
                    </Link>
                  </>
                ) : (
                  <p className="mt-3 text-cream/75">
                    Open any Surah and we'll keep your place for next time.
                  </p>
                )}
              </div>

              <div className="rounded-[1.75rem] border border-border bg-card p-7 shadow-luxe">
                <p className="flex items-center gap-2 text-xs tracking-[0.28em] text-gold uppercase">
                  <History className="size-4" /> Recently viewed
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {recent.length === 0 && (
                    <span className="text-sm text-muted-foreground">Nothing yet.</span>
                  )}
                  {recent.map((n) => (
                    <Link
                      key={n}
                      to="/quran/$surahId"
                      params={{ surahId: String(n) }}
                      className="rounded-full border border-gold/40 px-3 py-1.5 text-xs text-foreground transition-colors hover:bg-accent"
                    >
                      {byNumber(n)?.englishName ?? `Surah ${n}`}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Popular + bookmarks */}
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <div className="rounded-[1.75rem] border border-border bg-card p-7 shadow-luxe">
              <p className="flex items-center gap-2 text-xs tracking-[0.28em] text-gold uppercase">
                <Flame className="size-4" /> Popular Surahs
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {popularSurahs.map((n) => (
                  <Link
                    key={n}
                    to="/quran/$surahId"
                    params={{ surahId: String(n) }}
                    className="rounded-full bg-accent px-4 py-2 text-sm text-accent-foreground transition-colors hover:bg-gold/25"
                  >
                    {byNumber(n)?.englishName ?? `Surah ${n}`}
                  </Link>
                ))}
              </div>
            </div>
            <div className="rounded-[1.75rem] border border-border bg-card p-7 shadow-luxe">
              <p className="flex items-center gap-2 text-xs tracking-[0.28em] text-gold uppercase">
                <Star className="size-4" /> Your bookmarks
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {bookmarks.length === 0 && (
                  <span className="text-sm text-muted-foreground">
                    Tap the bookmark icon on any Surah to save it.
                  </span>
                )}
                {bookmarks.map((n) => (
                  <Link
                    key={n}
                    to="/quran/$surahId"
                    params={{ surahId: String(n) }}
                    className="rounded-full border border-gold/40 px-4 py-2 text-sm text-foreground transition-colors hover:bg-accent"
                  >
                    {byNumber(n)?.englishName ?? `Surah ${n}`}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Directory */}
          <div className="mt-14">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between">
              <h2 className="truncate text-2xl font-semibold text-foreground">Surah Directory</h2>
              <span className="shrink-0 text-sm text-muted-foreground">
                {filtered.length} / 114
              </span>
            </div>
            <div className="glass mt-5 flex items-center gap-3 rounded-2xl px-5 py-3">
              <Search className="size-4 shrink-0 text-gold" />
              <input
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="Search by Surah name or number…"
                className="min-w-0 flex-1 bg-transparent py-1.5 outline-none placeholder:text-muted-foreground"
              />
            </div>

            {isLoading && (
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="h-28 animate-pulse rounded-2xl bg-muted" />
                ))}
              </div>
            )}
            {isError && (
              <p className="mt-8 text-center text-destructive">
                Could not load the Surah list. Please refresh to try again.
              </p>
            )}

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((s) => (
                <SurahCard
                  key={s.number}
                  surah={s}
                  bookmarked={bookmarks.includes(s.number)}
                  onBookmark={() => toggleBookmark(s.number)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}