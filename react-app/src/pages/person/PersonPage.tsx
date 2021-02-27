import React, {useEffect} from "react";
import {FC} from "react";
import {Container, Table} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {
  PersonSkillMutation,
  useAddPersonSkillMutation,
  usePersonByIdQuery,
  usePersonMissingSkillsQuery,
  usePersonSkillsQuery
} from "queries";
import {LoadingOverlay, Rating} from "components";
import {SkillLevel} from "models";

type RouteParams = {
  id: string
}

export const PersonPage: FC = () => {
  const {id} = useParams<RouteParams>();
  const {data: person, isLoading: isLoadingPerson} = usePersonByIdQuery(id);
  const {data: personSkills, isLoading: isLoadingPersonSkills} = usePersonSkillsQuery(id);
  const {data: missingSkills, isLoading: isLoadingMissingSkills} = usePersonMissingSkillsQuery(id);
  const {mutate, isLoading: isLoadingMutation} = useAddPersonSkillMutation();

  const handleValueChange = (skillId: string, skillLevel: SkillLevel) => {
    const mutationValues: PersonSkillMutation = {
      personId: id,
      skillId: skillId,
      skillLevel: skillLevel
    };

    mutate(mutationValues, {
      onSuccess: (data) => {
        console.log('data', data);
      },
      onError: (error) => {
        // setError(error.message);
        console.log(error);
      }
    })
  }

  useEffect(() => {
    console.log(personSkills);
  }, [personSkills]);

  return (
    <Container>
      <h2>People</h2>
      <LoadingOverlay isLoading={isLoadingPerson || isLoadingMissingSkills || isLoadingPersonSkills || isLoadingMutation}/>
      <Table>
        <thead>
        </thead>
        <tbody>
        {person && (
          <tr>
            <td colSpan={2}>{person.name}</td>
          </tr>
        )}

        {personSkills && personSkills.length > 0 &&
        (<tr>
          <td colSpan={2}><h6>Skills</h6></td>
        </tr>)
        }
        {personSkills && personSkills.length > 0 && personSkills.map((item, index) => (
          <tr key={`skills-${index}`}>
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
          <td colSpan={2}><h6>Unmapped Skills</h6></td>
        </tr>)
        }
        {missingSkills && missingSkills.length > 0 && missingSkills.map((item, index) => (
          <tr key={`missing-skills-${index}`}>
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
    </Container>
  );
}

