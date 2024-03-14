import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";
import styled from "styled-components";

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
  changeTodolistTitle: (id: string, newTitle: string) => void
  filter: FilterValuesType
  changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export function Todolist(props: PropsType) {
  const addTask = (title: string) => {
    props.addTask(title, props.id);
  }
  
  const removeTodolist = () => {
    props.removeTodolist(props.id);
  }
  const changeTodolistTitle = (title: string) => {
    props.changeTodolistTitle(props.id, title);
  }
  
  const onAllClickHandler = () => props.changeFilter("all", props.id);
  const onActiveClickHandler = () => props.changeFilter("active", props.id);
  const onCompletedClickHandler = () => props.changeFilter("completed", props.id);
  
  return <div>
    <h3><EditableSpan value={props.title} onChange={changeTodolistTitle}/>
      
      <IconButton onClick={removeTodolist} aria-label="delete">
        <DeleteIcon/>
      </IconButton>
    </h3>
    <AddItemForm addItem={addTask}/>
    <ul>
      {
        props.tasks.map(t => {
          const onClickHandler = () => props.removeTask(t.id, props.id)
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked;
            props.changeTaskStatus(t.id, newIsDoneValue, props.id);
          }
          const onTitleChangeHandler = (newValue: string) => {
            props.changeTaskTitle(t.id, newValue, props.id);
          }
          
          
          return <li key={t.id}>
            <input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>
            <EditableSpan value={t.title} onChange={onTitleChangeHandler} isDone={t.isDone}/>
            <IconButton onClick={onClickHandler} aria-label="delete" size={"small"}>
              <DeleteIcon/>
            </IconButton>
          
          </li>
        })
      }
    </ul>
    <div>
      <Button
        variant={props.filter === 'all' ? "contained" : "outlined"}
        color={"error"}
        onClick={onAllClickHandler}
        // filter={'active'}
      >
        All
      </Button>
      <Button
        variant={props.filter === 'active' ? "contained" : "outlined"}
        color={"primary"}
        onClick={onActiveClickHandler}
        // filter={'active'}
      >
        Active
      </Button>
      <Button
        variant={props.filter === 'completed' ? "contained" : "outlined"}
        color={"secondary"}
        onClick={onCompletedClickHandler}
        // filter={'completed'}
      >
        Completed
      </Button>
    </div>
  </div>
}


// <div>
//   <StyledButton
//     filter={'all'}
//     // className={props.filter === 'all' ? "active-filter" : ""}
//     onClick={onAllClickHandler}>All
//   </StyledButton>
//   <StyledButton
//     filter={'active'}
//     // className={props.filter === 'active' ? "active-filter" : ""}
//     onClick={onActiveClickHandler}>Active
//   </StyledButton>
//   <StyledButton
//     filter={'completed'}
//     // className={props.filter === 'completed' ? "active-filter" : ""}
//
//     onClick={onCompletedClickHandler}>Completed
//   </StyledButton>
// </div>
//
// type StyledButtonPropsType = {
//   filter: FilterValuesType
// }
//
// const StyledButton = styled(Button)<StyledButtonPropsType>`
//   && {
//     background-color: ${props =>
//       props.filter === 'active' ? "#ff89d6"
//         : props.filter === 'completed' ? "#21baf1"
//           : "#21f1d6"
//     };
//     color: #fff;
//     font-weight: bold;
//   }
// `




