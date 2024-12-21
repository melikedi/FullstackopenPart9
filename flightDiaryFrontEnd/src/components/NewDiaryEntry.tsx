import { useState, ChangeEvent, FormEvent } from "react";
import { createDiary } from "../services/DiaryEntryService";
import {
  NewDiaryEntryProps,
  NewDiaryEntryType,
  Weather,
  Visibility,
} from "../types";
import axios from "axios";
export const NewDiaryEntry = (props: NewDiaryEntryProps) => {
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Good);
  const [comment, setComment] = useState("");
  const [error, setError] = useState<string>("");
  function handleDateChange(event: ChangeEvent<HTMLInputElement>): void {
    setDate(event.target.value);
  }
  function handleWeatherChange(event: ChangeEvent<HTMLInputElement>): void {
    setWeather(event.target.value as Weather);
  }
  function handleVisibilityChange(event: ChangeEvent<HTMLInputElement>): void {
    setVisibility(event.target.value as Visibility);
  }
  function handleCommentChange(event: ChangeEvent<HTMLInputElement>): void {
    setComment(event.target.value);
  }
  function handleNewEntry(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const newEntry: NewDiaryEntryType = {
      date,
      weather,
      visibility,
      comment,
    };
    createDiary(newEntry)
      .then((data) => {
        props.onNewEntry(data);
        setDate("");
        setWeather(Weather.Sunny);
        setVisibility(Visibility.Good);
        setComment("");
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          setError(error.response?.data || "An unknown error occurred");
        } else {
          console.error(error);
        }
      });
  }
  return (
    <div>
      {error && (
        <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>
      )}
      <h2>New Diary Entry</h2>
      <form onSubmit={handleNewEntry}>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={handleDateChange}
          />
        </div>
        <div>
          <label>Weather:</label>
          {Object.values(Weather).map((weatherOption) => (
            <label key={weatherOption} style={{ marginRight: "1rem" }}>
              <input
                type="radio"
                name="weather"
                value={weatherOption}
                checked={weather === weatherOption}
                onChange={handleWeatherChange}
              />
              {weatherOption}
            </label>
          ))}
        </div>
        <div>
          <label>Visibility:</label>
          {Object.values(Visibility).map((visibilityOption) => (
            <label key={visibilityOption} style={{ marginRight: "1rem" }}>
              <input
                type="radio"
                name="visibility"
                value={visibilityOption}
                checked={visibility === visibilityOption}
                onChange={handleVisibilityChange}
              />
              {visibilityOption}
            </label>
          ))}
        </div>
        <div>
          <label htmlFor="comment">Comment:</label>
          <input
            type="text"
            id="comment"
            value={comment}
            onChange={handleCommentChange}
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};
