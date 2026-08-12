import { createFileRoute } from "@tanstack/react-router";
import { Award, Check, RotateCcw, Trophy, X } from "lucide-react";
import { useEffect, useState } from "react";

import { PageHeader } from "../components/site/PageHeader";
import { SectionHeading } from "../components/site/Section";
import { badges, quizCategories, quizLevels, type QuizLevel } from "../lib/quiz-content";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "Islamic Quiz Center — Nur al-Huda" },
      {
        name: "description",
        content:
          "Test your Islamic knowledge across Qur'an, Seerah, Fiqh and Akhlaq at beginner, intermediate and advanced levels with score tracking and achievement badges.",
      },
      { property: "og:title", content: "Islamic Quiz Center — Nur al-Huda" },
      {
        property: "og:description",
        content: "Multi-level Islamic quizzes with progress dashboard and badges.",
      },
    ],
  }),
  component: QuizPage,
});

type Progress = { completed: number; correct: number; total: number };
const KEY = "nuralhuda:quiz-progress";

function QuizPage() {
  const [progress, setProgress] = useState<Progress>({ completed: 0, correct: 0, total: 0 });
  const [categorySlug, setCategorySlug] = useState(quizCategories[0]!.slug);
  const [level, setLevel] = useState<QuizLevel>("Beginner");
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setProgress(JSON.parse(raw) as Progress);
    } catch {
      /* ignore */
    }
  }, []);

  const category = quizCategories.find((c) => c.slug === categorySlug)!;
  const questions = category.levels[level];
  const question = questions[index]!;

  const reset = () => {
    setIndex(0);
    setPicked(null);
    setScore(0);
    setDone(false);
  };

  const answer = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    const isCorrect = i === question.answer;
    const nextScore = score + (isCorrect ? 1 : 0);
    setScore(nextScore);
    setTimeout(() => {
      if (index + 1 < questions.length) {
        setIndex(index + 1);
        setPicked(null);
      } else {
        setDone(true);
        const next: Progress = {
          completed: progress.completed + 1,
          correct: progress.correct + nextScore,
          total: progress.total + questions.length,
        };
        setProgress(next);
        try {
          localStorage.setItem(KEY, JSON.stringify(next));
        } catch {
          /* ignore */
        }
      }
    }, 850);
  };

  const accuracy = progress.total ? Math.round((progress.correct / progress.total) * 100) : 0;

  return (
    <>
      <PageHeader
        eyebrow="Test your knowledge"
        arabic="هَلْ يَسْتَوِي الَّذِينَ يَعْلَمُونَ وَالَّذِينَ لَا يَعْلَمُونَ"
        title="Islamic Quiz Center"
        subtitle="Four categories, three levels, live scoring and badges to earn."
      />

      <section className="relative bg-cream py-16">
        <div className="islamic-pattern absolute inset-0 opacity-25" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-5">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: "Quizzes completed", value: progress.completed },
              { label: "Correct answers", value: progress.correct },
              { label: "Accuracy", value: `${accuracy}%` },
            ].map((s) => (
              <div key={s.label} className="glass rounded-[1.5rem] border-gold/30 p-6 text-center">
                <p className="text-3xl font-semibold text-primary">{s.value}</p>
                <p className="mt-1 text-xs tracking-[0.2em] text-gold uppercase">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {quizCategories.map((c) => (
              <button
                key={c.slug}
                type="button"
                onClick={() => {
                  setCategorySlug(c.slug);
                  reset();
                }}
                aria-pressed={c.slug === categorySlug}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  c.slug === categorySlug
                    ? "border-gold bg-gradient-gold text-gold-foreground shadow-gold"
                    : "border-gold/30 text-primary hover:bg-gold/10"
                }`}
              >
                {c.title}
              </button>
            ))}
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {quizLevels.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => {
                  setLevel(l);
                  reset();
                }}
                aria-pressed={l === level}
                className={`rounded-full border px-4 py-1.5 text-xs tracking-[0.16em] uppercase transition-colors ${
                  l === level
                    ? "border-gold bg-primary text-primary-foreground"
                    : "border-gold/30 text-primary hover:bg-gold/10"
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          <div className="glass mt-8 rounded-[1.75rem] border-gold/40 p-7 shadow-luxe">
            {done ? (
              <div className="text-center">
                <Trophy className="mx-auto size-10 text-gold" />
                <h2 className="mt-4 text-2xl font-semibold text-primary">
                  {score} / {questions.length} correct
                </h2>
                <p className="mt-2 text-muted-foreground">
                  {category.title} — {level}
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-gold px-6 py-3 text-sm font-semibold text-gold-foreground shadow-gold"
                >
                  <RotateCcw className="size-4" /> Try again
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between text-xs tracking-[0.2em] text-gold uppercase">
                  <span>
                    Question {index + 1} of {questions.length}
                  </span>
                  <span>Score {score}</span>
                </div>
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-gold/20">
                  <div
                    className="h-full bg-gradient-gold transition-all duration-500"
                    style={{ width: `${((index + (picked !== null ? 1 : 0)) / questions.length) * 100}%` }}
                  />
                </div>
                <h2 className="mt-6 text-xl font-semibold text-foreground">{question.question}</h2>
                <div className="mt-5 grid gap-3">
                  {question.options.map((o, i) => {
                    const correct = picked !== null && i === question.answer;
                    const wrong = picked === i && i !== question.answer;
                    return (
                      <button
                        key={o}
                        type="button"
                        onClick={() => answer(i)}
                        className={`flex items-center justify-between gap-3 rounded-2xl border px-5 py-4 text-left text-sm transition-all duration-300 ${
                          correct
                            ? "border-primary bg-primary/10 text-primary"
                            : wrong
                              ? "border-destructive bg-destructive/10 text-destructive"
                              : "border-gold/25 bg-card hover:-translate-y-0.5 hover:border-gold"
                        }`}
                      >
                        <span>{o}</span>
                        {correct && <Check className="size-4 shrink-0" />}
                        {wrong && <X className="size-4 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
                {picked !== null && (
                  <p className="mt-4 text-sm text-muted-foreground">{question.explanation}</p>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="mx-auto max-w-5xl px-5">
          <SectionHeading
            eyebrow="Achievements"
            title="Badges You Can Earn"
            subtitle="Your progress is saved on this device as you complete quizzes."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {badges.map((b) => {
              const earned = progress.completed >= b.threshold;
              return (
                <div
                  key={b.id}
                  className={`rounded-[1.5rem] border p-6 text-center transition-all duration-300 ${
                    earned
                      ? "border-gold bg-card shadow-gold"
                      : "border-border bg-card/60 opacity-70"
                  }`}
                >
                  <Award className={`mx-auto size-8 ${earned ? "text-gold" : "text-muted-foreground"}`} />
                  <p className="mt-3 text-sm font-semibold text-foreground">{b.label}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{b.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
