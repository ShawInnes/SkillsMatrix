import React, {FC, useEffect, useState} from "react";
import {Container} from "react-bootstrap";
import {useSkillCategoriesQuery, useSkillMutation, useSkillQuery} from "../../../queries";
import {useHistory} from "react-router";
import {useParams} from "react-router-dom";
import {FormikValues} from "formik";
import {SkillEditForm} from "./SkillEditForm";

type RouteParams = {
  id: string
}

export const SkillEditPage: FC = () => {
  const history = useHistory();
  const {id} = useParams<RouteParams>();

  const [initialValues, setInitialValues] = useState<any>();
  const [error, setError] = useState<any>();
  const {mutate} = useSkillMutation();

  const {data: skill, isLoading: isLoadingSkill} = useSkillQuery(id);
  const {data: skillCategories} = useSkillCategoriesQuery();

  useEffect(() => {
    setInitialValues({
      id: skill?.id,
      name: skill?.name,
      category: skill?.category,
      originalCategory: skill?.category
    });
  }, [skill, id]);

  const handleSearch = (query: string): string[] => {
    if (skillCategories) {
      const escapeRegExp = (input: string) => {
        return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
      }

      const regex = new RegExp(`${escapeRegExp(query)}`, "i");
      return skillCategories.filter(obj => regex.test(obj));
    } else {
      return [];
    }
  };

  const handleSubmit = (values: FormikValues) => {
    mutate(values, {
        onSuccess: () => history.push('/skill'),
        onError: (error) => setError(error.message)
      }
    )
  };

  return (
    <Container>
      <h2>Skill</h2>
      <SkillEditForm onSubmit={handleSubmit} initialValues={initialValues} error={error} isLoading={isLoadingSkill}
                     handleSearch={handleSearch}/>
    </Container>
  );
}

