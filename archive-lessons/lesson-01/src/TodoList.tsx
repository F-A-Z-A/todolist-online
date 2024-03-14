import {TodoListHeader} from "./TodoListHeader";
import {AddTaskForm} from "./AddTaskForm";
import {TasksList} from "./TasksList";
import React from "react";
import {TaskType} from "./App";

type TodoListPropsType = {
  todoListTitle: string
  tasks: Array<TaskType>
}

export function TodoList({todoListTitle, tasks}: TodoListPropsType) {
  return (
    <div>
      <TodoListHeader title={todoListTitle}/>
      <AddTaskForm/>
      <TasksList tasks={tasks}/>
    </div>
  )
}