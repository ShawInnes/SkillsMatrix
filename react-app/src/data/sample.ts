import {RatingEnum} from "../models/ratingEnum";
import {Person} from "../models/person";

const skillsData: Person[] = [
    {
        id: 'shaw',
        name: 'Shaw Innes',
        email: 'shaw@sixpivot.com.au',
        skillRatings: [
            {
                skillId: "csharp",
                skillName: 'C#',
                rating: RatingEnum.Four
            },
            {
                skillId: "react",
                skillName: 'React',
                rating: RatingEnum.Two
            },
            {
                skillId: "angular",
                skillName: 'Angular 2+',
                rating: RatingEnum.Three
            },
            {
                skillId: "sharepoint",
                skillName: 'SharePoint',
                rating: RatingEnum.One
            }
        ]
    }
];

export const getSkills = (): Person[] => {
    return skillsData.filter(q => q.skillRatings.length !== 0);
};
