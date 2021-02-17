import {Chip} from '@material-ui/core';
import React from 'react';
import {SkillLevel} from "../../models/skillLevel";
import './MatrixCell.scss';

export interface MatrixCellProps {
    skillLevel: SkillLevel;
}

export const MatrixCell: React.FC<MatrixCellProps> = ({skillLevel}) => {
    let skillClass = '';
    switch (skillLevel) {
        case SkillLevel.NotInterested:
            skillClass = 'NotInterested';
            break;
        case SkillLevel.WillLearn:
            skillClass = 'WillLearn';
            break;
        case SkillLevel.LimitedExposure:
            skillClass = 'LimitedExposure';
            break;
        case SkillLevel.Proficient:
            skillClass = 'Proficient';
            break;
        case SkillLevel.Expert:
            skillClass = 'Expert';
            break;
        default:
            return (<></>);
    }
    return (
        <Chip label={skillClass} classes={{root: skillClass}}/>
    );

}
