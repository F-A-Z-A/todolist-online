import { TodolistType } from "../App";
import { v1 } from "uuid";
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  todolistsReducer,
} from "../model/todolists-reducer";

let todolistId1 = v1();
let todolistId2 = v1();
let startState: TodolistType[];

beforeEach(() => {
  startState = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ];
});

test("correct todolist should be removed", () => {
  const endState = todolistsReducer(startState, removeTodolistAC(todolistId1));

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});

test("correct todolist should be added", () => {
  const todolistTitle = "New Todolist";
  const todolistId = v1();

  const endState = todolistsReducer(startState, addTodolistAC(todolistId, todolistTitle));

  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe(todolistTitle);
});

test("correct todolist should change its name", () => {
  const todolistTitle = "New Todolist";

  const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId2, todolistTitle));

  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(todolistTitle);
});

test("correct filter of todolist should be changed", () => {
  const todolistFilter = "completed";

  const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistId2, todolistFilter));

  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe(todolistFilter);
});
