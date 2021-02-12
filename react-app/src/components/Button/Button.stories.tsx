import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Story, Meta} from '@storybook/react/types-6-0';
import Button from './Button';

export default {
    title: 'Components/Button',
    component: Button
} as Meta;

// @ts-ignore
const Template = ({label, ...args}) => <Button {...args}>{label}</Button>;

export const SmallButton = Template.bind({});
// @ts-ignore
SmallButton.args = {
    label: 'Click Me',
    size: 'small',
    variant: 'contained',
    color: 'primary',
}

export const MediumButton = Template.bind({});
// @ts-ignore
MediumButton.args = {
    label: 'Click Me',
    size: 'medium',
    variant: 'contained',
    color: 'primary',
};

export const LargeButton = Template.bind({});
// @ts-ignore
LargeButton.args = {
    label: 'Click Me',
    size: 'large',
    variant: 'contained',
    color: 'primary',
}
