import {setAppErrorAC, setAppStatusAC,} from '../app/app-reducer'
import {Dispatch} from 'redux'
import {ResponseType} from '../api/todolists-api'
import {AppActionType} from "../app/store";


// generic function
export const handleServerAppError = <T, >(
  data: ResponseType<T>,
  dispatch: Dispatch<AppActionType>
) => {
  if (data.messages.length) {
    dispatch(setAppErrorAC(data.messages[0]))
  } else {
    dispatch(setAppErrorAC('Some error occurred'))
  }
  dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (
  error: { message: string },
  dispatch: Dispatch<AppActionType>
) => {
  dispatch(setAppErrorAC(error.message))
  dispatch(setAppStatusAC('failed'))
}