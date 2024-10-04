import { Gender, NewPatientEntry } from "./types";
const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "gender" in object &&
    "ssn" in object &&
    "occupation" in object
  ) {
    const newEntry: NewPatientEntry = {
      name: parseString(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      gender: parseGender(object.gender),
      ssn: parseString(object.ssn),
      occupation: parseString(object.occupation),
    };
    return newEntry;
  }
  throw new Error("Incorrect data: some fields are missing");
};
const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};
const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};
const parseGender = (value: unknown): Gender => {
  if (!value || !isString(value) || !isGender(value)) {
    throw new Error("Incorrect or missing value");
  }
  return value;
};
const parseString = (value: unknown): string => {
  if (!value || !isString(value)) {
    throw new Error("Incorrect or missing value");
  }
  return value;
};
const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};
export default toNewPatientEntry;
