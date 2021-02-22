import {Chip, withStyles} from '@material-ui/core';
import React from 'react';
import {SkillLevel} from "../../models/skillLevel";
import './MatrixCell.scss';
import {makeStyles} from "@material-ui/core/styles";

export interface MatrixCellProps {
    skillLevel: SkillLevel;
}

const useStyles = makeStyles({
    root: {},
    NotInterested: {
        backgroundColor: '#ff8c00',
        color: 'black'
    },
    WillLearn: {
        backgroundColor: '#FFE500',
        color: 'black'
    },
    LimitedExposure: {
        backgroundColor: '#0644B3',
        color: 'white'
    },
    Proficient: {
        backgroundColor: '#119F0B',
        color: 'white'
    },
    Expert: {
        backgroundColor: '#750787',
        color: 'white'
    }
});

export const MatrixCell: React.FC<MatrixCellProps> = ({skillLevel}) => {
    const classes = useStyles();
    let skillClass;
    let className;

    switch (skillLevel) {
        case SkillLevel.NotInterested:
            skillClass = 'Not Interested';
            className = classes.NotInterested;
            break;
        case SkillLevel.WillLearn:
            skillClass = 'Will Learn';
            className = classes.WillLearn;
            break;
        case SkillLevel.LimitedExposure:
            skillClass = 'Limited Exposure';
            className = classes.LimitedExposure;
            break;
        case SkillLevel.Proficient:
            skillClass = 'Proficient';
            className = classes.Proficient;
            break;
        case SkillLevel.Expert:
            skillClass = 'Expert';
            className = classes.Expert;
            break;
        default:
            return (<></>);
    }
    return (
        <Chip label={skillClass} className={className}/>
    );

}
