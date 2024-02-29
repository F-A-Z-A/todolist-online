import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

type TodolistsType = {
  id: string
  title: string
  filter: FilterValuesType
}

type TasksType = {
  [key: string]: TaskType[]
}

function App() {
  const todolistID1 = v1();
  const todolistID2 = v1();
  
  const [todolists, setTodolists] = useState<Array<TodolistsType>>([
    {id: todolistID1, title: "What to learn", filter: "all"},
    {id: todolistID2, title: "What to buy ", filter: "all"},
  ])
  
  const [tasks, setTasks] = useState<TasksType>({
    [todolistID1]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true},
      {id: v1(), title: "ReactJS", isDone: false},
      {id: v1(), title: "Rest API", isDone: false},
      {id: v1(), title: "GraphQL", isDone: false},
    ],
    [todolistID2]: [
      {id: v1(), title: "HTML&CSS2", isDone: true},
      {id: v1(), title: "JS3", isDone: true},
      {id: v1(), title: "ReactJS3", isDone: false},
      {id: v1(), title: "Rest API3", isDone: false},
    ]
  });
  
  
  function removeTask(todolistId: string, taskId: string) {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].filter(el => el.id !== taskId)
    });
  }
  
  function addTask(todolistId: string, title: string) {
    let newTask = {id: v1(), title: title, isDone: false};
    setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]});
  }
  
  function changeStatus(todolistId: string, taskId: string, isDone: boolean) {
    setTasks({
      ...tasks, [todolistId]: tasks[todolistId].map(el => el.id === taskId
        ? {...el, isDone: isDone}
        : el)
    });
  }
  
  function changeFilter(todolistId: string, value: FilterValuesType) {
    setTodolists(
      todolists.map(el => el.id === todolistId
        ? {...el, filter: value}
        : el)
    )
  }
  
  function removeTodolist(todolistId: string) {
    setTodolists(todolists.filter(el => el.id !== todolistId))
    delete tasks[todolistId]
    console.log(tasks)
  }
  
  return (
    <div className="App">
      {todolists.map(el => {
          return (
            <Todolist
              key={el.id}
              todolistId={el.id}
              title={el.title}
              tasks={tasks[el.id]}
              removeTask={removeTask}
              changeFilter={changeFilter}
              addTask={addTask}
              changeTaskStatus={changeStatus}
              removeTodolist={removeTodolist}
              filter={el.filter}
            />
          )
        }
      )}
    </div>
  );
}

export default App;
