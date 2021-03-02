import React, {useEffect, useState} from 'react';
import * as _ from "lodash";
import {Table} from "react-bootstrap";
import styled from "styled-components";
import {MatrixCell} from "components/ui/MatrixCell/MatrixCell";
import {SkillRating} from "models";

export interface MatrixProps {
  data: SkillRating[];
}

export const Matrix: React.FC<MatrixProps> = ({data}) => {
  const [people, setPeople] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);

  const getValue = (person: string, skillName: string) => {
    const list: any[] = _.filter(data, {'person': person, 'skillName': skillName});
    if (list.length === 1) {
      return list[0].skillLevel;
    }

    return null;
  };

  const getCategory = (skillName: string) => {
    const list: any[] = _.filter(data, {'skillName': skillName});
    if (list.length === 1) {
      return list[0].skillCategory;
    }

    return null;
  };

  useEffect(() => {
    setPeople(_.uniq(_.map(data, 'person')));
    setSkills(_.uniq(_.map(data, 'skillName')));
  }, [data]);

  return (
    <StyledTable>
      <thead>
      <tr>
        <th>Technology</th>
        <th>Category</th>
        {_.orderBy(people).map((person, personIndex) => {
          return (<th key={personIndex}>{person}</th>)
        })}
      </tr>
      </thead>
      <tbody>
      {_.orderBy(skills).map((skillName, skillIndex) => {
        return (
          <tr key={skillIndex}>
            <th>{skillName}</th>
            <th>{getCategory(skillName)}</th>
            {_.orderBy(people).map((person, personIndex) => {
              return (<td key={personIndex} align="center"><MatrixCell skillLevel={getValue(person, skillName)}/></td>)
            })}
          </tr>
        )
      })}
      </tbody>
    </StyledTable>
  );
}

const StyledTable = styled(Table)`
  &.table thead th {
    position: sticky;
    top: 0px;
    background: white;
    box-shadow: 0 1px #dee2e6, 0 -1px #dee2e6;
    text-align: center;
  }
`;
