import React from 'react';
import {Story, Meta} from '@storybook/react/types-6-0';
import {SkillEditForm, SkillEditFormProps} from "./SkillEditForm";

export default {
  title: 'Pages/SkillEditForm',
  component: SkillEditForm
} as Meta;

const handleSearch = (query: string): string[] => {
  const list = [
    "Item 1", "Item 2", "Item 3", "Item 4", "Item 5",
    "Red 1", "Red 2", "Red 3", "Red 4", "Red 5",
    "Green 1", "Green 2", "Green 3", "Green 4", "Green 5"
  ];

  const escapeRegExp = (input: string) => {
    return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }

  const regex = new RegExp(`${escapeRegExp(query)}`, "i");
  return list.filter(obj => regex.test(obj));
};

const Template: Story<SkillEditFormProps> = (args) => (<SkillEditForm {...args} />);

export const Default = Template.bind({});
Default.args = {
  initialValues: {
    name: 'test'
  },
  handleSearch: handleSearch,
  // onSubmit: (values: FormikValues) => void;
};
