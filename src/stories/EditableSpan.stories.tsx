import type {Meta, StoryObj} from '@storybook/react';
import {EditableSpan} from "../EditableSpan";
import {fn} from "@storybook/test";

const meta: Meta<typeof EditableSpan> = {
  title: 'TODOLISTS/EditableSpan',
  component: EditableSpan,
  parameters: {
    // layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {
    value: "EditableSpanValue",
    onChange: fn()
  }
};

export default meta;
type Story = StoryObj<typeof EditableSpan>;

export const EditableSpanStory: Story = {};

