import {setErrorAC, setStatusLoadingAC} from "../app/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/todolists-api"

export const serverNetworkError = <T>(dispatch: Dispatch, data: ResponseType<T>) => {
  if (data.messages.length) {
    dispatch(setErrorAC(data.messages[0]))
  } else {
    dispatch(setErrorAC("some error occurred."))
  }
  dispatch(setStatusLoadingAC("succeeded"))
}

export const handleServerNetworkError = (dispatch: Dispatch, e: { message: string }) => {
  dispatch(setErrorAC(e.message))
  dispatch(setStatusLoadingAC("failed"))
}