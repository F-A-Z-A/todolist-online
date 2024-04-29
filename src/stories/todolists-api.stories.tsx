import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolist-api";

export default {title: 'API'}

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    todolistAPI
      .getTodolist()
      .then(res => setState(res))
    
  }, [])
  return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null)
  const title = 'IT-INCUBATORRRRR'
  useEffect(() => {
    todolistAPI
      .createTodolist(title)
      .then(res => setState(res))
  }, [])
  return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null)
  const todolistId = '4df4cdca-b998-4969-8532-313ed7667ac6'
  useEffect(() => {
    todolistAPI
      .deleteTodolist(todolistId)
      .then(res => setState(res))
  }, [])
  return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null)
  const todolistId = '3baae2aa-4e68-4680-bacc-0cd4ecea8d8d'
  const title = 'ITTTT-INCUBATOR'
  useEffect(() => {
    todolistAPI
      .updateTodolist(todolistId, title)
      .then(res => setState(res))
  }, [])
  return <div>{JSON.stringify(state)}</div>
}

