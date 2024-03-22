import * as React from 'react';
import {Checkbox} from "@mui/material";
import {ChangeEvent} from "react";

type CheckBoxPropsType = {
  taskID: string
  isDone: boolean
  todolistId: string
  changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
  color: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'default'
};
export const CheckBox = (props: CheckBoxPropsType) => {
  
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let newIsDoneValue = e.currentTarget.checked;
    props.changeTaskStatus(props.taskID, newIsDoneValue, props.todolistId);
  }
  
  return (
    <Checkbox
      checked={props.isDone}
      color={props.color}
      onChange={onChangeHandler}
    />
  );
};