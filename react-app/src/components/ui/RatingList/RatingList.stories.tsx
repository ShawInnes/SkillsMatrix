import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';
import {RatingList, RatingListProps} from "./RatingList";
import {SkillLevel} from "models";

export default {
    title: 'Components/Rating/List',
    component: RatingList,
} as Meta;

const RatingListTemplate: Story<RatingListProps> = (args) => <RatingList {...args}/>;

export const RatingListComponent = RatingListTemplate.bind({});
RatingListComponent.args = {
    data: [
        {
            skillId: "csharp",
            skillName: 'C#',
            skillCategory: 'Front-End',
            skillLevel: SkillLevel.NotInterested
        },
        {
            skillId: "react",
            skillName: 'React',
            skillCategory: 'Front-End',
            skillLevel: SkillLevel.Proficient
        },
        {
            skillId: "angular",
            skillName: 'Angular 2+',
            skillCategory: 'Front-End',
            skillLevel: SkillLevel.WillLearn
        },
        {
            skillId: "sharepoint",
            skillName: 'SharePoint',
            skillCategory: 'Other',
            skillLevel: SkillLevel.Expert
        }
    ]
};
