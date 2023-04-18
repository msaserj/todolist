import {
  changeTodolistTitleAC,
  addTodolistAC,
  removeTodolistAC,
  setTodolistsAC,
} from "./todolist-reducer";
import {
  TaskType,
  todolistsAPI,
  UpdateTaskModelType,
} from "../../api/todolists-api";
import { AppThunk, RootState } from "../../App/store";
import { Dispatch } from "redux";
import { setAppStatusAC } from "../../App/app-reducer";
import {
  handleNetworkAppError,
  handleServerAppError,
} from "../../utils/error-utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: TasksStateType = {};

// reducers
const slice = createSlice({
  name: "tasks",
  initialState: initialState,
  reducers: {
    removeTaskAC(
      state,
      action: PayloadAction<{ todolistId: string; taskId: string }>
    ) {
      const tasks = state[action.payload.todolistId];
      const index = tasks.findIndex((t) => t.id === action.payload.taskId);
      if (index > -1) {
        tasks.splice(index, 1);
      }
    },
    addTaskAC(state, action: PayloadAction<TaskType>) {
      state[action.payload.todoListId].push(action.payload);
    },
    updateTaskAC(
      state,
      action: PayloadAction<{
        todolistId: string;
        taskId: string;
        model: UpdateDomainTaskModelType;
      }>
    ) {
      const tasks = state[action.payload.todolistId];
      const index = tasks.findIndex((t) => t.id === action.payload.taskId);
      if (index > -1) {
        tasks[index] = { ...tasks[index], ...action.payload.model };
      }
    },
    setTasksAC(
      state,
      action: PayloadAction<{ tasks: Array<TaskType>; todolistId: string }>
    ) {
      state[action.payload.todolistId] = action.payload.tasks;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addTodolistAC, (state, action) => {
      state[action.payload.todolist.id] = [];
    });
    builder.addCase(removeTodolistAC, (state, action) => {
      delete state[action.payload.todolistId];
    });
    builder.addCase(setTodolistsAC, (state, action) => {
      action.payload.todolists.forEach((tl) => {
        state[tl.id] = [];
      });
    });
  },
});

export const taskReducer = slice.reducer;
// ActionCreators
export const { updateTaskAC, removeTaskAC, setTasksAC, addTaskAC } =
  slice.actions;

// sanki
export const fetchTasksTC =
  (todolistId: string): AppThunk =>
  (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({ status: "loading" }));
    todolistsAPI
      .getTasks(todolistId)
      .then((res) => {
        dispatch(setTasksAC({ tasks: res.data.items, todolistId }));
        dispatch(setAppStatusAC({ status: "succeeded" }));
      })
      .catch((err) => {
        handleNetworkAppError(err, dispatch);
      });
  };
export const removeTaskTC =
  (todolistId: string, taskId: string): AppThunk =>
  (dispatch: Dispatch) => {
    todolistsAPI
      .deleteTask(todolistId, taskId)
      .then(() => {
        dispatch(removeTaskAC({ todolistId, taskId }));
      })
      .catch((err) => {
        handleNetworkAppError(err, dispatch);
      });
  };
export const addTaskTC =
  (todolistId: string, title: string): AppThunk =>
  (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({ status: "loading" }));
    todolistsAPI
      .createTask(todolistId, title)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(addTaskAC(res.data.data.item));
          dispatch(setAppStatusAC({ status: "succeeded" }));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((err) => {
        handleNetworkAppError(err, dispatch);
      });
  };
export const changeTodolistTitleTC =
  (todolistId: string, title: string): AppThunk =>
  (dispatch: Dispatch) => {
    todolistsAPI
      .updateTodolist(todolistId, title)
      .then(() => {
        dispatch(changeTodolistTitleAC({ todolistId, title }));
      })
      .catch((err) => {
        handleNetworkAppError(err, dispatch);
      });
  };
export type UpdateDomainTaskModelType = {
  title?: string;
  description?: string;
  status?: number;
  priority?: number;
  startDate?: string;
  deadline?: string;
};
export const updateTaskTC =
  (
    todolistId: string,
    taskId: string,
    domainModel: UpdateDomainTaskModelType
  ): AppThunk =>
  (dispatch: Dispatch, getState: () => RootState) => {
    const state = getState();
    const task = state.tasks[todolistId].find((t) => t.id === taskId);
    if (!task) {
      console.warn("task not found");
      return;
    }
    const apiModel: UpdateTaskModelType = {
      status: task.status,
      title: task.title,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
      ...domainModel,
    };
    todolistsAPI
      .updateTask(todolistId, taskId, apiModel)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(updateTaskAC({ todolistId, taskId, model: domainModel }));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((err) => {
        handleNetworkAppError(err, dispatch);
      });
  };

// types

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};
