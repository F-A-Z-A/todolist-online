import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, getFilterTasks} from './App';

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  title: string
  tasks: Array<TaskType>
  filter: FilterValuesType
  removeTask: (taskId: string) => void
  changeFilter: (value: FilterValuesType) => void
  addTask: (taskTitle: string) => void
  changeTaskStatus: (id: string, newIsDone: boolean) => void
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
  
  const activeTasksCount = getFilterTasks(props.tasks, "active").length
  
  const isAddTaskBtnDisabled = taskTitle.length === 0 || taskTitle.length > 15;
  const taskTitleInputError = taskInputError ? "taskTitleInputError" : "";
  
  
  return (
    <div>
      <h3>
        {props.title}
        {isCollapsed && <span className={"task-counter"}> active: {activeTasksCount}</span>}
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
                  <input type="checkbox"
                         checked={t.isDone}
                         onChange={(e) => props.changeTaskStatus(t.id, e.currentTarget.checked)}/>
                  <span className={t.isDone ? "task-done task" : "task"}>{t.title}</span>
                  <button onClick={() => props.removeTask(t.id)}>x</button>
                </li>)
              }
            </ul>
            <div>
              <button onClick={() => props.changeFilter("all")}
                      className={props.filter === "all" ? "button-on" : undefined}
              > All
              </button>
              <button onClick={() => props.changeFilter("active")}
                      className={props.filter === "active" ? "button-on" : undefined}
              > Active
              </button>
              <button onClick={() => props.changeFilter("completed")}
                      className={props.filter === "completed" ? "button-on" : undefined}
              > Completed
              </button>
            </div>
          </>
      }
    </div>
  )
}
