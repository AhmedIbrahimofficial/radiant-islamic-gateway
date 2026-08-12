import { createFileRoute } from "@tanstack/react-router";
import { ScrollText } from "lucide-react";

import { PageHeader } from "../components/site/PageHeader";
import { dailyHadiths } from "../lib/islamic-content";

const collection = [
  ...dailyHadiths,
  {
    text: "Allah is not merciful to him who is not merciful to people.",
    urdu: "اللہ اُس پر رحم نہیں کرتا جو لوگوں پر رحم نہیں کرتا۔",
    source: "Sahih al-Bukhari 7376",
  },
  {
    text: "A good word is charity.",
    urdu: "اچھی بات کہنا بھی صدقہ ہے۔",
    source: "Sahih al-Bukhari 2989",
  },
  {
    text: "Seeking knowledge is an obligation upon every Muslim.",
    urdu: "علم حاصل کرنا ہر مسلمان پر فرض ہے۔",
    source: "Sunan Ibn Majah 224",
  },
  {
    text: "The strong believer is the one who controls himself when angry.",
    urdu: "طاقتور مومن وہ ہے جو غصے کے وقت اپنے نفس پر قابو رکھے۔",
    source: "Sahih al-Bukhari 6114",
  },
];

export const Route = createFileRoute("/hadith")({
  head: () => ({
    meta: [
      { title: "Authentic Hadith Collection — Nur al-Huda" },
      {
        name: "description",
        content:
          "A curated collection of authentic hadith from Sahih al-Bukhari and other trusted sources, with Urdu translation.",
      },
      { property: "og:title", content: "Authentic Hadith Collection — Nur al-Huda" },
      {
        property: "og:description",
        content: "Authentic hadith with English and Urdu translation.",
      },
    ],
  }),
  component: HadithPage,
});

function HadithPage() {
  return (
    <>
      <PageHeader
        eyebrow="Sunnah of the Prophet ﷺ"
        arabic="وَمَا يَنطِقُ عَنِ الْهَوَىٰ"
        title="Hadith Collection"
        subtitle="Words of the Messenger of Allah ﷺ — brief, luminous, and life-shaping."
      />
      <section className="bg-background py-16">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 md:grid-cols-2">
          {collection.map((h) => (
            <article
              key={h.source}
              className="rounded-[1.75rem] border border-border bg-card p-7 shadow-luxe transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/40"
            >
              <ScrollText className="size-6 text-gold" />
              <p className="mt-5 text-lg leading-relaxed text-foreground">“{h.text}”</p>
              <p className="font-urdu mt-5 text-right text-base leading-[2.6] text-muted-foreground">
                {h.urdu}
              </p>
              <p className="mt-6 text-xs tracking-[0.22em] text-gold uppercase">{h.source}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}