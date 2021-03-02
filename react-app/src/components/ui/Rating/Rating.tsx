import React, {useEffect} from 'react';
import {RatingButton} from "./RatingButton";
import {SkillLevel} from "models";
import styled from "styled-components";

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

  useEffect(() => {
    setValue(skillLevel);
  }, [setValue, skillLevel]);

  return (
    <>
      {showLabel && (
        <SkillTitle>
          <SkillName>{skillName}</SkillName> <SkillCategory>({skillCategory})</SkillCategory>
        </SkillTitle>
      )}

      <SkillButtonGroup>
          <RatingButton skillLevel={SkillLevel.NotInterested} value={value}
                        onValueChange={(v) => handleRatingChange(skillId, v)}/>
          <RatingButton skillLevel={SkillLevel.WillLearn} value={value}
                        onValueChange={(v) => handleRatingChange(skillId, v)}/>
          <RatingButton skillLevel={SkillLevel.LimitedExposure} value={value}
                        onValueChange={(v) => handleRatingChange(skillId, v)}/>
          <RatingButton skillLevel={SkillLevel.Proficient} value={value}
                        onValueChange={(v) => handleRatingChange(skillId, v)}/>
          <RatingButton skillLevel={SkillLevel.Expert} value={value}
                        onValueChange={(v) => handleRatingChange(skillId, v)}/>
      </SkillButtonGroup>
    </>
  );
}

const SkillTitle = styled.div`
`;

const SkillName = styled.span`
  font-weight: bold;
  font-size: 1.2em;
`;

const SkillCategory = styled.span`
  font-weight: bold;
  font-size: 0.8em;
`;

const SkillButtonGroup = styled.div`
`;
