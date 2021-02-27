import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Meta, Story} from '@storybook/react/types-6-0';
import {MatrixCell, MatrixCellProps} from './MatrixCell';
import {SkillLevel} from "models";

export default {
    title: 'Components/MatrixCell',
    component: MatrixCell,
} as Meta;

const Template: Story<MatrixCellProps> = (args) => <MatrixCell {...args}/>;

export const Default = Template.bind({});
Default.args = {
};

export const NotInterested = Template.bind({});
NotInterested.args = {
    skillLevel: SkillLevel.NotInterested
};

export const WillLearn = Template.bind({});
WillLearn.args = {
    skillLevel: SkillLevel.WillLearn
};

export const LimitedExposure = Template.bind({});
LimitedExposure.args = {
    skillLevel: SkillLevel.LimitedExposure
};

export const Proficient = Template.bind({});
Proficient.args = {
    skillLevel: SkillLevel.Proficient
};

export const Expert = Template.bind({});
Expert.args = {
    skillLevel: SkillLevel.Expert
};
