import { TotalProps } from "../types";

export const Total = (props: TotalProps): JSX.Element => {
  return <p>Number of exercises {props.numberOfExercises}</p>;
};
