import { Provider } from "react-redux";
import React from "react";
import { combineReducers } from "redux";
import { todolistReducer } from "../../features/TodolistsList";
import { taskReducer } from "../../features/TodolistsList";
import { appReducer } from "../../features/App";

import { authReducer } from "../../features/Auth";
import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";

import { HashRouter } from "react-router-dom";
import { RootReducerType, RootState } from "../../utils/types";
import { TaskPriorities, TaskStatuses } from "../../api/types";

const rootReducer: RootReducerType = combineReducers({
  todolists: todolistReducer,
  tasks: taskReducer,
  app: appReducer,
  auth: authReducer,
});


const initialGlobalState: RootState = {
  todolists: [
    {
      id: "todolistID1",
      title: "What to learn",
      filter: "all",
      addedData: "",
      order: 0,
      entityStatus: "idle",
    },
    {
      id: "todolistID2",
      title: "What to buy",
      filter: "all",
      addedData: "",
      order: 0,
      entityStatus: "loading",
    },
  ],
  tasks: {
    todolistID1: [
      {
        id: "1",
        title: "CSS",
        status: TaskStatuses.Completed,
        todoListId: "todolistID1",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: "2",
        title: "JS",
        status: TaskStatuses.Completed,
        todoListId: "todolistID1",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
    ],
    todolistID2: [
      {
        id: "1",
        title: "bread",
        status: TaskStatuses.Completed,
        todoListId: "todolistID2",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: "2",
        title: "milk",
        status: TaskStatuses.Completed,
        todoListId: "todolistID2",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
    ],
  },
  app: {
    error: null,
    status: "succeeded",
    isInitialized: true,
  },
  auth: { isLoggedIn: true },
};

export const storyBookStore = configureStore({
  reducer: rootReducer,
  preloadedState: initialGlobalState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(thunkMiddleware),
});

export const ReduxStoreProviderDecorator = (storyFn: any) => {
  return <Provider store={storyBookStore}> {storyFn()}</Provider>;
};
export const BrowserRouterDecorator = (storyFn: any) => {
  return <HashRouter> {storyFn()}</HashRouter>;
};
