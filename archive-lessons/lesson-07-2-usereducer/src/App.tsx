import React, {useReducer, useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {addTaskAC, removeTaskAC, tasksReducer} from "./tasksReducer";
import {changeFilterAC, filterReducer} from "./filterReducer";

export type FilterValuesType = "all" | "active" | "completed";

function App() {
  let [tasks, dispatchTasks] = useReducer(tasksReducer, [
    {id: v1(), title: "HTML&CSS", isDone: true},
    {id: v1(), title: "JS", isDone: true},
    {id: v1(), title: "ReactJS", isDone: false},
    {id: v1(), title: "Rest API", isDone: false},
    {id: v1(), title: "GraphQL", isDone: false},
  ]);
  
  let [filter, dispatchFilter] = useReducer(filterReducer, "all");
  
  function removeTask(id: string) {
    dispatchTasks(removeTaskAC(id));
  }
  
  function addTask(title: string) {
    dispatchTasks(addTaskAC(title));
  }
  
  let tasksForTodolist = tasks;
  
  if (filter === "active") {
    tasksForTodolist = tasks.filter(t => !t.isDone);
  }
  if (filter === "completed") {
    tasksForTodolist = tasks.filter(t => t.isDone);
  }
  
  function changeFilter(value: FilterValuesType) {
    dispatchFilter(changeFilterAC(value));
  }
  
  return (
    <div className="App">
      <Todolist
        title="What to learn"
        tasks={tasksForTodolist}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}/>
    </div>
  );
}

export default App;