import React from 'react';
import {SkillLevel} from "models";
import {Badge} from "react-bootstrap";
import {toWords} from "../../../infrastructure/enum";

export interface MatrixCellProps {
  skillLevel: SkillLevel;
}

export const MatrixCell: React.FC<MatrixCellProps> = ({skillLevel}) => {
  return (
    <Badge className={`badge badge-pill badge-primary ${skillLevel}`}>{toWords(skillLevel)}</Badge>
  );
}
