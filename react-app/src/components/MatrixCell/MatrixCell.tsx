import React from 'react';
import {SkillLevel} from "../../models/skillLevel";
import './MatrixCell.scss';

export interface MatrixCellProps {
    skillLevel: SkillLevel;
}

export const MatrixCell: React.FC<MatrixCellProps> = ({skillLevel}) => {
    return (
        <div className={skillLevel.toString()}>{skillLevel}</div>
    );
}
