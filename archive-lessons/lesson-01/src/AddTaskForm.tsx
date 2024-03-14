import React from 'react';
import {Button} from "./Button";

type AddTaskFormPropsType = {}

export function AddTaskForm(props: AddTaskFormPropsType) {
  return (
    <div>
      <input/>
      <Button title={"+"}/>
    </div>
  );
}