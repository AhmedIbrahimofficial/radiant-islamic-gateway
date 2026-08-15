import { createFileRoute } from "@tanstack/react-router";
import { Clock, Heart, PlayCircle, Search, X } from "lucide-react";
import { useMemo, useState } from "react";

import { PageHeader } from "../components/site/PageHeader";
import { FloatingPatterns } from "../components/site/Decor";
import { SectionHeading } from "../components/site/Section";
import { videoCategories, videos } from "../lib/videos-content";
import { toggleInList, useLocalState } from "../lib/local-store";

export const Route = createFileRoute("/videos")({
  head: () => ({
    meta: [
      { title: "Islamic Video Center — Nur al-Huda" },
      {
        name: "description",
        content:
          "Featured Islamic lectures, scholar playlists, documentaries and educational series with search, watch-later and favourites.",
      },
      { property: "og:title", content: "Islamic Video Center — Nur al-Huda" },
      { property: "og:description", content: "Lectures, playlists, documentaries and series with watch later and favourites." },
    ],
  }),
  component: VideosPage,
});

function VideosPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [tab, setTab] = useState<"all" | "later" | "favourites">("all");
  const [later, setLater] = useLocalState<string[]>("nuralhuda:watch-later", []);
  const [favourites, setFavourites] = useLocalState<string[]>("nuralhuda:video-favourites", []);
  const [playing, setPlaying] = useState<string | null>(null);
  const active = videos.find((v) => v.id === playing);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return videos.filter((v) => {
      if (tab === "later" && !later.includes(v.id)) return false;
      if (tab === "favourites" && !favourites.includes(v.id)) return false;
      if (category !== "all" && v.category !== category) return false;
      return !q || v.title.toLowerCase().includes(q) || v.speaker.toLowerCase().includes(q) || v.topic.toLowerCase().includes(q);
    });
  }, [query, category, tab, later, favourites]);

  return (
    <>
      <PageHeader
        eyebrow="Watch & learn"
        title="Islamic Video Center"
        arabic="وَعَلَّمَكَ مَا لَمْ تَكُن تَعْلَمُ"
        subtitle="Lectures, playlists, documentaries and structured series — curated for benefit, saved for later."
      />

      <section className="relative overflow-hidden py-14 sm:py-16">
        <FloatingPatterns />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="glass flex flex-wrap items-center gap-3 rounded-3xl p-5 shadow-luxe">
            <span className="flex min-w-56 flex-1 items-center gap-3 rounded-full border border-border bg-card px-5 py-3">
              <Search className="size-4 text-gold" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search lectures, scholars or topics…"
                className="w-full bg-transparent text-sm outline-none"
              />
            </span>
            {(["all", "later", "favourites"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`rounded-full px-4 py-2.5 text-xs font-semibold transition-colors ${
                  tab === t ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground hover:border-gold/50"
                }`}
              >
                {t === "all" ? "All videos" : t === "later" ? `Watch later (${later.length})` : `Favourites (${favourites.length})`}
              </button>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {["all", ...videoCategories].map((c) => (
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

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((v) => (
              <article
                key={v.id}
                className="glass rise-in flex flex-col overflow-hidden rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-luxe"
              >
                {playing === v.id ? (
                  <div className="relative aspect-video bg-emerald-deep">
                    <iframe
                      className="absolute inset-0 size-full"
                      src={`https://www.youtube-nocookie.com/embed/${v.youtubeId}?autoplay=1&rel=0`}
                      title={v.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      loading="lazy"
                    />
                    <button
                      type="button"
                      aria-label="Close player"
                      onClick={() => setPlaying(null)}
                      className="absolute right-2 top-2 z-10 rounded-full bg-emerald-deep/80 p-1.5 text-cream"
                    >
                      <X className="size-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setPlaying(v.id)}
                    aria-label={`Play ${v.title}`}
                    className="group relative grid aspect-video w-full place-items-center bg-gradient-emerald"
                  >
                    <img
                      src={`https://i.ytimg.com/vi/${v.youtubeId}/hqdefault.jpg`}
                      alt={v.title}
                      loading="lazy"
                      className="absolute inset-0 size-full object-cover opacity-70 transition-opacity duration-300 group-hover:opacity-90"
                    />
                    <div className="islamic-pattern absolute inset-0 opacity-30" aria-hidden />
                    <PlayCircle className="relative size-14 text-gold transition-transform duration-300 group-hover:scale-110" strokeWidth={1.2} />
                    <span className="absolute bottom-3 right-3 rounded-full bg-emerald-deep/80 px-3 py-1 text-xs text-cream">
                      {v.duration}
                    </span>
                  </button>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <span className="text-xs tracking-[0.2em] text-gold uppercase">{v.category} · {v.topic}</span>
                  <h3 className="mt-3 text-lg font-semibold text-foreground">{v.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{v.speaker}</p>
                  <p className="mt-3 flex-1 text-sm text-muted-foreground">{v.description}</p>
                  <div className="mt-5 flex items-center gap-3 text-xs">
                    <button
                      type="button"
                      onClick={() => setLater((prev) => toggleInList(prev, v.id))}
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 transition-colors ${
                        later.includes(v.id) ? "border-gold/60 text-gold" : "border-border text-muted-foreground hover:border-gold/50"
                      }`}
                    >
                      <Clock className="size-3.5" /> Watch later
                    </button>
                    <button
                      type="button"
                      onClick={() => setFavourites((prev) => toggleInList(prev, v.id))}
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 transition-colors ${
                        favourites.includes(v.id) ? "border-gold/60 text-gold" : "border-border text-muted-foreground hover:border-gold/50"
                      }`}
                    >
                      <Heart className={`size-3.5 ${favourites.includes(v.id) ? "fill-current" : ""}`} /> Favourite
                    </button>
                  </div>
                </div>
              </article>
            ))}
            {filtered.length === 0 && (
              <p className="glass rounded-3xl p-8 text-center text-sm text-muted-foreground md:col-span-2 lg:col-span-3">
                Nothing here yet — save a lecture to watch later or adjust your search.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow="Scholars" title="Voices you can trust" subtitle="Every series is reviewed before it reaches this library." />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[...new Set(videos.map((v) => v.speaker))].map((s) => (
              <article key={s} className="glass rounded-3xl p-6 text-center">
                <p className="text-base font-semibold text-foreground">{s}</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {videos.filter((v) => v.speaker === s).length} items
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
