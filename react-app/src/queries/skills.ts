import {useMutation, useQuery, useQueryClient} from "react-query";
import {Skill} from "models";
import {getAxiosInstance} from "infrastructure/axios";
import {MutationError} from "./mutationError";
import _ from "lodash";

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

const addSkill = async (skill: Partial<Skill>) => {
  const axios = await getAxiosInstance();
  const {data} = await axios.post<Skill>(`${process.env.REACT_APP_API_URL}/api/skill`, skill);
  return data;
};

export const useAddSkillMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<Skill, MutationError, Partial<Skill>>((newSkill) => addSkill(newSkill), {
      onSuccess: async (data, variables, context) => {
        const previousSkills = queryClient.getQueryData<Array<Skill>>('skills') || [];

        const filteredSkills = _.uniqBy([...previousSkills, data], 'id');
        queryClient.setQueryData<Array<Skill>>('skills', filteredSkills)

        await queryClient.invalidateQueries('person-missing-skills');
      }
    }
  );
};

const deleteSkill = async (id: string) => {
  const axios = await getAxiosInstance();
  await axios.delete(`${process.env.REACT_APP_API_URL}/api/skill/${id}`);
};

export const useDeleteSkillMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<void, MutationError, string>((id) => deleteSkill(id), {
      onSuccess: async (data, variables, context) => {
        const previousSkills = queryClient.getQueryData<Array<Skill>>('skills') || [];

        const filteredSkills = previousSkills.filter((skill) => skill.id !== variables);
        queryClient.setQueryData<Array<Skill>>('skills', filteredSkills)

        await queryClient.invalidateQueries('person-skills');
      }
    }
  );
};
