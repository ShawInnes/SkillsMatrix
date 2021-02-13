import {SkillRating} from "./skillRating";

export interface Person {
    id: string;
    name: string;
    email: string;
    skillRatings: SkillRating[]
}
