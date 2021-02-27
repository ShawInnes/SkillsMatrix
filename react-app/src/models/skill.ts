import * as Yup from "yup";

export interface Skill {
  id: string;
  category: string;
  name: string;
}

export const SkillSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  category: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required')
});
