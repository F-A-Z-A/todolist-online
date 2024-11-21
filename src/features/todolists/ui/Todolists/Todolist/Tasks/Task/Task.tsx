import Checkbox from "@mui/material/Checkbox";
import { EditableSpan } from "common/components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItem from "@mui/material/ListItem";
import type { TaskType, TodolistType } from "app/App";
import { ChangeEvent } from "react";
import { changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from "features/todolists/model/tasks-reducer";
import { useAppDispatch } from "app/hooks";
import { getListItemSx } from "features/todolists/ui/Todolists/Todolist/Tasks/Task/Task.styles";

type Props = {
  todolist: TodolistType;
  task: TaskType;
};
export const Task = ({ todolist, task }: Props) => {
  const dispatch = useAppDispatch();

  const removeTask = () => {
    dispatch(removeTaskAC({ todolistId: todolist.id, taskId: task.id }));
  };

  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeTaskStatusAC({ todolistId: todolist.id, taskId: task.id, isDone: e.currentTarget.checked }));
  };

  const updateTask = (title: string) => {
    dispatch(changeTaskTitleAC({ todolistId: todolist.id, taskId: task.id, title }));
  };

  return (
    <ListItem sx={getListItemSx(task.isDone)}>
      <div>
        <Checkbox checked={task.isDone} onChange={changeTaskStatus} />
        <EditableSpan value={task.title} onChange={updateTask} />
      </div>
      <IconButton onClick={removeTask}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};
