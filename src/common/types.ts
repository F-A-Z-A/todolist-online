import { TaskPriorities, TaskStatuses } from "common/enums";

export type AddTaskArgsType = {
  title: string;
  todolistId: string;
};

export type UpdateTaskArgsType = {
  taskId: string;
  domainModel: UpdateDomainTaskModelType;
  todolistId: string;
};

export type DeleteTaskArgsType = {
  taskId: string;
  todolistId: string;
};

export type LoginParamsType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha?: string;
};

export type TodolistType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};

export type TaskType = {
  description: string;
  title: string;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};

export type UpdateTaskModelType = {
  title: string;
  description: string;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
};

export type ResponseType<D = {}> = {
  resultCode: number;
  messages: Array<string>;
  data: D;
};

export type GetTasksResponse = {
  error: string | null;
  totalCount: number;
  items: TaskType[];
};

export type UpdateDomainTaskModelType = {
  title?: string;
  description?: string;
  status?: TaskStatuses;
  priority?: TaskPriorities;
  startDate?: string;
  deadline?: string;
};
export type TasksStateType = {
  [key: string]: Array<TaskType>;
};
