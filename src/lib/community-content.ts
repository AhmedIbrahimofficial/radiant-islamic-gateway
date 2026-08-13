export type CommunityCategory = {
  slug: string;
  title: string;
  description: string;
};

export const communityCategories: CommunityCategory[] = [
  { slug: "quran", title: "Qur'an & Tafsir", description: "Recitation, memorisation and understanding the Book." },
  { slug: "hadith", title: "Hadith & Sunnah", description: "Authentic narrations and their practical meaning." },
  { slug: "fiqh", title: "Fiqh & Worship", description: "Salah, fasting, zakat and everyday rulings." },
  { slug: "seerah", title: "Seerah & History", description: "The Prophet's life ﷺ and the story of the ummah." },
  { slug: "akhlaq", title: "Akhlaq & Family", description: "Character, parenting, marriage and community life." },
  { slug: "youth", title: "Youth & Students", description: "Studying, work and staying steadfast today." },
];

export type Discussion = {
  id: string;
  category: string;
  title: string;
  body: string;
  author: string;
  role: string;
  replies: number;
  likes: number;
  postedAt: string;
};

export const seedDiscussions: Discussion[] = [
  {
    id: "d1",
    category: "quran",
    title: "A gentle routine for memorising one page a week",
    body: "I revise five lines after Fajr and repeat them after Maghrib. Consistency has helped far more than long sessions. What routines work for you?",
    author: "Hafsa Iqbal",
    role: "Qur'an circle host",
    replies: 24,
    likes: 96,
    postedAt: "2 days ago",
  },
  {
    id: "d2",
    category: "fiqh",
    title: "Praying on time while working long shifts",
    body: "Sharing what helped me: mapping prayer windows to break times and keeping a small prayer mat in my bag. Alhamdulillah, no missed Dhuhr this month.",
    author: "Yusuf Adeel",
    role: "Community member",
    replies: 31,
    likes: 142,
    postedAt: "4 days ago",
  },
  {
    id: "d3",
    category: "akhlaq",
    title: "Teaching children adhkar without pressure",
    body: "We turned the morning adhkar into a short family ritual with tea. The children now remind us. Small, joyful, repeated.",
    author: "Amina Siddiqui",
    role: "Kids programme lead",
    replies: 18,
    likes: 87,
    postedAt: "1 week ago",
  },
  {
    id: "d4",
    category: "seerah",
    title: "Lessons from the Year of Sorrow",
    body: "Studying this period reframed hardship for me: loss and patience can sit beside hope. Which moment in the Seerah changed your perspective?",
    author: "Bilal Rahman",
    role: "Study circle member",
    replies: 12,
    likes: 64,
    postedAt: "1 week ago",
  },
  {
    id: "d5",
    category: "youth",
    title: "Keeping faith strong at university",
    body: "Finding two reliable friends for Jumu'ah was the turning point. Community makes worship lighter.",
    author: "Zainab Noor",
    role: "Student",
    replies: 27,
    likes: 118,
    postedAt: "2 weeks ago",
  },
];

export type QAItem = {
  id: string;
  category: string;
  question: string;
  answer: string;
  answeredBy: string;
  reference: string;
};

export const seedQuestions: QAItem[] = [
  {
    id: "q1",
    category: "fiqh",
    question: "Can I combine prayers while travelling?",
    answer:
      "Travellers may shorten Dhuhr, Asr and Isha to two units, and the majority of scholars permit combining Dhuhr with Asr and Maghrib with Isha when travelling, based on the practice of the Prophet ﷺ on journeys.",
    answeredBy: "Shaykh Abdur Rahman",
    reference: "Sahih Muslim 705",
  },
  {
    id: "q2",
    category: "quran",
    question: "Is it better to recite quickly or slowly?",
    answer:
      "Measured, beautiful recitation is encouraged: 'And recite the Qur'an with measured recitation.' Understanding and presence of heart outweigh quantity.",
    answeredBy: "Ustadha Maryam Haque",
    reference: "Qur'an 73:4",
  },
  {
    id: "q3",
    category: "akhlaq",
    question: "How do I respond to anger in a halal way?",
    answer:
      "The Prophet ﷺ advised seeking refuge in Allah, changing posture — sitting if standing — and performing wudu. Silence in the first moments prevents most regret.",
    answeredBy: "Shaykh Ibrahim Malik",
    reference: "Sunan Abu Dawud 4782",
  },
  {
    id: "q4",
    category: "hadith",
    question: "What makes a hadith authentic?",
    answer:
      "Scholars examine an unbroken chain of upright, precise narrators and confirm the text is free of hidden defects or contradiction with stronger evidence.",
    answeredBy: "Dr. Sumayyah Karim",
    reference: "Introduction to Sahih Muslim",
  },
];

export type Achievement = {
  title: string;
  description: string;
  requirement: number;
  metric: "posts" | "answers" | "likes";
};

export const achievements: Achievement[] = [
  { title: "First Words", description: "Share your first discussion with the community.", requirement: 1, metric: "posts" },
  { title: "Consistent Voice", description: "Post five thoughtful discussions.", requirement: 5, metric: "posts" },
  { title: "Helper", description: "Answer three community questions.", requirement: 3, metric: "answers" },
  { title: "Beloved Benefit", description: "Receive fifty appreciations on your contributions.", requirement: 50, metric: "likes" },
];

export const communityGuidelines = [
  "Speak with adab: assume the best of every brother and sister.",
  "Support claims about the deen with a source or defer to qualified scholars.",
  "No sectarian attacks, mockery, politics-baiting or personal disputes.",
  "Protect privacy — never share someone's private matters or contact details.",
  "Report rather than argue; moderators review every flagged post.",
];
