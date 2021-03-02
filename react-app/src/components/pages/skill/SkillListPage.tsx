import React, {useEffect, useState} from "react";
import {FC} from "react";
import {Button, Table} from "react-bootstrap";
import {useSkillsQuery} from "queries";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import styled from "styled-components";
import {useHistory} from "react-router";
import {Skill} from "models";
import _ from "lodash";
import {LoadingOverlay} from "components/ui";

export const SkillListPage: FC = () => {
  const history = useHistory();
  const {data, isLoading} = useSkillsQuery();
  const [sortedData, setSortedData] = useState<Skill[]>();

  const handleAddSkill = () => {
    history.push(`/skill/edit`);
  };

  useEffect(() => {
    setSortedData(_.orderBy(data, ['category', 'name'], ['asc', 'asc']));
  }, [data, setSortedData]);

  return (
    <>
      <h2>Skills <AddButton className="btn btn-sm" onClick={handleAddSkill}><FontAwesomeIcon icon={faPlus}/></AddButton>
      </h2>
      <LoadingOverlay isLoading={isLoading}/>
      <Table>
        <thead>
        <tr>
          <th>Skill</th>
          <th>Category</th>
        </tr>
        </thead>
        <tbody>
        {sortedData && sortedData.map((item, index) => (
          <tr key={index}>
            <td>
              <Link to={`/skill/edit/${item.id}`}>{item.name}</Link>
            </td>
            <td>
              {item.category}
            </td>
          </tr>
        ))}
        </tbody>
      </Table>
    </>
  );
}

const AddButton = styled(Button)`

`;
