import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Meta, Story} from '@storybook/react/types-6-0';
import {RatingButton, RatingButtonProps} from './RatingButton';
import {SkillLevel} from "../../models/skillLevel";

export default {
    title: 'Components/Rating/Button',
    component: RatingButton,
} as Meta;

const RatingButtonTemplate: Story<RatingButtonProps> = (args) => <RatingButton {...args}/>;

export const Selected = RatingButtonTemplate.bind({});
Selected.args = {
    skillLevel: SkillLevel.LimitedExposure,
    value: SkillLevel.LimitedExposure
};

export const NotSelected = RatingButtonTemplate.bind({});
NotSelected.args = {
    skillLevel: SkillLevel.LimitedExposure,
    value: SkillLevel.Expert
};
