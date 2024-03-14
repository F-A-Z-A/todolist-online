import * as React from 'react';
import {ChangeEvent, useState} from "react";

type EditableSpanType = {
  oldTitle: string
  callBack: (newTitle: string) => void
};

export const EditableSpan = (props: EditableSpanType) => {
  const [edit, setEdit] = useState(false);
  const [newTitle, setNewTitle] = useState(props.oldTitle);
  
  const editMode = () => {
    setEdit(!edit)
    if (edit) addTask()
  }
  
  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value)
  }
  
  const addTask = () => {
    props.callBack(newTitle)
  }
  
  return (
    edit
      ? <input value={newTitle}
               onBlur={editMode}
               autoFocus
               onChange={onChangeInputHandler}
      />
      : <span onDoubleClick={editMode}>{props.oldTitle}</span>
  )
};