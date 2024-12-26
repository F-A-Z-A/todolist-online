import { ResultCode } from "common/enums"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"
import { setAppStatusAC } from "app/app-reducer"
import { tasksApi } from "../api/tasksApi"
import { DomainTask, UpdateTaskModel } from "../api/tasksApi.types"
import { AddTodolistActionType, type ClearDataACActionType, RemoveTodolistActionType } from "./todolists-reducer"
import type { AppDispatch } from "app/store"

export type TasksStateType = {
  [key: string]: DomainTask[]
}

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
  switch (action.type) {
    case "SET-TASKS": {
      const { todolistId, tasks } = action.payload
      return { ...state, [todolistId]: tasks }
    }

    case "REMOVE-TASK": {
      const { todolistId, taskId } = action.payload
      return {
        ...state,
        [todolistId]: state[todolistId].filter((t) => t.id !== taskId),
      }
    }

    case "ADD-TASK": {
      const { task } = action.payload
      return { ...state, [task.todoListId]: [task, ...state[task.todoListId]] }
    }

    case "UPDATE-TASK": {
      const { task } = action.payload
      return {
        ...state,
        [task.todoListId]: state[task.todoListId].map((t) => (t.id === task.id ? task : t)),
      }
    }

    case "ADD-TODOLIST": {
      const { todolist } = action.payload
      return { ...state, [todolist.id]: [] }
    }

    case "REMOVE-TODOLIST": {
      const { id } = action.payload
      let copyState = { ...state }
      delete copyState[id]
      return copyState
    }

    case "CLEAR-DATA":
      return {}

    default:
      return state
  }
}

// Action creators
export const setTasksAC = (payload: { todolistId: string; tasks: DomainTask[] }) => {
  return { type: "SET-TASKS", payload } as const
}

export const removeTaskAC = (payload: { taskId: string; todolistId: string }) => {
  return { type: "REMOVE-TASK", payload } as const
}

export const addTaskAC = (payload: { task: DomainTask }) => {
  return { type: "ADD-TASK", payload } as const
}

export const updateTaskAC = (payload: { task: DomainTask }) => {
  return { type: "UPDATE-TASK", payload } as const
}

// Actions types
export type SetTasksActionType = ReturnType<typeof setTasksAC>
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type UpdateTaskActionType = ReturnType<typeof updateTaskAC>

// Thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC("loading"))
  tasksApi
    .getTasks(todolistId)
    .then((res) => {
      dispatch(setTasksAC({ todolistId, tasks: res.data.items }))
      dispatch(setAppStatusAC("succeeded"))
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}

export const removeTaskTC = (arg: { taskId: string; todolistId: string }) => (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC("loading"))
  tasksApi
    .deleteTask(arg)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(removeTaskAC(arg))
        dispatch(setAppStatusAC("succeeded"))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}

export const addTaskTC = (arg: { title: string; todolistId: string }) => (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC("loading"))
  tasksApi
    .createTask(arg)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(addTaskAC({ task: res.data.data.item }))
        dispatch(setAppStatusAC("succeeded"))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}

export const updateTaskTC = (task: DomainTask) => (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC("loading"))

  const model: UpdateTaskModel = {
    status: task.status,
    title: task.title,
    deadline: task.deadline,
    description: task.description,
    priority: task.priority,
    startDate: task.startDate,
  }

  tasksApi
    .updateTask({ taskId: task.id, todolistId: task.todoListId, model })
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(updateTaskAC({ task }))
        dispatch(setAppStatusAC("succeeded"))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}

type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | UpdateTaskActionType
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTasksActionType
  | ClearDataACActionType
