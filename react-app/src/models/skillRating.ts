import {RatingEnum} from "./ratingEnum";

export interface SkillRating {
    skillId: string;
    skillName: string;
    rating: RatingEnum;
    updated?: Date;
}
