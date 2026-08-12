import { createFileRoute } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { useState } from "react";

import { PageHeader } from "../components/site/PageHeader";
import { SectionHeading } from "../components/site/Section";
import { kidsCards, kidsQuiz, kidsStories } from "../lib/kids-content";

export const Route = createFileRoute("/kids")({
  head: () => ({
    meta: [
      { title: "Kids Islamic Corner — Nur al-Huda" },
      {
        name: "description",
        content:
          "Islamic stories for children, simple learning cards and a fun quiz — a joyful, child-friendly way to learn about Islam.",
      },
      { property: "og:title", content: "Kids Islamic Corner — Nur al-Huda" },
      {
        property: "og:description",
        content: "Stories, learning cards and quizzes for young Muslims.",
      },
    ],
  }),
  component: KidsPage,
});

function KidsQuiz() {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const q = kidsQuiz[i]!;
  const finished = i >= kidsQuiz.length - 1 && picked !== null;

  return (
    <div className="glass rounded-[1.75rem] border-gold/40 p-7 shadow-luxe">
      <p className="text-xs tracking-[0.2em] text-gold uppercase">
        Question {i + 1} of {kidsQuiz.length} · Stars {score} ⭐
      </p>
      <h3 className="mt-4 text-xl font-semibold text-foreground">{q.question}</h3>
      <div className="mt-5 grid gap-3">
        {q.options.map((o, idx) => (
          <button
            key={o}
            type="button"
            onClick={() => {
              if (picked !== null) return;
              setPicked(idx);
              if (idx === q.answer) setScore((s) => s + 1);
            }}
            className={`rounded-2xl border px-5 py-4 text-left text-sm transition-all duration-300 ${
              picked !== null && idx === q.answer
                ? "border-primary bg-primary/10 text-primary"
                : picked === idx
                  ? "border-destructive bg-destructive/10 text-destructive"
                  : "border-gold/25 bg-card hover:-translate-y-0.5 hover:border-gold"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
      {picked !== null && (
        <button
          type="button"
          onClick={() => {
            if (finished) {
              setI(0);
              setScore(0);
            } else {
              setI(i + 1);
            }
            setPicked(null);
          }}
          className="mt-6 rounded-full bg-gradient-gold px-6 py-3 text-sm font-semibold text-gold-foreground shadow-gold"
        >
          {finished ? "Play again" : "Next question"}
        </button>
      )}
    </div>
  );
}

function KidsPage() {
  return (
    <>
      <PageHeader
        eyebrow="For young hearts"
        arabic="كُلُّ مَوْلُودٍ يُولَدُ عَلَى الْفِطْرَةِ"
        title="Kids Islamic Corner"
        subtitle="Sweet stories, simple lessons and a fun quiz for little Muslims."
      />

      <section className="relative bg-cream py-16">
        <div className="islamic-pattern absolute inset-0 opacity-25" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-5">
          <SectionHeading
            eyebrow="Story time"
            title="Islamic Stories for Children"
            subtitle="Short stories with a beautiful lesson at the end."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {kidsStories.map((s) => (
              <article
                key={s.slug}
                className="glass rounded-[1.75rem] border-gold/30 p-7 shadow-luxe transition-all duration-300 hover:-translate-y-2 hover:border-gold hover:shadow-gold"
              >
                <span className="text-4xl" aria-hidden>
                  {s.emoji}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-primary">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/80">{s.story}</p>
                <p className="mt-5 flex items-start gap-2 rounded-2xl border border-gold/25 bg-card/70 p-4 text-sm text-muted-foreground">
                  <Sparkles className="mt-0.5 size-4 shrink-0 text-gold" />
                  {s.moral}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHeading
            eyebrow="Learning cards"
            title="Simple Things Every Child Should Know"
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {kidsCards.map((c) => (
              <div
                key={c.title}
                className="rounded-[1.5rem] border border-gold/30 bg-card p-6 text-center shadow-luxe transition-transform duration-300 hover:-translate-y-1.5"
              >
                <span className="text-3xl" aria-hidden>
                  {c.emoji}
                </span>
                <h3 className="mt-3 text-base font-semibold text-primary">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.text}</p>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-16 max-w-2xl">
            <SectionHeading eyebrow="Fun quiz" title="Let's Test What You Learned" />
            <div className="mt-8">
              <KidsQuiz />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
