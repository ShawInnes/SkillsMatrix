import React from "react";
import {FC} from "react";
import {Container} from "react-bootstrap";
import {useSkillsQuery} from "../queries/skills";
import {LoadingTable} from "../components/LoadingTable/LoadingTable";
import {Link} from "react-router-dom";

export const SkillListPage: FC = () => {
  const {data, isLoading} = useSkillsQuery();

  return (
    <Container>
      <h2>Skills</h2>
      <LoadingTable isLoading={isLoading}>
        <thead>

        </thead>
        <tbody>
        {data && data.map((item, index) => (
          <tr key={index}>
            <td>
              <Link to={`/skill/${item.id}`}>{item.name}</Link>
            </td>
          </tr>
        ))}
        </tbody>
      </LoadingTable>
    </Container>
  );
}


