import React from "react";
import {FC} from "react";
import {Container} from "react-bootstrap";
import { Link } from "react-router-dom";
import {LoadingTable} from "components/LoadingTable/LoadingTable";
import {usePeopleQuery} from "queries";

export const PersonListPage: FC = () => {
  const {data, isLoading} = usePeopleQuery();

  return (
    <Container>
      <h2>People</h2>
      <LoadingTable isLoading={isLoading}>
        <thead>

        </thead>
        <tbody>
        {data && data.map((item, index) => (
          <tr key={index}>
            <td>
              <Link to={`/person/${item.id}`}>{item.name}</Link>
            </td>
          </tr>
        ))}
        </tbody>
      </LoadingTable>
    </Container>
  );
}

