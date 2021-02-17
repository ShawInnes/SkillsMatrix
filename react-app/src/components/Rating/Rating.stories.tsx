import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Meta, Story} from '@storybook/react/types-6-0';
import {Rating, RatingProps} from './Rating';
import {SkillLevel} from "../../models/skillLevel";

export default {
    title: 'Components/Rating',
    component: Rating,
} as Meta;

const RatingTemplate: Story<RatingProps> = (args) => <Rating {...args}/>;

export const RatingComponent = RatingTemplate.bind({});
RatingComponent.args = {
    skillId: 'angular',
    skillName: 'Angular 2+',
    skillLevel: SkillLevel.Proficient
};
