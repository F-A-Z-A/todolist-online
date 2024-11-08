import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from "./tasks-reducer";
import { TasksStateType } from "../App";
import { v1 } from "uuid";
import { addTodolistAC, removeTodolistAC } from "./todolists-reducer";

let startState: TasksStateType;

let todolistId1 = v1();
let todolistId2 = v1();

beforeEach(() => {
  startState = {
    [todolistId1]: [
      { id: "1", title: "CSS", isDone: true },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false },
    ],
    [todolistId2]: [
      { id: "1", title: "bread", isDone: false },
      { id: "2", title: "milk", isDone: false },
      { id: "3", title: "tea", isDone: true },
    ],
  };
});

test("new array should be added when new todolist is added", () => {
  const endState = tasksReducer(startState, addTodolistAC("new todolist"));

  const keys = Object.keys(endState);
  const newKey = keys.find((k) => k !== todolistId1 && k !== todolistId2);
  if (!newKey) {
    throw Error("new key should be added");
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});

test("property with todolistId should be deleted", () => {
  const action = removeTodolistAC(todolistId2);

  const endState = tasksReducer(startState, action);

  const keysStartState = Object.keys(startState);
  const keysEndState = Object.keys(endState);

  expect(keysStartState).toHaveLength(2);
  expect(keysEndState).toHaveLength(1);
  expect(endState[todolistId2]).not.toBeDefined();
  expect(endState[todolistId2]).toBeUndefined();
});

test("title of specified task should be changed", () => {
  const endState = tasksReducer(
    startState,
    changeTaskTitleAC({ taskId: "1", title: "New Task Title", todolistId: todolistId1 }),
  );

  expect(startState[todolistId1][0].title).toBe("CSS");
  expect(endState[todolistId1][0].title).toBe("New Task Title");
  expect(endState[todolistId2][0].title).not.toBe("New Task Title");
});

test("status of specified task should be changed", () => {
  const endState = tasksReducer(
    startState,
    changeTaskStatusAC({ taskId: "2", isDone: false, todolistId: todolistId1 }),
  );

  expect(startState[todolistId1][0].isDone).toBeTruthy();
  expect(endState[todolistId1][0].isDone).toBeTruthy();
  expect(startState[todolistId1][1].isDone).toBeTruthy();
  expect(endState[todolistId1][1].isDone).toBeFalsy();
  expect(startState[todolistId2][2].isDone).toBeTruthy();
  expect(endState[todolistId2][2].isDone).toBeTruthy();
});

test("correct task should be added to correct array", () => {
  const endState = tasksReducer(startState, addTaskAC({ title: "juce", todolistId: todolistId2 }));

  expect(endState[todolistId1].length).toBe(3);
  expect(endState[todolistId2].length).toBe(4);
  expect(endState[todolistId2][0].id).toBeDefined();
  expect(endState[todolistId2][0].title).toBe("juce");
  expect(endState[todolistId2][0].isDone).toBe(false);
});

test("task removed", () => {
  const endState = tasksReducer(startState, removeTaskAC({ todolistId: todolistId1, taskId: "1" }));

  expect(startState[todolistId1].length).toBe(3);
  expect(endState[todolistId1].length).toBe(2);
  expect(startState[todolistId2].length).toBe(3);
  expect(endState[todolistId2].length).toBe(3);
});
