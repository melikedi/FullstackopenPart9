import express from "express";
import { z } from "zod";
import { Request, Response, NextFunction } from "express";
import patientService from "../services/patientService";
import {
  NewPatientEntry,
  NonSensitivePatientEntry,
  PatientEntry,
} from "../types";
import { NewPatientSchema } from "../utilsWithZod";
const router = express.Router();
const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewPatientSchema.parse(req.body);
    console.log(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};
const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.post(
  "/",
  newPatientParser,
  (
    req: Request<unknown, unknown, NewPatientEntry>,
    res: Response<PatientEntry>
  ) => {
    console.log(req.body);
    const addedEntry = patientService.addPatient(req.body);
    res.json(addedEntry);
  }
);

router.get("/:id", (req, res) => {
  const patient = patientService.findById(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});
router.get("/", (_req, res: Response<Array<NonSensitivePatientEntry>>) => {
  res.send(patientService.getNonSensitiveEntries());
});
router.use(errorMiddleware);

export default router;
