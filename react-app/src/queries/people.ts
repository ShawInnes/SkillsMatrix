import {useMutation, useQuery, useQueryClient} from "react-query";
import {Person, Skill, SkillLevel, SkillRating} from "models";
import {getAxiosInstance} from "../infrastructure/axios";
import {MutationError} from "./mutationError";

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
  console.log('data', data);
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

export type PersonSkillMutation = {
  personId: string;
  skillId: string;
  skillLevel: SkillLevel;
}

const addPersonSkill = async (value: PersonSkillMutation) => {
  const axios = await getAxiosInstance();
  const {data} = await axios.post<PersonSkillMutation>(`${process.env.REACT_APP_API_URL}/api/person/skill`, null, {params: value});
  return data;
};

export const useAddPersonSkillMutation = () => {
  const queryClient = useQueryClient();

  return useMutation((value: PersonSkillMutation) => addPersonSkill(value), {
    onSuccess: async (data, variables, context) => {
      await queryClient.invalidateQueries(['person-skills', variables.personId]);
      await queryClient.invalidateQueries(['person-missing-skills', variables.personId]);
    }
  });
};
