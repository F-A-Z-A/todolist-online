import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton/IconButton';
import {Delete} from "@mui/icons-material";
import {Button, Checkbox} from "@mui/material";
import {CheckBox} from "./components/CheckBox";


export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  todoID: string
  title: string
  tasks: Array<TaskType>
  removeTask: (taskId: string, todolistId: string) => void
  changeFilter: (value: FilterValuesType, todolistId: string) => void
  addTask: (title: string, todolistId: string) => void
  changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
  removeTodolist: (id: string) => void
  changeTodolistTitle: (id: string, newTitle: string) => void
  filter: FilterValuesType
  changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export function Todolist(props: PropsType) {
  const addTask = (title: string) => {
    props.addTask(title, props.todoID);
  }
  
  const removeTodolist = () => {
    props.removeTodolist(props.todoID);
  }
  const changeTodolistTitle = (title: string) => {
    props.changeTodolistTitle(props.todoID, title);
  }
  
  const onAllClickHandler = () => props.changeFilter("all", props.todoID);
  const onActiveClickHandler = () => props.changeFilter("active", props.todoID);
  const onCompletedClickHandler = () => props.changeFilter("completed", props.todoID);
  
  
  return <div>
    <h3><EditableSpan value={props.title} onChange={changeTodolistTitle}/>
      <IconButton onClick={removeTodolist}>
        <Delete/>
      </IconButton>
    </h3>
    <AddItemForm addItem={addTask}/>
    <div>
      {
        props.tasks.map(task => {
          const onClickHandler = () => props.removeTask(task.id, props.todoID)
          const onTitleChangeHandler = (newValue: string) => {
            props.changeTaskTitle(task.id, newValue, props.todoID);
          }
          
          return <div key={task.id} className={task.isDone ? "is-done" : ""}>
            <CheckBox
              taskID={task.id}
              isDone={task.isDone}
              todolistId={props.todoID}
              changeTaskStatus={props.changeTaskStatus}
              color="primary"
            />
            
            <EditableSpan value={task.title} onChange={onTitleChangeHandler}/>
            <IconButton onClick={onClickHandler}>
              <Delete/>
            </IconButton>
          </div>
        })
      }
    </div>
    <div>
      <Button variant={props.filter === 'all' ? 'outlined' : 'text'}
              onClick={onAllClickHandler}
              color={'inherit'}
      >All
      </Button>
      <Button variant={props.filter === 'active' ? 'outlined' : 'text'}
              onClick={onActiveClickHandler}
              color={'primary'}>Active
      </Button>
      <Button variant={props.filter === 'completed' ? 'outlined' : 'text'}
              onClick={onCompletedClickHandler}
              color={'secondary'}>Completed
      </Button>
    </div>
  </div>
}


