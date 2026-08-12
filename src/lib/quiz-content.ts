export type QuizLevel = "Beginner" | "Intermediate" | "Advanced";

export type QuizQuestion = {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

export type QuizCategory = {
  slug: string;
  title: string;
  description: string;
  levels: Record<QuizLevel, QuizQuestion[]>;
};

export const quizLevels: QuizLevel[] = ["Beginner", "Intermediate", "Advanced"];

export const quizCategories: QuizCategory[] = [
  {
    slug: "quran",
    title: "Qur'an Knowledge",
    description: "Surahs, revelation and the structure of the Book of Allah.",
    levels: {
      Beginner: [
        { question: "How many Surahs are in the Qur'an?", options: ["99", "110", "114", "120"], answer: 2, explanation: "The Qur'an contains 114 Surahs." },
        { question: "Which Surah is called the Mother of the Book?", options: ["Al-Baqarah", "Al-Fatihah", "Yaseen", "Al-Ikhlas"], answer: 1, explanation: "Al-Fatihah is known as Umm al-Kitab." },
        { question: "In which month was the Qur'an first revealed?", options: ["Rajab", "Shawwal", "Ramadan", "Muharram"], answer: 2, explanation: "Revelation began in Ramadan, in Laylatul Qadr." },
      ],
      Intermediate: [
        { question: "Which Surah is the longest?", options: ["Al-Baqarah", "An-Nisa", "Aal-Imran", "Al-Ma'idah"], answer: 0, explanation: "Al-Baqarah has 286 verses." },
        { question: "Which Surah does not begin with Bismillah?", options: ["At-Tawbah", "Al-Anfal", "Yunus", "Hud"], answer: 0, explanation: "Surah At-Tawbah begins without the Basmalah." },
        { question: "Which angel delivered the revelation?", options: ["Mika'il", "Israfil", "Jibril", "Malik"], answer: 2, explanation: "Jibril (AS) conveyed revelation to the Prophet ﷺ." },
      ],
      Advanced: [
        { question: "How many verses are there in Surah Al-Kahf?", options: ["110", "99", "120", "128"], answer: 0, explanation: "Surah Al-Kahf contains 110 verses." },
        { question: "Which Surah is known as the heart of the Qur'an?", options: ["Ar-Rahman", "Yaseen", "Al-Mulk", "Al-Waqi'ah"], answer: 1, explanation: "Surah Yaseen is widely called the heart of the Qur'an." },
        { question: "How many Surahs are Madani (revealed in Madinah)?", options: ["28", "34", "86", "40"], answer: 0, explanation: "Scholars commonly count 28 Madani Surahs." },
      ],
    },
  },
  {
    slug: "seerah",
    title: "Seerah & Prophets",
    description: "The life of the Prophet ﷺ and the messengers before him.",
    levels: {
      Beginner: [
        { question: "In which city was the Prophet ﷺ born?", options: ["Madinah", "Makkah", "Ta'if", "Jerusalem"], answer: 1, explanation: "He ﷺ was born in Makkah in 570 CE." },
        { question: "Who was the Prophet's ﷺ first wife?", options: ["Aisha (RA)", "Hafsah (RA)", "Khadijah (RA)", "Zaynab (RA)"], answer: 2, explanation: "Khadijah bint Khuwaylid (RA)." },
        { question: "Which prophet built the ark?", options: ["Nuh (AS)", "Musa (AS)", "Hud (AS)", "Salih (AS)"], answer: 0, explanation: "Nuh (AS) built the ark by Allah's command." },
      ],
      Intermediate: [
        { question: "In which year did the Hijrah take place?", options: ["610 CE", "622 CE", "630 CE", "632 CE"], answer: 1, explanation: "The migration to Madinah occurred in 622 CE." },
        { question: "Which battle was the first major battle of Islam?", options: ["Uhud", "Khandaq", "Badr", "Khaybar"], answer: 2, explanation: "The Battle of Badr, 2 AH." },
        { question: "Which prophet was given the Zabur?", options: ["Dawud (AS)", "Sulaiman (AS)", "Yusuf (AS)", "Yaqub (AS)"], answer: 0, explanation: "Dawud (AS) was given the Zabur (Psalms)." },
      ],
      Advanced: [
        { question: "In which cave did the first revelation occur?", options: ["Thawr", "Hira", "Uhud", "Safa"], answer: 1, explanation: "The cave of Hira on Jabal an-Nur." },
        { question: "How many years did the Prophet ﷺ preach in Makkah?", options: ["10", "13", "15", "8"], answer: 1, explanation: "Thirteen years before the Hijrah." },
        { question: "Who was known as the 'Sword of Allah'?", options: ["Khalid ibn al-Walid (RA)", "Sa'd ibn Abi Waqqas (RA)", "Bilal (RA)", "Zayd (RA)"], answer: 0, explanation: "Khalid ibn al-Walid (RA) earned the title Sayf Allah." },
      ],
    },
  },
  {
    slug: "fiqh",
    title: "Worship & Fiqh",
    description: "Salah, fasting, zakah and the practical rulings of worship.",
    levels: {
      Beginner: [
        { question: "How many obligatory prayers are there daily?", options: ["3", "5", "7", "4"], answer: 1, explanation: "Five daily prayers are obligatory." },
        { question: "What is the zakah rate on savings?", options: ["1%", "2.5%", "5%", "10%"], answer: 1, explanation: "2.5% of qualifying wealth held for a lunar year." },
        { question: "How many rak'ahs in Fajr?", options: ["2", "3", "4", "5"], answer: 0, explanation: "Fajr has two obligatory rak'ahs." },
      ],
      Intermediate: [
        { question: "What nullifies wudhu?", options: ["Reciting Qur'an", "Passing wind", "Drinking water", "Walking"], answer: 1, explanation: "Passing wind breaks wudhu." },
        { question: "What is the prayer performed in congregation on Friday?", options: ["Tarawih", "Jumu'ah", "Witr", "Duha"], answer: 1, explanation: "Salat al-Jumu'ah replaces Zuhr on Friday." },
        { question: "Which night prayers are specific to Ramadan?", options: ["Tahajjud", "Tarawih", "Ishraq", "Awwabin"], answer: 1, explanation: "Tarawih is prayed nightly in Ramadan." },
      ],
      Advanced: [
        { question: "What is the minimum wealth threshold for zakah called?", options: ["Nisab", "Khums", "Fitrah", "Kaffarah"], answer: 0, explanation: "The nisab is the threshold of zakatable wealth." },
        { question: "Which pillar of Hajj involves standing at Arafah?", options: ["Tawaf", "Wuquf", "Sa'i", "Ramy"], answer: 1, explanation: "Wuquf at Arafah on 9 Dhul-Hijjah is essential." },
        { question: "What is the fasting expiation for deliberately breaking a Ramadan fast?", options: ["One day", "Sixty consecutive days or feeding 60 poor", "Ten days", "No expiation"], answer: 1, explanation: "Kaffarah is fasting 60 consecutive days or feeding 60 poor people." },
      ],
    },
  },
  {
    slug: "akhlaq",
    title: "Akhlaq & Manners",
    description: "Character, adab and the ethics of daily life.",
    levels: {
      Beginner: [
        { question: "What should you say before eating?", options: ["Alhamdulillah", "Bismillah", "Subhanallah", "Astaghfirullah"], answer: 1, explanation: "We begin with Bismillah." },
        { question: "What is the Islamic greeting?", options: ["Marhaba", "Assalamu alaikum", "Ahlan", "Sabah al-khayr"], answer: 1, explanation: "Assalamu alaikum — peace be upon you." },
        { question: "Speaking ill of someone behind their back is called:", options: ["Ghibah", "Sadaqah", "Shukr", "Sabr"], answer: 0, explanation: "Ghibah (backbiting) is forbidden." },
      ],
      Intermediate: [
        { question: "What does 'Birr al-walidayn' mean?", options: ["Charity", "Kindness to parents", "Fasting", "Night prayer"], answer: 1, explanation: "It is dutiful kindness toward parents." },
        { question: "Which act is described as charity even when free?", options: ["Smiling", "Sleeping", "Travelling", "Shopping"], answer: 0, explanation: "A smile to your brother is charity." },
        { question: "What is 'amanah'?", options: ["Trustworthiness", "Wealth", "Fear", "Anger"], answer: 0, explanation: "Amanah means trust and reliability." },
      ],
      Advanced: [
        { question: "Which quality did the Prophet ﷺ say weighs heaviest on the scales?", options: ["Good character", "Long prayer", "Wealth", "Travel"], answer: 0, explanation: "Nothing is heavier on the scales than good character." },
        { question: "'Ihsan' in worship means:", options: ["To worship as though you see Allah", "To pray loudly", "To fast often", "To give in secret"], answer: 0, explanation: "Ihsan is worshipping Allah as if you see Him." },
        { question: "What is 'muraqabah'?", options: ["Mindful awareness of Allah", "Reciting fast", "Group study", "Charity fund"], answer: 0, explanation: "Muraqabah is constant God-consciousness." },
      ],
    },
  },
];

export type Badge = { id: string; label: string; description: string; threshold: number };

export const badges: Badge[] = [
  { id: "seeker", label: "Seeker of Knowledge", description: "Complete your first quiz", threshold: 1 },
  { id: "student", label: "Diligent Student", description: "Complete 3 quizzes", threshold: 3 },
  { id: "scholar", label: "Rising Scholar", description: "Complete 6 quizzes", threshold: 6 },
  { id: "hafiz", label: "Master of Knowledge", description: "Complete 10 quizzes", threshold: 10 },
];
