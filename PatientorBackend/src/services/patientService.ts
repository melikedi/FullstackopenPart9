import PatientData from "../../data/patients";
import { v4 as uuidv4 } from "uuid";
import {
  PatientEntry,
  NonSensitivePatientEntry,
  NewPatientEntry,
  EntryEntry,
  NewEntryEntry,
} from "../types";

const getEntries = (): PatientEntry[] => {
  return PatientData;
};

const addEntry = (
  entry: NewEntryEntry,
  patientId: string
): EntryEntry | undefined => {
  const patient = PatientData.find((d) => d.id === patientId);

  if (patient) {
    const newPatientEntry = {
      id: uuidv4(),
      ...entry,
    };
    if (patient.entries) {
      patient.entries = patient.entries.concat(newPatientEntry);
    } else {
      patient.entries = [newPatientEntry];
    }

    return newPatientEntry;
  }
  return undefined;
};

const findById = (id: string): PatientEntry | undefined => {
  const entry = PatientData.find((d) => d.id === id);
  return entry;
};
const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return PatientData.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return {
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    };
  });
};
const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: uuidv4(),
    ...entry,
  };
  PatientData.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  addEntry,
  getEntries,
  addPatient,
  getNonSensitiveEntries,
  findById,
};
