import React, {useEffect, useState} from "react";
import {FC} from "react";
import {Alert, Container, Table} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {
  PersonSkillMutation,
  useAddPersonSkillMutation,
  usePersonByIdQuery,
  usePersonMissingSkillsQuery,
  usePersonSkillsQuery
} from "queries";
import {LoadingOverlay, Rating} from "components/index";
import {SkillLevel} from "models";
import {Form} from "react-bootstrap-formik";

type RouteParams = {
  id: string
}

export const PersonEditPage: FC = () => {
  const {id} = useParams<RouteParams>();
  const [error, setError] = useState();
  const {data: person, isLoading: isLoadingPerson} = usePersonByIdQuery(id);
  const {data: personSkills, isLoading: isLoadingPersonSkills} = usePersonSkillsQuery(id);
  const {data: missingSkills, isLoading: isLoadingMissingSkills} = usePersonMissingSkillsQuery(id);
  const {mutate} = useAddPersonSkillMutation();

  const handleValueChange = (skillId: string, skillLevel: SkillLevel) => {
    const mutationValues: PersonSkillMutation = {
      personId: id,
      skillId: skillId,
      skillLevel: skillLevel
    };

    mutate(mutationValues, {
      onSuccess: (data) => {
        setError(undefined);
      },
      onError: (error: any) => {
        console.log(error.message);
        setError(error.message);
      }
    })
  }

  return (
    <>
      <h2>People</h2>
      <LoadingOverlay
        isLoading={isLoadingPerson || isLoadingMissingSkills || isLoadingPersonSkills}/>
      {person && (
        <h3>{person.name}</h3>
      )}

      {error && (<Alert variant="danger" className="my-3">Error Saving: {error}</Alert>)}

      <Table>
        <tbody>
        {personSkills && personSkills.length > 0 &&
        (<tr>
          <td colSpan={3}><h6>Skills</h6></td>
        </tr>)
        }
        {personSkills && personSkills.length > 0 && personSkills.map((item, index) => (
          <tr key={item.skillId}>
            <td>{item.skillName}</td>
            <td>{item.skillCategory}</td>
            <td>
              <Rating skillId={item.skillId}
                      skillName={item.skillName}
                      skillCategory={item.skillCategory}
                      skillLevel={item.skillLevel}
                      showLabel={false}
                      onValueChange={handleValueChange}/>
            </td>
          </tr>
        ))}

        {missingSkills && missingSkills.length > 0 &&
        (<tr>
          <td colSpan={3}><h6>Unmapped Skills</h6></td>
        </tr>)
        }
        {missingSkills && missingSkills.length > 0 && missingSkills.map((item, index) => (
          <tr key={item.skillId}>
            <td>{item.skillName}</td>
            <td>{item.skillCategory}</td>
            <td>
              <Rating skillId={item.skillId}
                      skillName={item.skillName}
                      skillCategory={item.skillCategory}
                      skillLevel={item.skillLevel}
                      showLabel={false}
                      onValueChange={handleValueChange}/>
            </td>
          </tr>
        ))}
        </tbody>
      </Table>
    </>
  );
}

