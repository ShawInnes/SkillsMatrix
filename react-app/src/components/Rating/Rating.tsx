import {Button, ButtonGroup} from '@material-ui/core';
import React from 'react';

export interface RatingProps {
}

export const Rating: React.FC<RatingProps> = ({}) => {
    return (
        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
            <Button>1</Button>
            <Button>2</Button>
            <Button>2.5</Button>
            <Button>3</Button>
            <Button>4</Button>
        </ButtonGroup>
    );
}
