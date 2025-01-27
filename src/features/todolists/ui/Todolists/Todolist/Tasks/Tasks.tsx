import List from "@mui/material/List"
import { TaskStatus } from "common/enums"
import { useGetTasksQuery } from "../../../../api/tasksApi"
import { DomainTodolist } from "../../../../lib/types/types"
import { TasksSkeleton } from "../../../skeletons/TasksSkeleton/TasksSkeleton"
import { Task } from "./Task/Task"
import { useState } from "react"
import { TasksPagination } from "features/todolists/ui/Todolists/TasksPagination/TasksPagination"

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  const [page, setPage] = useState<number>(1)
  const [visibleTotalCount, setVisibleTotalCount] = useState<boolean>(true)

  const { data, isLoading } = useGetTasksQuery({ todolistId: todolist.id, args: { page } })

  const getTasksForTodolist = () => {
    let tasksForTodolist = data?.items
    if (todolist.filter === "active") {
      tasksForTodolist = tasksForTodolist?.filter((task) => task.status === TaskStatus.New)
    }
    if (todolist.filter === "completed") {
      tasksForTodolist = tasksForTodolist?.filter((task) => task.status === TaskStatus.Completed)
    }
    return tasksForTodolist
  }

  if (isLoading) {
    return <TasksSkeleton />
  }

  return (
    <>
      {data?.items.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <>
          <List>
            {getTasksForTodolist()?.map((task) => {
              return <Task key={task.id} task={task} todolist={todolist} />
            })}
          </List>
          {visibleTotalCount && <TasksPagination totalCount={data?.totalCount || 0} page={page} setPage={setPage} />}
        </>
      )}
    </>
  )
}
