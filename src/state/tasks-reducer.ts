import {TasksStateType} from '../App';
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusACActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleACActionType = ReturnType<typeof changeTaskTitleAC>

type ActionsType =
  RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusACActionType
  | ChangeTaskTitleACActionType
  | AddTodolistActionType
  | RemoveTodolistActionType

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
  switch (action.type) {
    case 'REMOVE_TASK':
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
      }
    case "ADD_TASK":
      return {
        ...state,
        [action.todolistId]: [
          {id: v1(), title: action.title, isDone: false},
          ...state[action.todolistId]
        ]
      }
    case "CHANGE_TASK_STATUS":
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
          ...t,
          isDone: action.isDone
        } : t)
      }
    case "CHANGE_TASK_TITLE":
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map(
          t => t.id === action.taskId ? {...t, title: action.title} : t
        )
      }
    case "ADD-TODOLIST":
      return {
        ...state,
        [action.todolistId]: []
      }
    case "REMOVE-TODOLIST":
      // const copyState = {...state};
      // delete copyState[action.todolistId];
      // return copyState;
      // или так:
      const {[action.todolistId]: [], ...rest} = state
      return rest
    default:
      // throw new Error("I don't understand this type")
      return state
  }
};

export const removeTaskAC = (todolistId: string, taskId: string) => {
  return {
    type: 'REMOVE_TASK',
    todolistId,
    taskId
  } as const
};
export const addTaskAC = (todolistId: string, title: string) => {
  return {
    type: 'ADD_TASK',
    todolistId,
    title
  } as const
};
export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean) => {
  return {
    type: 'CHANGE_TASK_STATUS',
    todolistId,
    taskId,
    isDone
  } as const
};
export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
  return {
    type: 'CHANGE_TASK_TITLE',
    todolistId,
    taskId,
    title
  } as const
};