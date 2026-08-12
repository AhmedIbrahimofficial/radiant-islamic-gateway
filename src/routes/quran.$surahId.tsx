import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Moon,
  Pause,
  Play,
  Sun,
  Volume2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { surahAudioUrl, surahDetailQuery } from "../lib/quran-api";
import { recordVisit, useQuranPrefs, useReadingDarkMode } from "../lib/quran-prefs";

export const Route = createFileRoute("/quran/$surahId")({
  head: () => ({
    meta: [
      { title: "Surah Reader — Nur al-Huda" },
      {
        name: "description",
        content:
          "Read any Surah with large Arabic script, Urdu and English translation, audio recitation and a calm dark reading mode.",
      },
      { property: "og:title", content: "Surah Reader — Nur al-Huda" },
      {
        property: "og:description",
        content: "Arabic, Urdu and English with recitation and dark reading mode.",
      },
    ],
  }),
  component: SurahReader,
});

function formatTime(s: number) {
  if (!Number.isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

function AudioPlayer({ number }: { number: number }) {
  const ref = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.85);

  useEffect(() => {
    setPlaying(false);
    setTime(0);
    setDuration(0);
  }, [number]);

  useEffect(() => {
    if (ref.current) ref.current.volume = volume;
  }, [volume]);

  const toggle = () => {
    const el = ref.current;
    if (!el) return;
    if (el.paused) {
      void el.play();
      setPlaying(true);
    } else {
      el.pause();
      setPlaying(false);
    }
  };

  return (
    <div className="glass grid gap-4 rounded-2xl p-5 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-center">
      <audio
        ref={ref}
        src={surahAudioUrl(number)}
        preload="metadata"
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onEnded={() => setPlaying(false)}
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause recitation" : "Play recitation"}
        className="grid size-12 place-items-center rounded-full bg-gradient-gold text-gold-foreground shadow-gold transition-transform hover:scale-105"
      >
        {playing ? <Pause className="size-5" /> : <Play className="size-5" />}
      </button>

      <div className="min-w-0">
        <p className="text-xs tracking-[0.2em] text-gold uppercase">Mishary al-Afasy</p>
        <input
          type="range"
          min={0}
          max={duration || 0}
          value={time}
          aria-label="Recitation progress"
          onChange={(e) => {
            const v = Number(e.target.value);
            if (ref.current) ref.current.currentTime = v;
            setTime(v);
          }}
          className="mt-2 w-full accent-[var(--gold)]"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{formatTime(time)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <label className="flex items-center gap-2 text-muted-foreground">
        <Volume2 className="size-4 shrink-0 text-gold" />
        <input
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={volume}
          aria-label="Volume"
          onChange={(e) => setVolume(Number(e.target.value))}
          className="w-24 accent-[var(--gold)]"
        />
      </label>
    </div>
  );
}

function SurahReader() {
  const { surahId } = Route.useParams();
  const number = Math.min(114, Math.max(1, Number(surahId) || 1));
  const { data, isLoading, isError } = useQuery(surahDetailQuery(number));
  const { bookmarks, toggleBookmark } = useQuranPrefs();
  const { dark, setDark } = useReadingDarkMode();
  const [clean, setClean] = useState(false);

  useEffect(() => {
    recordVisit(number);
  }, [number]);

  return (
    <div className="bg-background pt-28 pb-20">
      <div className="mx-auto max-w-4xl px-5">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
          <Link
            to="/quran"
            className="inline-flex min-w-0 items-center gap-2 text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="size-4 shrink-0" /> <span className="truncate">All Surahs</span>
          </Link>
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => setClean((v) => !v)}
              className="rounded-full border border-border px-4 py-2 text-xs text-foreground transition-colors hover:bg-accent"
            >
              {clean ? "Show translations" : "Clean reading"}
            </button>
            <button
              type="button"
              aria-label="Toggle reading dark mode"
              onClick={() => setDark(!dark)}
              className="grid size-10 place-items-center rounded-full border border-border text-gold transition-colors hover:bg-accent"
            >
              {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>
            <button
              type="button"
              aria-label="Bookmark surah"
              onClick={() => toggleBookmark(number)}
              className="grid size-10 place-items-center rounded-full border border-border text-gold transition-colors hover:bg-accent"
            >
              <Bookmark className={`size-4 ${bookmarks.includes(number) ? "fill-gold" : ""}`} />
            </button>
          </div>
        </div>

        {isLoading && (
          <div className="mt-10 grid gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-24 animate-pulse rounded-2xl bg-muted" />
            ))}
          </div>
        )}
        {isError && (
          <p className="mt-10 text-center text-destructive">
            This Surah could not be loaded. Please check your connection and refresh.
          </p>
        )}

        {data && (
          <>
            <header className="mt-6 overflow-hidden rounded-[2rem] bg-gradient-emerald p-8 text-center text-cream shadow-luxe">
              <p className="text-xs tracking-[0.3em] text-gold uppercase">
                Surah {data.surah.number} · {data.surah.revelationType}
              </p>
              <p className="font-arabic mt-4 text-4xl text-gold sm:text-5xl">{data.surah.name}</p>
              <h1 className="mt-3 text-2xl font-semibold sm:text-3xl">{data.surah.englishName}</h1>
              <p className="mt-2 text-cream/75">
                {data.surah.englishNameTranslation} · {data.surah.numberOfAyahs} verses
              </p>
            </header>

            <div className="mt-6">
              <AudioPlayer number={number} />
            </div>

            {number !== 1 && number !== 9 && (
              <p className="font-arabic mt-10 text-center text-3xl text-primary">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>
            )}

            <div className="mt-8 grid gap-5">
              {data.arabic.map((ayah, i) => (
                <article
                  key={ayah.numberInSurah}
                  className="rounded-2xl border border-border bg-card p-6 shadow-luxe transition-colors hover:border-gold/40"
                >
                  <span className="inline-grid size-9 place-items-center rounded-full bg-accent text-xs font-semibold text-accent-foreground">
                    {ayah.numberInSurah}
                  </span>
                  <p className="font-arabic mt-5 text-right text-3xl leading-[2.6] text-foreground sm:text-[2.15rem]">
                    {ayah.text}
                  </p>
                  {!clean && (
                    <>
                      <p className="font-urdu mt-6 text-right text-lg leading-[2.8] text-muted-foreground">
                        {data.urdu[i]?.text}
                      </p>
                      <p className="mt-5 leading-relaxed text-foreground/85">
                        {data.english[i]?.text}
                      </p>
                    </>
                  )}
                </article>
              ))}
            </div>

            <nav className="mt-10 flex items-center justify-between gap-3">
              {number > 1 ? (
                <Link
                  to="/quran/$surahId"
                  params={{ surahId: String(number - 1) }}
                  className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm hover:bg-accent"
                >
                  <ChevronLeft className="size-4" /> Previous
                </Link>
              ) : (
                <span />
              )}
              {number < 114 && (
                <Link
                  to="/quran/$surahId"
                  params={{ surahId: String(number + 1) }}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-gold px-5 py-2.5 text-sm font-semibold text-gold-foreground shadow-gold"
                >
                  Next <ChevronRight className="size-4" />
                </Link>
              )}
            </nav>
          </>
        )}
      </div>
    </div>
  );
}