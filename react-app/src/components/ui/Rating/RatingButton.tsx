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
  let buttonText = toWords(skillLevel);

  if (buttonText === "Limited Exposure")
    buttonText = "Limited";

  if (buttonText === "Not Interested")
    buttonText = "No";

  return (
    skillLevel === value ?
      (<StyledButton onClick={() => onValueChange(skillLevel)}
                     className="btn btn-sm btn-primary col-lg-2 my-lg-0 mx-lg-2 my-1 px-1">{buttonText}</StyledButton>) :
      (<StyledButton onClick={() => onValueChange(skillLevel)}
                     className="btn btn-sm btn-secondary col-lg-2 my-lg-0 mx-lg-2 my-1 px-1">{buttonText}</StyledButton>)
  );
}

const StyledButton = styled(Button)`
  font-size: 0.8em;

`;
