import {TodoListHeader} from "./TodoListHeader";
import {AddTaskForm} from "../AddTaskForm";
import {TasksList} from "./TasksList";
import React from "react";
import {FilterValuesType} from "../App";

export type TaskType = {
  id: number
  title: string
  isDone: boolean
}

type TodoListPropsType = {
  todoListTitle: string
  tasks: Array<TaskType>
  removeTask: (taskId: number) => void
  changeFilter: (filter: FilterValuesType) => void
}

export function TodoList({todoListTitle, tasks, removeTask, changeFilter}: TodoListPropsType) {
  return (
    <div>
      <TodoListHeader title={todoListTitle}/>
      <AddTaskForm/>
      <TasksList changeFilter={changeFilter} removeTask={removeTask} tasks={tasks}/>
    </div>
  )
}