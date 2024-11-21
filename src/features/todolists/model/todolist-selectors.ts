import type { RootState } from "app/store";
import type { TodolistType } from "app/App";

export const selectTodolists = (state: RootState): TodolistType[] => state.todolists;
