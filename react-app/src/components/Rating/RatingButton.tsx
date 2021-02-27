import React from 'react';
import {SkillLevel} from "models";
import {Button} from "react-bootstrap";

export interface RatingButtonProps {
    skillLevel: SkillLevel;
    value: SkillLevel;
    onValueChange: (value: SkillLevel) => void;
}

export const RatingButton: React.FC<RatingButtonProps> = ({skillLevel, value, onValueChange}) => {
    return (
        skillLevel === value ?
            (<Button onClick={() => onValueChange(skillLevel)} className="btn btn-sm btn-primary" >{skillLevel}</Button>) :
            (<Button onClick={() => onValueChange(skillLevel)} className="btn btn-sm btn-secondary">{skillLevel}</Button>)
    );
}
