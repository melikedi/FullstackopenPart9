import { PartProps } from "../types";
import { assertNever } from "../utils";
export const Part = (props: PartProps): JSX.Element => {
  const boldText = {
    fontWeight: "bold",
  };
  const italicText = {
    fontStyle: "italic",
  };
  const getComponent = () => {
    const part = props.part;
    switch (part.kind) {
      case "background":
        return (
          <div>
            <p style={boldText}>
              {part.name} {part.exerciseCount}
            </p>
            <p style={italicText}>{part.description}</p>
            <p>Background Material : {part.backgroundMaterial}</p>
            <hr />
          </div>
        );
      case "basic":
        return (
          <div>
            <p style={boldText}>
              {part.name} {part.exerciseCount}
            </p>
            <p style={italicText}>{part.description}</p>
            <hr />
          </div>
        );
      case "group":
        return (
          <div>
            <p style={boldText}>
              {part.name} {part.exerciseCount}
            </p>
            <p>Project Exercises : {part.groupProjectCount}</p>
            <hr />
          </div>
        );
      case "special":
        return (
          <div>
            <p style={boldText}>
              {part.name} {part.exerciseCount}
            </p>
            <p style={italicText}>{part.description}</p>
            <p>Required Skills: {part.requirements.join(",")}</p>
            <hr />
          </div>
        );
      default:
        return assertNever(part);
    }
  };

  return getComponent();
};
