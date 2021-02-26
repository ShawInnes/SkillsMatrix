import {useQuery} from "react-query";
import {Skill} from "models";
import {getAxiosInstance} from "infrastructure/axios";

const getSkills = async () => {
  const axios = await getAxiosInstance();
  const {data} = await axios.get<Array<Skill>>(`${process.env.REACT_APP_API_URL}/api/skill`);
  return data.map((o: Skill) => o);
};

export const useSkillsQuery = () => useQuery(['skills'], () => getSkills());

const getSkill = async (id: string) => {
  const axios = await getAxiosInstance();
  const {data} = await axios.get<Skill>(`${process.env.REACT_APP_API_URL}/api/skill/${id}`);
  return data;
};

export const useSkillQuery = (id: string) => useQuery(['skill', id], () => getSkill(id));
