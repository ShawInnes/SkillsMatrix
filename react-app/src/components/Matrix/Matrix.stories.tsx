import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Story, Meta} from '@storybook/react/types-6-0';
import {Matrix, MatrixProps} from './Matrix';
import {MemoryRouter as Router} from 'react-router-dom';

export default {
    title: 'Components/Matrix',
    component: Matrix,
} as Meta;

const Template: Story<MatrixProps> = (args) => <Router><Matrix {...args}/></Router>;

export const Default = Template.bind({});
Default.args = {
    
};
