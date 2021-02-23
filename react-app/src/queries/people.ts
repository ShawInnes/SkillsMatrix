import axios from "axios";
import {useQuery} from "react-query";
import {Person} from "../models/person";
import {SkillRating} from "../models/skillRating";

const getPeople = async () => {
  const {data} = await axios.get<Array<Person>>(`${process.env.REACT_APP_API_URL}/api/person`);
  return data.map((o: Person) => o);
};

export const usePeopleQuery = () => useQuery(['people'], () => getPeople());

const getPerson = async (id: string) => {
  const {data} = await axios.get<Person>(`${process.env.REACT_APP_API_URL}/api/person/${id}`);
  return data;
};

export const usePersonQuery = (id: string) => useQuery(['person', id], () => getPerson(id));

const getPersonSkills = async (id: string) => {
  const {data} = await axios.get<Array<SkillRating>>(`${process.env.REACT_APP_API_URL}/api/person/skills/${id}`);
  return data.map((o: SkillRating) => o);
};

export const usePersonSkillsQuery = (id: string) => useQuery(['person-skills', id], () => getPersonSkills(id));

const getPersonMissingSkills = async (id: string) => {
  const {data} = await axios.get<Array<SkillRating>>(`${process.env.REACT_APP_API_URL}/api/person/missingskills/${id}`);
  return data.map((o: SkillRating) => o);
};

export const usePersonMissingSkillsQuery = (id: string) => useQuery(['person-missing-skills', id], () => getPersonMissingSkills(id));
