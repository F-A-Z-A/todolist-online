import type { DomainTask, GetTasksResponse, UpdateTaskModel } from "features/todolists/api/tasksApi.types";
import { instance } from "common/instance/instance";
import type { BaseResponse } from "common/types";

export const tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
  },
  createTask(payload: { title: string; todolistId: string }) {
    const { title, todolistId } = payload;
    return instance.post<BaseResponse<{ item: DomainTask }>>(`todo-lists/${todolistId}/tasks`, { title });
  },
  deleteTask(payload: { todolistId: string; taskId: string }) {
    const { taskId, todolistId } = payload;
    return instance.delete<BaseResponse>(`todo-lists/${todolistId}/tasks/${taskId}`);
  },
  updateTask(payload: { task: DomainTask; updateParams: Partial<UpdateTaskModel> }) {
    const { task, updateParams } = payload;
    const model: UpdateTaskModel = {
      status: task.status,
      title: task.title,
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
    };

    return instance.put<BaseResponse<{ item: DomainTask }>>(`todo-lists/${task.todoListId}/tasks/${task.id}`, {
      ...model,
      ...updateParams,
    });
  },
};
