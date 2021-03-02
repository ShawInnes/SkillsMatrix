import React from "react";
import {FC} from "react";
import {Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useExperiencesQuery} from "queries";
import {LoadingOverlay} from "../../ui";

export const ExperienceListPage: FC = () => {
  const {data, isLoading} = useExperiencesQuery();

  return (
    <>
      <h2>Experiences</h2>
      <LoadingOverlay isLoading={isLoading}/>
      <Table>
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
      </Table>
    </>
  );
}
