import { setAppErrorAC, setAppStatusAC } from "app/app-reducer"
import type { AppDispatch } from "app/store"

export const handleServerNetworkError = (error: { message: string }, dispatch: AppDispatch) => {
  dispatch(setAppErrorAC(error.message))
  dispatch(setAppStatusAC("failed"))
}
