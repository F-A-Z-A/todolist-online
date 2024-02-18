import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (taskId: string) => void
  changeFilter: (value: FilterValuesType) => void
  addTask: (taskTitle: string) => void
}

export function Todolist(props: PropsType) {
  
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [taskTitle, settaskTitle] = useState("");
  const [taskInputError, setTaskInputError] = useState(false);
  
  function addTask() {
    const trimmedTitle = taskTitle.trim()
    if (trimmedTitle) {
      props.addTask(taskTitle);
    } else {
      setTaskInputError(true)
    }
    settaskTitle("")
  }
  
  function onChangeSetTitle(e: ChangeEvent<HTMLInputElement>) {
    settaskTitle(e.currentTarget.value)
    e.currentTarget.value.length > 15 && setTaskInputError(true)
    if (taskInputError) {
      e.currentTarget.value.length <= 15 && setTaskInputError(false)
    }
  }
  
  function onKeyDownAddTaskHandler(e: KeyboardEvent<HTMLInputElement>) {
    if (!taskInputError) {
      e.key === "Enter" && addTask()
    }
  }
  
  const isAddTaskBtnDisabled = taskTitle.length === 0 || taskTitle.length > 15;
  const taskTitleInputError = taskInputError ? "taskTitleInputError" : ""
  
  
  return (
    <div>
      <h3>
        {props.title}
        <button onClick={() => setIsCollapsed(!isCollapsed)}>{isCollapsed ? "Open" : "Close"}</button>
      </h3>
      {
        isCollapsed
          ? null
          : <>
            <div>
              <input
                value={taskTitle}
                className={taskTitleInputError}
                placeholder={"max 15 charters"}
                onChange={onChangeSetTitle}
                onKeyDown={onKeyDownAddTaskHandler}
              />
              <button
                disabled={isAddTaskBtnDisabled}
                onClick={addTask}
              >
                +
              </button>
              {taskInputError && <div style={{color: "red"}}>Enter correct title</div>}
            </div>
            <ul>
              {
                props.tasks.map(t => <li key={t.id}>
                  <input type="checkbox" checked={t.isDone}/>
                  <span>{t.title}</span>
                  <button onClick={() => props.removeTask(t.id)}>x</button>
                </li>)
              }
            </ul>
            <div>
              <button onClick={() => props.changeFilter("all")}> All</button>
              <button onClick={() => props.changeFilter("active")}> Active</button>
              <button onClick={() => props.changeFilter("completed")}> Completed</button>
            </div>
          </>
      }
    </div>
  )
}
