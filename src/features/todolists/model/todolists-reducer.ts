import type { Todolist } from "features/todolists/api/todolistsApi.types";
import { todolistsApi } from "features/todolists/api/todolistsApi";
import type { Dispatch } from "redux";

const initialState: DomainTodolist[] = [];

export const todolistsReducer = (state: DomainTodolist[] = initialState, action: ActionsType): DomainTodolist[] => {
  switch (action.type) {
    case "SET_TODOLISTS": {
      return action.payload.todolists.map((tl) => ({ ...tl, filter: "all" }));
    }

    case "REMOVE-TODOLIST": {
      return state.filter((tl) => tl.id !== action.payload.id);
    }

    case "ADD-TODOLIST": {
      const newTodolist = action.payload.todolist;
      return [newTodolist, ...state];
    }

    case "CHANGE-TODOLIST-TITLE": {
      return state.map((tl) => (tl.id === action.payload.id ? { ...tl, title: action.payload.title } : tl));
    }

    case "CHANGE-TODOLIST-FILTER": {
      return state.map((tl) => (tl.id === action.payload.id ? { ...tl, filter: action.payload.filter } : tl));
    }

    default:
      return state;
  }
};

// Action creators
export const setTodolistsAC = (todolists: Todolist[]) => {
  return { type: "SET_TODOLISTS", payload: { todolists } } as const;
};
export const removeTodolistAC = (id: string) => {
  return { type: "REMOVE-TODOLIST", payload: { id } } as const;
};
export const addTodolistAC = (todolist: DomainTodolist) => {
  return { type: "ADD-TODOLIST", payload: { todolist } } as const;
};
export const changeTodolistTitleAC = (payload: { id: string; title: string }) => {
  return { type: "CHANGE-TODOLIST-TITLE", payload } as const;
};
export const changeTodolistFilterAC = (payload: { id: string; filter: FilterValuesType }) => {
  return { type: "CHANGE-TODOLIST-FILTER", payload } as const;
};

// thunks
export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
  todolistsApi.getTodolists().then((res) => {
    dispatch(setTodolistsAC(res.data));
  });
};

export const createTodolistsTC = (title: string) => (dispatch: Dispatch) => {
  todolistsApi.createTodolist(title).then((res) => {
    dispatch(addTodolistAC({ ...res.data.data.item, filter: "all" }));
  });
};

export const removeTodolistTC = (id: string) => (dispatch: Dispatch) => {
  todolistsApi.deleteTodolist(id).then((res) => {
    dispatch(removeTodolistAC(id));
  });
};

export const updateTodolistTitleTC = (args: { id: string; title: string }) => (dispatch: Dispatch) => {
  todolistsApi.updateTodolist(args).then((res) => {
    dispatch(changeTodolistTitleAC(args));
  });
};

// Actions types
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>;
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>;
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>;
type ActionsType =
  | SetTodolistsActionType
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType;

// types
export type FilterValuesType = "all" | "active" | "completed";
export type DomainTodolist = Todolist & {
  filter: FilterValuesType;
};
