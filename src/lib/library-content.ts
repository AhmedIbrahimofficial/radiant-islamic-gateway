export type Book = {
  id: string;
  title: string;
  author: string;
  category: string;
  pages: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  summary: string;
  featured?: boolean;
};

export const bookCategories = [
  "Quran Studies",
  "Hadith Studies",
  "Seerah",
  "Islamic History",
  "Character Building",
  "Children's Books",
] as const;

export const books: Book[] = [
  { id: "b1", title: "An Introduction to the Sciences of the Qur'an", author: "Ahmad von Denffer", category: "Quran Studies", pages: 224, level: "Beginner", summary: "How the Qur'an was revealed, preserved and compiled, with an accessible overview of tafsir.", featured: true },
  { id: "b2", title: "Tafsir Ibn Kathir (Abridged)", author: "Ibn Kathir", category: "Quran Studies", pages: 1180, level: "Advanced", summary: "A classical verse-by-verse commentary rooted in narration and the understanding of the earliest generations." },
  { id: "b3", title: "Tajweed Made Easy", author: "Qari Ismail Yusuf", category: "Quran Studies", pages: 132, level: "Beginner", summary: "Rules of recitation presented with clear diagrams and practice drills." },
  { id: "b4", title: "Riyad as-Salihin", author: "Imam an-Nawawi", category: "Hadith Studies", pages: 720, level: "Beginner", summary: "A beloved thematic collection of authentic narrations on worship, manners and daily life.", featured: true },
  { id: "b5", title: "Commentary on the Forty Hadith", author: "Imam an-Nawawi", category: "Hadith Studies", pages: 288, level: "Intermediate", summary: "Forty foundational narrations explained, covering the pillars of belief and practice." },
  { id: "b6", title: "Studies in Hadith Methodology", author: "M. M. Azami", category: "Hadith Studies", pages: 210, level: "Advanced", summary: "How narrations were transmitted, recorded and authenticated across the centuries." },
  { id: "b7", title: "The Sealed Nectar", author: "Safi-ur-Rahman al-Mubarakpuri", category: "Seerah", pages: 592, level: "Beginner", summary: "A widely read biography of the Prophet ﷺ from birth to the farewell pilgrimage.", featured: true },
  { id: "b8", title: "Muhammad ﷺ: His Life Based on the Earliest Sources", author: "Martin Lings", category: "Seerah", pages: 384, level: "Intermediate", summary: "A lyrical narrative Seerah drawn closely from the classical Arabic accounts." },
  { id: "b9", title: "The Men Around the Messenger", author: "Khalid Muhammad Khalid", category: "Seerah", pages: 448, level: "Intermediate", summary: "Portraits of the Companions and the character that carried the message forward." },
  { id: "b10", title: "Lost Islamic History", author: "Firas Alkhateeb", category: "Islamic History", pages: 272, level: "Beginner", summary: "Fourteen centuries of Muslim civilisation told through scholarship, trade and empire." },
  { id: "b11", title: "The Venture of Islam", author: "Marshall Hodgson", category: "Islamic History", pages: 1600, level: "Advanced", summary: "A landmark scholarly survey of Islamic civilisation and its intellectual currents." },
  { id: "b12", title: "The Ottoman Centuries", author: "Lord Kinross", category: "Islamic History", pages: 640, level: "Intermediate", summary: "The rise, height and decline of one of the longest-lasting Muslim states." },
  { id: "b13", title: "Purification of the Heart", author: "Hamza Yusuf", category: "Character Building", pages: 240, level: "Intermediate", summary: "Spiritual diseases of the heart and their remedies, based on a classical poem.", featured: true },
  { id: "b14", title: "Don't Be Sad", author: "Aaidh ibn Abdullah al-Qarni", category: "Character Building", pages: 340, level: "Beginner", summary: "Qur'anic and prophetic guidance for contentment, patience and hope." },
  { id: "b15", title: "Enjoy Your Life", author: "Muhammad al-Arifi", category: "Character Building", pages: 480, level: "Beginner", summary: "Prophetic manners applied to family, work and friendship with warm real-life stories." },
  { id: "b16", title: "My First Book About Allah", author: "Sara Khan", category: "Children's Books", pages: 32, level: "Beginner", summary: "Gentle illustrated pages introducing the beautiful names of Allah to young children.", featured: true },
  { id: "b17", title: "Stories of the Prophets for Kids", author: "Saniyasnain Khan", category: "Children's Books", pages: 96, level: "Beginner", summary: "Short, vivid retellings of the Prophets' stories with lessons children remember." },
  { id: "b18", title: "The Adhkar Activity Book", author: "Nur al-Huda Kids", category: "Children's Books", pages: 64, level: "Beginner", summary: "Colouring, tracing and memory games that teach the daily supplications." },
];

export const readingPaths = [
  { title: "New to structured study", books: ["An Introduction to the Sciences of the Qur'an", "Riyad as-Salihin", "The Sealed Nectar"] },
  { title: "Building character this year", books: ["Purification of the Heart", "Don't Be Sad", "Enjoy Your Life"] },
  { title: "Reading with children", books: ["My First Book About Allah", "Stories of the Prophets for Kids", "The Adhkar Activity Book"] },
];
