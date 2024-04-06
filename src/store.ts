import {combineReducers, createStore} from 'redux'
import {tasksReducer} from "./state/tasks-reducer";
import {todolistsReducer} from "./state/todolists-reducer";

// объединяя reducer-ы с помощью combineReducers
const rootReducer = combineReducers({
  // мы задаём структуру нашего единственного объекта-состояния
  tasks: tasksReducer,
  todolists: todolistsReducer
})

// непосредственно создаём store
export const store = createStore(rootReducer)

// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store

// createStore создаст объект
// {
//   state:{
//     tasks:{}
//     todolists:[]
//   }
//   getState()
//   dispatch()
//   subscribe()
// }