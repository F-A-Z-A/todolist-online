import {AppRootStateType} from "../../store";
import {TasksStateType} from "../../AppWithRedux";

export const tasksSelector = (state: AppRootStateType): TasksStateType => state.tasks