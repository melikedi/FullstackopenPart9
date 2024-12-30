import { Entry, HealthCheckRating, Diagnosis } from "../../types";
import { assertNever } from "../../utils";
import { Box, Typography } from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import WorkIcon from "@mui/icons-material/Work";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { green, red, yellow, grey } from "@mui/material/colors";
interface Props {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const EntryInfo = ({ entry, diagnoses }: Props) => {
  const baseStyle = {
    border: "1px solid black",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };
  const getDiagnosisName = (code: string): string => {
    const diagnosis = diagnoses.find((d) => d.code === code);
    return diagnosis ? diagnosis.name : code;
  };
  const getDiagnosisElement = (diagnosisCodes: string[] | undefined) => {
    if (diagnosisCodes) {
      return diagnosisCodes.map((dc, i) => (
        <ul key={i}>
          <li>
            {dc} : {getDiagnosisName(dc)}
          </li>
        </ul>
      ));
    }
    return null;
  };
  const getHealthCheckIcon = (val: number) => {
    switch (val) {
      case 0:
        return <FavoriteIcon sx={{ color: green[900] }} />;
      case 1:
        return <FavoriteIcon sx={{ color: yellow[500] }} />;
      case 2:
        return <FavoriteIcon sx={{ color: red[500] }} />;
      case 3:
        return <FavoriteIcon sx={{ color: grey[900] }} />;
      default:
        return null;
    }
  };

  switch (entry.type) {
    case "HealthCheck":
      return (
        <Box sx={baseStyle}>
          <Typography variant="body1">
            {entry.date} <MedicalServicesIcon />
          </Typography>
          <Typography variant="body2" style={{ fontStyle: "italic" }}>
            {entry.description}
          </Typography>
          <Typography>
            Health Check Rating: {HealthCheckRating[entry.healthCheckRating]}
            {getHealthCheckIcon(entry.healthCheckRating)}
          </Typography>
          <Typography>Diagnosed by: {entry.specialist}</Typography>
          {getDiagnosisElement(entry.diagnosisCodes)}
        </Box>
      );
    case "Hospital":
      return (
        <Box sx={baseStyle}>
          <Typography variant="body1">
            {entry.date} <LocalHospitalIcon />
          </Typography>
          <Typography variant="body2" style={{ fontStyle: "italic" }}>
            {entry.description}
          </Typography>
          <Typography>
            Discharge: {entry.discharge.date} - {entry.discharge.criteria}
          </Typography>
          <Typography>Diagnosed by: {entry.specialist}</Typography>
          {getDiagnosisElement(entry.diagnosisCodes)}
        </Box>
      );
    case "OccupationalHealthcare":
      return (
        <Box sx={baseStyle}>
          <Typography variant="body1">
            {entry.date} <WorkIcon /> {entry.employerName}
          </Typography>
          <Typography variant="body2" style={{ fontStyle: "italic" }}>
            {entry.description}
          </Typography>
          {entry.sickLeave && (
            <Typography>
              Sick Leave: {entry.sickLeave.startDate} -{" "}
              {entry.sickLeave.endDate}
            </Typography>
          )}
          <Typography>Diagnosed by: {entry.specialist}</Typography>
          {getDiagnosisElement(entry.diagnosisCodes)}
        </Box>
      );
    default:
      return assertNever(entry);
  }
};

export default EntryInfo;
