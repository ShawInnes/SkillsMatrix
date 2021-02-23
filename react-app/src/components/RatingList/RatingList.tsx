import React from "react";
import {SkillRating} from "../../models/skillRating";
import {Rating} from "../Rating/Rating";
import {SkillLevel} from "../../models/skillLevel";
import {ListGroup, ListGroupItem} from "react-bootstrap";

export interface RatingListProps {
    data: SkillRating[];
    onValueChange: (skillId: string, newValue: SkillLevel) => void;
}

export const RatingList: React.FC<RatingListProps> = ({data, onValueChange}) => {
    if (!data)
        return (<>No Data</>);

    return (
        <ListGroup aria-label="main mailbox folders">
            {data.map(function (item) {
                return (<ListGroupItem key={item.skillId}>
                    <Rating skillId={item.skillId} skillName={item.skillName} skillLevel={item.skillLevel}
                            onValueChange={(newValue) => onValueChange(item.skillId, newValue)}/>
                </ListGroupItem>)
            })}
        </ListGroup>
    );
}
