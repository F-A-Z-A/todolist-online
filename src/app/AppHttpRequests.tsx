import Checkbox from "@mui/material/Checkbox";
import React, { ChangeEvent, useEffect, useState } from "react";
import { AddItemForm } from "../common/components/AddItemForm/AddItemForm";
import { EditableSpan } from "../common/components/EditableSpan/EditableSpan";
import axios from "axios";
import { apiKey, tkKey } from "./keys";

const configs = { headers: { Authorization: tkKey, "api-key": apiKey } };

export const AppHttpRequests = () => {
  const [todolists, setTodolists] = useState<Todolist[]>([]);
  const [tasks, setTasks] = useState<{ [key: string]: DomainTask[] }>({});

  useEffect(() => {
    axios.get<Todolist[]>("https://social-network.samuraijs.com/api/1.1/todo-lists", configs).then((res) => {
      const todolists = res.data;
      setTodolists(() => todolists);
      todolists.forEach((tl) => {
        axios
          .get<GetTasksResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${tl.id}/tasks`, configs)
          .then((res) => {
            // setTasks({ ...tasks, [tl.id]: res.data.items });
            setTasks((prevTasks) => ({ ...prevTasks, [tl.id]: res.data.items }));
          });
      });
    });
  }, []);

  const createTodolistHandler = (title: string) => {
    axios
      .post<Response<{ item: Todolist }>>("https://social-network.samuraijs.com/api/1.1/todo-lists", { title }, configs)
      .then((res) => setTodolists([res.data.data.item, ...todolists]));
  };

  const removeTodolistHandler = (id: string) => {
    axios
      .delete<Response>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, configs)
      .then(() => setTodolists(todolists.filter((tl) => tl.id !== id)));
  };

  const updateTodolistHandler = (id: string, title: string) => {
    axios
      .put<Response>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, { title }, configs)
      .then(() => setTodolists(todolists.map((tl) => (tl.id === id ? { ...tl, title } : tl))));
  };

  const createTaskHandler = (title: string, todolistId: string) => {
    axios
      .post<
        Response<{ item: DomainTask }>
      >(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`, { title }, configs)
      .then((res) => {
        const newTask = res.data.data.item;
        // setTasks({ ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] });
        setTasks({ ...tasks, [todolistId]: tasks[todolistId] ? [newTask, ...tasks[todolistId]] : [newTask] });
      });
  };

  const removeTaskHandler = (taskId: string, todolistId: string) => {
    axios
      .delete<Response>(
        `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${taskId}`,
        configs,
      )
      .then(() => {
        setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter((t) => t.id !== taskId) });
      });
  };

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, task: DomainTask) => {
    const model: BaseTask = {
      title: task.title,
      description: task.description,
      status: e.currentTarget.checked ? 2 : 0,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
    };

    axios
      .put<
        Response<{ item: DomainTask }>
      >(`https://social-network.samuraijs.com/api/1.1/todo-lists/${task.todoListId}/tasks/${task.id}`, model, configs)
      .then((res) => {
        const newTask = res.data.data.item;
        setTasks({
          ...tasks,
          [task.todoListId]: tasks[task.todoListId].map((t) => (t.id === task.id ? newTask : t)),
        });
      });
  };

  const changeTaskTitleHandler = (title: string, task: any) => {
    const model: BaseTask = {
      title: title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
    };

    axios
      .put<
        Response<{ item: DomainTask }>
      >(`https://social-network.samuraijs.com/api/1.1/todo-lists/${task.todoListId}/tasks/${task.id}`, model, configs)
      .then((res) => {
        const newTask = res.data.data.item;
        setTasks({
          ...tasks,
          [task.todoListId]: tasks[task.todoListId].map((t) => (t.id === task.id ? newTask : t)),
        });
      });
  };

  return (
    <div style={{ margin: "20px" }}>
      <AddItemForm addItem={createTodolistHandler} />

      {/* Todolists */}
      {todolists.map((tl: any) => {
        return (
          <div key={tl.id} style={todolist}>
            <div>
              <EditableSpan value={tl.title} onChange={(title: string) => updateTodolistHandler(tl.id, title)} />
              <button onClick={() => removeTodolistHandler(tl.id)}>x</button>
            </div>
            <AddItemForm addItem={(title) => createTaskHandler(title, tl.id)} />

            {/* Tasks */}
            {!!tasks[tl.id] &&
              tasks[tl.id].map((task: any) => {
                return (
                  <div key={task.id}>
                    <Checkbox
                      checked={task.status === TaskStatus.Completed}
                      onChange={(e) => changeTaskStatusHandler(e, task)}
                    />
                    <EditableSpan value={task.title} onChange={(title) => changeTaskTitleHandler(title, task)} />
                    <button onClick={() => removeTaskHandler(task.id, tl.id)}>x</button>
                  </div>
                );
              })}
          </div>
        );
      })}
    </div>
  );
};

// Styles
const todolist: React.CSSProperties = {
  border: "1px solid black",
  margin: "20px 0",
  padding: "10px",
  width: "300px",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
};

// Types
type Todolist = {
  id: string;
  addedDate: string;
  order: number;
  title: string;
};

type Response<T = {}> = {
  resultCode: number;
  messages: string[];
  fieldsErrors: FieldError[];
  data: T;
};

type FieldError = {
  error: string;
  field: string;
};

type GetTasksResponse = {
  error: string | null;
  totalCount: number;
  items: DomainTask[];
};

type DomainTask = BaseTask & {
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};

type BaseTask = {
  description: string | null;
  title: string;
  status: TaskStatus;
  priority: number;
  startDate: string | null;
  deadline: string | null;
};

enum TaskStatus {
  New,
  InProgress,
  Completed,
}
