import React from "react";
import {FC} from "react";
import {Container} from "react-bootstrap";
import {Link, useParams} from "react-router-dom";
import {LoadingTable} from "../components/LoadingTable/LoadingTable";
import {useExperienceQuery} from "../queries/experience";

type RouteParams = {
  id: string
}

export const ExperiencePage: FC = () => {
  const {id} = useParams<RouteParams>();
  const {data, isLoading} = useExperienceQuery(id);

  return (
    <Container>
      <h2>Experience</h2>
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

