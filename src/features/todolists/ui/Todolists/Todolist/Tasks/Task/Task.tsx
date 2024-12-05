import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import React, { ChangeEvent } from "react";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { EditableSpan } from "common/components";
import { getListItemSx } from "./Task.styles";
import {
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  type TaskType,
} from "features/todolists/model/tasks-reducer";
import type { TodolistType } from "features/todolists/model/todolists-reducer";

type Props = {
  task: TaskType;
  todolist: TodolistType;
};

export const Task = ({ task, todolist }: Props) => {
  const dispatch = useAppDispatch();

  const removeTaskHandler = () => {
    dispatch(removeTaskAC({ taskId: task.id, todolistId: todolist.id }));
  };

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const isDone = e.currentTarget.checked;
    dispatch(changeTaskStatusAC({ taskId: task.id, isDone, todolistId: todolist.id }));
  };

  const changeTaskTitleHandler = (title: string) => {
    dispatch(changeTaskTitleAC({ taskId: task.id, title, todolistId: todolist.id }));
  };

  return (
    <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
      <div>
        <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler} />
        <EditableSpan value={task.title} onChange={changeTaskTitleHandler} />
      </div>
      <IconButton onClick={removeTaskHandler}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};
