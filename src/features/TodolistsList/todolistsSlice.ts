import { todolistsAPI, TodolistType } from "api/todolists-api"
import { appActions, RequestStatusType } from "app/appSlice"
import { handleServerNetworkError } from "utils/error-utils"
import { AppThunk } from "app/store"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { fetchTasksTC } from "features/TodolistsList/tasksSlice"

const slice = createSlice({
  name: "todolists",
  initialState: [] as TodolistDomainType[],
  reducers: {
    removeTodolist: (state, action: PayloadAction<{ id: string }>) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id)
      if (index !== -1) {
        state.splice(index, 1)
      }
    },
    addTodolist: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
      state.unshift({ ...action.payload.todolist, filter: "all", entityStatus: "idle" })
    },
    changeTodolistTitle: (state, action: PayloadAction<{ id: string; title: string }>) => {
      // const index = state.findIndex((todos) => todos.id === action.payload.id)
      // if (index !== -1) {
      //   state[index].title = action.payload.title
      // }
      //
      // ---------- или так ----------
      //
      const todo = state.find((todo) => todo.id === action.payload.id)
      if (todo) {
        todo.title = action.payload.title
      }
    },
    changeTodolistFilter: (state, action: PayloadAction<{ id: string; filter: FilterValuesType }>) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id)
      if (index !== -1) {
        state[index].filter = action.payload.filter
      }
    },
    changeTodolistEntityStatus: (state, action: PayloadAction<{ id: string; status: RequestStatusType }>) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id)
      if (index !== -1) {
        state[index].entityStatus = action.payload.status
      }
    },
    setTodolists: (state, action: PayloadAction<{ todolists: TodolistType[] }>) => {
      // return action.payload.todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }))
      action.payload.todolists.forEach((tl) => {
        state.push({ ...tl, filter: "all", entityStatus: "idle" })
      })
    },
    clearTodolistsData: (state, action: PayloadAction<{}>) => {
      return []
    },
  },
  selectors: {
    selectTodolists: (state) => state,
  },
})

// thunks
export const fetchTodolistsTC = (): AppThunk => {
  return (dispatch) => {
    dispatch(appActions.setAppStatus({ status: "loading" }))
    todolistsAPI
      .getTodolists()
      .then((res) => {
        dispatch(todolistsActions.setTodolists({ todolists: res.data }))
        dispatch(appActions.setAppStatus({ status: "succeeded" }))
        return res.data
      })
      .then((todos) => {
        todos.forEach((tl) => {
          dispatch(fetchTasksTC(tl.id))
        })
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch)
      })
  }
}
export const removeTodolistTC = (id: string): AppThunk => {
  return (dispatch) => {
    dispatch(appActions.setAppStatus({ status: "loading" }))
    dispatch(todolistsActions.changeTodolistEntityStatus({ id, status: "loading" }))
    todolistsAPI.deleteTodolist(id).then((res) => {
      dispatch(todolistsActions.removeTodolist({ id }))
      dispatch(appActions.setAppStatus({ status: "succeeded" }))
    })
  }
}
export const addTodolistTC = (title: string): AppThunk => {
  return (dispatch) => {
    dispatch(appActions.setAppStatus({ status: "loading" }))
    todolistsAPI.createTodolist(title).then((res) => {
      dispatch(todolistsActions.addTodolist({ todolist: res.data.data.item }))
      dispatch(appActions.setAppStatus({ status: "succeeded" }))
    })
  }
}
export const changeTodolistTitleTC = (id: string, title: string): AppThunk => {
  return (dispatch) => {
    todolistsAPI.updateTodolist(id, title).then((res) => {
      dispatch(todolistsActions.changeTodolistTitle({ id, title }))
    })
  }
}

// types
export type FilterValuesType = "all" | "active" | "completed"
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
  entityStatus: RequestStatusType
}
export const todolistsReducer = slice.reducer
export const todolistsActions = slice.actions
export const todolistsName = slice.name
export const { selectTodolists } = slice.selectors
