import {useQuery} from "react-query";
import {SkillRating} from "models";
import {getAxiosInstance} from "../infrastructure/axios";

const getSkillRatings = async () => {
  const axios = await getAxiosInstance();
  const {data} = await axios.get<Array<SkillRating>>(`${process.env.REACT_APP_API_URL}/api/matrix/dashboard`);
  return data.map((o: SkillRating) => o);
};

export const useSkillRatingsQuery = () => useQuery(['skillratings'], () => getSkillRatings());
