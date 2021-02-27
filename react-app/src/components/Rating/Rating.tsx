import React from 'react';
import {RatingButton} from "./RatingButton";
import {SkillLevel} from "models";
import {Container} from "react-bootstrap";

export type RatingProps = {
  showLabel: boolean;
  skillId: string;
  skillName: string;
  skillCategory: string;
  skillLevel: SkillLevel;
  onValueChange: (skillId: string, skillLevel: SkillLevel) => void;
}

export const Rating: React.FC<RatingProps> = ({
                                                showLabel,
                                                skillId,
                                                skillName,
                                                skillCategory,
                                                skillLevel,
                                                onValueChange
                                              }) => {
  const [value, setValue] = React.useState(skillLevel);

  const handleRatingChange = (id: string, v: SkillLevel) => {
    setValue(v);
    onValueChange(id, v);
  };

  return (
    <>
      {showLabel && (
        <div className={"row"}>
          <h1>{skillName} ({skillCategory})</h1>
        </div>
      )}

      <div className={"row"}>
        <div className={"col"}>
          <RatingButton skillLevel={SkillLevel.NotInterested} value={value}
                        onValueChange={(v) => handleRatingChange(skillId, v)}/>
        </div>
        <div className={"col"}>
          <RatingButton skillLevel={SkillLevel.WillLearn} value={value}
                        onValueChange={(v) => handleRatingChange(skillId, v)}/>
        </div>
        <div className={"col"}>
          <RatingButton skillLevel={SkillLevel.LimitedExposure} value={value}
                        onValueChange={(v) => handleRatingChange(skillId, v)}/>
        </div>
        <div className={"col"}>
          <RatingButton skillLevel={SkillLevel.Proficient} value={value}
                        onValueChange={(v) => handleRatingChange(skillId, v)}/>
        </div>
        <div className={"col"}>
          <RatingButton skillLevel={SkillLevel.Expert} value={value}
                        onValueChange={(v) => handleRatingChange(skillId, v)}/>
        </div>
      </div>
    </>
  );
}
