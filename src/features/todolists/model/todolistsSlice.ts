import { ResultCode } from "common/enums"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"
import { Dispatch } from "redux"
import { todolistsApi } from "../api/todolistsApi"
import { Todolist } from "../api/todolistsApi.types"
import { type RequestStatus, setAppStatus } from "app/appSlice"
import { createSlice } from "@reduxjs/toolkit"

export const todolistsSlice = createSlice({
  name: "todolists",

  initialState: {
    todolists: [] as DomainTodolist[],
  },

  reducers: (create) => ({
    removeTodolist: create.reducer<{ id: string }>((state, action) => {
      const index = state.todolists.findIndex((el) => el.id === action.payload.id)
      if (index !== -1) state.todolists.splice(index, 1)
    }),

    addTodolist: create.reducer<{ todolist: Todolist }>((state, action) => {
      state.todolists.unshift({ ...action.payload.todolist, filter: "all", entityStatus: "idle" })
    }),

    changeTodolistTitle: create.reducer<{ id: string; title: string }>((state, action) => {
      const index = state.todolists.findIndex((el) => el.id === action.payload.id)
      if (index !== -1) state.todolists[index].title = action.payload.title
    }),

    changeTodolistFilter: create.reducer<{ id: string; filter: FilterValuesType }>((state, action) => {
      const todolist = state.todolists.find((el) => el.id === action.payload.id)
      if (todolist) todolist.filter = action.payload.filter
    }),

    changeTodolistEntityStatus: create.reducer<{ id: string; entityStatus: RequestStatus }>((state, action) => {
      const index = state.todolists.findIndex((el) => el.id === action.payload.id)
      if (index !== -1) state.todolists[index].entityStatus = action.payload.entityStatus
    }),

    setTodolists: create.reducer<{ todolists: Todolist[] }>((state, action) => {
      action.payload.todolists.forEach((tl) => {
        state.todolists.push({ ...tl, filter: "all", entityStatus: "idle" })
      })
    }),

    clearTodolists: create.reducer((state) => {
      state.todolists = []
    }),
  }),
})

export const todolistsReducer = todolistsSlice.reducer
export const {
  removeTodolist,
  addTodolist,
  changeTodolistTitle,
  changeTodolistFilter,
  changeTodolistEntityStatus,
  setTodolists,
  clearTodolists,
} = todolistsSlice.actions

// Thunks
export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  todolistsApi
    .getTodolists()
    .then((res) => {
      dispatch(setAppStatus({ status: "succeeded" }))
      dispatch(setTodolists({ todolists: res.data }))
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}

export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  todolistsApi
    .createTodolist(title)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatus({ status: "succeeded" }))
        dispatch(addTodolist({ todolist: res.data.data.item }))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}

export const removeTodolistTC = (id: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  dispatch(changeTodolistEntityStatus({ id, entityStatus: "loading" }))
  todolistsApi
    .deleteTodolist(id)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatus({ status: "succeeded" }))
        dispatch(removeTodolist({ id }))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((error) => {
      dispatch(changeTodolistEntityStatus({ id, entityStatus: "failed" }))
      handleServerNetworkError(error, dispatch)
    })
}

export const updateTodolistTitleTC = (arg: { id: string; title: string }) => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  todolistsApi
    .updateTodolist(arg)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatus({ status: "succeeded" }))
        dispatch(changeTodolistTitle(arg))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}

// types
export type FilterValuesType = "all" | "active" | "completed"
export type DomainTodolist = Todolist & {
  filter: FilterValuesType
  entityStatus: RequestStatus
}
