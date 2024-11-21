import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { changeTodolistFilterAC } from "features/todolists/model/todolists-reducer";
import { useAppDispatch } from "app/hooks";
import type { FilterValuesType, TodolistType } from "app/App";
import { filterButtonsContainerSx } from "features/todolists/ui/Todolists/Todolist/FilterTasksButtons/FilterTasksButtons.styles";

type Props = {
  todolist: TodolistType;
};
export const FilterTasksButtons = ({ todolist }: Props) => {
  const dispatch = useAppDispatch();

  const changeFilterTasksHandler = (filter: FilterValuesType) => {
    dispatch(changeTodolistFilterAC({ id: todolist.id, filter }));
  };

  return (
    <Box sx={filterButtonsContainerSx}>
      <Button
        variant={todolist.filter === "all" ? "outlined" : "text"}
        color={"inherit"}
        onClick={() => changeFilterTasksHandler("all")}
      >
        All
      </Button>
      <Button
        variant={todolist.filter === "active" ? "outlined" : "text"}
        color={"primary"}
        onClick={() => changeFilterTasksHandler("active")}
      >
        Active
      </Button>
      <Button
        variant={todolist.filter === "completed" ? "outlined" : "text"}
        color={"secondary"}
        onClick={() => changeFilterTasksHandler("completed")}
      >
        Completed
      </Button>
    </Box>
  );
};
