import { useState, useEffect } from "react";
import { DiaryEntries } from "./components/DiaryEntries";
import { DiaryEntryType } from "./types";
import { getAllDiaries } from "./services/DiaryEntryService";
import { NewDiaryEntry } from "./components/NewDiaryEntry";

function App() {
  const [entries, setEntries] = useState<DiaryEntryType[]>([]);

  useEffect(() => {
    getAllDiaries().then((data) => {
      setEntries(data);
    });
  }, []);
  const addEntry = (entry: DiaryEntryType) => {
    setEntries([...entries, entry]);
  };
  return (
    <div>
      <h1>Diary Entries</h1>
      <NewDiaryEntry onNewEntry={addEntry} />
      <DiaryEntries entries={entries}></DiaryEntries>
    </div>
  );
}

export default App;
