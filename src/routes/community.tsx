import { createFileRoute } from "@tanstack/react-router";
import {
  Award,
  EyeOff,
  Flag,
  Heart,
  MessageCircle,
  RotateCcw,
  Send,
  Shield,
  Sparkles,
  UserRound,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { PageHeader } from "../components/site/PageHeader";
import { FloatingPatterns } from "../components/site/Decor";
import { SectionHeading } from "../components/site/Section";
import {
  achievements,
  communityCategories,
  communityGuidelines,
  seedDiscussions,
  seedQuestions,
  type Discussion,
  type QAItem,
} from "../lib/community-content";
import { useLocalState } from "../lib/local-store";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Islamic Community Hub — Nur al-Huda" },
      {
        name: "description",
        content:
          "Join respectful Islamic discussions, ask questions answered with sources, earn achievements and grow together in a moderated, safe community.",
      },
      { property: "og:title", content: "Islamic Community Hub — Nur al-Huda" },
      {
        property: "og:description",
        content: "Discussions, a scholar-guided Q&A section, topic categories and community achievements.",
      },
    ],
  }),
  component: CommunityPage,
});

type Profile = { name: string; city: string; about: string };
type Stats = { posts: number; answers: number; likes: number };

const blockedTerms = [
  "kafir",
  "idiot",
  "stupid",
  "hate you",
  "kill",
  "shut up",
  "damn",
];

function moderationIssue(text: string) {
  const lower = text.toLowerCase();
  const hit = blockedTerms.find((t) => lower.includes(t));
  if (hit) return `Please rephrase with adab — the word "${hit}" isn't allowed here.`;
  if (/(https?:\/\/|www\.)/i.test(text)) return "External links are reviewed by moderators — please describe the source instead.";
  if (text.replace(/[^A-Z]/g, "").length > 20 && text === text.toUpperCase())
    return "Please avoid writing in full capitals.";
  return null;
}

function CommunityPage() {
  const [profile, setProfile] = useLocalState<Profile>("nuralhuda:community-profile", {
    name: "",
    city: "",
    about: "",
  });
  const [stats, setStats] = useLocalState<Stats>("nuralhuda:community-stats", {
    posts: 0,
    answers: 0,
    likes: 0,
  });
  const [myPosts, setMyPosts] = useLocalState<Discussion[]>("nuralhuda:community-posts", []);
  const [myQuestions, setMyQuestions] = useLocalState<QAItem[]>("nuralhuda:community-questions", []);
  const [liked, setLiked] = useLocalState<string[]>("nuralhuda:community-liked", []);
  const [flagged, setFlagged] = useLocalState<string[]>("nuralhuda:community-flagged", []);

  const [tab, setTab] = useState<"discussions" | "qa">("discussions");
  const [category, setCategory] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [askCategory, setAskCategory] = useState(communityCategories[0]!.slug);
  const [ask, setAsk] = useState("");

  const discussions = useMemo(() => [...myPosts, ...seedDiscussions], [myPosts]);

  const visibleDiscussions = discussions.filter((d) => {
    if (flagged.includes(d.id)) return false;
    if (category !== "all" && d.category !== category) return false;
    const q = query.trim().toLowerCase();
    return !q || d.title.toLowerCase().includes(q) || d.body.toLowerCase().includes(q);
  });

  const questions = [...myQuestions, ...seedQuestions].filter((q) => {
    if (category !== "all" && q.category !== category) return false;
    const s = query.trim().toLowerCase();
    return !s || q.question.toLowerCase().includes(s) || q.answer.toLowerCase().includes(s);
  });

  const displayName = profile.name.trim() || "Guest member";

  const submitPost = () => {
    if (title.trim().length < 8 || body.trim().length < 20) {
      toast.error("Please write a clear title (8+ characters) and a message of at least 20 characters.");
      return;
    }
    const issue = moderationIssue(`${title} ${body}`);
    if (issue) {
      toast.error(issue);
      return;
    }
    const post: Discussion = {
      id: `mine-${Date.now()}`,
      category: askCategory,
      title: title.trim().slice(0, 140),
      body: body.trim().slice(0, 1200),
      author: displayName,
      role: profile.city.trim() ? profile.city.trim() : "Community member",
      replies: 0,
      likes: 0,
      postedAt: "Just now",
    };
    setMyPosts((prev) => [post, ...prev].slice(0, 40));
    setStats((prev) => ({ ...prev, posts: prev.posts + 1 }));
    setTitle("");
    setBody("");
    setTab("discussions");
    toast.success("Your discussion has been shared with the community.");
  };

  const submitQuestion = () => {
    if (ask.trim().length < 10) {
      toast.error("Please write your question in at least 10 characters.");
      return;
    }
    const issue = moderationIssue(ask);
    if (issue) {
      toast.error(issue);
      return;
    }
    const item: QAItem = {
      id: `q-mine-${Date.now()}`,
      category: askCategory,
      question: ask.trim().slice(0, 240),
      answer: "Awaiting review — a qualified teacher will answer this question shortly, in shaa Allah.",
      answeredBy: "Pending moderation",
      reference: "—",
    };
    setMyQuestions((prev) => [item, ...prev].slice(0, 40));
    setStats((prev) => ({ ...prev, answers: prev.answers + 1 }));
    setAsk("");
    setTab("qa");
    toast.success("Question submitted for review.");
  };

  const like = (id: string) => {
    const isLiked = liked.includes(id);
    setLiked(isLiked ? liked.filter((v) => v !== id) : [...liked, id]);
    setStats((prev) => ({ ...prev, likes: Math.max(prev.likes + (isLiked ? -1 : 1), 0) }));
  };

  const report = (id: string) => {
    setFlagged((prev) => [...prev, id]);
    toast.success("Reported and hidden from your feed. Moderators will review it.");
  };

  const earned = achievements.filter((a) => stats[a.metric] >= a.requirement);

  return (
    <>
      <PageHeader
        eyebrow="Community"
        title="Islamic Community Hub"
        arabic="وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ"
        subtitle="A moderated space for sincere discussion, questions answered with evidence, and encouragement towards good."
      />

      <section className="relative overflow-hidden py-14 sm:py-16">
        <FloatingPatterns />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[320px_1fr]">
          <div className="grid gap-6 lg:sticky lg:top-28 lg:self-start">
            <div className="glass rounded-3xl p-6 shadow-luxe">
              <div className="flex items-center gap-4">
                <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-gradient-gold shadow-gold">
                  <UserRound className="size-7 text-gold-foreground" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-lg font-semibold text-foreground">{displayName}</p>
                  <p className="truncate text-xs tracking-[0.16em] text-muted-foreground uppercase">
                    {profile.city.trim() || "Set your city"}
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-4">
                <label className="block">
                  <span className="text-xs tracking-[0.2em] text-muted-foreground uppercase">Display name</span>
                  <input
                    value={profile.name}
                    maxLength={40}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    placeholder="e.g. Abdullah"
                    className="mt-2 w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-gold/60"
                  />
                </label>
                <label className="block">
                  <span className="text-xs tracking-[0.2em] text-muted-foreground uppercase">City</span>
                  <input
                    value={profile.city}
                    maxLength={40}
                    onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                    placeholder="e.g. Karachi"
                    className="mt-2 w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-gold/60"
                  />
                </label>
                <label className="block">
                  <span className="text-xs tracking-[0.2em] text-muted-foreground uppercase">About you</span>
                  <textarea
                    value={profile.about}
                    maxLength={200}
                    rows={3}
                    onChange={(e) => setProfile({ ...profile, about: e.target.value })}
                    placeholder="A line about your study journey"
                    className="mt-2 w-full resize-none rounded-2xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-gold/60"
                  />
                </label>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-2 text-center">
                {[
                  { label: "Posts", value: stats.posts },
                  { label: "Questions", value: stats.answers },
                  { label: "Likes", value: stats.likes },
                ].map((s) => (
                  <div key={s.label} className="rounded-2xl border border-gold/25 py-3">
                    <p className="text-lg font-semibold text-foreground">{s.value}</p>
                    <p className="text-[11px] tracking-[0.14em] text-muted-foreground uppercase">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass rounded-3xl p-6">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                <Award className="size-5 text-gold" /> Achievements
              </h3>
              <div className="mt-4 grid gap-3">
                {achievements.map((a) => {
                  const done = earned.includes(a);
                  return (
                    <div
                      key={a.title}
                      className={`rounded-2xl border p-4 transition-colors ${
                        done ? "border-gold/60 bg-gold/10" : "border-border"
                      }`}
                    >
                      <p className="flex items-center justify-between text-sm font-semibold text-foreground">
                        {a.title}
                        {done && <Sparkles className="size-4 text-gold" />}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">{a.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-3xl border border-gold/30 bg-gradient-emerald p-6 text-cream">
              <h3 className="flex items-center gap-2 text-lg font-semibold">
                <Shield className="size-5 text-gold" /> Community adab
              </h3>
              <ul className="mt-4 grid gap-2 text-sm text-cream/80">
                {communityGuidelines.map((g) => (
                  <li key={g}>• {g}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid gap-6">
            <div className="glass rounded-3xl p-6 shadow-luxe">
              <div className="flex flex-wrap items-center gap-2">
                {(["discussions", "qa"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTab(t)}
                    className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                      tab === t
                        ? "bg-gradient-gold text-gold-foreground shadow-gold"
                        : "border border-gold/30 text-foreground hover:bg-gold/10"
                    }`}
                  >
                    {t === "discussions" ? "Discussions" : "Questions & Answers"}
                  </button>
                ))}
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search the community…"
                  className="ml-auto w-full max-w-xs rounded-full border border-border bg-card px-5 py-2.5 text-sm outline-none focus:border-gold/60"
                />
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {[{ slug: "all", title: "All topics" }, ...communityCategories].map((c) => (
                  <button
                    key={c.slug}
                    type="button"
                    onClick={() => setCategory(c.slug)}
                    className={`rounded-full px-4 py-2 text-xs font-medium tracking-wide transition-colors ${
                      category === c.slug
                        ? "bg-primary text-primary-foreground"
                        : "border border-border text-muted-foreground hover:border-gold/50 hover:text-foreground"
                    }`}
                  >
                    {c.title}
                  </button>
                ))}
              </div>
            </div>

            <div className="glass rounded-3xl p-6 shadow-luxe">
              <h2 className="text-lg font-semibold text-foreground">
                {tab === "discussions" ? "Start a discussion" : "Ask a question"}
              </h2>
              <div className="mt-4 grid gap-3">
                <select
                  value={askCategory}
                  onChange={(e) => setAskCategory(e.target.value)}
                  className="rounded-2xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-gold/60"
                >
                  {communityCategories.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.title}
                    </option>
                  ))}
                </select>
                {tab === "discussions" ? (
                  <>
                    <input
                      value={title}
                      maxLength={140}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Title of your discussion"
                      className="rounded-2xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-gold/60"
                    />
                    <textarea
                      value={body}
                      maxLength={1200}
                      rows={4}
                      onChange={(e) => setBody(e.target.value)}
                      placeholder="Share your reflection, experience or benefit…"
                      className="resize-none rounded-2xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-gold/60"
                    />
                    <button
                      type="button"
                      onClick={submitPost}
                      className="inline-flex w-fit items-center gap-2 rounded-full bg-gradient-gold px-6 py-3 text-sm font-semibold text-gold-foreground shadow-gold transition-transform hover:-translate-y-0.5"
                    >
                      <Send className="size-4" /> Post discussion
                    </button>
                  </>
                ) : (
                  <>
                    <textarea
                      value={ask}
                      maxLength={240}
                      rows={3}
                      onChange={(e) => setAsk(e.target.value)}
                      placeholder="Ask about worship, character or understanding a verse…"
                      className="resize-none rounded-2xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-gold/60"
                    />
                    <button
                      type="button"
                      onClick={submitQuestion}
                      className="inline-flex w-fit items-center gap-2 rounded-full bg-gradient-gold px-6 py-3 text-sm font-semibold text-gold-foreground shadow-gold transition-transform hover:-translate-y-0.5"
                    >
                      <Send className="size-4" /> Submit question
                    </button>
                  </>
                )}
              </div>
            </div>

            {tab === "discussions" ? (
              <div className="grid gap-5">
                {visibleDiscussions.map((d) => (
                  <article
                    key={d.id}
                    className="glass rise-in rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-luxe"
                  >
                    <div className="flex flex-wrap items-center gap-3 text-xs">
                      <span className="rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">
                        {communityCategories.find((c) => c.slug === d.category)?.title ?? "General"}
                      </span>
                      <span className="text-muted-foreground">{d.postedAt}</span>
                    </div>
                    <h3 className="mt-4 text-xl font-semibold text-foreground">{d.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{d.body}</p>
                    <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                      <span className="font-medium text-foreground">{d.author}</span>
                      <span>{d.role}</span>
                      <button
                        type="button"
                        onClick={() => like(d.id)}
                        className={`ml-auto inline-flex items-center gap-1.5 transition-colors hover:text-gold ${
                          liked.includes(d.id) ? "text-gold" : ""
                        }`}
                      >
                        <Heart className={`size-4 ${liked.includes(d.id) ? "fill-current" : ""}`} />
                        {d.likes + (liked.includes(d.id) ? 1 : 0)}
                      </button>
                      <span className="inline-flex items-center gap-1.5">
                        <MessageCircle className="size-4" /> {d.replies}
                      </span>
                      <button
                        type="button"
                        onClick={() => report(d.id)}
                        className="inline-flex items-center gap-1.5 transition-colors hover:text-destructive"
                      >
                        <Flag className="size-4" /> Report
                      </button>
                    </div>
                  </article>
                ))}
                {visibleDiscussions.length === 0 && (
                  <p className="glass rounded-3xl p-8 text-center text-sm text-muted-foreground">
                    No discussions match your search yet — be the first to start one.
                  </p>
                )}
              </div>
            ) : (
              <div className="grid gap-5">
                {questions.map((q) => (
                  <article
                    key={q.id}
                    className="rise-in rounded-3xl border border-gold/30 bg-card p-6 shadow-luxe transition-transform duration-300 hover:-translate-y-1"
                  >
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {communityCategories.find((c) => c.slug === q.category)?.title ?? "General"}
                    </span>
                    <h3 className="mt-4 text-lg font-semibold text-foreground">{q.question}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{q.answer}</p>
                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4 text-xs text-muted-foreground">
                      <span>Answered by {q.answeredBy}</span>
                      <span className="text-gold">{q.reference}</span>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Topic categories"
            title="Find your circle"
            subtitle="Every category is watched by volunteer moderators so conversation stays beneficial and safe."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {communityCategories.map((c) => (
              <button
                key={c.slug}
                type="button"
                onClick={() => {
                  setCategory(c.slug);
                  setTab("discussions");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="glass rounded-3xl p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-luxe"
              >
                <h3 className="text-lg font-semibold text-foreground">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.description}</p>
                <span className="mt-4 inline-block text-xs tracking-[0.2em] text-gold uppercase">Open topic</span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
