import {ResultCode, todolistsAPI, TodolistType} from '../../api/todolists-api'
import {Dispatch} from 'redux'
import {AppActionsType} from "../../app/store";
import {RequestStatusType, setErrorAC, setStatusLoadingAC} from "../../app/app-reducer";

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (
  state: Array<TodolistDomainType> = initialState, action: AppActionsType
): Array<TodolistDomainType> => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return state.filter(tl => tl.id !== action.id)
    case 'ADD-TODOLIST':
      return [{...action.todolist, filter: 'all', entityStatus: "idle"}, ...state]
    case 'CHANGE-TODOLIST-TITLE':
      return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
    case 'CHANGE-TODOLIST-FILTER':
      return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
    case 'SET-TODOLISTS':
      return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: "idle"}))
    case "CHANGE-ENTITY-STATUS":
      return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.entityStatus} : tl)
    default:
      return state
  }
}

// actions
export const removeTodolistAC = (id: string) =>
  ({type: 'REMOVE-TODOLIST', id} as const)
export const addTodolistAC = (todolist: TodolistType) =>
  ({type: 'ADD-TODOLIST', todolist} as const)
export const changeTodolistTitleAC = (id: string, title: string) =>
  ({type: 'CHANGE-TODOLIST-TITLE', id, title} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) =>
  ({type: 'CHANGE-TODOLIST-FILTER', id, filter} as const)
export const setTodolistsAC = (todolists: Array<TodolistType>) =>
  ({type: 'SET-TODOLISTS', todolists} as const)
export const setEntityStatusAC = (id: string, entityStatus: RequestStatusType) =>
  ({type: 'CHANGE-ENTITY-STATUS', id, entityStatus} as const)

// thunks
export const fetchTodolistsTC = () => {
  return (dispatch: Dispatch<AppActionsType>) => {
    // dispatch(setStatusLoadingAC("loading"))
    // здесь dispatch можно не использовать, т.к. initialState в appReducer status: 'loading'
    todolistsAPI.getTodolists()
      .then((res) => {
        dispatch(setTodolistsAC(res.data))
        dispatch(setStatusLoadingAC("succeeded"))
      })
  }
}
export const removeTodolistTC = (todolistId: string) => {
  return (dispatch: Dispatch<AppActionsType>) => {
    dispatch(setStatusLoadingAC("loading"))
    dispatch(setEntityStatusAC(todolistId, "loading"))
    todolistsAPI.deleteTodolist(todolistId)
      .then((res) => {
        dispatch(removeTodolistAC(todolistId))
        dispatch(setStatusLoadingAC("succeeded"))
      })
      .catch((res) => {
        dispatch(setErrorAC(res.message))
        dispatch(setStatusLoadingAC("failed"))
        dispatch(setEntityStatusAC(todolistId, "idle"))
      })
  }
}
export const addTodolistTC = (title: string) => {
  return (dispatch: Dispatch<AppActionsType>) => {
    dispatch(setStatusLoadingAC("loading"))
    todolistsAPI.createTodolist(title)
      .then((res) => {
        if (res.data.resultCode === ResultCode.SUCCESS) {
          dispatch(addTodolistAC(res.data.data.item))
        } else {
          if (res.data.messages.length) {
            dispatch(setErrorAC(res.data.messages[0]))
          } else {
            dispatch(setErrorAC("some error occurred."))
          }
        }
        dispatch(setStatusLoadingAC("succeeded"))
      })
  }
}
export const changeTodolistTitleTC = (id: string, title: string) => {
  return (dispatch: Dispatch<AppActionsType>) => {
    dispatch(setStatusLoadingAC("loading"))
    todolistsAPI.updateTodolist(id, title)
      .then((res) => {
        dispatch(changeTodolistTitleAC(id, title))
        dispatch(setStatusLoadingAC("succeeded"))
      })
  }
}

// types
export type TodolistsActionsType =
  | ReturnType<typeof addTodolistAC>
  | ReturnType<typeof removeTodolistAC>
  | ReturnType<typeof changeTodolistTitleAC>
  | ReturnType<typeof changeTodolistFilterAC>
  | ReturnType<typeof setTodolistsAC>
  | ReturnType<typeof setEntityStatusAC>
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
  entityStatus: RequestStatusType
}