import { DiaryEntriesProps } from "../types";
import { DiaryEntry } from "./DiaryEntry";
export const DiaryEntries = (props: DiaryEntriesProps) => {
  return (
    <div>
      {props.entries.map((e) => (
        <DiaryEntry key={e.id} entry={e}></DiaryEntry>
      ))}
    </div>
  );
};
