import PatientData from "../../data/patients";
import { v4 as uuidv4 } from "uuid";
import {
  PatientEntry,
  NonSensitivePatientEntry,
  NewPatientEntry,
} from "../types";

const getEntries = (): PatientEntry[] => {
  return PatientData;
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
  getEntries,
  addPatient,
  getNonSensitiveEntries,
  findById,
};
