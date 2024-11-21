import { AddItemForm } from "common/components/AddItemForm/AddItemForm";
import { TodolistTitle } from "./TodolistTitle/TodolistTitle";
import { Tasks } from "./Tasks/Tasks";
import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons";
import { addTaskAC } from "features/todolists/model/tasks-reducer";
import { useAppDispatch } from "app/hooks";
import type { TodolistType } from "app/App";

type Props = {
  todolist: TodolistType;
};

export const Todolist = ({ todolist }: Props) => {
  const dispatch = useAppDispatch();

  const addTaskCallback = (title: string) => {
    dispatch(addTaskAC({ title, todolistId: todolist.id }));
  };

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTaskCallback} />
      <Tasks todolist={todolist} />
      <FilterTasksButtons todolist={todolist} />
    </div>
  );
};
