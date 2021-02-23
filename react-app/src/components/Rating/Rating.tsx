import React from 'react';
import {RatingButton} from "./RatingButton";
import {SkillLevel} from "../../models/skillLevel";
import {Container} from "react-bootstrap";

export type RatingProps = {
  skillId: string;
  skillName: string;
  skillLevel: SkillLevel;
  onValueChange: (value: SkillLevel) => void;
}

export const Rating: React.FC<RatingProps> = ({skillId, skillName, skillLevel, onValueChange}) => {
  const [value, setValue] = React.useState(skillLevel);

  const handleRatingChange = (v: SkillLevel) => {
    setValue(v);
    onValueChange(v);
  };

  return (
    <Container>
      <div className={"row"}>
        <h1>{skillName}</h1>
      </div>
      <div className={"row"}>
        <div className={"col"}>
          <RatingButton skillLevel={SkillLevel.NotInterested} value={value}
                        onValueChange={(v) => handleRatingChange(v)}/>
        </div>
        <div className={"col"}>
          <RatingButton skillLevel={SkillLevel.WillLearn} value={value}
                        onValueChange={(v) => handleRatingChange(v)}/>
        </div>
        <div className={"col"}>
          <RatingButton skillLevel={SkillLevel.LimitedExposure} value={value}
                        onValueChange={(v) => handleRatingChange(v)}/>
        </div>
        <div className={"col"}>
          <RatingButton skillLevel={SkillLevel.Proficient} value={value}
                        onValueChange={(v) => handleRatingChange(v)}/>
        </div>
        <div className={"col"}>
          <RatingButton skillLevel={SkillLevel.Expert} value={value}
                        onValueChange={(v) => handleRatingChange(v)}/>
        </div>
      </div>
    </Container>
  );
}
