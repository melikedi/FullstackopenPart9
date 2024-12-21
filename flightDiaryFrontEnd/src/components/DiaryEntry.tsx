import { DiaryEntryProps } from "../types";

export const DiaryEntry = (props: DiaryEntryProps) => {
  const boldText = {
    fontWeight: "bold",
  };
  return (
    <div>
      <p style={boldText}>{props.entry.date}</p>
      <p>visibility : {props.entry.visibility}</p>
      <p>weather : {props.entry.weather}</p>
      <hr />
    </div>
  );
};
