import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BookOpen, Compass, Quote, ScrollText, Sparkles } from "lucide-react";

import heroImage from "../assets/mosque-hero.jpg";
import { SectionHeading, Ornament } from "../components/site/Section";
import {
  articles,
  dailyHadiths,
  dailyVerses,
  duas,
  historyMilestones,
  islamicQuotes,
  pickByDay,
} from "../lib/islamic-content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nur al-Huda — Peaceful Islamic Learning Platform" },
      {
        name: "description",
        content:
          "Daily Qur'an verse, authentic hadith, duas and prayer times in a calm, elegant Islamic experience.",
      },
      { property: "og:title", content: "Nur al-Huda — Peaceful Islamic Learning Platform" },
      {
        property: "og:description",
        content: "Daily Qur'an verse, authentic hadith, duas and prayer times in a calm, elegant Islamic experience.",
      },
    ],
  }),
  component: Index,
});

function Lantern({ className, delay }: { className: string; delay: string }) {
  return (
    <div className={`pointer-events-none absolute ${className}`} aria-hidden>
      <div className="animate-sway origin-top" style={{ animationDelay: delay }}>
        <div className="mx-auto h-16 w-px bg-gold/50" />
        <div className="relative mx-auto size-10 rounded-b-2xl rounded-t-md bg-gradient-gold shadow-gold">
          <div className="animate-glow absolute inset-0 rounded-b-2xl rounded-t-md bg-gold blur-md" />
        </div>
        <div className="mx-auto mt-1 h-2 w-3 rounded-b-full bg-gold/80" />
      </div>
    </div>
  );
}

function Index() {
  const verse = pickByDay(dailyVerses);
  const hadith = pickByDay(dailyHadiths);
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setQuoteIndex((i) => (i + 1) % islamicQuotes.length), 5000);
    return () => clearInterval(id);
  }, []);

  const quote = islamicQuotes[quoteIndex]!;

  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
        <img
          src={heroImage}
          alt="Grand mosque silhouetted against a golden sunrise"
          width={1920}
          height={1088}
          className="absolute inset-0 size-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ backgroundImage: "var(--gradient-hero)" }}
          aria-hidden
        />
        <div className="islamic-pattern absolute inset-0 opacity-30" aria-hidden />

        <Lantern className="left-6 top-24 sm:left-16" delay="0s" />
        <Lantern className="right-8 top-32 sm:right-24" delay="1.4s" />
        <Lantern className="left-1/3 top-16 hidden sm:block" delay="2.6s" />
        <Lantern className="right-1/3 top-40 hidden lg:block" delay="3.8s" />

        <div className="relative mx-auto max-w-4xl px-5 pt-24 pb-16 text-center">
          <p className="rise-in font-arabic text-2xl text-gold sm:text-3xl">
            ٱلسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ ٱللَّهِ وَبَرَكَاتُهُ
          </p>
          <h1 className="rise-in mt-6 text-3xl leading-tight font-semibold text-cream sm:text-5xl lg:text-6xl">
            Assalamu Alaikum Wa Rahmatullahi Wa Barakatuh
          </h1>
          <p className="rise-in mx-auto mt-6 max-w-2xl text-base leading-relaxed text-cream/80 sm:text-lg">
            A tranquil place to read the Qur'an, reflect on authentic hadith, and keep your heart
            connected to Allah through every hour of the day.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/quran"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-gold px-7 py-3.5 text-sm font-semibold text-gold-foreground shadow-gold transition-transform hover:scale-[1.03]"
            >
              <BookOpen className="size-4" /> Explore Quran
            </Link>
            <Link
              to="/articles"
              className="inline-flex items-center gap-2 rounded-full border border-gold/50 px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-gold/15"
            >
              <Compass className="size-4" /> Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Daily verse */}
      <section className="relative bg-cream py-20">
        <div className="islamic-pattern absolute inset-0 opacity-25" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-5">
          <SectionHeading
            eyebrow="Ayah of the Day"
            title="Daily Qur'an Verse"
            subtitle="A verse to carry with you, in Arabic, Urdu and English."
          />
          <article className="glass mt-12 rounded-[2rem] p-8 shadow-luxe sm:p-12">
            <p className="font-arabic text-center text-3xl leading-[2.4] text-primary sm:text-4xl">
              {verse.arabic}
            </p>
            <div className="my-8">
              <Ornament />
            </div>
            <p className="font-urdu text-right text-xl leading-[2.6] text-foreground">
              {verse.urdu}
            </p>
            <p className="mt-6 text-center text-lg leading-relaxed text-muted-foreground italic">
              “{verse.english}”
            </p>
            <p className="mt-6 text-center text-xs tracking-[0.24em] text-gold uppercase">
              {verse.reference}
            </p>
          </article>
        </div>
      </section>

      {/* Daily hadith */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-5xl px-5">
          <SectionHeading
            eyebrow="Sunnah"
            title="Hadith of the Day"
            subtitle="Guidance from the beloved Prophet Muhammad ﷺ."
          />
          <article className="mt-12 overflow-hidden rounded-[2rem] bg-gradient-emerald p-8 text-cream shadow-luxe sm:p-12">
            <ScrollText className="size-8 text-gold" />
            <p className="mt-6 text-xl leading-relaxed sm:text-2xl">“{hadith.text}”</p>
            <p className="font-urdu mt-6 text-right text-lg leading-[2.6] text-cream/80">
              {hadith.urdu}
            </p>
            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-gold/40 px-4 py-2 text-xs tracking-[0.2em] text-gold uppercase">
              {hadith.source}
            </div>
          </article>
        </div>
      </section>

      {/* Rotating quote */}
      <section className="relative overflow-hidden bg-beige py-20">
        <div className="islamic-pattern absolute inset-0 opacity-30" aria-hidden />
        <div className="relative mx-auto max-w-3xl px-5 text-center">
          <Quote className="mx-auto size-8 text-gold" />
          <p
            key={quoteIndex}
            className="rise-in mt-6 text-2xl leading-relaxed font-medium text-foreground sm:text-3xl"
          >
            {quote.text}
          </p>
          <p className="mt-5 text-sm tracking-[0.24em] text-primary uppercase">— {quote.author}</p>
          <div className="mt-8 flex justify-center gap-2">
            {islamicQuotes.map((_, i) => (
              <button
                key={i}
                aria-label={`Show quote ${i + 1}`}
                onClick={() => setQuoteIndex(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === quoteIndex ? "w-8 bg-gold" : "w-3 bg-primary/25"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured content */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-5">
          <SectionHeading
            eyebrow="Featured"
            title="Read, Reflect, Remember"
            subtitle="Latest articles, beloved duas, and moments from Islamic history."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            <div className="rounded-[1.75rem] border border-border bg-card p-7 shadow-luxe transition-transform duration-300 hover:-translate-y-1.5">
              <div className="flex items-center gap-2 text-gold">
                <Sparkles className="size-4" />
                <span className="text-xs tracking-[0.24em] uppercase">Latest Articles</span>
              </div>
              <div className="mt-6 grid gap-5">
                {articles.slice(0, 3).map((a) => (
                  <Link key={a.slug} to="/articles" className="group block">
                    <p className="font-display text-lg font-semibold text-foreground group-hover:text-primary">
                      {a.title}
                    </p>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{a.excerpt}</p>
                    <p className="mt-2 text-xs text-gold">{a.readTime}</p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-border bg-card p-7 shadow-luxe transition-transform duration-300 hover:-translate-y-1.5">
              <div className="flex items-center gap-2 text-gold">
                <Sparkles className="size-4" />
                <span className="text-xs tracking-[0.24em] uppercase">Featured Duas</span>
              </div>
              <div className="mt-6 grid gap-5">
                {duas.slice(0, 3).map((d) => (
                  <div key={d.title}>
                    <p className="font-arabic text-2xl leading-[2.2] text-primary">{d.arabic}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{d.english}</p>
                  </div>
                ))}
              </div>
              <Link
                to="/duas"
                className="mt-6 inline-block text-sm font-semibold text-primary hover:text-gold"
              >
                All duas →
              </Link>
            </div>

            <div className="rounded-[1.75rem] border border-border bg-card p-7 shadow-luxe transition-transform duration-300 hover:-translate-y-1.5">
              <div className="flex items-center gap-2 text-gold">
                <Sparkles className="size-4" />
                <span className="text-xs tracking-[0.24em] uppercase">History Highlights</span>
              </div>
              <div className="mt-6 grid gap-5">
                {historyMilestones.slice(0, 3).map((m) => (
                  <div key={m.year} className="border-l-2 border-gold/40 pl-4">
                    <p className="text-xs tracking-[0.2em] text-gold uppercase">{m.year}</p>
                    <p className="font-display text-base font-semibold text-foreground">
                      {m.title}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">{m.detail}</p>
                  </div>
                ))}
              </div>
              <Link
                to="/history"
                className="mt-6 inline-block text-sm font-semibold text-primary hover:text-gold"
              >
                Full timeline →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}