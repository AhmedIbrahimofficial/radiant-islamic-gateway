import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, Clock, MapPin, Users } from "lucide-react";
import { useMemo, useState } from "react";

import { PageHeader } from "../components/site/PageHeader";
import { FloatingPatterns } from "../components/site/Decor";
import { SectionHeading } from "../components/site/Section";
import { eventCategories, formatEventDate, islamicEvents } from "../lib/events-content";
import { useLocalState } from "../lib/local-store";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Islamic Events Center — Nur al-Huda" },
      {
        name: "description",
        content:
          "Browse Ramadan and Eid programmes, Islamic conferences, mosque activities and educational courses in a calendar view with registration and reminders.",
      },
      { property: "og:title", content: "Islamic Events Center — Nur al-Huda" },
      {
        property: "og:description",
        content: "Calendar of Ramadan, Eid, conference, mosque and education events with registration.",
      },
    ],
  }),
  component: EventsPage,
});

function EventsPage() {
  const [category, setCategory] = useState<string>("all");
  const [view, setView] = useState<"calendar" | "list">("calendar");
  const [registered] = useLocalState<string[]>("nuralhuda:event-registrations", []);
  const [reminders] = useLocalState<string[]>("nuralhuda:event-reminders", []);

  const filtered = useMemo(
    () =>
      islamicEvents
        .filter((e) => category === "all" || e.category === category)
        .sort((a, b) => a.date.localeCompare(b.date)),
    [category],
  );

  const months = useMemo(() => {
    const map = new Map<string, typeof islamicEvents>();
    for (const e of filtered) {
      const key = new Date(`${e.date}T00:00:00`).toLocaleDateString("en-GB", {
        month: "long",
        year: "numeric",
      });
      map.set(key, [...(map.get(key) ?? []), e]);
    }
    return [...map.entries()];
  }, [filtered]);

  return (
    <>
      <PageHeader
        eyebrow="Gatherings"
        title="Islamic Events Center"
        arabic="وَذَكِّرْ فَإِنَّ الذِّكْرَىٰ تَنفَعُ الْمُؤْمِنِينَ"
        subtitle="Ramadan nights, Eid celebrations, conferences, mosque activities and courses — all in one calendar."
      />

      <section className="relative overflow-hidden py-14 sm:py-16">
        <FloatingPatterns />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="glass flex flex-wrap items-center gap-3 rounded-3xl p-5 shadow-luxe">
            {["all", ...eventCategories].map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                className={`rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-colors ${
                  category === c
                    ? "bg-gradient-gold text-gold-foreground shadow-gold"
                    : "border border-border text-muted-foreground hover:border-gold/50 hover:text-foreground"
                }`}
              >
                {c === "all" ? "All events" : c}
              </button>
            ))}
            <div className="ml-auto flex gap-2">
              {(["calendar", "list"] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setView(v)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold capitalize transition-colors ${
                    view === v ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground"
                  }`}
                >
                  {v} view
                </button>
              ))}
            </div>
          </div>

          {view === "calendar" ? (
            <div className="mt-10 grid gap-10">
              {months.map(([month, list]) => (
                <div key={month}>
                  <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-semibold text-foreground">{month}</h2>
                    <span className="h-px flex-1 bg-gradient-gold" />
                    <span className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
                      {list.length} event{list.length > 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="mt-6 grid gap-4">
                    {list.map((e) => {
                      const d = new Date(`${e.date}T00:00:00`);
                      return (
                        <Link
                          key={e.id}
                          to="/events/$eventId"
                          params={{ eventId: e.id }}
                          className="glass rise-in grid gap-5 rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-luxe sm:grid-cols-[auto_1fr_auto] sm:items-center"
                        >
                          <span className="grid size-20 place-items-center rounded-2xl border border-gold/40 bg-gradient-emerald text-cream">
                            <span className="text-2xl font-semibold text-gold">{d.getDate()}</span>
                            <span className="text-[11px] tracking-[0.2em] uppercase">
                              {d.toLocaleDateString("en-GB", { month: "short" })}
                            </span>
                          </span>
                          <span className="min-w-0">
                            <span className="flex flex-wrap items-center gap-2 text-xs">
                              <span className="rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">
                                {e.category}
                              </span>
                              {registered.includes(e.id) && (
                                <span className="rounded-full bg-gold/20 px-3 py-1 font-medium text-gold-foreground">
                                  Registered
                                </span>
                              )}
                              {reminders.includes(e.id) && (
                                <span className="rounded-full border border-gold/40 px-3 py-1 text-gold">
                                  Reminder set
                                </span>
                              )}
                            </span>
                            <span className="mt-3 block text-lg font-semibold text-foreground">{e.title}</span>
                            <span className="mt-2 block text-sm text-muted-foreground">{e.summary}</span>
                            <span className="mt-3 flex flex-wrap gap-4 text-xs text-muted-foreground">
                              <span className="inline-flex items-center gap-1.5">
                                <Clock className="size-3.5 text-gold" /> {e.time}
                              </span>
                              <span className="inline-flex items-center gap-1.5">
                                <MapPin className="size-3.5 text-gold" /> {e.location}
                              </span>
                              <span className="inline-flex items-center gap-1.5">
                                <Users className="size-3.5 text-gold" /> {e.seats} places
                              </span>
                            </span>
                          </span>
                          <span className="text-xs tracking-[0.2em] text-gold uppercase">Details →</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((e) => (
                <Link
                  key={e.id}
                  to="/events/$eventId"
                  params={{ eventId: e.id }}
                  className="glass rise-in flex flex-col rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-luxe"
                >
                  <span className="text-xs tracking-[0.2em] text-gold uppercase">{e.category}</span>
                  <h3 className="mt-3 text-lg font-semibold text-foreground">{e.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{e.summary}</p>
                  <span className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                    <CalendarDays className="size-4 text-gold" /> {formatEventDate(e.date)}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="How it works"
            title="Register, remember, attend"
            subtitle="Reserve a place, set a reminder that lives on your device, and arrive prepared."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              { title: "Reserve your place", body: "Registration confirms your seat instantly and shows on the event page." },
              { title: "Set a reminder", body: "Saved reminders appear beside each event so nothing slips past you." },
              { title: "Bring your family", body: "Most gatherings have family seating and children's programmes." },
            ].map((c) => (
              <article key={c.title} className="glass rounded-3xl p-6">
                <h3 className="text-lg font-semibold text-foreground">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
