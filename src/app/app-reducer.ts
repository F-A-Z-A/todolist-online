import {AppActionsType} from "./store";

const initialState = {
  error: null as null | string,
  status: 'loading' as RequestStatusType
}

export const appReducer = (
  state: InitialStateType = initialState,
  action: AppActionsType
): InitialStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS':
      return {...state, status: action.status}
    case "APP/SET-ERROR":
      return {...state, error: action.error}
    default:
      return state
  }
}

export const setStatusLoadingAC = (status: RequestStatusType) =>
  ({type: 'APP/SET-STATUS', status} as const)
export const setErrorAC = (error: null | string) =>
  ({type: 'APP/SET-ERROR', error} as const)

// types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
// ------------------ "холостой ход" | "загрузка" | "выполнена успешно" | "сбой"
type InitialStateType = typeof initialState
export type AppReducerActionsType =
  | ReturnType<typeof setStatusLoadingAC>
  | ReturnType<typeof setErrorAC>