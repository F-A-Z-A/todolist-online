import { todolistsApi } from "../api/todolistsApi"
import { Todolist } from "../api/todolistsApi.types"
import { type RequestStatus, setAppStatusAC } from "app/app-reducer"
import type { AppThunk } from "app/store"
import { ResultCode } from "common/enums"
import { handleServerAppError, handleServerNetworkError } from "common/utils"

export type FilterValuesType = "all" | "active" | "completed"

export type DomainTodolist = Todolist & {
  filter: FilterValuesType
  entityStatus: RequestStatus
}

const initialState: DomainTodolist[] = []

export const todolistsReducer = (state: DomainTodolist[] = initialState, action: ActionsType): DomainTodolist[] => {
  switch (action.type) {
    case "SET-TODOLISTS": {
      const { todolists } = action.payload
      return todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }))
    }

    case "REMOVE-TODOLIST": {
      const { id } = action.payload
      return state.filter((tl) => tl.id !== id)
    }

    case "ADD-TODOLIST": {
      const { todolist } = action.payload
      const newTodolist: DomainTodolist = { ...todolist, filter: "all", entityStatus: "idle" }
      return [newTodolist, ...state]
    }

    case "CHANGE-TODOLIST-TITLE": {
      const { id, title } = action.payload
      return state.map((tl) => (tl.id === id ? { ...tl, title } : tl))
    }

    case "CHANGE-TODOLIST-FILTER": {
      const { id, filter } = action.payload
      return state.map((tl) => (tl.id === id ? { ...tl, filter } : tl))
    }

    case "CHANGE-TODOLIST-STATUS": {
      const { id, entityStatus } = action.payload
      return state.map((tl) => (tl.id === id ? { ...tl, entityStatus } : tl))
    }

    default:
      return state
  }
}

// Action creators
export const removeTodolistAC = (payload: { id: string }) => {
  return { type: "REMOVE-TODOLIST", payload } as const
}

export const addTodolistAC = (todolist: Todolist) => {
  return { type: "ADD-TODOLIST", payload: { todolist } } as const
}

export const changeTodolistTitleAC = (payload: { id: string; title: string }) => {
  return { type: "CHANGE-TODOLIST-TITLE", payload } as const
}

export const changeTodolistFilterAC = (payload: { id: string; filter: FilterValuesType }) => {
  return { type: "CHANGE-TODOLIST-FILTER", payload } as const
}

export const setTodolistsAC = (payload: { todolists: Todolist[] }) => {
  return { type: "SET-TODOLISTS", payload } as const
}

export const changeTodolistStatusAC = (payload: { id: string; entityStatus: RequestStatus }) => {
  return { type: "CHANGE-TODOLIST-STATUS", payload } as const
}

// Actions types
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
export type ChangeTodolistStatusType = ReturnType<typeof changeTodolistStatusAC>

// Thunks

export const fetchTodolistsTC = (): AppThunk => (dispatch) => {
  dispatch(setAppStatusAC("loading"))
  todolistsApi.getTodolists().then((res) => {
    dispatch(setTodolistsAC({ todolists: res.data }))
    dispatch(setAppStatusAC("succeeded"))
  })
}

export const addTodolistTC =
  (title: string): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    todolistsApi
      .createTodolist(title)
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(addTodolistAC(res.data.data.item))
          dispatch(setAppStatusAC("succeeded"))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((err) => {
        handleServerNetworkError(err, dispatch)
      })
  }

export const removeTodolistTC =
  (id: string): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    dispatch(changeTodolistStatusAC({ id, entityStatus: "loading" }))
    todolistsApi.deleteTodolist(id).then((res) => {
      dispatch(removeTodolistAC({ id }))
      dispatch(setAppStatusAC("succeeded"))
      dispatch(changeTodolistStatusAC({ id, entityStatus: "failed" }))
    })
  }

export const updateTodolistTitleTC =
  (arg: { id: string; title: string }): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    todolistsApi.updateTodolist(arg).then((res) => {
      dispatch(changeTodolistTitleAC(arg))
      dispatch(setAppStatusAC("succeeded"))
    })
  }

type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType
  | SetTodolistsActionType
  | ChangeTodolistStatusType
