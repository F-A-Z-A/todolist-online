import { TasksStateType } from "../App";
import { v1 } from "uuid";
import { AddTodolistActionType, RemoveTodolistActionType } from "./todolists-reducer";

export const tasksReducer = (state: TasksStateType = {}, action: ActionsType) => {
  switch (action.type) {
    case "REMOVE_TASK": {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].filter((t) => t.id !== action.payload.taskId),
      };
    }
    case "ADD_TASK": {
      const newTask = { id: v1(), title: action.payload.title, isDone: false };
      return {
        ...state,
        [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]],
      };
    }
    case "CHANGE_TASK_STATUS": {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map((t) =>
          t.id === action.payload.taskId ? { ...t, isDone: action.payload.isDone } : t,
        ),
      };
    }
    case "CHANGE_TASK_TITLE": {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map((t) =>
          t.id === action.payload.taskId ? { ...t, title: action.payload.title } : t,
        ),
      };
    }
    case "REMOVE_TODOLIST": {
      const newState = { ...state };
      delete newState[action.payload.todolistId];
      return newState;
    }
    case "ADD_TODOLIST": {
      return { ...state, [action.payload.todolistId]: [] };
    }
    default:
      return state;
  }
};

// Action creators
export const removeTaskAC = (payload: { todolistId: string; taskId: string }) => {
  return { type: "REMOVE_TASK", payload } as const;
};
export const addTaskAC = (payload: { todolistId: string; title: string }) => {
  return { type: "ADD_TASK", payload } as const;
};
export const changeTaskStatusAC = (payload: { todolistId: string; taskId: string; isDone: boolean }) => {
  return { type: "CHANGE_TASK_STATUS", payload } as const;
};
export const changeTaskTitleAC = (payload: { todolistId: string; taskId: string; title: string }) => {
  return { type: "CHANGE_TASK_TITLE", payload } as const;
};

// Actions types
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;
export type AddTaskActionType = ReturnType<typeof addTaskAC>;
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>;
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>;

type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | RemoveTodolistActionType
  | AddTodolistActionType;
