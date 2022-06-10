import React from "react";
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";

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
              task={{id: '1', isDone: true, title: "css"}}
              todolistId={"todolistId1"}
        />
        <Task changeTaskStatus={changeTaskStatusCallBack}
              changeTaskTitle={changeTaskTitleCallBack}
              removeTask={removeTaskCallBack}
              task={{id: '2', isDone: false, title: "html"}}
              todolistId={'todolistId1'}
        />
    </>
}