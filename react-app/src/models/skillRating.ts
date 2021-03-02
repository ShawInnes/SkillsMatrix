import {SkillLevel} from "./skillLevel";

export interface SkillRating {
    skillId: string;
    skillName: string;
    skillCategory: string;
    skillLevel: SkillLevel;
    updated?: Date;
}

