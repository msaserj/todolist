import { todolistsAPI, TodolistType } from "../../api/todolists-api";
import { Dispatch } from "redux";
import { AppThunk } from "../../App/store";
import { RequestStatusType, setAppStatusAC } from "../../App/app-reducer";
import { handleNetworkAppError } from "../../utils/error-utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// init state
const initialState: Array<TodolistDomainType> = [];

// reducers
const slice = createSlice({
  name: "todolists",
  initialState: initialState,
  reducers: {
    removeTodolistAC(state, action: PayloadAction<{ todolistId: string }>) {
      const index = state.findIndex(
        (tdl) => tdl.id === action.payload.todolistId
      );
      if (index > -1) {
        state.splice(index, 1);
      }
    },
    addTodolistAC(state, action: PayloadAction<{ todolist: TodolistType }>) {
      state.unshift({
        ...action.payload.todolist,
        filter: "all",
        entityStatus: "idle",
      });
    },
    changeTodolistTitleAC(
      state,
      action: PayloadAction<{ todolistId: string; title: string }>
    ) {
      const index = state.findIndex(
        (tdl) => tdl.id === action.payload.todolistId
      );
      state[index].title = action.payload.title;
    },
    changeTodolistFilterAC(
      state,
      action: PayloadAction<{ todolistId: string; filter: FilterValueType }>
    ) {
      const index = state.findIndex(
        (tdl) => tdl.id === action.payload.todolistId
      );
      state[index].filter = action.payload.filter;
    },
    changeTodolistEntityStatusAC(
      state,
      action: PayloadAction<{ todolistId: string; status: RequestStatusType }>
    ) {
      const index = state.findIndex(
        (tdl) => tdl.id === action.payload.todolistId
      );
      state[index].entityStatus = action.payload.status;
    },
    setTodolistsAC(state, action: PayloadAction<{ todolists: Array<TodolistType> }>) {
      return action.payload.todolists.map((tl) => ({...tl, filter: "all", entityStatus: "idle",}));
    },
  },
});

export const todolistReducer = slice.reducer;
// ActionCreators
export const {
  changeTodolistTitleAC,
  changeTodolistFilterAC,
  removeTodolistAC,
  setTodolistsAC,
  changeTodolistEntityStatusAC,
  addTodolistAC,
} = slice.actions;

//sanki
export const fetchTodolistsTC = (): AppThunk => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({ status: "loading" }));
  todolistsAPI
    .getTodolists()
    .then((res) => {
      dispatch(setTodolistsAC({ todolists: res.data }));
      dispatch(setAppStatusAC({ status: "succeeded" }));
    })
    .catch((err) => {
      handleNetworkAppError(err, dispatch);
    });
};
export const removeTodolistTC =
  (todolistId: string): AppThunk =>
  (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({ status: "loading" }));
    dispatch(changeTodolistEntityStatusAC({ todolistId, status: "loading" }));
    todolistsAPI
      .deleteTodolists(todolistId)
      .then(() => {
        dispatch(removeTodolistAC({ todolistId }));
        dispatch(setAppStatusAC({ status: "succeeded" }));
      })
      .catch((err) => {
        handleNetworkAppError(err, dispatch);
      });
  };
export const addTodolistTC =
  (title: string): AppThunk =>
  (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({ status: "loading" }));
    todolistsAPI
      .createTodolists(title)
      .then((res) => {
        dispatch(addTodolistAC({ todolist: res.data.data.item }));
        dispatch(setAppStatusAC({ status: "succeeded" }));
      })
      .catch((err) => {
        handleNetworkAppError(err, dispatch);
      });
  };
export const changeTodolistTitleTC =
  (todolistId: string, title: string): AppThunk =>
  (dispatch: Dispatch) => {
    todolistsAPI.updateTodolist(todolistId, title).then(() => {
      dispatch(changeTodolistTitleAC({ todolistId, title }));
    });
  };

// types
export type FilterValueType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
  filter: FilterValueType;
  entityStatus: RequestStatusType;
};
