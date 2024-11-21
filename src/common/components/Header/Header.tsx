import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { MenuButton } from "../MenuButton/MenuButton";
import Switch from "@mui/material/Switch";
import React from "react";
import { changeThemeAC } from "app/app-reducer";
import { getTheme } from "../theme";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { selectTemeMode } from "app/app-selectors";

type Props = {};
export const Header = (props: Props) => {
  const themeMode = useAppSelector(selectTemeMode);
  const dispatch = useAppDispatch();

  const changeModeHandler = () => {
    dispatch(changeThemeAC({ theme: themeMode === "light" ? "dark" : "light" }));
  };

  const theme = getTheme(themeMode);

  return (
    <AppBar position="static" sx={{ mb: "30px" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton color="inherit">
          <MenuIcon />
        </IconButton>
        <div>
          <MenuButton>Login</MenuButton>
          <MenuButton>Logout</MenuButton>
          <MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
          <Switch color={"default"} onChange={changeModeHandler} />
        </div>
      </Toolbar>
    </AppBar>
  );
};
