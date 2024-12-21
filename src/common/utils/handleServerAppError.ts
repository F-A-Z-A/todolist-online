import { BaseResponse } from "common/types"
import { Dispatch } from "redux"
import { setAppErrorAC, setAppStatusAC } from "app/app-reducer"

export const handleServerAppError = <T>(data: BaseResponse<T>, dispatch: Dispatch) => {
  dispatch(setAppErrorAC(data.messages.length ? data.messages[0] : "Some error occurred"))
  dispatch(setAppStatusAC("failed"))
}

// const f = <T>(arg: T): T => {
//   return ++arg
// }
// f<number>(1)
