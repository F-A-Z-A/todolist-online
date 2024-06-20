import { Dispatch } from "redux"
import { authAPI } from "api/todolists-api"
import { authActions } from "features/Login/authSlice"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const slice = createSlice({
  name: "app",
  initialState: {
    status: "idle" as RequestStatusType,
    error: null as null | string,
    isInitialized: false,
  },
  reducers: {
    setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error
    },
    setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
      state.status = action.payload.status
    },
    setAppInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized
    },
  },
  selectors: {
    selectError: (state) => state.error,
    selectStatus: (state) => state.status,
    selectIsInitialized: (state) => state.isInitialized,
  },
})

export const initializeAppTC = () => (dispatch: Dispatch) => {
  authAPI.me().then((res) => {
    if (res.data.resultCode === 0) {
      dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }))
    } else {
    }
    dispatch(appActions.setAppInitialized({ isInitialized: true }))
  })
}

export const appReducer = slice.reducer
export const appActions = slice.actions
export const { selectError, selectStatus, selectIsInitialized } = slice.selectors
export const appName = slice.name

// types
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"
export type initialStateApp = ReturnType<typeof slice.getInitialState>
