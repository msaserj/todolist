import { todolistsAPI } from "../../api/todolists-api";
import { RequestStatusType } from "../App";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { clearState, setAppStatus } from "../../common/actions/common.actions";
import {
  handleAsyncServerNetworkError,
  handleAsyncServerAppError,
} from "../../utils/error-utils";
import { ThunkErrorType } from "../../utils/types";
import { TodolistType } from "../../api/types";

//sanki
const fetchTodolists = createAsyncThunk<
  { todolists: TodolistType[] },
  undefined,
  ThunkErrorType
>("todolists/fetchTodoLists", async (param, { dispatch, rejectWithValue }) => {
  dispatch(setAppStatus({ status: "loading" }));
  try {
    const res = await todolistsAPI.getTodolists();
    dispatch(setAppStatus({ status: "succeeded" }));
    return { todolists: res.data };
  } catch (err: any) {
    return handleAsyncServerNetworkError(err, dispatch, rejectWithValue);
  }
});

const removeTodolist = createAsyncThunk<
  { todolistId: string },
  string,
  ThunkErrorType
>(
  "todolists/removeTodoList",
  async (todolistId, { dispatch, rejectWithValue }) => {
    dispatch(setAppStatus({ status: "loading" }));
    dispatch(changeTodolistEntityStatus({ todolistId, status: "loading" }));
    try {
      await todolistsAPI.deleteTodolists(todolistId);
      dispatch(setAppStatus({ status: "succeeded" }));
      return { todolistId };
    } catch (err: any) {
      return handleAsyncServerNetworkError(
        err,
        dispatch,
        rejectWithValue,
        false
      );
    }
  }
);
const addTodoList = createAsyncThunk<
  { todolist: TodolistType },
  string,
  ThunkErrorType
>("todolists/addTodoList", async (title, { dispatch, rejectWithValue }) => {
  dispatch(setAppStatus({ status: "loading" }));
  try {
    const res = await todolistsAPI.createTodolists(title);
    if (res.data.resultCode === 0) {
      dispatch(setAppStatus({ status: "succeeded" }));
      return { todolist: res.data.data.item };
    } else {
      return handleAsyncServerAppError(
        res.data,
        dispatch,
        rejectWithValue,
        false
      );
    }
  } catch (err: any) {
    return handleAsyncServerNetworkError(err, dispatch, rejectWithValue);
  }
});
const changeTodolistTitle = createAsyncThunk(
  "todolists/changeTodoListTitle",
  async (
    param: { todolistId: string; title: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const res = await todolistsAPI.updateTodolist(
        param.todolistId,
        param.title
      );
      if (res.data.resultCode === 0) {
        dispatch(setAppStatus({ status: "succeeded" }));
        return { todolistId: param.todolistId, title: param.title };
      } else {
        return handleAsyncServerAppError(res.data, dispatch, rejectWithValue);
      }
    } catch (err: any) {
      return handleAsyncServerNetworkError(
        err,
        dispatch,
        rejectWithValue,
        false
      );
    }
  }
);

export const asyncActions = {
  fetchTodolists,
  removeTodolist,
  addTodoList,
  changeTodolistTitle,
};

// reducers
export const slice = createSlice({
  name: "todolists",
  initialState: [] as TodolistDomainType[],
  reducers: {
    changeTodolistFilter(
      state,
      action: PayloadAction<{ todolistId: string; filter: FilterValueType }>
    ) {
      const index = state.findIndex(
        (tdl) => tdl.id === action.payload.todolistId
      );
      state[index].filter = action.payload.filter;
    },
    changeTodolistEntityStatus(
      state,
      action: PayloadAction<{ todolistId: string; status: RequestStatusType }>
    ) {
      const index = state.findIndex(
        (tdl) => tdl.id === action.payload.todolistId
      );
      state[index].entityStatus = action.payload.status;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(clearState, () => {
        return [];
      })
      .addCase(fetchTodolists.fulfilled, (state, action) => {
        return action.payload.todolists.map((tl) => ({
          ...tl,
          filter: "all",
          entityStatus: "idle",
        }));
      })
      .addCase(removeTodolist.fulfilled, (state, action) => {
        const index = state.findIndex(
          (tdl) => tdl.id === action.payload.todolistId
        );
        if (index > -1) {
          state.splice(index, 1);
        }
      })
      .addCase(addTodoList.fulfilled, (state, action) => {
        state.unshift({
          ...action.payload.todolist,
          filter: "all",
          entityStatus: "idle",
        });
      })
      .addCase(changeTodolistTitle.fulfilled, (state, action) => {
        const index = state.findIndex(
          (tdl) => tdl.id === action.payload.todolistId
        );
        state[index].title = action.payload.title;
      });
  },
});

const { changeTodolistEntityStatus } = slice.actions;

// types
export type FilterValueType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
  filter: FilterValueType;
  entityStatus: RequestStatusType;
};
