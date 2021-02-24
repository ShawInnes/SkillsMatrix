import React from 'react';
import {Meta, Story} from '@storybook/react';
import {Rating, RatingProps} from './Rating';
import {SkillLevel} from "models";

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
