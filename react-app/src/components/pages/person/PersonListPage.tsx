import React from "react";
import {FC} from "react";
import {Container, Table} from "react-bootstrap";
import { Link } from "react-router-dom";
import {usePeopleQuery} from "queries";
import {LoadingOverlay} from "../../index";

export const PersonListPage: FC = () => {
  const {data, isLoading} = usePeopleQuery();

  return (
    <>
      <h2>People</h2>
      <LoadingOverlay isLoading={isLoading}/>
      <Table>
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
      </Table>
    </>
  );
}

