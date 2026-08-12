import { createFileRoute } from "@tanstack/react-router";
import { Share2, ScrollText } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { PageHeader } from "../components/site/PageHeader";
import { SectionHeading } from "../components/site/Section";
import { hadithCenter, type DailyHadith } from "../lib/hadith-daily";
import { pickByDay } from "../lib/islamic-content";

export const Route = createFileRoute("/hadith")({
  head: () => ({
    meta: [
      { title: "Daily Hadith Center — Nur al-Huda" },
      {
        name: "description",
        content:
          "A new authentic hadith every day with Arabic text, English and Urdu translation, source reference and one-tap sharing.",
      },
      { property: "og:title", content: "Daily Hadith Center — Nur al-Huda" },
      {
        property: "og:description",
        content: "Authentic hadith with Arabic, English and Urdu translation, refreshed daily.",
      },
    ],
  }),
  component: HadithPage,
});

function ShareButton({ h }: { h: DailyHadith }) {
  const [busy, setBusy] = useState(false);
  const text = `“${h.english}”\n${h.arabic}\n— ${h.source}`;
  return (
    <button
      type="button"
      disabled={busy}
      onClick={async () => {
        setBusy(true);
        try {
          if (typeof navigator !== "undefined" && navigator.share) {
            await navigator.share({ title: `Hadith — ${h.source}`, text });
          } else {
            await navigator.clipboard.writeText(text);
            toast.success("Hadith copied to clipboard");
          }
        } catch {
          /* dismissed */
        } finally {
          setBusy(false);
        }
      }}
      className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-4 py-2 text-xs font-medium tracking-[0.12em] text-gold uppercase transition-colors hover:bg-gold/15 disabled:opacity-60"
    >
      <Share2 className="size-3.5" /> Share
    </button>
  );
}

function HadithCard({ h, featured = false }: { h: DailyHadith; featured?: boolean }) {
  return (
    <article
      className={`rounded-[1.75rem] border border-gold/40 p-7 shadow-luxe transition-all duration-300 hover:-translate-y-1.5 hover:border-gold ${
        featured ? "glass" : "bg-card"
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="inline-flex items-center gap-2 text-xs tracking-[0.22em] text-gold uppercase">
          <ScrollText className="size-4" /> {h.theme}
        </span>
        <ShareButton h={h} />
      </div>
      <p className="font-arabic mt-6 text-right text-2xl leading-[2.2] text-foreground sm:text-3xl">
        {h.arabic}
      </p>
      <p className="font-urdu mt-5 text-right text-base leading-[2.6] text-muted-foreground">
        {h.urdu}
      </p>
      <p className="mt-5 text-base leading-relaxed text-foreground/85">“{h.english}”</p>
      <p className="mt-6 text-xs tracking-[0.22em] text-gold uppercase">{h.source}</p>
    </article>
  );
}

function HadithPage() {
  const today = pickByDay(hadithCenter);
  return (
    <>
      <PageHeader
        eyebrow="Sunnah of the Prophet ﷺ"
        arabic="وَمَا يَنطِقُ عَنِ الْهَوَىٰ"
        title="Daily Hadith Center"
        subtitle="A new hadith each day — with Arabic, Urdu and English, ready to share."
      />

      <section className="relative bg-cream py-16">
        <div className="islamic-pattern absolute inset-0 opacity-25" aria-hidden />
        <div className="relative mx-auto max-w-3xl px-5">
          <p className="text-center text-xs tracking-[0.3em] text-gold uppercase">
            Hadith of the day
          </p>
          <div className="mt-6 rise-in">
            <HadithCard h={today} featured />
          </div>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHeading
            eyebrow="Collection"
            title="More Authentic Narrations"
            subtitle="Curated from Sahih al-Bukhari, Sahih Muslim and other trusted collections."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {hadithCenter
              .filter((h) => h.source !== today.source)
              .map((h) => (
                <HadithCard key={h.source} h={h} />
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
