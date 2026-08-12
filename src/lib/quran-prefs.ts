import { useCallback, useEffect, useState } from "react";

const BOOKMARKS = "nur-quran-bookmarks";
const RECENT = "nur-quran-recent";
const LAST_READ = "nur-quran-last-read";

function read(key: string): number[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as number[]) : [];
  } catch {
    return [];
  }
}

export function useQuranPrefs() {
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  const [recent, setRecent] = useState<number[]>([]);
  const [lastRead, setLastRead] = useState<number | null>(null);

  useEffect(() => {
    setBookmarks(read(BOOKMARKS));
    setRecent(read(RECENT));
    const last = window.localStorage.getItem(LAST_READ);
    setLastRead(last ? Number(last) : null);
  }, []);

  const toggleBookmark = useCallback((n: number) => {
    setBookmarks((prev) => {
      const next = prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n];
      window.localStorage.setItem(BOOKMARKS, JSON.stringify(next));
      return next;
    });
  }, []);

  return { bookmarks, recent, lastRead, toggleBookmark };
}

export function recordVisit(n: number) {
  if (typeof window === "undefined") return;
  const prev = read(RECENT).filter((x) => x !== n);
  window.localStorage.setItem(RECENT, JSON.stringify([n, ...prev].slice(0, 8)));
  window.localStorage.setItem(LAST_READ, String(n));
}

const READING_DARK = "nur-quran-dark";

export function useReadingDarkMode() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(READING_DARK) === "1";
    setDark(saved);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    window.localStorage.setItem(READING_DARK, dark ? "1" : "0");
    return () => document.documentElement.classList.remove("dark");
  }, [dark]);

  return { dark, setDark };
}