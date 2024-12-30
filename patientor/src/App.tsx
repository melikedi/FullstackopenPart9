import { useState, useEffect } from "react";
import axios from "axios";
import { Route, Link, Routes, useMatch } from "react-router-dom";
import { Button, Divider, Container, Typography } from "@mui/material";

import { apiBaseUrl } from "./constants";
import { Patient, Diagnosis } from "./types";

import patientService from "./services/patients";
import diagnosisService from "./services/diagnosis";
import PatientListPage from "./components/PatientListPage";
import PatientPage from "./components/PatientListPage/patientInfo";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [currentPatient, setCurrentPatient] = useState<Patient>({} as Patient);
  const match = useMatch("/patients/:id");
  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);
    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    const getPatientWithId = async (id: string | undefined) => {
      if (id) {
        const patient = await patientService.getById(id);
        setCurrentPatient(patient);
        const diagnoses = await diagnosisService.getAll();
        setDiagnoses(diagnoses);
      }
    };
    if (match) {
      getPatientWithId(match.params.id);
    } else {
      void fetchPatientList();
    }
  }, [match]);

  return (
    <div className="App">
      <Container>
        <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
          Patientor
        </Typography>
        <Button component={Link} to="/" variant="contained" color="primary">
          Home
        </Button>
        <Divider hidden />
        <Routes>
          <Route
            path="/"
            element={
              <PatientListPage patients={patients} setPatients={setPatients} />
            }
          />
          <Route
            path="/patients/:id"
            element={
              <PatientPage
                currentPatient={currentPatient}
                diagnoses={diagnoses}
                setPatient={setCurrentPatient}
              />
            }
          />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
