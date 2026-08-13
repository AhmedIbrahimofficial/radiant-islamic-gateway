import { createFileRoute, Link } from "@tanstack/react-router";
import { BookMarked, CheckCircle2, Circle, Flame, Target } from "lucide-react";

import { PageHeader } from "../components/site/PageHeader";
import { FloatingPatterns } from "../components/site/Decor";
import { SectionHeading } from "../components/site/Section";
import { useLocalState } from "../lib/local-store";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "My Islamic Dashboard — Nur al-Huda" },
      {
        name: "description",
        content:
          "Track your Qur'an reading, daily prayers and memorisation goals, keep favourite articles and duas, and see your worship progress statistics.",
      },
      { property: "og:title", content: "Personal Islamic Dashboard — Nur al-Huda" },
      { property: "og:description", content: "Prayer tracking, Qur'an progress, memorisation goals and saved favourites." },
    ],
  }),
  component: DashboardPage,
});

const prayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"] as const;
const todayKey = () => new Date().toISOString().slice(0, 10);

function DashboardPage() {
  const [prayerLog, setPrayerLog] = useLocalState<Record<string, string[]>>("nuralhuda:prayer-log", {});
  const [quran, setQuran] = useLocalState<{ pagesRead: number; goal: number }>("nuralhuda:quran-progress", {
    pagesRead: 0,
    goal: 604,
  });
  const [hifz, setHifz] = useLocalState<{ versesMemorised: number; goal: number }>("nuralhuda:hifz-progress", {
    versesMemorised: 0,
    goal: 300,
  });
  const [articles] = useLocalState<string[]>("nuralhuda:favourite-articles", []);
  const [duas] = useLocalState<string[]>("nuralhuda:favourite-duas", []);
  const [shelf] = useLocalState<string[]>("nuralhuda:library-shelf", []);

  const today = todayKey();
  const done = prayerLog[today] ?? [];
  const togglePrayer = (p: string) =>
    setPrayerLog((prev) => {
      const current = prev[today] ?? [];
      return {
        ...prev,
        [today]: current.includes(p) ? current.filter((v) => v !== p) : [...current, p],
      };
    });

  const days = Object.keys(prayerLog).sort();
  const totalLogged = days.reduce((sum, d) => sum + (prayerLog[d]?.length ?? 0), 0);
  let streak = 0;
  for (let i = 0; ; i += 1) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    if ((prayerLog[key]?.length ?? 0) === 5) streak += 1;
    else break;
  }

  const pct = (a: number, b: number) => (b > 0 ? Math.min(Math.round((a / b) * 100), 100) : 0);

  return (
    <>
      <PageHeader
        eyebrow="Your journey"
        title="Personal Islamic Dashboard"
        arabic="أَحَبُّ الْأَعْمَالِ إِلَى اللَّهِ أَدْوَمُهَا"
        subtitle="Small, steady acts recorded privately on your device — prayers, recitation, memorisation and everything you've saved."
      />

      <section className="relative overflow-hidden py-14 sm:py-16">
        <FloatingPatterns />
        <div className="relative mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-3">
          <div className="glass rounded-3xl p-6 shadow-luxe lg:col-span-2">
            <h2 className="text-xl font-semibold text-foreground">Today's prayers</h2>
            <p className="mt-2 text-sm text-muted-foreground">Tap each prayer as you complete it.</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-5">
              {prayers.map((p) => {
                const isDone = done.includes(p);
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => togglePrayer(p)}
                    className={`grid place-items-center gap-2 rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-0.5 ${
                      isDone ? "border-gold/60 bg-gold/10 text-gold" : "border-border text-muted-foreground"
                    }`}
                  >
                    {isDone ? <CheckCircle2 className="size-6" /> : <Circle className="size-6" />}
                    <span className="text-sm font-semibold">{p}</span>
                  </button>
                );
              })}
            </div>
            <div className="mt-6 h-2 overflow-hidden rounded-full bg-secondary">
              <div className="h-full bg-gradient-gold transition-all duration-500" style={{ width: `${pct(done.length, 5)}%` }} />
            </div>
          </div>

          <div className="rounded-3xl border border-gold/30 bg-gradient-emerald p-6 text-cream shadow-luxe">
            <Flame className="size-6 text-gold" />
            <p className="mt-4 text-4xl font-semibold">{streak}</p>
            <p className="text-sm text-cream/75">day streak of five complete prayers</p>
            <div className="mt-6 grid gap-2 border-t border-gold/20 pt-5 text-sm text-cream/80">
              <p>{totalLogged} prayers logged in total</p>
              <p>{days.length} days tracked</p>
            </div>
          </div>

          {[
            {
              title: "Qur'an reading",
              icon: BookMarked,
              value: quran.pagesRead,
              goal: quran.goal,
              unit: "pages",
              onAdd: (n: number) => setQuran({ ...quran, pagesRead: Math.max(quran.pagesRead + n, 0) }),
              onGoal: (g: number) => setQuran({ ...quran, goal: g }),
            },
            {
              title: "Memorisation goal",
              icon: Target,
              value: hifz.versesMemorised,
              goal: hifz.goal,
              unit: "verses",
              onAdd: (n: number) => setHifz({ ...hifz, versesMemorised: Math.max(hifz.versesMemorised + n, 0) }),
              onGoal: (g: number) => setHifz({ ...hifz, goal: g }),
            },
          ].map((c) => (
            <div key={c.title} className="glass rounded-3xl p-6 shadow-luxe">
              <c.icon className="size-5 text-gold" />
              <h2 className="mt-4 text-lg font-semibold text-foreground">{c.title}</h2>
              <p className="mt-2 text-3xl font-semibold text-foreground">
                {c.value}
                <span className="text-sm text-muted-foreground"> / {c.goal} {c.unit}</span>
              </p>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-secondary">
                <div className="h-full bg-gradient-gold transition-all duration-500" style={{ width: `${pct(c.value, c.goal)}%` }} />
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-2">
                {[1, 5, 10].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => c.onAdd(n)}
                    className="rounded-full border border-gold/40 px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-gold/10"
                  >
                    +{n}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => c.onAdd(-1)}
                  className="rounded-full border border-border px-4 py-2 text-xs font-semibold text-muted-foreground"
                >
                  -1
                </button>
                <label className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
                  Goal
                  <input
                    type="number"
                    min="1"
                    value={c.goal}
                    onChange={(e) => {
                      const g = Number.parseInt(e.target.value, 10);
                      if (Number.isFinite(g) && g > 0) c.onGoal(g);
                    }}
                    className="w-20 rounded-xl border border-border bg-card px-3 py-1.5 text-sm outline-none focus:border-gold/60"
                  />
                </label>
              </div>
            </div>
          ))}

          <div className="glass rounded-3xl p-6 shadow-luxe">
            <h2 className="text-lg font-semibold text-foreground">Saved for later</h2>
            <div className="mt-5 grid gap-3 text-sm">
              {[
                { label: "Favourite articles", value: articles.length, to: "/articles" as const },
                { label: "Favourite duas", value: duas.length, to: "/duas" as const },
                { label: "Books on your shelf", value: shelf.length, to: "/library" as const },
              ].map((row) => (
                <Link
                  key={row.label}
                  to={row.to}
                  className="flex items-center justify-between rounded-2xl border border-border px-4 py-3 transition-colors hover:border-gold/50"
                >
                  <span className="text-muted-foreground">{row.label}</span>
                  <span className="font-semibold text-foreground">{row.value}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow="Statistics" title="Your progress at a glance" subtitle="Everything stays private on this device." />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Prayer completion today", value: `${pct(done.length, 5)}%` },
              { label: "Qur'an goal", value: `${pct(quran.pagesRead, quran.goal)}%` },
              { label: "Memorisation goal", value: `${pct(hifz.versesMemorised, hifz.goal)}%` },
              { label: "Current streak", value: `${streak} days` },
            ].map((s) => (
              <article key={s.label} className="glass rounded-3xl p-6 text-center">
                <p className="text-3xl font-semibold text-foreground">{s.value}</p>
                <p className="mt-2 text-xs tracking-[0.16em] text-muted-foreground uppercase">{s.label}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
