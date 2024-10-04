import { z } from "zod";
import { NewPatientSchema } from "./utilsWithZod";
export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}

//unionType
//export type Gender = "male" | "female" | "other";
export enum Gender {
  male = "male",
  female = "female",
  other = "other",
}
// infer the type from schema
export type NewPatientEntry = z.infer<typeof NewPatientSchema>;

export interface PatientEntry extends NewPatientEntry {
  id: string;
}
//UtilityTypes
export type NonSensitivePatientEntry = Omit<PatientEntry, "ssn">;
// export type NewPatientEntry = Omit<PatientEntry, "id">;
