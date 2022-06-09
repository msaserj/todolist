import React, {ChangeEvent, useCallback} from "react";
import {Checkbox} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskType} from "./Todolist";

type TaskPropsType = {
    changeTaskStatus: (id: string, isDone: boolean, todolistID: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistID: string) => void
    removeTask: (taskId: string, todolistID: string) => void
    task: TaskType
    todolistId: string
}
export const Task = React.memo((props: TaskPropsType) => {
    const onClickHandler = () => {
        props.removeTask(props.task.id, props.todolistId)
    }
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        props.changeTaskStatus(props.task.id, newIsDoneValue, props.todolistId)
    }
    const onChangeTitleHandler = useCallback((newTitle: string) => {
        props.changeTaskTitle(props.task.id, newTitle, props.todolistId)
    },[props.task.id, props.changeTaskTitle, props.todolistId])
    return (
        <li className={props.task.isDone ? "is-done" : ""} key={props.task.id}>
            <div className="tasks">
                <Checkbox color={"secondary"} onChange={onChangeStatusHandler} checked={props.task.isDone}/>
                <EditableSpan title={props.task.title} onChange={onChangeTitleHandler}/>
                {/*<span>{task.title}</span>*/}
                <IconButton onClick={onClickHandler}>
                    <DeleteIcon/>
                </IconButton>
                {/*<button onClick={onClickHandler}>✖</button>*/}
            </div>
        </li>
    )
})