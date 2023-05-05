import { TodolistsList } from "./TodolistsList";
import { asyncActions as tasksAsyncActions } from "./task-reducer";
import { asyncActions as todoListsAsyncActions } from "./todolist-reducer";
import { slice as todolistsSlice } from "./todolist-reducer";
import { slice as tasksSlice } from "./task-reducer";

const todoListsActions = {
  ...todoListsAsyncActions,
  ...todolistsSlice.actions,
};

const tasksActions = {
  ...tasksAsyncActions,
  ...tasksSlice.actions,
};

const todolistReducer = todolistsSlice.reducer;
const taskReducer = tasksSlice.reducer;

export {
  TodolistsList,
  tasksActions,
  todoListsActions,
  todolistReducer,
  taskReducer,
};
