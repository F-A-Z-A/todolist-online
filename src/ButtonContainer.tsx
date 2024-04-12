import React, {memo, ReactNode} from "react";
import {Button} from "@mui/material";
import {ButtonProps} from "@mui/material/Button/Button";

// type ButtonContainerPropsType = {
//   // children: ReactNode
//   variant: "text" | "outlined" | "contained" | undefined
//   onClick: () => void
//   color: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning" | undefined
//   title: string
// }

type ButtonContainerPropsType = {} & ButtonProps

interface IMyButton extends ButtonProps {
}

export const ButtonContainer = memo(({variant, onClick, color, title, ...rest}: ButtonContainerPropsType) => {
  return <Button variant={variant}
                 onClick={onClick}
                 color={color}>{title}</Button>
})