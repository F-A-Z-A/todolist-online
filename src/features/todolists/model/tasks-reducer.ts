import { type AppThunk } from "app/store"
import { tasksApi } from "../api/tasksApi"
import { DomainTask, UpdateTaskDomainModel, UpdateTaskModel } from "../api/tasksApi.types"
import { AddTodolistActionType, RemoveTodolistActionType } from "./todolists-reducer"
import { setAppErrorAC, setAppStatusAC } from "app/app-reducer"
import { ResultCode } from "common/enums"
import { handleServerNetworkError } from "common/utils"

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
  switch (action.type) {
    case "SET-TASKS": {
      const { todolistId, tasks } = action.payload
      const stateCopy = { ...state }
      stateCopy[todolistId] = tasks
      return stateCopy
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
      const { todolistId, taskId, domainModel } = action.payload
      return {
        ...state,
        [todolistId]: state[todolistId].map((t) => (t.id === taskId ? { ...t, ...domainModel } : t)),
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

export const updateTaskAC = (payload: { taskId: string; todolistId: string; domainModel: UpdateTaskDomainModel }) => {
  return { type: "UPDATE-TASK", payload } as const
}

// Thunks
export const fetchTasksTC =
  (todolistId: string): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    tasksApi.getTasks(todolistId).then((res) => {
      const tasks = res.data.items
      dispatch(setTasksAC({ todolistId, tasks }))
      dispatch(setAppStatusAC("succeeded"))
    })
  }

export const removeTaskTC =
  (arg: { taskId: string; todolistId: string }): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    tasksApi.deleteTask(arg).then((res) => {
      dispatch(removeTaskAC(arg))
      dispatch(setAppStatusAC("succeeded"))
    })
  }

export const addTaskTC =
  (arg: { title: string; todolistId: string }): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    tasksApi
      .createTask(arg)
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(addTaskAC({ task: res.data.data.item }))
          dispatch(setAppStatusAC("succeeded"))
        } else {
          dispatch(setAppErrorAC(res.data.messages.length ? res.data.messages[0] : "Some error occurred"))
          dispatch(setAppStatusAC("failed"))
        }
      })
      .catch((err) => {
        handleServerNetworkError(err, dispatch)
      })
  }

export const updateTaskTC =
  (arg: { taskId: string; todolistId: string; domainModel: UpdateTaskDomainModel }): AppThunk =>
  (dispatch, getState) => {
    dispatch(setAppStatusAC("loading"))
    const { taskId, todolistId, domainModel } = arg

    const allTasksFromState = getState().tasks
    const tasksForCurrentTodolist = allTasksFromState[todolistId]
    const task = tasksForCurrentTodolist.find((t) => t.id === taskId)

    if (task) {
      const model: UpdateTaskModel = {
        status: task.status,
        title: task.title,
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        ...domainModel,
      }

      tasksApi.updateTask({ taskId, todolistId, model }).then((res) => {
        dispatch(updateTaskAC(arg))
        dispatch(setAppStatusAC("succeeded"))
      })
    }
  }

// Actions types
export type SetTasksActionType = ReturnType<typeof setTasksAC>
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type UpdateTaskActionType = ReturnType<typeof updateTaskAC>

// types
type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | UpdateTaskActionType
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTasksActionType

export type TasksStateType = {
  [key: string]: DomainTask[]
}
