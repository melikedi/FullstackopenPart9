export interface DiaryEntryType {
  id: number;
  date: string;
  weather: string;
  visibility: string;
  comment: string;
}
export type NewDiaryEntryType = Omit<DiaryEntryType, "id">;
export interface DiaryEntriesProps {
  entries: Array<DiaryEntryType>;
}
export interface DiaryEntryProps {
  entry: DiaryEntryType;
}
export interface NewDiaryEntryProps {
  onNewEntry: (entry: DiaryEntryType) => void;
}

export enum Weather {
  Sunny = "sunny",
  Rainy = "rainy",
  Cloudy = "cloudy",
  Stormy = "stormy",
  Windy = "windy",
}

export enum Visibility {
  Great = "great",
  Good = "good",
  Ok = "ok",
  Poor = "poor",
}
