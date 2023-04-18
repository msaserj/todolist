import {
  addTodolistAC,
  TodolistDomainType,
  todolistReducer,
} from "./todolist-reducer";
import { taskReducer, TasksStateType } from "./task-reducer";

test("ids should be equals", () => {
  const startTasksState: TasksStateType = {};
  const startTodolistsState: Array<TodolistDomainType> = [];
  const action = addTodolistAC({
    todolist: {
      id: "any",
      order: 0,
      addedData: "",
      title: "new title",
    },
  });

  const endTasksState = taskReducer(startTasksState, action);
  const endTodolistsState = todolistReducer(startTodolistsState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks).toBe(action.payload.todolist.id);
  expect(idFromTodolists).toBe(action.payload.todolist.id);
});
