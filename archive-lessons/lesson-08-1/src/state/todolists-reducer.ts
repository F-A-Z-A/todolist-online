import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

type TodolistsReducerType =
  RemoveTodolistACType
  | AddTodolistACType
  | ChangeTodolistTitleACType
  | ChangeFilterACType
export const todolistsReducer = (state: TodolistType[], action: TodolistsReducerType): TodolistType[] => {
  switch (action.type) {
    case 'REMOVE_TODOLIST':
      return state.filter(tl => tl.id !== action.payload.id)
    case "ADD_TODOLIST":
      const newTodolist: TodolistType = {id: v1(), title: action.payload.title, filter: 'all'}
      return [...state, newTodolist]
    case "CHANGE_TODOLIST_TITLE":
      return state.map(tl => tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl)
    case "CHANGE_TODOLIST_FILTER":
      return state.map(tl => tl.id === action.payload.id ? {...tl, filter: action.payload.filter} : tl)
    default:
      return state
  }
}

type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (id: string) => {
  return {
    type: 'REMOVE_TODOLIST',
    payload: {id}
  } as const
}

type AddTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string) => {
  return {
    type: 'ADD_TODOLIST',
    payload: {title}
  } as const
}

type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (id: string, title: string) => {
  return {
    type: 'CHANGE_TODOLIST_TITLE',
    payload: {id, title}
  } as const
}

type ChangeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (filter: FilterValuesType, id: string) => {
  return {
    type: 'CHANGE_TODOLIST_FILTER',
    payload: {filter, id}
  } as const
}