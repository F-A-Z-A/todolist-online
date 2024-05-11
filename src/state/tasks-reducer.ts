import {TasksStateType} from '../App';
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from '../api/todolists-api'
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
  switch (action.type) {
    case 'REMOVE-TASK': {
      const stateCopy = {...state}
      const tasks = stateCopy[action.todolistId];
      const newTasks = tasks.filter(t => t.id !== action.taskId);
      stateCopy[action.todolistId] = newTasks;
      return stateCopy;
    }
    case 'ADD-TASK': {
      return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
    }
    case 'CHANGE-TASK-STATUS': {
      let todolistTasks = state[action.todolistId];
      let newTasksArray = todolistTasks
        .map(t => t.id === action.taskId ? {...t, status: action.status} : t);
      state[action.todolistId] = newTasksArray;
      return ({...state});
    }
    case 'CHANGE-TASK-TITLE': {
      let todolistTasks = state[action.todolistId];
      // найдём нужную таску:
      let newTasksArray = todolistTasks
        .map(t => t.id === action.taskId ? {...t, title: action.title} : t);
      state[action.todolistId] = newTasksArray;
      return ({...state});
    }
    case 'ADD-TODOLIST': {
      return {
        ...state,
        [action.todolistId]: []
      }
    }
    case 'REMOVE-TODOLIST': {
      const copyState = {...state};
      delete copyState[action.id];
      return copyState;
    }
    case 'SET_TODOLISTS': {
      const stateCopy = {...state};
      action.todos.forEach(tl => stateCopy[tl.id] = [])
      return stateCopy
    }
    case "SET-TASK": {
      return {...state, [action.todoId]: action.tasks};
    }
    default:
      return state;
  }
}

export const removeTaskAC = (taskId: string, todolistId: string) =>
  ({type: 'REMOVE-TASK', taskId, todolistId} as const)
export const addTaskAC = (task: TaskType) =>
  ({type: 'ADD-TASK', task} as const)
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string) =>
  ({type: 'CHANGE-TASK-STATUS', status, todolistId, taskId} as const)
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) =>
  ({type: 'CHANGE-TASK-TITLE', title, todolistId, taskId} as const)

export const setTasksAC = (todoId: string, tasks: TaskType[]) =>
  ({type: 'SET-TASK', todoId, tasks} as const)

export const getTasksTC = (todoId: string) => (dispatch: Dispatch) =>
  todolistsAPI.getTasks(todoId)
    .then(res => dispatch(setTasksAC(todoId, res.data.items)))

export const deleteTaskTC = (todoId: string, taskId: string) => (dispatch: Dispatch) =>
  todolistsAPI.deleteTask(todoId, taskId)
    .then(res => dispatch(removeTaskAC(taskId, todoId)))

export const createTaskTC = (todoId: string, title: string) => (dispatch: Dispatch) =>
  todolistsAPI.createTask(todoId, title)
    .then(res => dispatch(addTaskAC(res.data.data.item)))

export const changeTaskStatusTC = (todoId: string, taskId: string, status: TaskStatuses) =>
  (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const tasks = getState().tasks
    const task = tasks[todoId].find(task => task.id === taskId)
    if (task) {
      const model: UpdateTaskModelType = {
        status,
        title: task.title,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
      }
      todolistsAPI.updateTask(todoId, taskId, model)
        .then(res => dispatch(changeTaskStatusAC(taskId, status, todoId)))
    }
  }

type ActionsType =
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof changeTaskStatusAC>
  | ReturnType<typeof changeTaskTitleAC>
  | ReturnType<typeof setTasksAC>
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTodolistsActionType