export interface ExerciseCalculatorInput {
  daily_exercises: Array<number>;
  target: number;
}
export interface ValidationResult {
  success: boolean;
  message: string;
}
export interface ExerciseCalculatorResult {
  periodLength: number;
  trainingDays: number;
  success: true | false;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}
export function IsExerciseCalculatorInput(
  object: ExerciseCalculatorInput
): ValidationResult {
  const paramsExists: boolean =
    "daily_exercises" in object && "target" in object;
  if (!paramsExists) {
    return { success: false, message: "parameters missing" };
  }
  const paramsValid: boolean =
    !isNaN(Number(object.target)) &&
    object.daily_exercises instanceof Array &&
    object.daily_exercises.reduce(
      (accumulator: boolean, currentValue: number) =>
        !isNaN(Number(currentValue))
          ? accumulator && true
          : accumulator && false,
      true
    );
  if (!paramsValid) {
    return { success: false, message: "malformatted parameters" };
  }
  return { success: true, message: "" };
}

const parseArgumentsForExerciseCalculator = (
  args: string[]
): ExerciseCalculatorInput => {
  if (args.length < 4) throw new Error("Not enough arguments");

  args.splice(0, 2);
  const isValid: boolean = args.reduce(
    (accumulator, currentValue) =>
      !isNaN(Number(currentValue)) ? accumulator && true : accumulator && false,
    true
  );
  if (!isValid) {
    throw new Error("Provided values were not valid!");
  }
  const argsInNumber: Array<number> = args.map((currElement) => {
    return Number(currElement);
  });
  return {
    target: argsInNumber.splice(0, 1)[0],
    daily_exercises: argsInNumber,
  };
};

export const calculateExercise = (
  input: ExerciseCalculatorInput
): ExerciseCalculatorResult => {
  const trainingDays: number = input.daily_exercises.filter(
    (v) => v > 0
  ).length;
  const periodLength: number = input.daily_exercises.length;
  const average: number =
    input.daily_exercises.reduce((a, b) => a + b) / periodLength;
  const rateMetric: number = input.target == 0 ? 0 : average / input.target;
  const rating: number = rateMetric >= 1 ? 3 : rateMetric <= 0.5 ? 1 : 2;
  const ratingDescription: string =
    rating == 3
      ? "You achieved your goal"
      : rating == 2
      ? "not too bad but could be better"
      : "you need to work harder";
  const success: boolean = average >= input.target ? true : false;

  const result: ExerciseCalculatorResult = {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target: input.target,
    average,
  };
  return result;
};
if (require.main === module) {
  console.log(
    calculateExercise(parseArgumentsForExerciseCalculator(process.argv))
  );
}
