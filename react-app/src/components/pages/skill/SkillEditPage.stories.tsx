import React from 'react';
import {Story, Meta} from '@storybook/react/types-6-0';
import {SkillEditPage} from "./SkillEditPage";

export default {
  title: 'Pages/SkillEditPage',
  component: SkillEditPage
} as Meta;


const Template: Story = (args) => (<SkillEditPage {...args} />);

export const Default = Template.bind({});
