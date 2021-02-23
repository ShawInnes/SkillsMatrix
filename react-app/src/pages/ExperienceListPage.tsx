import React from "react";
import {FC} from "react";
import {Container} from "react-bootstrap";
import {useSkillsQuery} from "../queries/skills";
import {LoadingTable} from "../components/LoadingTable/LoadingTable";
import {Link} from "react-router-dom";
import {useExperiencesQuery} from "../queries/experience";

export const ExperienceListPage: FC = () => {
  const {data, isLoading} = useExperiencesQuery();

  return (
    <Container>
      <h2>Experiences</h2>
      <LoadingTable isLoading={isLoading}>
        <thead>

        </thead>
        <tbody>
        {data && data.map((item, index) => (
          <tr key={index}>
            <td>
              <Link to={`/experience/${item.id}`}>{item.name}</Link>
            </td>
          </tr>
        ))}
        </tbody>
      </LoadingTable>
    </Container>
  );
}
