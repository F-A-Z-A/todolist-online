import { appActions } from "app/app.reducer";
import { handleServerNetworkError } from "common/utils/handle-server-network-error";
import { AppDispatch, AppRootStateType } from "app/store";
import { BaseResponse } from "common/types";
import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";

// Promise

export const thunkTryCatch = async <T>(
  thunkAPI: BaseThunkAPI<AppRootStateType, unknown, AppDispatch, null | BaseResponse>,
  logic: () => Promise<T>,
): Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>> => {
  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    dispatch(appActions.setAppStatus({ status: "loading" }));
    return await logic();
  } catch (e) {
    handleServerNetworkError(e, dispatch);
    return rejectWithValue(null);
  } finally {
    dispatch(appActions.setAppStatus({ status: "idle" }));
  }
};
