import React, {useEffect} from "react";
import {FC} from "react";
import {Container, Button, Table} from "react-bootstrap";
import {useAddSkillMutation, useDeleteSkillMutation, useSkillsQuery} from "queries";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus, faTrash} from '@fortawesome/free-solid-svg-icons'
import styled from "styled-components";
import {useHistory} from "react-router";
import {LoadingOverlay} from "../../components";

export const SkillListPage: FC = () => {
  const history = useHistory();
  const {data, isLoading} = useSkillsQuery();
  const {mutate} = useDeleteSkillMutation();

  const handleAddSkill = () => {
    history.push(`/skill/edit`);
  };

  const handleDeleteSkill = (id: string) => {
    mutate(id);
  };

  useEffect(() => {
    console.table(data);
  }, [data]);

  return (
    <Container>
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
        {data && data.map((item, index) => (
          <tr key={index}>
            <td>
              <Link to={`/skill/${item.id}`}>{item.name}</Link>
            </td>
            <td>
              {item.category}
            </td>
            <td>
              <AddButton className="btn btn-sm btn-danger" onClick={() => handleDeleteSkill(item.id)}><FontAwesomeIcon
                icon={faTrash}/></AddButton>
            </td>
          </tr>
        ))}
        </tbody>
      </Table>
    </Container>
  );
}


const AddButton = styled(Button)`

`;
