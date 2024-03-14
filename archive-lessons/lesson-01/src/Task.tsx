import React from "react";

type TaskPropsType = {
  title: string
  isDone: boolean
}

export function Task(props: TaskPropsType) {
  return (
    <li>
      <input type="checkbox" checked={props.isDone}/>
      <span>{props.title}</span>
    </li>
  )
}