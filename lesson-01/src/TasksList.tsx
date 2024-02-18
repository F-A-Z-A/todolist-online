import {TaskType} from "./App";
import {Task} from "./Task";
import {Button} from "./Button";
import React from "react";

type TasksListPropsType = {
  tasks: Array<TaskType>
}

export function TasksList({tasks}: TasksListPropsType) {
  const tasksList = (
    <ul>
      {
        tasks.map(task => {
          return <Task key={task.id} title={task.title} isDone={task.isDone}/>
          // можно прописать так, key={task.id} прописывается только в наружном элементе
          // здесь <div> наружный элемент
          // return <div key={task.id}>
          //   <Task title={task.title} isDone={task.isDone}/>
          // </div>
        })
      }
    </ul>
  )

  return (
    <>
      {tasksList}
      <div>
        <Button title={"All"}/>
        <Button title={"Active"}/>
        <Button title={"Completed"}/>
      </div>
    </>
  )
}