import express from "express";
import cors from "cors";
import diagnosesRouter from "./routers/diagnoses";
import patientRouter from "./routers/patients";
const app = express();
app.use(express.json());

app.use(cors());
const PORT = 3001;

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.use("/api/diagnoses", diagnosesRouter);
app.use("/api/patients", patientRouter);
console.log("index.ts");
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});