export type KidsStory = {
  slug: string;
  title: string;
  emoji: string;
  moral: string;
  story: string;
};

export const kidsStories: KidsStory[] = [
  {
    slug: "spider-cave",
    title: "The Spider and the Cave",
    emoji: "🕸️",
    moral: "Allah protects those who trust Him — even with a tiny spider.",
    story:
      "When the Prophet ﷺ and Abu Bakr (RA) hid in the cave of Thawr, a small spider spun a web across the entrance and a dove built a nest. Their enemies looked, saw the web, and walked away. Allah's help can arrive in the smallest of forms.",
  },
  {
    slug: "thirsty-dog",
    title: "The Man and the Thirsty Dog",
    emoji: "🐕",
    moral: "Kindness to animals is loved by Allah.",
    story:
      "A traveller found a dog panting with thirst beside a well. He climbed down, filled his shoe with water, and gave the dog a drink. The Prophet ﷺ told us Allah forgave that man for his kindness.",
  },
  {
    slug: "smiling-prophet",
    title: "The Prophet Who Always Smiled",
    emoji: "😊",
    moral: "A smile is a free gift — and a charity.",
    story:
      "The companions said they never met anyone who smiled more than the Prophet ﷺ. He greeted children first, played with them, and remembered their names. He taught us that smiling at someone is sadaqah.",
  },
  {
    slug: "ants-sulaiman",
    title: "Prophet Sulaiman and the Ants",
    emoji: "🐜",
    moral: "Even the smallest creature matters to Allah.",
    story:
      "Prophet Sulaiman (AS) understood the speech of animals. Once he stopped his whole army so that a line of ants could pass safely. A great king paused for the tiniest creatures — that is true greatness.",
  },
  {
    slug: "honest-boy",
    title: "The Honest Shepherd Boy",
    emoji: "🐑",
    moral: "Allah is always watching, so always tell the truth.",
    story:
      "A man asked a shepherd boy to sell him one sheep and say the owner would never know. The boy replied, 'Then where is Allah?' The man was so moved he freed the boy and gave him the flock.",
  },
  {
    slug: "date-tree",
    title: "The Boy Who Planted a Date Palm",
    emoji: "🌴",
    moral: "Good deeds keep growing, even after we are gone.",
    story:
      "A boy planted a date palm knowing he would not eat its fruit for years. His grandfather smiled: 'Someone planted for you, so you plant for others.' That is sadaqah jariyah — charity that never stops.",
  },
];

export type KidsQuizQuestion = { question: string; options: string[]; answer: number };

export const kidsQuiz: KidsQuizQuestion[] = [
  { question: "How many times do Muslims pray each day?", options: ["2", "5", "10"], answer: 1 },
  { question: "What do we say before we eat?", options: ["Bismillah", "Goodbye", "Nothing"], answer: 0 },
  { question: "Which book is the holy book of Muslims?", options: ["The Qur'an", "A storybook", "A diary"], answer: 0 },
  { question: "In which direction do Muslims pray?", options: ["Towards the Ka'bah", "Towards the sun", "Any direction"], answer: 0 },
  { question: "What is the first month of the Islamic year?", options: ["Ramadan", "Muharram", "Shawwal"], answer: 1 },
  { question: "How do we greet each other in Islam?", options: ["Assalamu alaikum", "Hello there", "Good night"], answer: 0 },
];

export const kidsCards = [
  { emoji: "🕌", title: "The Masjid", text: "The masjid is Allah's house. We enter with our right foot and say a dua." },
  { emoji: "🤲", title: "Making Dua", text: "Dua is talking to Allah. You can ask Him for anything, anytime." },
  { emoji: "🧼", title: "Wudhu", text: "Before prayer we wash our hands, mouth, nose, face, arms, head and feet." },
  { emoji: "📖", title: "Reading Qur'an", text: "We begin with Bismillah and read slowly and beautifully." },
  { emoji: "❤️", title: "Being Kind", text: "Share your toys, help your mum, and speak gently to everyone." },
  { emoji: "🌙", title: "Ramadan", text: "In Ramadan grown-ups fast, we pray more, and we give to those in need." },
];
