import { TaskPriority, TaskStatus } from "features/todolists/lib/enums/enums";
import type { FieldError } from "common/types";

export type GetTasksResponse = {
  error: string | null;
  totalCount: number;
  items: DomainTask[];
};

export type DomainTask = {
  description: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};

export type CreateTaskResponse = {
  resultCode: number;
  messages: string[];
  fieldsErrors: FieldError[];
  data: {
    item: DomainTask;
  };
};

export type DeleteTaskResponse = {
  resultCode: number;
  messages: string[];
  fieldsErrors: FieldError[];
  data: {};
};

export type UpdateTaskResponse = {
  resultCode: number;
  messages: string[];
  fieldsErrors: FieldError[];
  data: {
    item: DomainTask;
  };
};

export type UpdateTaskModel = {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  startDate: string;
  deadline: string;
};
