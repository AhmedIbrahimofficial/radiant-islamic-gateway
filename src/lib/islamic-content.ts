export type Verse = {
  reference: string;
  arabic: string;
  urdu: string;
  english: string;
};

export const dailyVerses: Verse[] = [
  {
    reference: "Surah Al-Baqarah 2:286",
    arabic: "لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا",
    urdu: "اللہ کسی جان پر اُس کی طاقت سے زیادہ بوجھ نہیں ڈالتا۔",
    english: "Allah does not burden a soul beyond that it can bear.",
  },
  {
    reference: "Surah Ash-Sharh 94:6",
    arabic: "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
    urdu: "بے شک ہر تنگی کے ساتھ آسانی ہے۔",
    english: "Indeed, with hardship comes ease.",
  },
  {
    reference: "Surah Ar-Ra'd 13:28",
    arabic: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ",
    urdu: "یاد رکھو! اللہ کے ذکر سے ہی دلوں کو سکون ملتا ہے۔",
    english: "Verily, in the remembrance of Allah do hearts find rest.",
  },
  {
    reference: "Surah Al-Baqarah 2:152",
    arabic: "فَاذْكُرُونِي أَذْكُرْكُمْ وَاشْكُرُوا لِي وَلَا تَكْفُرُونِ",
    urdu: "پس تم مجھے یاد کرو، میں تمہیں یاد کروں گا، اور میرا شکر کرو اور ناشکری نہ کرو۔",
    english: "So remember Me; I will remember you. And be grateful to Me and do not deny Me.",
  },
];

export const dailyHadiths = [
  {
    text: "The best among you are those who have the best manners and character.",
    urdu: "تم میں سب سے بہتر وہ ہیں جن کے اخلاق سب سے اچھے ہوں۔",
    source: "Sahih al-Bukhari 3559",
  },
  {
    text: "None of you truly believes until he loves for his brother what he loves for himself.",
    urdu: "تم میں سے کوئی مومن نہیں ہو سکتا جب تک وہ اپنے بھائی کے لیے وہی پسند نہ کرے جو اپنے لیے پسند کرتا ہے۔",
    source: "Sahih al-Bukhari 13",
  },
  {
    text: "The most beloved deeds to Allah are those done consistently, even if small.",
    urdu: "اللہ کے نزدیک سب سے محبوب عمل وہ ہے جو ہمیشگی کے ساتھ کیا جائے، خواہ تھوڑا ہو۔",
    source: "Sahih al-Bukhari 6464",
  },
  {
    text: "Whoever believes in Allah and the Last Day should speak good or remain silent.",
    urdu: "جو اللہ اور آخرت پر ایمان رکھتا ہے وہ اچھی بات کہے یا خاموش رہے۔",
    source: "Sahih al-Bukhari 6018",
  },
];

export const islamicQuotes = [
  { text: "Patience is the key to relief, and gratitude is the key to increase.", author: "Imam Ali (RA)" },
  { text: "Knowledge without action is like a tree without fruit.", author: "Imam Al-Ghazali" },
  { text: "The heart that remembers Allah is a heart that is never alone.", author: "Ibn al-Qayyim" },
  { text: "Whoever fears Allah, Allah makes a way out for him.", author: "Ibn Kathir" },
  { text: "Silence is the garment of the wise and the shield of the humble.", author: "Imam Ash-Shafi'i" },
];

export const articles = [
  {
    slug: "power-of-salah",
    title: "The Transformative Power of Salah",
    excerpt:
      "Five daily prayers are not merely rituals — they are anchors of tranquillity that restructure the rhythm of a believer's day.",
    category: "Worship",
    readTime: "6 min read",
  },
  {
    slug: "adab-of-quran",
    title: "The Adab of Reciting the Qur'an",
    excerpt:
      "From wudhu and posture to tadabbur and tears — the etiquettes that turn recitation into a living conversation.",
    category: "Qur'an",
    readTime: "8 min read",
  },
  {
    slug: "sabr-and-shukr",
    title: "Sabr and Shukr: Two Wings of the Soul",
    excerpt:
      "How the believer flies between patience in trials and gratitude in ease, and why both are forms of worship.",
    category: "Spirituality",
    readTime: "5 min read",
  },
  {
    slug: "charity-that-flows",
    title: "Sadaqah Jariyah: Charity That Never Stops",
    excerpt:
      "Wells, orphan sponsorships, and teaching — deeds whose reward continues long after we depart.",
    category: "Community",
    readTime: "4 min read",
  },
];

export const duas = [
  {
    title: "Dua for Guidance",
    arabic: "رَبَّنَا آتِنَا مِن لَّدُنكَ رَحْمَةً وَهَيِّئْ لَنَا مِنْ أَمْرِنَا رَشَدًا",
    english: "Our Lord, grant us mercy from Yourself and guide us rightly in our affair.",
    urdu: "اے ہمارے رب! ہمیں اپنی رحمت عطا فرما اور ہمارے کام میں ہدایت کی راہ آسان کر دے۔",
    source: "Surah Al-Kahf 18:10",
  },
  {
    title: "Dua for Knowledge",
    arabic: "رَّبِّ زِدْنِي عِلْمًا",
    english: "My Lord, increase me in knowledge.",
    urdu: "اے میرے رب! میرے علم میں اضافہ فرما۔",
    source: "Surah Ta-Ha 20:114",
  },
  {
    title: "Dua for Forgiveness",
    arabic: "رَبَّنَا اغْفِرْ لَنَا ذُنُوبَنَا وَإِسْرَافَنَا فِي أَمْرِنَا",
    english: "Our Lord, forgive us our sins and our excesses in our affairs.",
    urdu: "اے ہمارے رب! ہمارے گناہ اور ہمارے معاملات میں زیادتیاں بخش دے۔",
    source: "Surah Aal-Imran 3:147",
  },
  {
    title: "Dua for Protection",
    arabic: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ",
    english: "In the name of Allah, with whose name nothing can cause harm.",
    urdu: "اللہ کے نام سے، جس کے نام کے ساتھ کوئی چیز نقصان نہیں پہنچا سکتی۔",
    source: "Sunan Abi Dawud 5088",
  },
  {
    title: "Dua for Ease",
    arabic: "اللَّهُمَّ لَا سَهْلَ إِلَّا مَا جَعَلْتَهُ سَهْلًا",
    english: "O Allah, nothing is easy except what You make easy.",
    urdu: "اے اللہ! کوئی چیز آسان نہیں سوائے اُس کے جسے تو آسان بنا دے۔",
    source: "Ibn Hibban",
  },
  {
    title: "Dua Before Sleeping",
    arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
    english: "In Your name, O Allah, I die and I live.",
    urdu: "اے اللہ! تیرے نام سے میں مرتا ہوں اور جیتا ہوں۔",
    source: "Sahih al-Bukhari 6324",
  },
];

export const historyMilestones = [
  {
    year: "570 CE",
    title: "The Year of the Elephant",
    detail: "The Prophet Muhammad ﷺ is born in Makkah, in the noble tribe of Quraysh.",
  },
  {
    year: "610 CE",
    title: "The First Revelation",
    detail: "In the cave of Hira, the first verses of Surah Al-Alaq are revealed: 'Read, in the name of your Lord.'",
  },
  {
    year: "622 CE",
    title: "The Hijrah to Madinah",
    detail: "The migration that began the Islamic calendar and the first Muslim community-state.",
  },
  {
    year: "630 CE",
    title: "The Opening of Makkah",
    detail: "Makkah is entered peacefully and the Ka'bah is restored to the worship of one God.",
  },
  {
    year: "8th century",
    title: "The House of Wisdom",
    detail: "Baghdad becomes a beacon of science, medicine, and translation for the whole world.",
  },
  {
    year: "10th century",
    title: "Al-Andalus Flourishes",
    detail: "Cordoba's libraries, astronomy, and architecture shape European renaissance thought.",
  },
];

export function pickByDay<T>(items: T[], offset = 0): T {
  const day = Math.floor(Date.now() / 86_400_000) + offset;
  return items[day % items.length]!;
}