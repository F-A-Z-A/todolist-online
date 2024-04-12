import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import React, {ChangeEvent, memo, useCallback} from "react";
import {TaskType} from "./Todolist";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";

type TaskWithReduxPropsType = {
  taskID: string
  todolistID: string
}

export const TaskWithRedux = memo((props: TaskWithReduxPropsType) => {
  
  // const task = useSelector<AppRootStateType, TaskType>(
  //   state => state.tasks[props.todolistID].find(t => t.id === props.taskID) as TaskType
  // )
  const task = useSelector<AppRootStateType, TaskType>(
    state => state.tasks[props.todolistID].filter(t => t.id === props.taskID)[0]
  )
  const dispatch = useDispatch();
  
  const onClickHandler = () => {
    dispatch(removeTaskAC(props.taskID, props.todolistID))
  }
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let newIsDoneValue = e.currentTarget.checked;
    dispatch(changeTaskStatusAC(props.taskID, newIsDoneValue, props.todolistID));
  }
  const onTitleChangeHandler = useCallback((newValue: string) => {
    dispatch(changeTaskTitleAC(props.taskID, newValue, props.todolistID));
  }, [dispatch, props.taskID, props.todolistID])
  
  return <div className={task.isDone ? "is-done" : ""}>
    <Checkbox checked={task.isDone}
              color="primary"
              onChange={onChangeHandler}/>
    <EditableSpan value={task.title}
                  onChange={onTitleChangeHandler}/>
    <IconButton onClick={onClickHandler}>
      <Delete/>
    </IconButton>
  </div>
})