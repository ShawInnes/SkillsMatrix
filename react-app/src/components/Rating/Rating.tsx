import {ButtonGroup, Grid} from '@material-ui/core';
import {RatingEnum} from '../../models/ratingEnum';
import React, {useEffect} from 'react';
import {RatingButton} from "./RatingButton";

export interface RatingProps {
    skillId: string;
    skillName: string;
    ratingValue: RatingEnum;
    onRatingValueChange: (value: RatingEnum) => void;
}

export const Rating: React.FC<RatingProps> = ({skillId, skillName, ratingValue, onRatingValueChange}) => {
    const [value, setValue] = React.useState(ratingValue);

    const handleRatingChange = (v: RatingEnum) => {
        setValue(v);
        onRatingValueChange(v);
    };

    return (
        <div>
            <Grid item xs={12}>
                <h1>{skillName}</h1>
            </Grid>
            <Grid item xs={12}>
                <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                    <RatingButton rating={RatingEnum.One} ratingValue={value}
                                  onRatingValueChange={(v) => handleRatingChange(v)}/>
                    <RatingButton rating={RatingEnum.Two} ratingValue={value}
                                  onRatingValueChange={(v) => handleRatingChange(v)}/>
                    <RatingButton rating={RatingEnum.TwoPointFive} ratingValue={value}
                                  onRatingValueChange={(v) => handleRatingChange(v)}/>
                    <RatingButton rating={RatingEnum.Three} ratingValue={value}
                                  onRatingValueChange={(v) => handleRatingChange(v)}/>
                    <RatingButton rating={RatingEnum.Four} ratingValue={value}
                                  onRatingValueChange={(v) => handleRatingChange(v)}/>
                </ButtonGroup>
            </Grid>
        </div>
    );
}
