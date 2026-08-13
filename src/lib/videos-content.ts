export type VideoItem = {
  id: string;
  title: string;
  speaker: string;
  category: "Lectures" | "Playlists" | "Documentaries" | "Series";
  duration: string;
  topic: string;
  description: string;
  featured?: boolean;
};

export const videoCategories = ["Lectures", "Playlists", "Documentaries", "Series"] as const;

export const videos: VideoItem[] = [
  { id: "v1", title: "The Light of the Qur'an in Daily Life", speaker: "Shaykh Abdur Rahman", category: "Lectures", duration: "48 min", topic: "Qur'an", description: "How to turn daily recitation into practical change in character and worship.", featured: true },
  { id: "v2", title: "Salah: Standing Before Allah", speaker: "Ustadh Bilal Rahman", category: "Lectures", duration: "36 min", topic: "Worship", description: "Restoring presence of heart in prayer, step by step." },
  { id: "v3", title: "Patience in Times of Difficulty", speaker: "Dr. Sumayyah Karim", category: "Lectures", duration: "41 min", topic: "Akhlaq", description: "A prophetic framework for hardship, grief and hope." },
  { id: "v4", title: "Tafsir of Surah Al-Kahf", speaker: "Ustadha Maryam Haque", category: "Playlists", duration: "9 parts", topic: "Tafsir", description: "A verse-by-verse study of the four trials described in Surah Al-Kahf.", featured: true },
  { id: "v5", title: "Explaining the Forty Hadith", speaker: "Shaykh Ibrahim Malik", category: "Playlists", duration: "40 parts", topic: "Hadith", description: "One narration per episode with practical application." },
  { id: "v6", title: "The Names of Allah", speaker: "Shaykh Abdur Rahman", category: "Playlists", duration: "22 parts", topic: "Aqidah", description: "Meaning, evidence and worship connected to each beautiful name." },
  { id: "v7", title: "Cities of Light: Cordoba", speaker: "Nur al-Huda Studios", category: "Documentaries", duration: "52 min", topic: "History", description: "The libraries, mosques and scholars of Andalusia at its height.", featured: true },
  { id: "v8", title: "Preserving the Qur'an", speaker: "Nur al-Huda Studios", category: "Documentaries", duration: "44 min", topic: "History", description: "The chain of memorisation and manuscripts that carried the revelation intact." },
  { id: "v9", title: "Journey of the Hajj", speaker: "Nur al-Huda Studios", category: "Documentaries", duration: "58 min", topic: "Worship", description: "Following pilgrims through every rite of the pilgrimage." },
  { id: "v10", title: "Seerah in Twelve Chapters", speaker: "Ustadh Bilal Rahman", category: "Series", duration: "12 parts", topic: "Seerah", description: "The complete life of the Prophet ﷺ told chronologically." },
  { id: "v11", title: "Fiqh of Worship for Beginners", speaker: "Ustadha Maryam Haque", category: "Series", duration: "10 parts", topic: "Fiqh", description: "Purification, prayer, fasting and zakat explained simply." },
  { id: "v12", title: "Arabic for Qur'an Readers", speaker: "Qari Ismail Yusuf", category: "Series", duration: "16 parts", topic: "Language", description: "Grammar and vocabulary taught directly from Qur'anic verses." },
];
