import { tasksName, tasksSlice } from "features/TodolistsList/tasksSlice"
import { combineReducers } from "redux"
import { ThunkAction, ThunkDispatch } from "redux-thunk"
import { appName, appReducer } from "app/appSlice"
import { authName, authReducer } from "features/Login/authSlice"
import { configureStore, UnknownAction } from "@reduxjs/toolkit"
import { todolistsName, todolistsReducer } from "features/TodolistsList/todolistsSlice"

const rootReducer = combineReducers({
  [tasksName]: tasksSlice,
  [todolistsName]: todolistsReducer,
  [appName]: appReducer,
  [authName]: authReducer,
})

// ❗старая запись, с новыми версиями не работает
//  const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
export const store = configureStore({ reducer: rootReducer })

export type AppRootStateType = ReturnType<typeof rootReducer>

// ❗ UnknownAction вместо AnyAction
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, UnknownAction>

// export type AppDispatch = typeof store.dispatch
// ❗ UnknownAction вместо AnyAction
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, UnknownAction>
