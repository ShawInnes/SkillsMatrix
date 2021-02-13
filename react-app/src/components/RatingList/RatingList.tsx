import React from "react";
import {SkillRating} from "../../models/skillRating";
import {List, ListItem} from "@material-ui/core";
import {Rating} from "../Rating/Rating";
import {RatingEnum} from "../../models/ratingEnum";

export interface RatingListProps {
    data: SkillRating[];
    onRatingValueChange: (skillId: string, newValue: RatingEnum) => void;
}

export const RatingList: React.FC<RatingListProps> = ({data, onRatingValueChange}) => {
    if (!data)
        return (<>No Data</>);

    return (
        <List aria-label="main mailbox folders">
            {data.map(function (item) {
                return (<ListItem key={item.skillId}>
                    <Rating skillId={item.skillId} skillName={item.skillName} ratingValue={item.rating}
                            onRatingValueChange={(newValue) => onRatingValueChange(item.skillId, newValue)}/>
                </ListItem>)
            })}
        </List>
    );
}
