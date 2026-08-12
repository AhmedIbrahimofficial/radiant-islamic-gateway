import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Clock, Search } from "lucide-react";
import { useState } from "react";

import { PageHeader } from "../components/site/PageHeader";

export const Route = createFileRoute("/prayer-times")({
  head: () => ({
    meta: [
      { title: "Prayer Times by City — Nur al-Huda" },
      {
        name: "description",
        content:
          "Accurate daily prayer times for Fajr, Dhuhr, Asr, Maghrib and Isha in any city worldwide.",
      },
      { property: "og:title", content: "Prayer Times by City — Nur al-Huda" },
      { property: "og:description", content: "Daily salah timings for any city." },
    ],
  }),
  component: PrayerTimesPage,
});

type Timings = Record<string, string>;

const order = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];

function PrayerTimesPage() {
  const [city, setCity] = useState("Karachi");
  const [country, setCountry] = useState("Pakistan");
  const [query, setQuery] = useState({ city: "Karachi", country: "Pakistan" });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["prayer", query.city, query.country],
    staleTime: 1000 * 60 * 30,
    queryFn: async () => {
      const res = await fetch(
        `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(query.city)}&country=${encodeURIComponent(query.country)}&method=2`,
      );
      if (!res.ok) throw new Error("Unable to load prayer times");
      const json = (await res.json()) as {
        data: { timings: Timings; date: { readable: string; hijri: { date: string } } };
      };
      return json.data;
    },
  });

  return (
    <>
      <PageHeader
        eyebrow="Salah"
        arabic="إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَّوْقُوتًا"
        title="Prayer Times"
        subtitle="Keep your day anchored to the five prayers, wherever you are."
      />
      <section className="relative bg-cream py-16">
        <div className="islamic-pattern absolute inset-0 opacity-25" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-5">
          <form
            className="glass grid gap-3 rounded-[1.5rem] p-5 shadow-luxe sm:grid-cols-[1fr_1fr_auto]"
            onSubmit={(e) => {
              e.preventDefault();
              setQuery({ city, country });
            }}
          >
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              className="rounded-xl border border-input bg-background px-4 py-3 outline-none focus:border-primary"
            />
            <input
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Country"
              className="rounded-xl border border-input bg-background px-4 py-3 outline-none focus:border-primary"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-gold px-6 py-3 text-sm font-semibold text-gold-foreground shadow-gold"
            >
              <Search className="size-4" /> Find
            </button>
          </form>

          {isLoading && <p className="mt-10 text-center text-muted-foreground">Loading timings…</p>}
          {isError && (
            <p className="mt-10 text-center text-destructive">
              We couldn't find that city. Please check the spelling and try again.
            </p>
          )}

          {data && (
            <>
              <p className="mt-10 text-center text-sm text-muted-foreground">
                {data.date.readable} · {data.date.hijri.date} AH · {query.city}, {query.country}
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {order.map((name) => (
                  <div
                    key={name}
                    className="rounded-2xl border border-border bg-card p-6 text-center shadow-luxe transition-transform duration-300 hover:-translate-y-1"
                  >
                    <Clock className="mx-auto size-5 text-gold" />
                    <p className="mt-3 text-xs tracking-[0.24em] text-primary uppercase">{name}</p>
                    <p className="mt-2 text-3xl font-semibold text-foreground">
                      {data.timings[name]}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}