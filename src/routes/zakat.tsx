import { createFileRoute } from "@tanstack/react-router";
import { Coins, Info, Scale, Wallet } from "lucide-react";
import { useMemo, useState } from "react";

import { PageHeader } from "../components/site/PageHeader";
import { FloatingPatterns } from "../components/site/Decor";
import { SectionHeading } from "../components/site/Section";

export const Route = createFileRoute("/zakat")({
  head: () => ({
    meta: [
      { title: "Zakat Calculator — Nur al-Huda" },
      {
        name: "description",
        content:
          "Calculate your zakat precisely across gold, silver, cash savings, investments and business assets, with nisab guidance and clear explanations.",
      },
      { property: "og:title", content: "Advanced Zakat Calculator — Nur al-Huda" },
      {
        property: "og:description",
        content: "Gold, silver, cash and business asset zakat with detailed results and teaching notes.",
      },
    ],
  }),
  component: ZakatPage,
});

const num = (v: string) => {
  const n = Number.parseFloat(v);
  return Number.isFinite(n) && n > 0 ? n : 0;
};

function Field({
  label,
  value,
  onChange,
  suffix,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  suffix?: string;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <span className="mt-2 flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3 focus-within:border-gold/60">
        <input
          type="number"
          min="0"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="0"
          className="w-full bg-transparent text-base outline-none"
        />
        {suffix && <span className="text-xs text-muted-foreground">{suffix}</span>}
      </span>
      {hint && <span className="mt-1 block text-xs text-muted-foreground">{hint}</span>}
    </label>
  );
}

function ZakatPage() {
  const [currency, setCurrency] = useState("USD");
  const [goldPrice, setGoldPrice] = useState("75");
  const [silverPrice, setSilverPrice] = useState("0.95");
  const [goldGrams, setGoldGrams] = useState("");
  const [silverGrams, setSilverGrams] = useState("");
  const [cash, setCash] = useState("");
  const [bank, setBank] = useState("");
  const [investments, setInvestments] = useState("");
  const [receivables, setReceivables] = useState("");
  const [stock, setStock] = useState("");
  const [businessCash, setBusinessCash] = useState("");
  const [liabilities, setLiabilities] = useState("");

  const r = useMemo(() => {
    const gp = num(goldPrice);
    const sp = num(silverPrice);
    const goldValue = num(goldGrams) * gp;
    const silverValue = num(silverGrams) * sp;
    const cashValue = num(cash) + num(bank) + num(investments) + num(receivables);
    const businessValue = num(stock) + num(businessCash);
    const gross = goldValue + silverValue + cashValue + businessValue;
    const debts = num(liabilities);
    const net = Math.max(gross - debts, 0);
    const nisabGold = 87.48 * gp;
    const nisabSilver = 612.36 * sp;
    const nisab = Math.min(nisabGold, nisabSilver);
    const eligible = net >= nisab && nisab > 0;
    return {
      goldValue,
      silverValue,
      cashValue,
      businessValue,
      gross,
      debts,
      net,
      nisabGold,
      nisabSilver,
      nisab,
      eligible,
      zakat: eligible ? net * 0.025 : 0,
    };
  }, [goldPrice, silverPrice, goldGrams, silverGrams, cash, bank, investments, receivables, stock, businessCash, liabilities]);

  const money = (v: number) =>
    `${v.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })} ${currency}`;

  const rows = [
    { label: "Gold holdings", value: r.goldValue, icon: Coins },
    { label: "Silver holdings", value: r.silverValue, icon: Coins },
    { label: "Cash, bank & investments", value: r.cashValue, icon: Wallet },
    { label: "Business assets", value: r.businessValue, icon: Scale },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Worship tools"
        title="Advanced Zakat Calculator"
        arabic="وَآتُوا الزَّكَاةَ"
        subtitle="Work through each category of wealth, compare it against the nisab and see exactly how your 2.5% obligation is calculated."
      />

      <section className="relative overflow-hidden py-16 sm:py-20">
        <FloatingPatterns />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="grid gap-6">
            <div className="glass rounded-3xl p-6 shadow-luxe sm:p-8">
              <h2 className="text-xl font-semibold text-foreground">Metal prices & currency</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Enter today's local market rates so the nisab threshold reflects your country.
              </p>
              <div className="mt-6 grid gap-5 sm:grid-cols-3">
                <label className="block">
                  <span className="text-sm font-medium text-foreground">Currency</span>
                  <input
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value.toUpperCase().slice(0, 4))}
                    className="mt-2 w-full rounded-2xl border border-border bg-card px-4 py-3 text-base outline-none focus:border-gold/60"
                  />
                </label>
                <Field label="Gold price" value={goldPrice} onChange={setGoldPrice} suffix="per gram" />
                <Field label="Silver price" value={silverPrice} onChange={setSilverPrice} suffix="per gram" />
              </div>
            </div>

            <div className="glass rounded-3xl p-6 shadow-luxe sm:p-8">
              <h2 className="text-xl font-semibold text-foreground">Gold & silver</h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <Field label="Gold owned" value={goldGrams} onChange={setGoldGrams} suffix="grams" hint="Include jewellery, coins and bars." />
                <Field label="Silver owned" value={silverGrams} onChange={setSilverGrams} suffix="grams" hint="Include silverware held as wealth." />
              </div>
            </div>

            <div className="glass rounded-3xl p-6 shadow-luxe sm:p-8">
              <h2 className="text-xl font-semibold text-foreground">Cash & savings</h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <Field label="Cash in hand" value={cash} onChange={setCash} suffix={currency} />
                <Field label="Bank balances" value={bank} onChange={setBank} suffix={currency} />
                <Field label="Shares & investments" value={investments} onChange={setInvestments} suffix={currency} hint="Use market value on your zakat date." />
                <Field label="Money owed to you" value={receivables} onChange={setReceivables} suffix={currency} hint="Only amounts you expect to receive." />
              </div>
            </div>

            <div className="glass rounded-3xl p-6 shadow-luxe sm:p-8">
              <h2 className="text-xl font-semibold text-foreground">Business assets & liabilities</h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <Field label="Trade stock value" value={stock} onChange={setStock} suffix={currency} hint="Goods bought for resale, at sale value." />
                <Field label="Business cash & receivables" value={businessCash} onChange={setBusinessCash} suffix={currency} />
                <Field label="Immediate debts & bills" value={liabilities} onChange={setLiabilities} suffix={currency} hint="Deduct only amounts currently due." />
              </div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="overflow-hidden rounded-3xl border border-gold/30 bg-gradient-emerald text-cream shadow-luxe">
              <div className="islamic-pattern relative p-6 sm:p-8">
                <p className="text-xs tracking-[0.3em] text-gold uppercase">Your zakat</p>
                <p className="mt-4 text-4xl font-semibold">{money(r.zakat)}</p>
                <p className="mt-2 text-sm text-cream/75">
                  {r.eligible
                    ? "Your net zakatable wealth is at or above the nisab, so 2.5% is due."
                    : "Your net wealth is below the nisab threshold — no zakat is due this year."}
                </p>
                <div className="mt-6 h-px bg-gold/30" />
                <div className="mt-6 grid gap-3 text-sm">
                  {rows.map((row) => (
                    <div key={row.label} className="flex items-center justify-between gap-3">
                      <span className="flex items-center gap-2 text-cream/75">
                        <row.icon className="size-4 text-gold" /> {row.label}
                      </span>
                      <span>{money(row.value)}</span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between gap-3 border-t border-gold/20 pt-3">
                    <span className="text-cream/75">Gross assets</span>
                    <span>{money(r.gross)}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-cream/75">Less liabilities</span>
                    <span>-{money(r.debts)}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3 text-gold">
                    <span>Net zakatable wealth</span>
                    <span>{money(r.net)}</span>
                  </div>
                </div>
                <div className="mt-6 grid gap-2 rounded-2xl border border-gold/25 p-4 text-xs text-cream/75">
                  <p>Nisab (gold, 87.48g): {money(r.nisabGold)}</p>
                  <p>Nisab (silver, 612.36g): {money(r.nisabSilver)}</p>
                  <p className="text-gold">Applied nisab: {money(r.nisab)}</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-secondary/40 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Understanding zakat"
            title="Why each figure matters"
            subtitle="Zakat is an act of worship as much as a calculation. These notes explain the reasoning behind the numbers above."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "The 2.5% rate", body: "Zakat on monetary wealth is one fortieth (2.5%) of the net amount held for a full lunar year." },
              { title: "Nisab thresholds", body: "The minimum is the value of 87.48g of gold or 612.36g of silver. Many scholars advise using the silver nisab so more of the poor benefit." },
              { title: "The lunar year", body: "Wealth must remain at or above the nisab for one hijri year. Fix one date each year — many choose Ramadan — and calculate then." },
              { title: "Jewellery", body: "Gold and silver are assessed by weight and current price, whether worn or stored, according to the majority position." },
              { title: "Debts", body: "Deduct amounts genuinely due now, such as this month's bills or overdue payments — not the full term of a long mortgage." },
              { title: "Where it goes", body: "Zakat belongs to the eight categories named in Surah At-Tawbah 9:60, including the poor, the needy and those in debt." },
            ].map((c) => (
              <article key={c.title} className="glass rounded-3xl p-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-luxe">
                <Info className="size-5 text-gold" />
                <h3 className="mt-4 text-lg font-semibold text-foreground">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
              </article>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-3xl text-center text-xs text-muted-foreground">
            This calculator is an educational aid. For complex wealth — pensions, partnerships or agricultural produce — please consult a qualified scholar.
          </p>
        </div>
      </section>
    </>
  );
}
