import {Dispatch} from 'redux'
import {setAppStatusAC, setIsInitializedAC,} from '../../app/app-reducer'
import {AppActionType} from "../../app/store";
import {authAPI} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

const initialState = {
  isLoggedIn: false,
}
type InitialStateType = typeof initialState

export const authReducer = (
  state: InitialStateType = initialState,
  action: AppActionType
): InitialStateType => {
  switch (action.type) {
    case 'login/SET-IS-LOGGED-IN':
      return {...state, isLoggedIn: action.value}
    default:
      return state
  }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
  ({type: 'login/SET-IS-LOGGED-IN', value}) as const

// thunks
export const loginTC = (data: any) => (dispatch: Dispatch<AppActionType>) => {
  dispatch(setAppStatusAC('loading'))
  authAPI.login(data)
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC(true))
        dispatch(setAppStatusAC('succeeded'))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch(err => {
      handleServerNetworkError(err, dispatch)
    })
}
export const meTC = () => (dispatch: Dispatch<AppActionType>) => {
  dispatch(setAppStatusAC('loading'))
  authAPI.me()
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC(true))
        dispatch(setAppStatusAC('succeeded'))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch(err => {
      handleServerNetworkError(err, dispatch)
    })
    .finally(() => {
      dispatch(setIsInitializedAC(true))
    })
}
export const logOutTC = () => (dispatch: Dispatch<AppActionType>) => {
  dispatch(setAppStatusAC('loading'))
  authAPI.logout()
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC(false))
        dispatch(setAppStatusAC('succeeded'))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch(err => {
      handleServerNetworkError(err, dispatch)
    })
}

// types
export type AuthReducerActionsType =
  | ReturnType<typeof setIsLoggedInAC>