import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Button from "@mui/material/Button";
import styled from "styled-components";
import TextField from '@mui/material/TextField';

type AddItemFormPropsType = {
  addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
  
  let [title, setTitle] = useState("")
  let [error, setError] = useState<string | null>(null)
  
  const addItem = () => {
    if (title.trim() !== "") {
      props.addItem(title);
      setTitle("");
    } else {
      setError("Title is required");
    }
  }
  
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }
  
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.charCode === 13) {
      addItem();
    }
  }
  
  return <div>
    
    <TextField
      error={!!error}
      label={error ? error : "Type some..."}
      variant="outlined"
      value={title}
      onChange={onChangeHandler}
      onKeyPress={onKeyPressHandler}
    />
    <StyledButton variant="contained" onClick={addItem}>+</StyledButton>
    {/*{error && <div className="error-message">{error}</div>}*/}
  </div>
}

const StyledButton = styled(Button)`
  && {
    min-width: 40px;
    min-height: 56px;
  }
`