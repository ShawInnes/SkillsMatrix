import React, {useEffect, useState} from "react";
import {FC} from "react";
import {Button, Table} from "react-bootstrap";
import {useDeleteSkillMutation, useSkillsQuery} from "queries";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus, faTrash} from '@fortawesome/free-solid-svg-icons'
import styled from "styled-components";
import {useHistory} from "react-router";
import {LoadingOverlay} from "../../index";
import {Skill} from "../../../models";
import _ from "lodash";

export const SkillListPage: FC = () => {
  const history = useHistory();
  const {data, isLoading, status} = useSkillsQuery();
  const [sortedData, setSortedData] = useState<Skill[]>();
  const {mutate} = useDeleteSkillMutation();

  const handleAddSkill = () => {
    history.push(`/skill/edit`);
  };

  const handleDeleteSkill = (id: string) => {
    mutate(id);
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
            {/*<td>*/}
            {/*  <DelButton className="btn btn-sm btn-danger" onClick={() => handleDeleteSkill(item.id)}><FontAwesomeIcon*/}
            {/*    icon={faTrash}/></DelButton>*/}
            {/*</td>*/}
          </tr>
        ))}
        </tbody>
      </Table>
    </>
  );
}


const DelButton = styled(Button)`

`;

const AddButton = styled(Button)`

`;
