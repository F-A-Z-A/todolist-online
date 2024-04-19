import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';
import {Button} from './Button';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/Button',   // ветка истории, создатся Example и вложится в него Button
  component: Button,   // для какой компоненты создается история
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',   // выстроит компоненту в центре окна просмотра
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],   // создает вкладку Docs в ветке компоненты
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {   // объект, который описывает пропсы, которые заданы неявно
    backgroundColor: {control: 'color'},   // неявный пропс (добавится палитра выбора цвета)
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {onClick: fn()},   // подразумеваем в React как пропсы, тут описывается onClick как функция
} satisfies Meta<typeof Button>;


// ---------------------- Начало истории --------------------------
export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {            // описывает пропс Primary
    primary: true,
    label: 'Button',
  },
};

export const Secondary: Story = {
  args: {            // описывает пропс Secondary
    label: 'Button',
  },
};

export const Large: Story = {
  args: {            // описывает пропс Large
    size: 'large',
    label: 'Button',
  },
};

export const Small: Story = {
  args: {            // описывает пропс Small
    size: 'small',
    label: 'Button',
  },
};
