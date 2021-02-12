import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Story, Meta} from '@storybook/react/types-6-0';
import {Header, HeaderProps} from './Header';
import {MemoryRouter as Router} from 'react-router-dom';

export default {
    title: 'Components/Header',
    component: Header,
} as Meta;

const Template: Story<HeaderProps> = (args) => <Router><Header {...args} /></Router>;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
    user: 'user@sixpivot.com.au'
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {};
