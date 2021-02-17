import React from "react";
import {SkillRating} from "../../models/skillRating";
import {List, ListItem} from "@material-ui/core";
import {Rating} from "../Rating/Rating";
import {SkillLevel} from "../../models/skillLevel";

export interface RatingListProps {
    data: SkillRating[];
    onValueChange: (skillId: string, newValue: SkillLevel) => void;
}

export const RatingList: React.FC<RatingListProps> = ({data, onValueChange}) => {
    if (!data)
        return (<>No Data</>);

    return (
        <List aria-label="main mailbox folders">
            {data.map(function (item) {
                return (<ListItem key={item.skillId}>
                    <Rating skillId={item.skillId} skillName={item.skillName} skillLevel={item.skillLevel}
                            onValueChange={(newValue) => onValueChange(item.skillId, newValue)}/>
                </ListItem>)
            })}
        </List>
    );
}
