import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Meta, Story} from '@storybook/react/types-6-0';
import {RatingList, RatingListProps} from "./RatingList";
import {SkillLevel} from "../../models/skillLevel";

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
            skillLevel: SkillLevel.NotInterested
        },
        {
            skillId: "react",
            skillName: 'React',
            skillLevel: SkillLevel.Proficient
        },
        {
            skillId: "angular",
            skillName: 'Angular 2+',
            skillLevel: SkillLevel.WillLearn
        },
        {
            skillId: "sharepoint",
            skillName: 'SharePoint',
            skillLevel: SkillLevel.Expert
        }
    ]
};
