import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import React, {ChangeEvent, memo} from "react";
import {TaskType} from "./Todolist";

type TaskPropsType = {
  task: TaskType
  todolistID: string
  removeTask: (taskId: string, todolistId: string) => void
  changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
  changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
}

export const Task = memo((props: TaskPropsType) => {
  const onClickHandler = () => props.removeTask(props.task.id, props.todolistID)
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let newIsDoneValue = e.currentTarget.checked;
    props.changeTaskStatus(props.task.id, newIsDoneValue, props.todolistID);
  }
  const onTitleChangeHandler = (newValue: string) => {
    props.changeTaskTitle(props.task.id, newValue, props.todolistID);
  }
  
  return <div className={props.task.isDone ? "is-done" : ""}>
    <Checkbox
      checked={props.task.isDone}
      color="primary"
      onChange={onChangeHandler}
    />
    
    <EditableSpan value={props.task.title} onChange={onTitleChangeHandler}/>
    <IconButton onClick={onClickHandler}>
      <Delete/>
    </IconButton>
  </div>
})