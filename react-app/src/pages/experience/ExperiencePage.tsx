import React from "react";
import {FC} from "react";
import {Container, Table} from "react-bootstrap";
import {Link, useParams} from "react-router-dom";
import {useExperienceQuery} from "queries";
import {LoadingOverlay} from "../../components";

type RouteParams = {
  id: string
}

export const ExperiencePage: FC = () => {
  const {id} = useParams<RouteParams>();
  const {data, isLoading} = useExperienceQuery(id);

  return (
    <Container>
      <h2>Experience</h2>
      <LoadingOverlay isLoading={isLoading}/>
      {data && (
        <Table>
          <thead>
          </thead>
          <tbody>
          <tr>
            <td>{data.id}</td>
            <td>{data.name}</td>
          </tr>
          </tbody>
        </Table>
      )}
    </Container>
  );
}

