import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { PageHeader } from "../components/site/PageHeader";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Nur al-Huda" },
      {
        name: "description",
        content:
          "Reach the Nur al-Huda team for questions, feedback, corrections or collaboration.",
      },
      { property: "og:title", content: "Contact Nur al-Huda" },
      { property: "og:description", content: "Questions, feedback and collaboration." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <PageHeader
        eyebrow="Get in touch"
        arabic="وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ"
        title="Contact Us"
        subtitle="We would love to hear your reflections, corrections and duas."
      />
      <section className="bg-background py-16">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 lg:grid-cols-[1fr_1.2fr]">
          <div className="grid content-start gap-4">
            {[
              { Icon: Mail, label: "Email", value: "salam@nuralhuda.org" },
              { Icon: Phone, label: "Phone", value: "+92 300 000 0000" },
              { Icon: MapPin, label: "Address", value: "Gulshan-e-Iqbal, Karachi, Pakistan" },
            ].map(({ Icon, label, value }) => (
              <div
                key={label}
                className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6 shadow-luxe"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-gold">
                  <Icon className="size-5 text-gold-foreground" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs tracking-[0.24em] text-gold uppercase">{label}</p>
                  <p className="mt-1 break-words text-foreground">{value}</p>
                </div>
              </div>
            ))}
          </div>

          <form
            className="rounded-[1.75rem] border border-border bg-card p-7 shadow-luxe"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
              toast.success("Jazak Allahu Khairan — your message has been received.");
            }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm">
                <span className="text-muted-foreground">Your name</span>
                <input
                  required
                  className="rounded-xl border border-input bg-background px-4 py-3 outline-none focus:border-primary"
                />
              </label>
              <label className="grid gap-2 text-sm">
                <span className="text-muted-foreground">Email</span>
                <input
                  type="email"
                  required
                  className="rounded-xl border border-input bg-background px-4 py-3 outline-none focus:border-primary"
                />
              </label>
            </div>
            <label className="mt-4 grid gap-2 text-sm">
              <span className="text-muted-foreground">Subject</span>
              <input className="rounded-xl border border-input bg-background px-4 py-3 outline-none focus:border-primary" />
            </label>
            <label className="mt-4 grid gap-2 text-sm">
              <span className="text-muted-foreground">Message</span>
              <textarea
                required
                rows={5}
                className="rounded-xl border border-input bg-background px-4 py-3 outline-none focus:border-primary"
              />
            </label>
            <button
              type="submit"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-gold px-6 py-3 text-sm font-semibold text-gold-foreground shadow-gold transition-transform hover:scale-[1.02]"
            >
              <Send className="size-4" /> {sent ? "Message sent" : "Send message"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}