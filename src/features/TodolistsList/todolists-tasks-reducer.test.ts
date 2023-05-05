import { todolistReducer, todoListsActions } from "./";
import { taskReducer } from "./";

import { TasksStateType } from "./task-reducer";
import { TodolistDomainType } from "./todolist-reducer";

test("ids should be equals", () => {
  const startTasksState: TasksStateType = {};
  const startTodolistsState: Array<TodolistDomainType> = [];
  const payload = {
    todolist: {
      id: "any",
      order: 0,
      addedData: "",
      title: "new title",
    },
  };
  const action = todoListsActions.addTodoList.fulfilled(
    payload,
    "requestId",
    payload.todolist.title
  );

  const endTasksState = taskReducer(startTasksState, action);
  const endTodolistsState = todolistReducer(startTodolistsState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks).toBe(action.payload.todolist.id);
  expect(idFromTodolists).toBe(action.payload.todolist.id);
});
