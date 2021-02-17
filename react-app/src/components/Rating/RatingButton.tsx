import {Button, ButtonGroup, Grid} from '@material-ui/core';
import React from 'react';
import {SkillLevel} from "../../models/skillLevel";

export interface RatingButtonProps {
    skillLevel: SkillLevel;
    value: SkillLevel;
    onValueChange: (value: SkillLevel) => void;
}

export const RatingButton: React.FC<RatingButtonProps> = ({skillLevel, value, onValueChange}) => {
    return (
        skillLevel === value ?
            (<Button onClick={() => onValueChange(skillLevel)} color="secondary" variant="contained">{skillLevel}</Button>) :
            (<Button onClick={() => onValueChange(skillLevel)} color="primary" variant="contained">{skillLevel}</Button>)
    );
}
