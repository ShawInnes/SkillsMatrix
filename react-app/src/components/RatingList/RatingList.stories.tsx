import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Meta, Story} from '@storybook/react/types-6-0';
import {RatingList, RatingListProps} from "./RatingList";
import {RatingEnum} from "../../models/ratingEnum";

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
};
