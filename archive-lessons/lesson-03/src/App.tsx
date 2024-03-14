import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed";

function App() {
  let [tasks, setTasks] = useState<Array<TaskType>>([
    {id: v1(), title: "HTML&CSS", isDone: true},
    {id: v1(), title: "JS", isDone: true},
    {id: v1(), title: "ReactJS", isDone: false},
    {id: v1(), title: "Rest API", isDone: false},
    {id: v1(), title: "GraphQL", isDone: false},
  ]);
  
  let [filter, setFilter] = useState<FilterValuesType>("all");
  
  function removeTask(id: string) {
    let filteredTasks = tasks.filter(t => t.id !== id);
    setTasks(filteredTasks);
  }
  
  function addTask(taskTitle: string) {
    const newTask: TaskType = {
      id: v1(),
      title: taskTitle,
      isDone: false
    }
    const nextState = [newTask, ...tasks]
    setTasks(nextState)
  }
  
  let tasksForTodolist = tasks;
  
  if (filter === "active") {
    tasksForTodolist = tasks.filter(t => !t.isDone);
  }
  if (filter === "completed") {
    tasksForTodolist = tasks.filter(t => t.isDone);
  }
  
  function changeFilter(value: FilterValuesType) {
    setFilter(value);
  }
  
  return (
    <div className="App">
      <Todolist title="What to learn"
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
      />
    </div>
  );
}

export default App;
