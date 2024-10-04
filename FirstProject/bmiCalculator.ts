export interface BMIInput {
  height: number;
  weight: number;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isBMIInput(obj: any): obj is BMIInput {
  console.log("isBMIInput", obj);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const result: boolean =
    obj &&
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    typeof obj.height === "string" &&
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    !isNaN(Number(obj.height)) &&
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    typeof obj.weight === "string" &&
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    !isNaN(Number(obj.weight));
  return result;
}
export const parseArguments = (args: string[]): BMIInput => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

export const calculateBmi = (input: BMIInput): string => {
  const bmi = input.weight / (input.height / 100) ** 2;
  if (bmi <= 18.4) {
    return "Underweight Range";
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    return "Normal Range";
  } else if (bmi >= 25) {
    return "Overweight Range";
  } else {
    return "Could not be calculated";
  }
};
if (require.main === module) {
  try {
    const result = calculateBmi(parseArguments(process.argv));
    console.log(result);
  } catch (error: unknown) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
  }
}
