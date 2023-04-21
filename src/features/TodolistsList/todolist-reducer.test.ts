import { v1 } from "uuid";
import {
  addTodolistTC,

  changeTodolistEntityStatusAC,
  changeTodolistFilterAC, changeTodolistTitleTC,
  fetchTodolistsTC,
  FilterValueType, removeTodolistTC,
  TodolistDomainType,
  todolistReducer,
} from "./todolist-reducer";
import { TodolistType } from "../../api/todolists-api";
import { RequestStatusType } from "../../App/app-reducer";

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodolistDomainType>;

beforeEach(() => {
  todolistId1 = v1();
  todolistId2 = v1();
  startState = [
    {
      id: todolistId1,
      title: "What to learn",
      filter: "all",
      addedData: "",
      order: 0,
      entityStatus: "idle",
    },
    {
      id: todolistId2,
      title: "What to buy",
      filter: "all",
      addedData: "",
      order: 0,
      entityStatus: "idle",
    },
  ];
});

test("correct todolist should be removed", () => {
  const endState = todolistReducer(
    startState,
    removeTodolistTC.fulfilled({ todolistId: todolistId1 }, 'requestId', 'todolistId1')
  );
  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});

test("correct todolist should be added", () => {
  let todolist: TodolistType = {
    title: "New Todolist",
    id: "any",
    addedData: "",
    order: 0,
  };

  const endState = todolistReducer(startState, addTodolistTC.fulfilled({ todolist }, 'requestId', todolist.title));
  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe(todolist.title);
  expect(endState[2].filter).toBe("all");
});

test("correct todolist should change its name", () => {
  let newTodolistTitle = "New Todolist";
  const payload = {
    todolistId: todolistId2,
    title: newTodolistTitle,
  }
  const action = changeTodolistTitleTC.fulfilled(payload, 'requestId', payload);
  const endState = todolistReducer(startState, action);
  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(newTodolistTitle);
});

test("correct filter of todolist should be changed", () => {
  let newFilter: FilterValueType = "completed";

  const action = changeTodolistFilterAC({
    todolistId: todolistId2,
    filter: newFilter,
  });
  const endState = todolistReducer(startState, action);
  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe(newFilter);
});
test("todolists should be set to the state", () => {
  const action = fetchTodolistsTC.fulfilled({ todolists: startState }, "requestId");
  const endState = todolistReducer([], action);
  expect(endState.length).toBe(2);
});

test("correct entityStatus of todolist should be changed", () => {
  let newEntity: RequestStatusType = "loading";

  const action = changeTodolistEntityStatusAC({
    todolistId: todolistId2,
    status: newEntity,
  });
  const endState = todolistReducer(startState, action);
  expect(endState[0].entityStatus).toBe("idle");
  expect(endState[1].entityStatus).toBe(newEntity);
});
