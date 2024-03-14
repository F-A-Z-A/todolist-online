import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

type TodolistsType = { id: string, title: string }

export type TasksType = { [key: string]: TaskDataType }

export type TaskDataType = { data: TaskType[], filter: FilterValuesType }

function App() {
  
  let todolistId1 = v1();
  let todolistId2 = v1();
  
  let [todolists, setTodolists] = useState<Array<TodolistsType>>([
    {id: todolistId1, title: "What to learn"},
    {id: todolistId2, title: "What to buy"}
  ])
  
  let [tasks, setTasks] = useState<TasksType>({
    [todolistId1]: {
      data: [
        {id: v1(), title: "HTML&CSS-1", isDone: false},
        {id: v1(), title: "JS-1", isDone: true}
      ],
      filter: "all"
    },
    [todolistId2]: {
      data: [
        {id: v1(), title: "HTML&CSS-2", isDone: false},
        {id: v1(), title: "JS-2", isDone: true}
      ],
      filter: "all"
    }
  });
  
  const removeTodolist = (todolistId: string) => {
    setTodolists(todolists.filter(el => el.id !== todolistId))
    delete tasks[todolistId]
    console.log(tasks)
  }
  
  function removeTask(todolistId: string, taskId: string) {
    setTasks({
      ...tasks,
      [todolistId]: {
        ...tasks[todolistId],
        data: tasks[todolistId].data.filter(el => el.id !== taskId)
      }
    })
  }
  
  function addTask(todolistId: string, title: string) {
    let newTask = {id: v1(), title: title, isDone: false};
    setTasks({
      ...tasks,
      [todolistId]: {
        ...tasks[todolistId],
        data: [
          newTask,
          ...tasks[todolistId].data
        ]
      }
    })
  }
  
  function changeStatus(todolistId: string, taskId: string, newIsDone: boolean) {
    setTasks({
      ...tasks,
      [todolistId]: {
        ...tasks[todolistId],
        data: tasks[todolistId].data.map(el => el.id === taskId ? {...el, isDone: newIsDone} : el)
      }
    })
  }
  
  function changeFilter(todolistId: string, value: FilterValuesType) {
    setTodolists(todolists.map(el => el.id === todolistId ? {...el, filter: value} : el))
  }
  
  return (
    <div className="App">
      {todolists.map(el => {
        let tasksForTodolist = tasks[el.id].data;
        if (tasks[el.id].filter === "active") {
          tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
        }
        if (tasks[el.id].filter === "completed") {
          tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
        }
        return (
          <Todolist
            key={el.id}
            todolistId={el.id}
            title={el.title}
            tasks={tasksForTodolist}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeStatus}
            filter={tasks[el.id].filter}
            removeTodolist={removeTodolist}
          />
        )
      })}
    
    
    </div>
  );
}

export default App;
