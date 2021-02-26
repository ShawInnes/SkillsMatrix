import {useQuery} from "react-query";
import {Experience} from "models";
import {getAxiosInstance} from "../infrastructure/axios";

const getExperiences = async () => {
  const axios = await getAxiosInstance();
  const {data} = await axios.get<Array<Experience>>(`${process.env.REACT_APP_API_URL}/api/experience`);
  return data.map((o: Experience) => o);
};

export const useExperiencesQuery = () => useQuery<any, any, Array<Experience>>(['experiences'], () => getExperiences());

const getExperience = async (id: string) => {
  const axios = await getAxiosInstance();
  const {data} = await axios.get<Experience>(`${process.env.REACT_APP_API_URL}/api/experience/${id}`);
  return data;
};

export const useExperienceQuery = (id: string) => useQuery<any, any, Experience>(['experience', id], () => getExperience(id));
