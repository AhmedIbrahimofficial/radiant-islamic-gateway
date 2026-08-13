export type IslamicEvent = {
  id: string;
  title: string;
  category: "Ramadan" | "Eid" | "Conference" | "Mosque" | "Education";
  date: string;
  time: string;
  location: string;
  host: string;
  summary: string;
  description: string;
  agenda: { time: string; item: string }[];
  seats: number;
  free: boolean;
};

export const eventCategories = ["Ramadan", "Eid", "Conference", "Mosque", "Education"] as const;

export const islamicEvents: IslamicEvent[] = [
  {
    id: "ramadan-night-circle",
    title: "Nightly Ramadan Tafsir Circle",
    category: "Ramadan",
    date: "2027-02-18",
    time: "21:00",
    location: "Masjid al-Noor, Karachi",
    host: "Shaykh Abdur Rahman",
    summary: "Thirty nights of tafsir covering one juz each evening after Isha.",
    description:
      "Join a nightly gathering through Ramadan where one juz is explained with clarity and reflection, followed by Taraweeh and a short question session. Suitable for all levels; seats reserved for families.",
    agenda: [
      { time: "21:00", item: "Isha prayer in congregation" },
      { time: "21:30", item: "Tafsir of the night's juz" },
      { time: "22:15", item: "Taraweeh" },
      { time: "23:30", item: "Questions and light refreshments" },
    ],
    seats: 240,
    free: true,
  },
  {
    id: "laylatul-qadr-vigil",
    title: "Laylatul Qadr Vigil & Qiyam",
    category: "Ramadan",
    date: "2027-03-08",
    time: "23:30",
    location: "Grand Mosque Hall, Lahore",
    host: "Nur al-Huda Community",
    summary: "A night of Qur'an, qiyam and quiet supplication until Fajr.",
    description:
      "A carefully arranged night programme in the final ten nights: recitation, long qiyam, collective dua and suhoor served before Fajr. Separate prayer spaces for brothers and sisters.",
    agenda: [
      { time: "23:30", item: "Reminder and intention" },
      { time: "00:00", item: "Qiyam in eight units" },
      { time: "02:30", item: "Personal dua and dhikr" },
      { time: "04:15", item: "Suhoor and Fajr" },
    ],
    seats: 600,
    free: true,
  },
  {
    id: "eid-al-fitr-festival",
    title: "Eid al-Fitr Community Festival",
    category: "Eid",
    date: "2027-03-19",
    time: "07:30",
    location: "Riverside Grounds, Karachi",
    host: "Masjid al-Noor Council",
    summary: "Eid salah followed by a family festival with food stalls and children's activities.",
    description:
      "Eid prayer in the open air with a short khutbah, then a full morning of family celebration: charity stalls, calligraphy demonstrations, storytelling for children and a communal breakfast.",
    agenda: [
      { time: "07:30", item: "Takbirat and Eid salah" },
      { time: "08:15", item: "Khutbah and greetings" },
      { time: "09:00", item: "Family festival opens" },
      { time: "12:00", item: "Closing dua" },
    ],
    seats: 1500,
    free: true,
  },
  {
    id: "eid-al-adha-qurbani",
    title: "Eid al-Adha Qurbani Programme",
    category: "Eid",
    date: "2027-05-26",
    time: "06:45",
    location: "Community Centre, Islamabad",
    host: "Relief & Community Trust",
    summary: "Eid salah with an organised, ethical qurbani and distribution drive.",
    description:
      "Register a share for qurbani, learn the sunnah method and join volunteers distributing meat to families in need across the city on the same day.",
    agenda: [
      { time: "06:45", item: "Eid salah" },
      { time: "08:00", item: "Qurbani briefing for volunteers" },
      { time: "10:00", item: "Distribution routes depart" },
    ],
    seats: 320,
    free: false,
  },
  {
    id: "ilm-conference",
    title: "Ilm Conference: Faith in a Modern World",
    category: "Conference",
    date: "2027-04-24",
    time: "10:00",
    location: "Convention Centre, Dubai",
    host: "International Scholars Council",
    summary: "Two days of keynotes and panels on knowledge, ethics and technology.",
    description:
      "Leading scholars and researchers discuss the preservation of the sciences of the deen, ethical technology, mental health and youth leadership, with workshops and a bookshop.",
    agenda: [
      { time: "10:00", item: "Opening recitation and keynote" },
      { time: "12:00", item: "Panel: knowledge in the digital age" },
      { time: "14:30", item: "Workshops" },
      { time: "17:00", item: "Closing reflections" },
    ],
    seats: 900,
    free: false,
  },
  {
    id: "weekly-halaqa",
    title: "Weekly Masjid Halaqa & Community Iftar",
    category: "Mosque",
    date: "2027-01-29",
    time: "18:30",
    location: "Masjid al-Huda, Manchester",
    host: "Ustadh Bilal Rahman",
    summary: "A weekly halaqa followed by a shared meal for the neighbourhood.",
    description:
      "Every Friday evening the masjid hosts a short lesson on the Sunnah, a hadith memorisation drill and an open community meal. Newcomers and non-Muslim guests are welcome.",
    agenda: [
      { time: "18:30", item: "Maghrib and shared meal" },
      { time: "19:15", item: "Hadith of the week" },
      { time: "20:00", item: "Open questions" },
    ],
    seats: 150,
    free: true,
  },
  {
    id: "arabic-intensive",
    title: "Qur'anic Arabic Intensive (8 Weeks)",
    category: "Education",
    date: "2027-02-06",
    time: "17:00",
    location: "Online — live classes",
    host: "Ustadha Maryam Haque",
    summary: "Read and understand the Qur'an directly with structured grammar and vocabulary.",
    description:
      "An eight-week guided course covering essential grammar, high-frequency Qur'anic vocabulary and applied translation practice, with weekly assignments and recorded replays.",
    agenda: [
      { time: "17:00", item: "Grammar lesson" },
      { time: "17:45", item: "Applied translation" },
      { time: "18:15", item: "Practice and homework review" },
    ],
    seats: 200,
    free: false,
  },
  {
    id: "hifz-bootcamp",
    title: "Youth Hifz Bootcamp",
    category: "Education",
    date: "2027-06-12",
    time: "09:00",
    location: "Nur Academy, Karachi",
    host: "Hafiz Yusuf Adeel",
    summary: "A ten-day memorisation bootcamp with mentors and revision systems.",
    description:
      "Designed for students aged 12-20: memorisation technique, tajweed correction, revision scheduling and daily one-to-one mentoring, ending with a certificate gathering.",
    agenda: [
      { time: "09:00", item: "New memorisation block" },
      { time: "11:00", item: "Tajweed correction" },
      { time: "14:00", item: "Revision and mentoring" },
    ],
    seats: 80,
    free: false,
  },
];

export function formatEventDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
