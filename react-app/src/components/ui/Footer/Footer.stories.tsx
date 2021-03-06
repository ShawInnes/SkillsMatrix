import React from 'react';
import {Story, Meta} from '@storybook/react/types-6-0';
import {Footer, FooterProps} from './Footer';
import {MemoryRouter as Router} from 'react-router-dom';
import {UserContext, UserContextModel} from 'infrastructure/context';

export default {
  title: 'Components/Footer',
  component: Footer
} as Meta;


const Template: Story<FooterProps> = (args) => (<Footer {...args} />);

const loggedInContext: UserContextModel = {
};

export const LoggedIn = Template.bind({});
LoggedIn.decorators = [(Story) => (<UserContext.Provider value={loggedInContext}><Router><Story/></Router></UserContext.Provider>)]

const loggedOutContext: UserContextModel = {};

export const LoggedOut = Template.bind({});
LoggedOut.decorators = [(Story) => (<UserContext.Provider value={loggedOutContext}><Router><Story/></Router></UserContext.Provider>)]
