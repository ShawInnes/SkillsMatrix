import {useMutation, useQuery, useQueryClient} from "react-query";
import {Skill} from "models";
import {getAxiosInstance} from "infrastructure/axios";
import {MutationError} from "./mutationError";

const getSkills = async () => {
  const axios = await getAxiosInstance();
  const {data} = await axios.get<Array<Skill>>(`${process.env.REACT_APP_API_URL}/api/skill`);
  return data.map((o: Skill) => o);
};

export const useSkillsQuery = () => useQuery(['skills'], () => getSkills());

const getSkillCategories = async () => {
  const axios = await getAxiosInstance();
  const {data} = await axios.get<Array<string>>(`${process.env.REACT_APP_API_URL}/api/skill/categories`);
  return data.map((o: string) => o);
};

export const useSkillCategoriesQuery = () => useQuery(['skill-categories'], () => getSkillCategories());

const getSkill = async (id: string) => {
  const axios = await getAxiosInstance();
  const {data} = await axios.get<Skill>(`${process.env.REACT_APP_API_URL}/api/skill/${id}`);
  return data;
};

export const useSkillQuery = (id: string) => useQuery(['skill', id], () => getSkill(id));

const updateSkill = async (skill: Partial<Skill>) => {
  const axios = await getAxiosInstance();
  const {data} = await axios.post<Skill>(`${process.env.REACT_APP_API_URL}/api/skill`, skill);
  return data;
};

export const useSkillMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<Skill, MutationError, Partial<Skill>>((newSkill) => updateSkill(newSkill), {
      onSuccess: async (data, variables, context) => {
        const previousSkills = queryClient.getQueryData<Array<Skill>>('skills') || [];

        const filteredSkills = previousSkills.filter((skill) => skill.id !== data.id);
        const nextSkills = [...filteredSkills, data];

        queryClient.setQueryData<Array<Skill>>('skills', nextSkills);

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
