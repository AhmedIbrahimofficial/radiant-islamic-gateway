import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, BellRing, CalendarDays, CheckCircle2, Clock, MapPin, Ticket, Users } from "lucide-react";
import { toast } from "sonner";

import { FloatingPatterns, Lantern } from "../components/site/Decor";
import { formatEventDate, islamicEvents } from "../lib/events-content";
import { useLocalState } from "../lib/local-store";

export const Route = createFileRoute("/events/$eventId")({
  loader: ({ params }) => {
    const event = islamicEvents.find((e) => e.id === params.eventId);
    if (!event) throw notFound();
    return { event };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Event unavailable — Nur al-Huda" }, { name: "robots", content: "noindex" }] };
    }
    const { event } = loaderData;
    const title = `${event.title} — Nur al-Huda Events`;
    return {
      meta: [
        { title },
        { name: "description", content: event.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: event.summary },
      ],
    };
  },
  component: EventDetailPage,
});

function EventDetailPage() {
  const { event } = Route.useLoaderData();
  const [registered, setRegistered] = useLocalState<string[]>("nuralhuda:event-registrations", []);
  const [reminders, setReminders] = useLocalState<string[]>("nuralhuda:event-reminders", []);

  const isRegistered = registered.includes(event.id);
  const hasReminder = reminders.includes(event.id);

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-emerald pt-32 pb-20 text-cream">
        <div className="islamic-pattern absolute inset-0 opacity-40" aria-hidden />
        <Lantern className="left-[8%] top-6 hidden sm:block" />
        <Lantern className="right-[10%] top-2 hidden sm:block" delay={1.6} />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
          <Link to="/events" className="inline-flex items-center gap-2 text-xs tracking-[0.24em] text-gold uppercase">
            <ArrowLeft className="size-4" /> All events
          </Link>
          <p className="mt-8 text-xs tracking-[0.3em] text-gold uppercase">{event.category}</p>
          <h1 className="mt-4 text-3xl font-semibold sm:text-5xl">{event.title}</h1>
          <p className="mt-5 max-w-2xl text-cream/80 sm:text-lg">{event.summary}</p>
          <div className="mt-8 grid gap-3 text-sm sm:grid-cols-2">
            <p className="inline-flex items-center gap-2">
              <CalendarDays className="size-4 text-gold" /> {formatEventDate(event.date)}
            </p>
            <p className="inline-flex items-center gap-2">
              <Clock className="size-4 text-gold" /> {event.time}
            </p>
            <p className="inline-flex items-center gap-2">
              <MapPin className="size-4 text-gold" /> {event.location}
            </p>
            <p className="inline-flex items-center gap-2">
              <Users className="size-4 text-gold" /> {event.seats} places · {event.free ? "Free entry" : "Registration required"}
            </p>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-16">
        <FloatingPatterns />
        <div className="relative mx-auto grid max-w-5xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="grid gap-6">
            <article className="glass rounded-3xl p-6 shadow-luxe sm:p-8">
              <h2 className="text-xl font-semibold text-foreground">About this gathering</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">{event.description}</p>
              <p className="mt-4 text-sm text-muted-foreground">Hosted by {event.host}.</p>
            </article>

            <article className="glass rounded-3xl p-6 shadow-luxe sm:p-8">
              <h2 className="text-xl font-semibold text-foreground">Programme</h2>
              <div className="mt-6 grid gap-4">
                {event.agenda.map((a) => (
                  <div key={a.time} className="flex gap-4 border-l border-gold/40 pl-4">
                    <span className="w-16 shrink-0 text-sm font-semibold text-gold">{a.time}</span>
                    <span className="text-sm text-muted-foreground">{a.item}</span>
                  </div>
                ))}
              </div>
            </article>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl border border-gold/30 bg-card p-6 shadow-luxe">
              <h2 className="text-lg font-semibold text-foreground">Attend</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {isRegistered
                  ? "Your place is reserved — jazakallahu khayran."
                  : "Reserve a place so the organisers can plan seating."}
              </p>
              <button
                type="button"
                onClick={() => {
                  setRegistered((prev) =>
                    prev.includes(event.id) ? prev.filter((v) => v !== event.id) : [...prev, event.id],
                  );
                  toast.success(isRegistered ? "Registration cancelled." : "You are registered for this event.");
                }}
                className={`mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5 ${
                  isRegistered
                    ? "border border-gold/50 text-foreground"
                    : "bg-gradient-gold text-gold-foreground shadow-gold"
                }`}
              >
                {isRegistered ? <CheckCircle2 className="size-4" /> : <Ticket className="size-4" />}
                {isRegistered ? "Registered — cancel" : "Register now"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setReminders((prev) =>
                    prev.includes(event.id) ? prev.filter((v) => v !== event.id) : [...prev, event.id],
                  );
                  toast.success(hasReminder ? "Reminder removed." : "Reminder saved on this device.");
                }}
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-gold/40 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-gold/10"
              >
                <BellRing className="size-4 text-gold" />
                {hasReminder ? "Reminder set — remove" : "Remind me"}
              </button>
              <div className="mt-6 border-t border-border pt-5 text-xs text-muted-foreground">
                <p>Doors open 20 minutes before the start time.</p>
                <p className="mt-2">Separate seating and prayer space for sisters is provided.</p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
