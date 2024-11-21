import type { RootState } from "app/store";
import type { TasksStateType } from "app/App";

export const selectTasks = (state: RootState): TasksStateType => state.tasks;
