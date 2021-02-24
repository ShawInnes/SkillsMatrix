import axios from "axios";
import {useQuery} from "react-query";
import {Skill} from "models";

const getSkills = async () => {
  const {data} = await axios.get<Array<Skill>>(`${process.env.REACT_APP_API_URL}/api/skill`);
  return data.map((o: Skill) => o);
};

export const useSkillsQuery = () => useQuery(['skills'], () => getSkills());

const getSkill = async (id: string) => {
  const {data} = await axios.get<Skill>(`${process.env.REACT_APP_API_URL}/api/skill/${id}`);
  return data;
};

export const useSkillQuery = (id: string) => useQuery(['skill', id], () => getSkill(id));
