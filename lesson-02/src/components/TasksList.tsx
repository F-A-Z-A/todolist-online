import {Task} from "./Task";
import {Button} from "./Button";
import React from "react";
import {TaskType} from "./TodoList";
import {FilterValuesType} from "../App";

type TasksListPropsType = {
  tasks: Array<TaskType>
  removeTask: (taskId: number) => void
  changeFilter: (filter: FilterValuesType) => void
}

export function TasksList({tasks, removeTask, changeFilter}: TasksListPropsType) {
  const tasksList = (
    <ul>
      {
        tasks.map(task => {
          return (
            <li key={task.id}>
              <Task
                taskId={task.id}
                title={task.title}
                isDone={task.isDone}
                removeTask={removeTask}
              />
            </li>
          )
        })
      }
    </ul>
  )
  
  return (
    <>
      {tasksList}
      <div>
        <Button title={"All"} onClickHandler={() => changeFilter("all")}/>
        <Button title={"Active"} onClickHandler={() => changeFilter("active")}/>
        <Button title={"Completed"} onClickHandler={() => changeFilter("completed")}/>
      </div>
    </>
  )
}