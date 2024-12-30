import { Box, Button, Typography } from "@mui/material";
import { Gender, Patient, Diagnosis, EntryFormValues } from "../../types";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";
import patientService from "../../services/patients";
import EntryInfo from "./entryInfo";
import { useState } from "react";
import AddEntryForm from "../AddEntryModal/AddEntryForm";
import axios from "axios";
interface Props {
  currentPatient: Patient;
  diagnoses: Diagnosis[];
  setPatient: React.Dispatch<React.SetStateAction<Patient>>;
}

const PatientInfo = ({ currentPatient, diagnoses, setPatient }: Props) => {
  const [newFormVisible, setNewFormVisible] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const showForm = () => {
    setNewFormVisible(true);
  };
  const hideForm = () => {
    setNewFormVisible(false);
    setError(undefined);
  };
  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const entry = await patientService.addEntry(currentPatient.id, values);
      if (currentPatient.entries) {
        currentPatient.entries = currentPatient.entries.concat(entry);
      } else {
        currentPatient.entries = [entry];
      }
      setNewFormVisible(false);
      setError(undefined);
      setPatient(currentPatient);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (
          e?.response?.data &&
          typeof e?.response?.data.error === "object" &&
          Array.isArray(e?.response?.data.error)
        ) {
          const message = e.response.data.error.reduce(
            (message: string, err: { message: string }) => {
              return `${message} \n ${err.message}`;
            },
            ""
          );
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  return (
    <div>
      <br />
      <AddEntryForm
        diagnoses={diagnoses}
        visible={newFormVisible}
        onClose={hideForm}
        error={error}
        createEntry={submitNewEntry}
      />
      <Box>
        <Typography align="left" variant="h6">
          {currentPatient.name}
          {currentPatient.gender == Gender.Female ? (
            <FemaleIcon />
          ) : currentPatient.gender == Gender.Male ? (
            <MaleIcon />
          ) : (
            <TransgenderIcon />
          )}
        </Typography>

        <div>ssn : {currentPatient.ssn} </div>
        <div>occupation : {currentPatient.occupation} </div>
        <div>date Of Birth : {currentPatient.dateOfBirth} </div>
        <Typography align="center" variant="h6">
          entries
        </Typography>
        {currentPatient.entries &&
          currentPatient.entries.map((e, i) => (
            <div key={i}>
              <EntryInfo entry={e} diagnoses={diagnoses} />
            </div>
          ))}
        <Button variant="contained" onClick={() => showForm()}>
          Add New Entry
        </Button>
      </Box>
    </div>
  );
};

export default PatientInfo;
