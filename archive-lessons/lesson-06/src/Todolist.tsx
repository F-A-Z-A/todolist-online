import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  id: string
  title: string
  tasks: Array<TaskType>
  removeTask: (taskId: string, todolistId: string) => void
  changeFilter: (value: FilterValuesType, todolistId: string) => void
  addTask: (title: string, todolistId: string) => void
  changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
  removeTodolist: (id: string) => void
  updateTask: (todolistId: string, taskId: string, newTitle: string) => void
  updateTodolist: (todolistId: string, newTitle: string) => void
  filter: FilterValuesType
}

export function Todolist(props: PropsType) {
  const removeTodolist = () => props.removeTodolist(props.id);
  const onAllClickHandler = () => props.changeFilter("all", props.id);
  const onActiveClickHandler = () => props.changeFilter("active", props.id);
  const onCompletedClickHandler = () => props.changeFilter("completed", props.id);
  const addTaskHandler = (title: string) => {
    props.addTask(title, props.id)
  }
  const updateTodolistHandler = (newTitle: string) => {
    props.updateTodolist(props.id, newTitle)
  }
  
  const updateTaskHandler = (taskID: string, newTitle: string) => {
    props.updateTask(props.id, taskID, newTitle)
  }
  
  return <div>
    <h3><EditableSpan oldTitle={props.title} callBack={updateTodolistHandler}/>
      <button onClick={removeTodolist}>x</button>
    </h3>
    <AddItemForm onClick={addTaskHandler}/>
    <ul>
      {
        props.tasks.map(t => {
          const onClickHandler = () => props.removeTask(t.id, props.id)
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked;
            props.changeTaskStatus(t.id, newIsDoneValue, props.id);
          }
          
          return <li key={t.id} className={t.isDone ? "is-done" : ""}>
            <input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>
            <EditableSpan oldTitle={t.title} callBack={(newTitle) => updateTaskHandler(t.id, newTitle)}/>
            <button onClick={onClickHandler}>x</button>
          </li>
        })
      }
    </ul>
    <div>
      <button className={props.filter === 'all' ? "active-filter" : ""}
              onClick={onAllClickHandler}>All
      </button>
      <button className={props.filter === 'active' ? "active-filter" : ""}
              onClick={onActiveClickHandler}>Active
      </button>
      <button className={props.filter === 'completed' ? "active-filter" : ""}
              onClick={onCompletedClickHandler}>Completed
      </button>
    </div>
  </div>
}


