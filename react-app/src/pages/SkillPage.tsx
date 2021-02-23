import React from "react";
import {FC} from "react";
import {Container} from "react-bootstrap";
import {Link, useParams} from "react-router-dom";
import {LoadingTable} from "../components/LoadingTable/LoadingTable";
import {usePeopleQuery, usePersonQuery} from "../queries/people";
import {useSkillQuery} from "../queries/skills";

type RouteParams = {
  id: string
}

export const SkillPage: FC = () => {
  const {id} = useParams<RouteParams>();
  const {data, isLoading} = useSkillQuery(id);

  return (
    <Container>
      <h2>Skill</h2>
      {data && (
        <LoadingTable isLoading={isLoading}>
          <thead>
          </thead>
          <tbody>
          <tr>
            <td>{data.id}</td>
            <td>{data.name}</td>
          </tr>
          </tbody>
        </LoadingTable>
      )}
    </Container>
  );
}

