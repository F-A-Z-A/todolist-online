import { instance } from "common/instance"
import type { BaseResponse } from "common/types"
import type { Inputs } from "features/auth/ui/Login/Login"

export const authApi = {
  login(payload: Inputs) {
    return instance.post<BaseResponse<{ userId: number; token: string }>>(`auth/login`, payload)
  },
  logoun() {
    return instance.delete<BaseResponse>(`auth/login`)
  },
  me() {
    return instance.get<BaseResponse<{ id: number; email: string; login: string }>>(`auth/me`)
  },
}
