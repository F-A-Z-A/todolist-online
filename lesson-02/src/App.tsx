import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./components/TodoList";

export type FilterValuesType = "all" | "active" | "completed"

function App() {
  // BLL
  const todoListTitle = "What to learn";
  const [tasks, setTasks] = useState([
    {id: 1, title: "HTML&CSS", isDone: true},
    {id: 2, title: "JS/TS", isDone: true},
    {id: 3, title: "REACT", isDone: false},
  ])
  
  const [filter, setFilter] = useState<FilterValuesType>("all")
  
  function removeTask(taskId: number) {
    setTasks(tasks.filter(task => task.id !== taskId))
  }
  
  function changeFilter(filter: FilterValuesType) {
    setFilter(filter)
  }
  
  let tasksForTodoList = tasks;
  if (filter === "active") {
    tasksForTodoList = tasks.filter(task => !task.isDone)
  }
  if (filter === "completed") {
    tasksForTodoList = tasks.filter(task => task.isDone)
  }
  
  
  // UI
  return (
    <div className={"App"}>
      <TodoList
        todoListTitle={todoListTitle}
        tasks={tasksForTodoList}
        removeTask={removeTask}
        changeFilter={changeFilter}
      />
    </div>
  );
}

export default App;