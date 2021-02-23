import React from 'react';
import {SkillLevel} from "../../models/skillLevel";
import {StyledBadge} from "./StyledBadge";

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
    <StyledBadge className={`badge badge-pill ${skillLevel}`}>{skillLabel}</StyledBadge>
  );
}
