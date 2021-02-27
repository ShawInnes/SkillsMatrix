import React from "react";
import {FC} from "react";
import {Container} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {useSkillQuery} from "queries";
import {LoadingContainerTable} from "../../components";

type RouteParams = {
  id: string
}

export const SkillViewPage: FC = () => {
  const {id} = useParams<RouteParams>();
  const {data, isLoading} = useSkillQuery(id);

  return (
    <Container>
      <h2>Skill</h2>
      {data && (
        <LoadingContainerTable isLoading={isLoading}>
            <div>{data.id}</div>
            <div>{data.name}</div>
        </LoadingContainerTable>
      )}
    </Container>
  );
}

