import express from "express";
import { calculateBmi, isBMIInput } from "./bmiCalculator";
import {
  ExerciseCalculatorInput,
  calculateExercise,
  IsExerciseCalculatorInput,
  ValidationResult,
} from "./exerciseCalculator";
const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.post("/exercises", (request, response) => {
  const exerciseReq = request.body as ExerciseCalculatorInput;
  const validate: ValidationResult = IsExerciseCalculatorInput(exerciseReq);
  if (validate.success) {
    const exerciseResult = calculateExercise(exerciseReq);
    response.status(200).json(exerciseResult);
  } else {
    response.status(400).json({ error: validate.message });
  }
});

app.get("/bmi", (req, res) => {
  if (isBMIInput(req.query)) {
    const result: string = calculateBmi(req.query);
    res.status(200).send({
      weight: req.query.weight,
      height: req.query.height,
      bmi: result,
    });
  } else {
    res.status(400).send({ error: "malformatted parameters" });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
