import { TaskPriorities, TaskStatuses } from "../../api/types";
import { taskReducer, tasksActions, todoListsActions } from "./";
import { TasksStateType } from "./task-reducer";

let startState: TasksStateType;
beforeEach(() => {
  startState = {
    todolistId1: [
      {
        id: "1",
        title: "CSS",
        status: TaskStatuses.New,
        todoListId: "todolistId1",
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
        todoListId: "todolistId1",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: "3",
        title: "React",
        status: TaskStatuses.New,
        todoListId: "todolistId1",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
    ],
    todolistId2: [
      {
        id: "1",
        title: "bread",
        status: TaskStatuses.New,
        todoListId: "todolistId2",
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
        todoListId: "todolistId2",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: "3",
        title: "tea",
        status: TaskStatuses.New,
        todoListId: "todolistId2",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
    ],
  };
});

test("correct task should be deleted from correct array", () => {
  let param = { todolistId: "todolistId2", taskId: "2" };
  const action = tasksActions.removeTask.fulfilled(param, "requestId", param);
  const endState = taskReducer(startState, action);

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(2);
  expect(endState["todolistId2"].every((t) => t.id !== "2")).toBeTruthy();
});

test("correct task should be added to correct array", () => {
  let task = {
    todoListId: "todolistId2",
    title: "salt",
    status: TaskStatuses.New,
    addedDate: "",
    deadline: "",
    description: "",
    order: 0,
    priority: 0,
    startDate: "",
    id: "1",
  };
  const param = { todolistId: task.todoListId, title: task.title };
  const action = tasksActions.addTask.fulfilled(task, "requestId", param);

  const endState = taskReducer(startState, action);

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(4);
  expect(endState["todolistId2"][0].id).toBeDefined();
  expect(endState["todolistId2"][3].title).toBe("salt");
  expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
});

test("status of specified task should be changed", () => {
  const updateModel = {
    todolistId: "todolistId2",
    taskId: "2",
    domainModel: { status: TaskStatuses.New },
  };
  const action = tasksActions.updateTask.fulfilled(
    updateModel,
    "requestId",
    updateModel
  );
  const endState = taskReducer(startState, action);

  expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New);
  expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed);
});

test("title of specified task should be changed", () => {
  const updateModel = {
    todolistId: "todolistId2",
    taskId: "2",
    domainModel: { title: "MilkyWay" },
  };

  const action = tasksActions.updateTask.fulfilled(
    updateModel,
    "requestId",
    updateModel
  );

  const endState = taskReducer(startState, action);

  expect(endState["todolistId2"][1].title).toBe("MilkyWay");
  expect(endState["todolistId1"][1].title).toBe("JS");
});

test("new property with new array should be added when new todolist is added", () => {
  const payload = {
    todolist: {
      id: "1",
      title: "new todolist",
      order: 0,
      addedData: "",
    },
  };
  const action = todoListsActions.addTodoList.fulfilled(
    payload,
    "requestId",
    payload.todolist.title
  );
  const endState = taskReducer(startState, action);

  const keys = Object.keys(endState);
  const newKey = keys.find((k) => k !== "todolistId1" && k !== "todolistId2");
  if (!newKey) {
    throw Error("new key should be added");
  }
  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});

test("property with todolistId should be deleted", () => {
  const action = todoListsActions.removeTodolist.fulfilled(
    { todolistId: "todolistId2" },
    "requestId",
    "todolistId2"
  );
  const endState = taskReducer(startState, action);
  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState["todolistId2"]).not.toBeDefined();
});
test("empty arrays should be added when we set todolists", () => {
  const action = todoListsActions.fetchTodolists.fulfilled(
    {
      todolists: [
        { id: "1", title: "What to learn", order: 0, addedData: "" },
        { id: "2", title: "What to buy", order: 0, addedData: "" },
      ],
    },
    "requestId",
    undefined
  );
  const endState = taskReducer({}, action);
  const keys = Object.keys(endState);

  expect(keys.length).toBe(2);
  expect(endState["1"]).toStrictEqual([]);
  expect(endState["2"]).toStrictEqual([]);
});
test("tasks should bee added for todolists", () => {
  const action = tasksActions.fetchTasks.fulfilled(
    {
      tasks: startState["todolistId1"],
      todolistId: "todolistId1",
    },
    "requestId",
    "todolistId1"
  );

  const endState = taskReducer(
    {
      todolistId2: [],
      todolistId1: [],
    },
    action
  );

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(0);
});
