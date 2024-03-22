import * as React from 'react';
import {Checkbox} from "@mui/material";
import {ChangeEvent} from "react";

type CheckBoxPropsType = {
  isDone: boolean
  changeTaskStatus: (isDone: boolean) => void
};
export const CheckBox = (props: CheckBoxPropsType) => {
  
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newIsDone = e.currentTarget.checked;
    props.changeTaskStatus(newIsDone)
  }
  
  return (
    <Checkbox
      checked={props.isDone}
      onChange={onChangeHandler}
      color="primary"
    />
  );
};