import { z } from "zod";
import { Gender, HealthCheckRating } from "./types";

export const DiagnoseSchema = z.object({
  code: z.string(),
  name: z.string(),
  latin: z.string().optional().nullable(),
});

const BaseEntrySchema = z.object({
  id: z.string(),
  type: z.union([
    z.literal("HealthCheck"),
    z.literal("OccupationalHealthcare"),
    z.literal("Hospital"),
  ]),
  description: z.string(),
  date: z.string().date(),
  specialist: z.string(),
  diagnosisCodes: z.array(DiagnoseSchema.shape.code).optional(),
});

const HealthCheckEntrySchema = BaseEntrySchema.extend({
  healthCheckRating: z.nativeEnum(HealthCheckRating),
});

const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
  employerName: z.string(),
  sickLeave: z
    .object({
      startDate: z.string().date(),
      endDate: z.string().date(),
    })
    .optional(),
});
const HospitalEntrySchema = BaseEntrySchema.extend({
  discharge: z.object({
    date: z.string().date(),
    criteria: z.string(),
  }),
});

export const EntrySchema = z.union([
  HospitalEntrySchema,
  OccupationalHealthcareEntrySchema,
  HealthCheckEntrySchema,
]);
export const NewEntrySchema = z.union([
  HospitalEntrySchema.omit({ id: true }),
  OccupationalHealthcareEntrySchema.omit({ id: true }),
  HealthCheckEntrySchema.omit({ id: true }),
]);

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
  entries: z.array(EntrySchema).optional(),
});
