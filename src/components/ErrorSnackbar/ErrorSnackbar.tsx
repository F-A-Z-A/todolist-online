import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import {useAppDispatch, useAppSelector} from "../../app/store";
import {setErrorAC} from "../../app/app-reducer";

export default function CustomizedSnackbars() {
  const dispatch = useAppDispatch();
  const error = useAppSelector(state => state.app.error);
  
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setErrorAC(null))
  };
  1234
  return (
    <div>
      <Snackbar open={!!error} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" variant="filled" sx={{width: '100%'}}>
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
}