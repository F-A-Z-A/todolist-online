import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";
type TodolistsType = { id: string, title: string }

type TaskDataType = {
  data: TaskType[]
  filter: FilterValuesType
}

type TasksType = {
  [key: string]: TaskDataType
}

function App() {
  let todolistId1 = v1();
  let todolistId2 = v1();
  
  let [todolists, setTodolists] = useState<Array<TodolistsType>>([
    {id: todolistId1, title: "Todolist - 1"},
    {id: todolistId2, title: "Todolist - 2"}
  ])
  
  let [tasks, setTasks] = useState<TasksType>({
    [todolistId1]: {
      data: [
        {id: v1(), title: "Task - 1 - 1", isDone: true},
        {id: v1(), title: "Task - 1 - 3", isDone: false}
      ],
      filter: "all"
    },
    [todolistId2]: {
      data: [
        {id: v1(), title: "Task - 2 - 2", isDone: true},
        {id: v1(), title: "Task - 2 - 4", isDone: false}
      ],
      filter: "all"
    }
  });
  
  const removeTodolist = (todolistId: string) => {
    setTodolists(todolists.filter(el => el.id !== todolistId))
    delete tasks[todolistId]
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
      },
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
    setTasks({
      ...tasks,
      [todolistId]: {
        ...tasks[todolistId],
        filter: value
      }
    })
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
