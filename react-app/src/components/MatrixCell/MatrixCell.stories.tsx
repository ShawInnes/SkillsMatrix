import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Story, Meta} from '@storybook/react/types-6-0';
import {MatrixCell, MatrixCellProps} from './MatrixCell';

export default {
    title: 'Components/MatrixCell',
    component: MatrixCell,
} as Meta;

const Template: Story<MatrixCellProps> = (args) => <MatrixCell {...args}/>;

export const Default = Template.bind({});
Default.args = {};
