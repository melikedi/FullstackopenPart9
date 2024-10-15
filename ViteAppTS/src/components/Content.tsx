import { ContentProps } from "../types";
import { Part } from "./Part";
export const Content = (props: ContentProps): JSX.Element => {
  return (
    <div>
      {props.content.map((c) => (
        <Part key={c.id} part={c}></Part>
      ))}
    </div>
  );
};
