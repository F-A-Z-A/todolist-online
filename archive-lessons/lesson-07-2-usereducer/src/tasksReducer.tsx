import {TaskType} from "./Todolist";
import {v1} from "uuid";

export const tasksReducer = (state: TaskType[], action: TaskReducerType): TaskType[] => {
// reducer всегда прикрываем типизацией (здесь ": TaskType[]")
  switch (action.type) {
    case "REMOVE_TASK": {
      return state.filter(t => t.id !== action.payload.id)
    }
    case "ADD_TASK": {
      const task = {id: v1(), title: action.payload.title, isDone: false}
      return [task, ...state]
    }
    default:
      return state
  }
}

type TaskReducerType = RemoveTaskACType | AddTaskAC
// сборщик всех типизаций, отправляем в action tasksReducer

type RemoveTaskACType = ReturnType<typeof removeTaskAC>
// автотипизация, чтоб не типизировать все всручную
export const removeTaskAC = (id: string) => {
  return {
    type: "REMOVE_TASK",
    payload: {
      id: id
    }
  } as const  //      <--------- не забываем
  // используем как константы (если используем автотипизацию)
}

type AddTaskAC = ReturnType<typeof addTaskAC>
export const addTaskAC = (title: string) => {
  return {
    type: "ADD_TASK",
    payload: {
      title
    }
  } as const  //      <--------- не забываем
}