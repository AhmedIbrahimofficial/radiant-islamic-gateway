import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value) || value.length > 255) {
      toast.error("Please enter a valid email address.");
      return;
    }
    try {
      const key = "nur-al-huda-newsletter";
      const existing: string[] = JSON.parse(localStorage.getItem(key) ?? "[]");
      if (!existing.includes(value.toLowerCase())) {
        existing.push(value.toLowerCase());
        localStorage.setItem(key, JSON.stringify(existing));
      }
    } catch {
      // storage unavailable — subscription still confirmed for this session
    }
    setSubscribed(true);
    setEmail("");
    toast.success("Jazak Allahu Khairan — you're subscribed to weekly reminders.");
  };

  return (
    <footer className="relative overflow-hidden bg-gradient-emerald text-cream">
      <div className="islamic-pattern absolute inset-0 opacity-40" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <p className="font-arabic text-center text-3xl text-gold sm:text-4xl">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>
        <div className="mx-auto mt-4 h-px w-40 bg-gradient-gold" />

        <form
          className="glass-dark mx-auto mt-10 flex max-w-2xl flex-col gap-3 rounded-3xl p-5 sm:flex-row"
          onSubmit={handleSubscribe}
        >
          <input
            type="email"
            required
            maxLength={255}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email for weekly reminders"
            aria-label="Email address"
            className="flex-1 rounded-full border border-gold/30 bg-transparent px-5 py-3 text-sm text-cream outline-none placeholder:text-cream/50 focus:border-gold/70"
          />
          <button
            type="submit"
            className="rounded-full bg-gradient-gold px-6 py-3 text-sm font-semibold text-gold-foreground shadow-gold"
          >
            {subscribed ? "Subscribed ✓" : "Subscribe"}
          </button>
        </form>
        {subscribed && (
          <p className="mt-3 text-center text-xs text-gold/90">
            You will receive weekly Qur'an and hadith reminders, in sha Allah.
          </p>
        )}

        <div className="mt-12 grid gap-10 md:grid-cols-3">
          <div>
            <h3 className="text-xl font-semibold text-cream">Nur al-Huda</h3>
            <p className="mt-3 text-sm leading-relaxed text-cream/70">
              A peaceful home for the Qur'an, authentic hadith, supplications and Islamic
              scholarship — crafted for reflection and daily practice.
            </p>
            <div className="mt-5 flex gap-3">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="grid size-10 place-items-center rounded-xl border border-gold/30 text-gold transition-colors hover:bg-gold/15"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm tracking-[0.24em] text-gold uppercase">Explore</h3>
            <div className="mt-4 grid gap-2 text-sm">
              {[
                { to: "/quran", label: "Read the Qur'an" },
                { to: "/hadith", label: "Hadith Collection" },
                { to: "/duas", label: "Daily Duas" },
                { to: "/prayer-times", label: "Prayer Times" },
                { to: "/library", label: "Book Library" },
                { to: "/dashboard", label: "My Dashboard" },
                { to: "/history", label: "Islamic History" },
              ].map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="text-cream/75 transition-colors hover:text-gold"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm tracking-[0.24em] text-gold uppercase">Contact</h3>
            <div className="mt-4 grid gap-3 text-sm text-cream/75">
              <p className="flex items-center gap-3">
                <Mail className="size-4 shrink-0 text-gold" /> robas3843@gmail.com
              </p>
              <p className="flex items-center gap-3">
                <Phone className="size-4 shrink-0 text-gold" /> 03007251874
              </p>
              <p className="flex items-center gap-3">
                <MapPin className="size-4 shrink-0 text-gold" /> Rahwali, Gujranwala Cantt
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-2 border-t border-gold/20 pt-6 text-xs text-cream/60 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Nur al-Huda. All rights reserved.</p>
          <p className="font-arabic text-base text-gold/80">وَقُل رَّبِّ زِدْنِي عِلْمًا</p>
        </div>
      </div>
    </footer>
  );
}