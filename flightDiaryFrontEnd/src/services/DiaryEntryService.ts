import axios from "axios";
import { DiaryEntryType, NewDiaryEntryType } from "../types";

const baseUrl = "http://localhost:3000/api/diaries";

export const getAllDiaries = () => {
  return axios.get<DiaryEntryType[]>(baseUrl).then((response) => response.data);
};

export const createDiary = (object: NewDiaryEntryType) => {
  return axios
    .post<DiaryEntryType>(baseUrl, object)
    .then((response) => response.data);
};
