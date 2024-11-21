import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { getTheme } from "common/components/theme";
import { Header } from "common/components/Header/Header";
import { Main } from "./Main";
import { useAppSelector } from "./hooks";
import { selectTemeMode } from "app/app-selectors";

export function App() {
  const themeMode = useAppSelector(selectTemeMode);
  const theme = getTheme(themeMode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Main />
    </ThemeProvider>
  );
}

// types
export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export type TasksStateType = {
  [key: string]: TaskType[];
};
