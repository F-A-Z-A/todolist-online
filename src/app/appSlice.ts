import { createSlice } from "@reduxjs/toolkit"

export const appSlice = createSlice({
  name: "app",

  initialState: {
    themeMode: "dark" as ThemeMode,
    status: "idle" as RequestStatus,
    error: null as ErrorStatus,
  },

  reducers: (create) => ({
    changeTheme: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
      state.themeMode = action.payload.themeMode
    }),

    setAppStatus: create.reducer<{ status: RequestStatus }>((state, action) => {
      state.status = action.payload.status
    }),

    setAppError: create.reducer<{ error: ErrorStatus }>((state, action) => {
      state.error = action.payload.error
    }),
  }),
})

export const appReducer = appSlice.reducer
export const { changeTheme, setAppStatus, setAppError } = appSlice.actions

// types
export type ThemeMode = "dark" | "light"
export type RequestStatus = "idle" | "loading" | "succeeded" | "failed"
export type ErrorStatus = string | null
// export type initialState = ReturnType<typeof authSlice.getInitialState>
