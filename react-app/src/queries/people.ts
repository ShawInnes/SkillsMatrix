import {useQuery} from "react-query";
import {Person, SkillRating} from "models";
import {getAxiosInstance} from "../infrastructure/axios";

const getPeople = async () => {
  const axios = await getAxiosInstance();
  const {data} = await axios.get<Array<Person>>(`${process.env.REACT_APP_API_URL}/api/people`);
  return data.map((o: Person) => o);
};

export const usePeopleQuery = () => useQuery(['people'], () => getPeople());

const getPerson = async () => {
  const axios = await getAxiosInstance();
  const {data} = await axios.get<Person>(`${process.env.REACT_APP_API_URL}/api/person/`);
  return data;
};

export const usePersonQuery = () => useQuery(['person'], () => getPerson());

const getPersonById = async (id: string) => {
  const axios = await getAxiosInstance();
  const {data} = await axios.get<Person>(`${process.env.REACT_APP_API_URL}/api/person/${id}`);
  return data;
};

export const usePersonByIdQuery = (id: string) => useQuery(['person', id], () => getPersonById(id));

const getPersonSkills = async (id: string) => {
  const axios = await getAxiosInstance();
  const {data} = await axios.get<Array<SkillRating>>(`${process.env.REACT_APP_API_URL}/api/person/skills/${id}`);
  return data.map((o: SkillRating) => o);
};

export const usePersonSkillsQuery = (id: string) => useQuery(['person-skills', id], () => getPersonSkills(id));

const getPersonMissingSkills = async (id: string) => {
  const axios = await getAxiosInstance();
  const {data} = await axios.get<Array<SkillRating>>(`${process.env.REACT_APP_API_URL}/api/person/missingskills/${id}`);
  return data.map((o: SkillRating) => o);
};

export const usePersonMissingSkillsQuery = (id: string) => useQuery(['person-missing-skills', id], () => getPersonMissingSkills(id));
