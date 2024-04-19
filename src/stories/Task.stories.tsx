import type {Meta, StoryObj} from '@storybook/react';
import {Task} from "../Task";
import {fn} from "@storybook/test";
import {useState} from "react";

const meta: Meta<typeof Task> = {
  title: 'TODOLISTS/Task',
  component: Task,
  tags: ['autodocs'],
  args: {
    task: {id: "taskID", title: "TitleText", isDone: true},
    todolistId: "todolistId-1",
    changeTaskStatus: fn(),
    changeTaskTitle: fn(),
    removeTask: fn(),
  }
};

export default meta;
type Story = StoryObj<typeof Task>;

export const TaskIsDoneStory: Story = {};

export const TaskIsNotDoneStory: Story = {
  args: {
    task: {id: "taskID", title: "TitleText", isDone: false},
  }
};

export const TaskToggleStory: Story = {
  render: (args) => {
    const [task, setTask] = useState(args.task)
    
    const changeTaskStatus = () => {
      setTask({...task, isDone: !task.isDone})
    }
    const changeTaskTitle = (title: string, newTitle: string) => {
      setTask({...task, title: newTitle})
    }
    
    return <Task
      changeTaskStatus={changeTaskStatus}
      changeTaskTitle={changeTaskTitle}
      removeTask={args.removeTask}
      task={task}
      todolistId={"taskID-2"}/>
  }
};