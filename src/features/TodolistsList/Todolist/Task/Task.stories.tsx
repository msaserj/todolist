import React from "react";
import { Task } from "./Task";
import { TaskPriorities, TaskStatuses } from "../../../../api/todolists-api";
import {
    BrowserRouterDecorator,
    ReduxStoreProviderDecorator
} from "../../../../stories/decorators/ReduxStoreProviderDecorator";

export default {
  title: "Task Component",
  component: Task,
    decorators: [ReduxStoreProviderDecorator, BrowserRouterDecorator]
};


export const TaskBaseExample = () => {
  return (
    <>
      <Task
        task={{
          id: "1",
          status: TaskStatuses.Completed,
          title: "css",
          todoListId: "todolistID1",
          description: "",
          startDate: "",
          deadline: "",
          addedDate: "",
          order: 0,
          priority: TaskPriorities.Low,
        }}
        todolistId={"todolistId1"}
      />
      <Task
        task={{
          id: "2",
          status: TaskStatuses.New,
          title: "html",
          todoListId: "todolistID2",
          description: "",
          startDate: "",
          deadline: "",
          addedDate: "",
          order: 0,
          priority: TaskPriorities.Low,
        }}
        todolistId={"todolistId1"}
      />
    </>
  );
};
