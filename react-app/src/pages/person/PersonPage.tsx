import React from "react";
import {FC} from "react";
import {Container} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {LoadingTable} from "components/LoadingTable/LoadingTable";
import {usePersonMissingSkillsQuery, usePersonQuery} from "queries";

type RouteParams = {
  id: string
}

export const PersonPage: FC = () => {
  const {id} = useParams<RouteParams>();
  const {data: person, isLoading: isLoadingPerson} = usePersonQuery(id);
  const {data: missingSkills, isLoading: isLoadingMissingSkills} = usePersonMissingSkillsQuery(id);

  return (
    <Container>
      <h2>People</h2>
      <LoadingTable isLoading={isLoadingPerson || isLoadingMissingSkills}>
        <thead>
        </thead>
        <tbody>
        {person && (
          <tr>
            <td>{person.id}</td>
            <td>{person.name}</td>
          </tr>
        )}
        {missingSkills &&
        (<tr>
          <td colSpan={2}><h6>Unmapped Skills</h6></td>
        </tr>)
        }
        {missingSkills && missingSkills.map((item, index) => (
          <tr key={index}>
            <td>{item.skillId}</td>
            <td>{item.skillName}</td>
          </tr>
        ))}
        </tbody>
      </LoadingTable>
    </Container>
  );
}

