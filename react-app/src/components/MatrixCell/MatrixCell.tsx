import React from 'react';
import {SkillLevel} from "models";
import {StyledBadge} from "./StyledBadge";
import {Badge} from "react-bootstrap";

export interface MatrixCellProps {
  skillLevel: SkillLevel;
}

export const MatrixCell: React.FC<MatrixCellProps> = ({skillLevel}) => {
  let skillLabel;

  switch (skillLevel) {
    case SkillLevel.NotInterested:
      skillLabel = 'Not Interested';
      break;
    case SkillLevel.WillLearn:
      skillLabel = 'Will Learn';
      break;
    case SkillLevel.LimitedExposure:
      skillLabel = 'Limited Exposure';
      break;
    case SkillLevel.Proficient:
      skillLabel = 'Proficient';
      break;
    case SkillLevel.Expert:
      skillLabel = 'Expert';
      break;
    default:
      return (<></>);
  }

  return (
    <Badge className={`badge badge-pill badge-primary ${skillLevel}`}>{skillLabel}</Badge>
  );
}
