import { z } from "zod";
import {
  NewPatientSchema,
  DiagnoseSchema,
  NewEntrySchema,
  EntrySchema,
} from "./utilsWithZod";

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}
export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}
export enum BaseEntryType {
  HealthCheck = "HealthCheck",
  OccupationalHealthcare = "OccupationalHealthcare",
  Hospital = "Hospital",
}
// infer the type from schema
export type NewPatientEntry = z.infer<typeof NewPatientSchema>;
export type DiagnoseEntry = z.infer<typeof DiagnoseSchema>;
export type NewEntryEntry = z.infer<typeof NewEntrySchema>;
export type EntryEntry = z.infer<typeof EntrySchema>;

export interface PatientEntry extends NewPatientEntry {
  id: string;
}

//UtilityTypes
export type NonSensitivePatientEntry = Omit<PatientEntry, "ssn" | "entries">;
// export type NewPatientEntry = Omit<PatientEntry, "id">;
