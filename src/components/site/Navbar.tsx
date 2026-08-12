import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, MoonStar, X } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  { to: "/", label: "Home" },
  { to: "/quran", label: "Quran" },
  { to: "/hadith", label: "Hadith" },
  { to: "/duas", label: "Duas" },
  { to: "/prayer-times", label: "Prayer Times" },
  { to: "/articles", label: "Islamic Articles" },
  { to: "/history", label: "Islamic History" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const overHero = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || !overHero ? "glass-dark shadow-luxe" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-6 lg:py-4">
        <Link to="/" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
          <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-gradient-gold shadow-gold">
            <MoonStar className="size-6 text-gold-foreground" />
          </span>
          <span className="min-w-0">
            <span className="block truncate font-display text-lg font-semibold text-cream">
              Nur al-Huda
            </span>
            <span className="block truncate text-[11px] tracking-[0.28em] text-gold uppercase">
              Light of Guidance
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 xl:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="rounded-full px-3 py-2 text-sm font-medium text-cream/80 transition-colors hover:bg-gold/15 hover:text-gold"
              activeProps={{ className: "bg-gold/20 text-gold" }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="grid size-11 shrink-0 place-items-center rounded-2xl border border-gold/30 text-cream xl:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {open && (
        <div className="glass-dark border-t border-gold/20 px-4 pb-6 pt-2 xl:hidden">
          <div className="grid gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: l.to === "/" }}
                className="rounded-xl px-4 py-3 text-sm font-medium text-cream/85 transition-colors hover:bg-gold/15 hover:text-gold"
                activeProps={{ className: "bg-gold/20 text-gold" }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}