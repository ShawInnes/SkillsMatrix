import React from 'react';
import {SkillLevel} from "models";
import {Button} from "react-bootstrap";
import styled from "styled-components";
import {toWords} from "infrastructure/enum";

export interface RatingButtonProps {
  skillLevel: SkillLevel;
  value: SkillLevel;
  onValueChange: (value: SkillLevel) => void;
}

export const RatingButton: React.FC<RatingButtonProps> = ({skillLevel, value, onValueChange}) => {
  return (
    skillLevel === value ?
      (<StyledButton onClick={() => onValueChange(skillLevel)}
                     className="btn btn-sm btn-primary col-md-2 m-md-2 my-1">{toWords(skillLevel)}</StyledButton>) :
      (<StyledButton onClick={() => onValueChange(skillLevel)}
                     className="btn btn-sm btn-secondary col-md-2 m-md-2 my-1">{toWords(skillLevel)}</StyledButton>)
  );
}

const StyledButton = styled(Button)`
`;
