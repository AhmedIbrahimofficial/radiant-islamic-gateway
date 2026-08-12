export type Lesson = { title: string; summary: string };

export type AcademySection = {
  slug: string;
  title: string;
  arabic: string;
  icon: "book" | "columns" | "users" | "star" | "heart" | "home";
  tagline: string;
  lessons: Lesson[];
};

export const academySections: AcademySection[] = [
  {
    slug: "basics",
    title: "Basics of Islam",
    arabic: "أَسَاسِيَّاتُ الْإِسْلَام",
    icon: "book",
    tagline: "Start at the beginning: belief, purpose and worship explained simply.",
    lessons: [
      { title: "Who is Allah?", summary: "Tawheed — the oneness of Allah in His lordship, worship and names." },
      { title: "The Six Articles of Faith", summary: "Belief in Allah, angels, books, messengers, the Last Day and divine decree." },
      { title: "Why We Worship", summary: "Worship as gratitude, purpose and the path to inner peace." },
      { title: "The Qur'an and Sunnah", summary: "How revelation and prophetic guidance work together as sources." },
    ],
  },
  {
    slug: "pillars",
    title: "Five Pillars of Islam",
    arabic: "أَرْكَانُ الْإِسْلَام",
    icon: "columns",
    tagline: "The five practices that hold a believer's life in balance.",
    lessons: [
      { title: "Shahadah", summary: "The testimony of faith and what it commits the heart to." },
      { title: "Salah", summary: "Five daily prayers: timings, conditions and inner presence." },
      { title: "Zakah", summary: "Purifying wealth by giving 2.5% of savings to those in need." },
      { title: "Sawm", summary: "Fasting Ramadan — discipline of body, tongue and desire." },
      { title: "Hajj", summary: "The pilgrimage to Makkah and its lessons in equality." },
    ],
  },
  {
    slug: "prophets",
    title: "Stories of the Prophets",
    arabic: "قِصَصُ الْأَنْبِيَاء",
    icon: "star",
    tagline: "Lives of the messengers, from Adam to Muhammad ﷺ.",
    lessons: [
      { title: "Adam (AS)", summary: "The first human, the first repentance, and the first lesson in humility." },
      { title: "Nuh (AS)", summary: "Patience across centuries of calling, and the ark of salvation." },
      { title: "Ibrahim (AS)", summary: "The friend of Allah who shattered idols and built the Ka'bah." },
      { title: "Musa (AS)", summary: "Courage before Pharaoh and the parting of the sea." },
      { title: "Isa (AS)", summary: "The miracles, the message, and the truth about his station." },
      { title: "Muhammad ﷺ", summary: "The final messenger — mercy to all the worlds." },
    ],
  },
  {
    slug: "sahaba",
    title: "Stories of the Sahaba",
    arabic: "سِيَرُ الصَّحَابَة",
    icon: "users",
    tagline: "The companions who carried the light after the Prophet ﷺ.",
    lessons: [
      { title: "Abu Bakr (RA)", summary: "The truthful one — first to believe, steadfast in every trial." },
      { title: "Umar (RA)", summary: "Justice, accountability and a state built on trust." },
      { title: "Uthman (RA)", summary: "Generosity that funded armies and preserved the Qur'an." },
      { title: "Ali (RA)", summary: "Knowledge, bravery and eloquence in service of truth." },
      { title: "Khadijah (RA)", summary: "The first believer, and the strength behind the mission." },
      { title: "Aisha (RA)", summary: "A scholar whose narrations shaped Islamic learning." },
    ],
  },
  {
    slug: "manners",
    title: "Islamic Manners",
    arabic: "الْأَدَبُ الْإِسْلَامِي",
    icon: "heart",
    tagline: "Adab — the beauty that makes knowledge worth carrying.",
    lessons: [
      { title: "Truthfulness", summary: "Honesty in speech, trade and promises." },
      { title: "Kindness to Neighbours", summary: "Rights of those who live beside you, Muslim or not." },
      { title: "Guarding the Tongue", summary: "Avoiding backbiting, mockery and needless argument." },
      { title: "Humility", summary: "Walking gently, listening well, giving credit away." },
    ],
  },
  {
    slug: "family",
    title: "Family & Character Building",
    arabic: "الْأُسْرَةُ وَالْأَخْلَاق",
    icon: "home",
    tagline: "Building homes of mercy and raising upright hearts.",
    lessons: [
      { title: "Rights of Parents", summary: "Birr al-walidayn — service, gentleness and dua." },
      { title: "Marriage as Mercy", summary: "Sakinah, mawaddah and rahmah as the design of a home." },
      { title: "Raising Children", summary: "Teaching prayer with warmth, fairness between siblings." },
      { title: "Managing Anger", summary: "Prophetic steps for cooling the heart before it speaks." },
    ],
  },
];
