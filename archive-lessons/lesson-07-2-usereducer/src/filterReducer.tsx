import {FilterValuesType} from "./App";

export const filterReducer = (state: FilterValuesType, action: TaskReducerType): FilterValuesType => {
  switch (action.type) {
    case "CHANGE_FILTER": {
      return action.payload.value;
    }
    default:
      return state;
  }
}

type TaskReducerType = ChangeFilterACType

type ChangeFilterACType = ReturnType<typeof changeFilterAC>

export const changeFilterAC = (value: FilterValuesType) => {
  return {
    type: "CHANGE_FILTER",
    payload: {
      value
    }
  } as const  //      <--------- не забываем
}