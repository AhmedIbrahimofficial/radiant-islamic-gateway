export type Surah = {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
};

export type Ayah = { numberInSurah: number; text: string };

export type SurahDetail = {
  surah: Surah;
  arabic: Ayah[];
  urdu: Ayah[];
  english: Ayah[];
};

const BASE = "https://api.alquran.cloud/v1";

export const surahListQuery = {
  queryKey: ["surahs"],
  staleTime: 1000 * 60 * 60,
  queryFn: async (): Promise<Surah[]> => {
    const res = await fetch(`${BASE}/surah`);
    if (!res.ok) throw new Error("Unable to load Surah list");
    const json = (await res.json()) as { data: Surah[] };
    return json.data;
  },
};

export function surahDetailQuery(number: number) {
  return {
    queryKey: ["surah", number],
    staleTime: 1000 * 60 * 60,
    queryFn: async (): Promise<SurahDetail> => {
      const res = await fetch(
        `${BASE}/surah/${number}/editions/quran-uthmani,ur.jalandhry,en.sahih`,
      );
      if (!res.ok) throw new Error("Unable to load this Surah");
      const json = (await res.json()) as {
        data: Array<Surah & { ayahs: Ayah[] }>;
      };
      const [arabic, urdu, english] = json.data;
      if (!arabic || !urdu || !english) throw new Error("Incomplete Surah data");
      const { ayahs: _a, ...surah } = arabic;
      return {
        surah: surah as Surah,
        arabic: arabic.ayahs,
        urdu: urdu.ayahs,
        english: english.ayahs,
      };
    },
  };
}

export function surahAudioUrl(number: number) {
  return `https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/${number}.mp3`;
}

export const popularSurahs = [1, 2, 18, 36, 55, 67, 112];