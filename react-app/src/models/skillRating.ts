import {SkillLevel} from "./skillLevel";

export interface SkillRating {
    skillId: string;
    skillName: string;
    skillLevel: SkillLevel;
    updated?: Date;
}

