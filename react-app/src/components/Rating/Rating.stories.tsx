import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Story, Meta} from '@storybook/react/types-6-0';
import {Rating, RatingProps} from './Rating';
import {MemoryRouter as Router} from 'react-router-dom';

export default {
    title: 'Components/Rating',
    component: Rating,
} as Meta;

const Template: Story<RatingProps> = (args) => <Router><Rating {...args}/></Router>;

export const Default = Template.bind({});
Default.args = {};
