import { SyntheticEvent, useState } from "react";
import {
  BaseEntryType,
  Diagnosis,
  EntryFormValues,
  HealthCheckRating,
} from "../../types";
import {
  Alert,
  Box,
  Button,
  Chip,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";

interface Props {
  diagnoses: Diagnosis[];
  visible: boolean;
  onClose: () => void;
  error?: string;
  createEntry: (values: EntryFormValues) => void;
}
const AddEntryForm = ({
  diagnoses,
  visible,
  onClose,
  error,
  createEntry,
}: Props) => {
  const boxStyle = {
    height: 1,
    width: "100%",
    borderRadius: 1,
    borderWidth: 1,
    borderStyle: "dotted",
    padding: 7,
    marginBottom: 5,
  };
  const [type, setType] = useState(BaseEntryType.HealthCheck.toString());
  const [healthCheck, setHealthCheck] = useState(0);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [sickLeaveStart, setSickLeaveStart] = useState("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const resetForm = () => {
    setDate("");
    setType(BaseEntryType.HealthCheck.toString());
    setHealthCheck(0);
    setDescription("");
    setEmployerName("");
    setSpecialist("");
    setDiagnosisCodes([]);
    setSickLeaveStart("");
    setSickLeaveEnd("");
    setDischargeDate("");
    setDischargeCriteria("");
  };
  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    let entry: EntryFormValues;
    switch (type) {
      case "HealthCheck":
        entry = {
          type: type,
          description,
          date,
          specialist,
          diagnosisCodes,
          healthCheckRating: healthCheck,
        };
        createEntry(entry);
        resetForm();
        break;

      case "Hospital":
        entry = {
          type: type,
          description,
          date,
          specialist,
          diagnosisCodes,
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
        };
        createEntry(entry);
        resetForm();
        break;
      case "OccupationalHealthcare":
        entry = {
          type: type,
          description,
          date,
          specialist,
          diagnosisCodes,
          employerName: employerName,
          sickLeave: {
            startDate: sickLeaveStart,
            endDate: sickLeaveEnd,
          },
        };
        createEntry(entry);
        resetForm();
        break;
      default:
    }
  };

  const onDiagnosisChange = (
    event: SelectChangeEvent<typeof diagnosisCodes>
  ) => {
    event.preventDefault();
    const value =
      typeof event.target.value === "string"
        ? [event.target.value]
        : event.target.value;
    setDiagnosisCodes(value);
  };
  const typeDependentComponents = () => {
    switch (type) {
      case "HealthCheck":
        return (
          <Box>
            <InputLabel id="demo-row-radio-buttons-group-label">
              Health Check
            </InputLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              onChange={({ target }) => setHealthCheck(Number(target.value))}
              value={healthCheck}
            >
              {Object.keys(HealthCheckRating)
                .filter((x) => isNaN(parseInt(x)))
                .map((option, i) => (
                  <FormControlLabel
                    key={option}
                    value={i}
                    control={<Radio />}
                    label={option}
                  />
                ))}
            </RadioGroup>
          </Box>
        );
      case "Hospital":
        return (
          <div>
            <InputLabel>Discharge</InputLabel>
            <Box sx={{ paddingLeft: 20 }}>
              <InputLabel>Discharge Date</InputLabel>
              <TextField
                fullWidth
                value={dischargeDate}
                type="date"
                onChange={({ target }) => setDischargeDate(target.value)}
              ></TextField>
              <InputLabel>Discharge Criteria</InputLabel>
              <TextField
                fullWidth
                value={dischargeCriteria}
                onChange={({ target }) => setDischargeCriteria(target.value)}
              />
            </Box>
          </div>
        );
      case "OccupationalHealthcare":
        return (
          <Box>
            <InputLabel>Employer Name</InputLabel>
            <TextField
              fullWidth
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
            />
            <InputLabel>Sick Leave</InputLabel>
            <Box sx={{ paddingLeft: 20 }}>
              <InputLabel>Start Date</InputLabel>
              <TextField
                fullWidth
                value={sickLeaveStart}
                type="date"
                onChange={({ target }) => setSickLeaveStart(target.value)}
              ></TextField>
              <InputLabel>End Date</InputLabel>
              <TextField
                fullWidth
                value={sickLeaveEnd}
                type="date"
                onChange={({ target }) => setSickLeaveEnd(target.value)}
              ></TextField>
            </Box>
          </Box>
        );
      default:
        return null;
    }
  };
  const onTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    setType(event.target.value);
  };
  if (!visible) {
    return null;
  }
  return (
    <Box sx={boxStyle}>
      <form onSubmit={addEntry}>
        {error && <Alert severity="error">{error}</Alert>}
        <Typography align="left" variant="h6">
          New {type} entry
        </Typography>
        <InputLabel>Type</InputLabel>
        <Select label="Type" fullWidth value={type} onChange={onTypeChange}>
          {Object.values(BaseEntryType).map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
        <InputLabel>Description</InputLabel>
        <TextField
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <InputLabel>Date</InputLabel>
        <TextField
          fullWidth
          value={date}
          type="date"
          onChange={({ target }) => setDate(target.value)}
        ></TextField>
        <InputLabel>Specialist</InputLabel>
        <TextField
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        ></TextField>
        <InputLabel>Diagnosis</InputLabel>
        <Select
          fullWidth
          value={diagnosisCodes}
          onChange={onDiagnosisChange}
          multiple
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {diagnoses.map((option) => (
            <MenuItem key={option.code} value={option.code}>
              {option.code} - {option.name}
            </MenuItem>
          ))}
        </Select>
        {typeDependentComponents()}
        <Button style={{ float: "right" }} type="submit" variant="contained">
          Add
        </Button>
        <Button
          style={{ float: "left" }}
          color="warning"
          variant="contained"
          onClick={onClose}
        >
          Cancel
        </Button>
      </form>
    </Box>
  );
};
export default AddEntryForm;
