import React from "react";
import {Button} from "./Button";

type TaskPropsType = {
  taskId: number
  title: string
  isDone: boolean
  сlasses?: string
  removeTask: (taskId: number) => void
}

export function Task({taskId, title, isDone, сlasses, removeTask}: TaskPropsType) {
  return (
    <div className={сlasses}>
      <input type="checkbox" checked={isDone}/>
      <span>{title}</span>
      <Button title={"del"} onClickHandler={() => removeTask(taskId)}/>
    </div>
  )
}