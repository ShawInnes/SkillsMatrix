import {ButtonGroup, Grid} from '@material-ui/core';
import React, {useEffect} from 'react';
import {RatingButton} from "./RatingButton";
import {makeStyles} from "@material-ui/core/styles";
import {SkillLevel} from "../../models/skillLevel";

export interface RatingProps {
    skillId: string;
    skillName: string;
    skillLevel: SkillLevel;
    onValueChange: (value: SkillLevel) => void;
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    control: {
        padding: theme.spacing(2),
    },
}));

export const Rating: React.FC<RatingProps> = ({skillId, skillName, skillLevel, onValueChange}) => {
    const [value, setValue] = React.useState(skillLevel);
    const classes = useStyles();

    const handleRatingChange = (v: SkillLevel) => {
        setValue(v);
        onValueChange(v);
    };

    return (
        <Grid container className={classes.root} spacing={1}>
            <Grid item xs={12}>
                <h1>{skillName}</h1>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={1}>
                    <Grid item>
                        <RatingButton skillLevel={SkillLevel.NotInterested} value={value}
                                      onValueChange={(v) => handleRatingChange(v)}/>
                    </Grid>
                    <Grid item>
                        <RatingButton skillLevel={SkillLevel.WillLearn} value={value}
                                      onValueChange={(v) => handleRatingChange(v)}/>
                    </Grid>
                    <Grid item>
                        <RatingButton skillLevel={SkillLevel.LimitedExposure} value={value}
                                      onValueChange={(v) => handleRatingChange(v)}/>
                    </Grid>
                    <Grid item>
                        <RatingButton skillLevel={SkillLevel.Proficient} value={value}
                                      onValueChange={(v) => handleRatingChange(v)}/>
                    </Grid>
                    <Grid item>
                        <RatingButton skillLevel={SkillLevel.Expert} value={value}
                                      onValueChange={(v) => handleRatingChange(v)}/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
