import axios from "axios";
import {useQuery} from "react-query";
import {SkillRating} from "models";

const getSkillRatings = async () => {
  const {data} = await axios.get<Array<SkillRating>>(`${process.env.REACT_APP_API_URL}/api/matrix/dashboard`);
  return data.map((o: SkillRating) => o);
};

export const useSkillRatingsQuery = () => useQuery(['skillratings'], () => getSkillRatings());
