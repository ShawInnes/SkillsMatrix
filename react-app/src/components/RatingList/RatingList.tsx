import React from "react";
import {Rating} from "components/Rating/Rating";
import {SkillRating, SkillLevel} from "models";
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
          <Rating showLabel={true}
                  skillId={item.skillId}
                  skillName={item.skillName}
                  skillCategory={item.skillCategory}
                  skillLevel={item.skillLevel}
                  onValueChange={onValueChange}/>
        </ListGroupItem>)
      })}
    </ListGroup>
  );
}
