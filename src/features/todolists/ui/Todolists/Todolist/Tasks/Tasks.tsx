import List from "@mui/material/List";
import { Task } from "./Task/Task";
import { useAppSelector } from "app/hooks";
import type { TodolistType } from "app/App";
import { selectTasks } from "features/todolists/model/tasks-selectors";

type Props = {
  todolist: TodolistType;
};
export const Tasks = ({ todolist }: Props) => {
  const tasks = useAppSelector(selectTasks)[todolist.id];

  const getTasks = () => {
    let filteredTasks = tasks;
    if (todolist.filter === "active") {
      filteredTasks = tasks.filter((task) => !task.isDone);
    }
    if (todolist.filter === "completed") {
      filteredTasks = tasks.filter((task) => task.isDone);
    }
    return filteredTasks;
  };

  return (
    <>
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {getTasks().map((task) => {
            return <Task key={task.id} todolist={todolist} task={task} />;
          })}
        </List>
      )}
    </>
  );
};
