import { FilterValuesType, TodolistType } from "../App";
import { v1 } from "uuid";

let todolistID1 = v1();
let todolistID2 = v1();

const initialState: TodolistType[] = [
  { id: todolistID1, title: "What to learn", filter: "all" },
  { id: todolistID2, title: "What to buy", filter: "all" },
];

export const todolistsReducer = (state: TodolistType[] = initialState, action: ActionsType) => {
  switch (action.type) {
    case "REMOVE_TODOLIST": {
      return state.filter((tl) => tl.id !== action.payload.todolistId);
    }

    case "ADD_TODOLIST": {
      const newTodolist: TodolistType = { id: action.payload.todolistId, title: action.payload.title, filter: "all" };
      return [...state, newTodolist];
    }

    case "CHANGE_TODOLIST_TITLE": {
      return state.map((tl) => (tl.id === action.payload.id ? { ...tl, title: action.payload.title } : tl));
    }

    case "CHANGE_TODOLIST_FILTER": {
      return state.map((tl) => (tl.id === action.payload.id ? { ...tl, filter: action.payload.filter } : tl));
    }

    default:
      throw new Error("I don't understand this type");
  }
};

// Action creators
export const removeTodolistAC = (todolistId: string) => {
  return { type: "REMOVE_TODOLIST", payload: { todolistId } } as const;
};

export const addTodolistAC = (title: string) => {
  return { type: "ADD_TODOLIST", payload: { todolistId: v1(), title } } as const;
};

export const changeTodolistTitleAC = (payload: { id: string; title: string }) => {
  return { type: "CHANGE_TODOLIST_TITLE", payload } as const;
};

export const changeTodolistFilter = (id: string, filter: FilterValuesType) => {
  return { type: "CHANGE_TODOLIST_FILTER", payload: { id, filter } } as const;
};

// Actions types
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>;
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilter>;

type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType;
