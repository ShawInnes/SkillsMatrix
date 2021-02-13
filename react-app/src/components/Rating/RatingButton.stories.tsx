import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Meta, Story} from '@storybook/react/types-6-0';
import {RatingButton, RatingButtonProps} from './RatingButton';
import {RatingEnum} from "../../models/ratingEnum";

export default {
    title: 'Components/Rating/Button',
    component: RatingButton,
} as Meta;

const RatingButtonTemplate: Story<RatingButtonProps> = (args) => <RatingButton {...args}/>;

export const Selected = RatingButtonTemplate.bind({});
Selected.args = {
    rating: RatingEnum.Two,
    ratingValue: RatingEnum.Two
};

export const NotSelected = RatingButtonTemplate.bind({});
NotSelected.args = {
    rating: RatingEnum.Two,
    ratingValue: RatingEnum.One
};
