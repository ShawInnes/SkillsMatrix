import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Story, Meta} from '@storybook/react/types-6-0';
import {Header, HeaderProps} from './Header';
import {MemoryRouter as Router} from 'react-router-dom';
import {UserContext, UserContextModel} from '../../context/userContext';

export default {
  title: 'Components/Header',
  component: Header
} as Meta;


const Template: Story<HeaderProps> = (args) => (<Header {...args} />);

const loggedInContext: UserContextModel = {
};

export const LoggedIn = Template.bind({});
LoggedIn.decorators = [(Story) => (<UserContext.Provider value={loggedInContext}><Router><Story/></Router></UserContext.Provider>)]

const loggedOutContext: UserContextModel = {};

export const LoggedOut = Template.bind({});
LoggedOut.decorators = [(Story) => (<UserContext.Provider value={loggedOutContext}><Router><Story/></Router></UserContext.Provider>)]
