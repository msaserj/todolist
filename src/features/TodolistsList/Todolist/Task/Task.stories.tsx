import React from "react";
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";
import {TaskPriorities, TaskStatuses} from "../../../../api/todolists-api";

export default {
    title: 'Task Component',
    component: Task,
}

//const callback = action("Button 'add' was pressed inside form")
const changeTaskStatusCallBack = action("Status changed")
const changeTaskTitleCallBack = action("Title changed")
const removeTaskCallBack = action("Task was removed")


export const TaskBaseExample = (props: any) => {
    return <>
        <Task changeTaskStatus={changeTaskStatusCallBack}
              changeTaskTitle={changeTaskTitleCallBack}
              removeTask={removeTaskCallBack}
              task={{id: '1', status: TaskStatuses.Completed, title: "css", todoListId: "todolistID1", description: '',
                  startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}}
              todolistId={"todolistId1"}
        />
        <Task changeTaskStatus={changeTaskStatusCallBack}
              changeTaskTitle={changeTaskTitleCallBack}
              removeTask={removeTaskCallBack}
              task={{id: '2', status: TaskStatuses.New, title: "html", todoListId: "todolistID2", description: '',
                  startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}}
              todolistId={'todolistId1'}
        />
    </>
}