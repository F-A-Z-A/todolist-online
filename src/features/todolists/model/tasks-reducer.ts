import { AddTodolistActionType, RemoveTodolistActionType } from "./todolists-reducer";
import type { AppDispatch } from "app/store";
import { tasksApi } from "features/todolists/api/tasksApi";
import type { DomainTask, UpdateTaskModel } from "features/todolists/api/tasksApi.types";

const initialState: TasksStateType = {};

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
  switch (action.type) {
    case "SET-TASKS": {
      const { todolistId, tasks } = action.payload;
      return { ...state, [todolistId]: tasks };
    }

    case "REMOVE-TASK": {
      const { todolistId, taskId } = action.payload;
      return { ...state, [todolistId]: state[todolistId].filter((t) => t.id !== taskId) };
    }

    case "ADD-TASK": {
      const { newTask } = action.payload;
      return { ...state, [newTask.todoListId]: [newTask, ...state[newTask.todoListId]] };
    }

    case "UPDATE_TASK": {
      const { newTask } = action.payload;
      return {
        ...state,
        [newTask.todoListId]: state[newTask.todoListId].map((t) => (t.id === newTask.id ? newTask : t)),
      };
    }

    case "ADD-TODOLIST": {
      const { todolist } = action.payload;
      return { ...state, [todolist.id]: [] };
    }

    case "REMOVE-TODOLIST": {
      const { id } = action.payload;
      let copyState = { ...state };
      delete copyState[id];
      return copyState;
    }

    default:
      return state;
  }
};

// Action creators
export const setTasksAC = (payload: { todolistId: string; tasks: DomainTask[] }) => {
  return { type: "SET-TASKS", payload } as const;
};

export const removeTaskAC = (payload: { todolistId: string; taskId: string }) => {
  return { type: "REMOVE-TASK", payload } as const;
};

export const addTaskAC = (payload: { newTask: DomainTask }) => {
  return { type: "ADD-TASK", payload } as const;
};

export const updateTaskAC = (payload: { newTask: DomainTask }) => {
  return { type: "UPDATE_TASK", payload } as const;
};

// thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: AppDispatch) => {
  tasksApi.getTasks(todolistId).then((res) => {
    dispatch(setTasksAC({ todolistId, tasks: res.data.items }));
  });
};

export const removeTaskTC = (args: { todolistId: string; taskId: string }) => (dispatch: AppDispatch) => {
  tasksApi.deleteTask(args).then(() => {
    dispatch(removeTaskAC(args));
  });
};

export const addTaskTC = (args: { todolistId: string; title: string }) => (dispatch: AppDispatch) => {
  tasksApi.createTask(args).then((res) => {
    dispatch(addTaskAC({ newTask: res.data.data.item }));
  });
};

export const updateTaskTC = (args: { task: DomainTask }) => (dispatch: AppDispatch) => {
  const { task } = args;
  const model: UpdateTaskModel = {
    title: task.title,
    description: task.description,
    startDate: task.startDate,
    status: task.status,
    priority: task.priority,
    deadline: task.deadline,
  };
  tasksApi.updateTask({ todolistId: task.todoListId, taskId: task.id, model }).then((res) => {
    dispatch(updateTaskAC({ newTask: res.data.data.item }));
  });
};

// Actions types
export type SetTasksActionType = ReturnType<typeof setTasksAC>;
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;
export type AddTaskActionType = ReturnType<typeof addTaskAC>;
export type UpdateTaskActionType = ReturnType<typeof updateTaskAC>;

type ActionsType =
  | SetTasksActionType
  | RemoveTaskActionType
  | AddTaskActionType
  | UpdateTaskActionType
  | AddTodolistActionType
  | RemoveTodolistActionType;

// types
export type TasksStateType = {
  [key: string]: DomainTask[];
};
