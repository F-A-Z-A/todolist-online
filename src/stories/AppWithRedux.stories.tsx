import type {Meta, StoryObj} from '@storybook/react';
import AppWithRedux from "../AppWithRedux";
import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";

const meta: Meta<typeof AppWithRedux> = {
  title: 'TODOLISTS/AppWithRedux',
  component: AppWithRedux,
  parameters: {
    // layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
  decorators: [ReduxStoreProviderDecorator]
};

export default meta;
type Story = StoryObj<typeof AppWithRedux>;

export const AppWithReduxStory: Story = {};

