import {Button, ButtonGroup, Grid} from '@material-ui/core';
import {RatingEnum} from '../../models/ratingEnum';
import React from 'react';

export interface RatingButtonProps {
    rating: RatingEnum;
    ratingValue: RatingEnum;
    onRatingValueChange: (value: RatingEnum) => void;
}

export const RatingButton: React.FC<RatingButtonProps> = ({rating, ratingValue, onRatingValueChange}) => {
    return (
        rating === ratingValue ?
            (<Button onClick={() => onRatingValueChange(rating)} color="secondary" variant="contained">{rating}</Button>) :
            (<Button onClick={() => onRatingValueChange(rating)} color="primary" variant="contained">{rating}</Button>)
    );
}
