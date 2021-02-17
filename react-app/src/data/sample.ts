import {Person} from "../models/person";
import {SkillLevel} from "../models/skillLevel";

const skillsData: Person[] = [
    {
        id: 'shaw',
        name: 'Shaw Innes',
        email: 'shaw@sixpivot.com.au',
        skillRatings: [
            {
                skillId: "csharp",
                skillName: 'C#',
                skillLevel: SkillLevel.NotInterested
            },
            {
                skillId: "react",
                skillName: 'React',
                skillLevel: SkillLevel.WillLearn
            },
            {
                skillId: "angular",
                skillName: 'Angular 2+',
                skillLevel: SkillLevel.LimitedExposure
            },
            {
                skillId: "sharepoint",
                skillName: 'SharePoint',
                skillLevel: SkillLevel.Proficient
            },
            {
                skillId: "visualbasic",
                skillName: 'VB',
                skillLevel: SkillLevel.Expert
            }
        ]
    }
];

export const getSkills = (): Person[] => {
    return skillsData.filter(q => q.skillRatings.length !== 0);
};
