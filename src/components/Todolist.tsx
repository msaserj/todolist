import React, {ChangeEvent} from 'react';

import {FilterValueType} from "../App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    todolistID: string
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistID: string) => void
    changeFilter: (todolistID: string, value: FilterValueType) => void
    addTask: (title: string, todolistID: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistID: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistID: string) => void
    filter: FilterValueType
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
}


export const Todolist = (props: PropsType) => {
    // всё переехало в отдельную универсальную компоненту
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    const removeTodolistHandler = () => {
        props.removeTodolist(props.id)
    }
    const changeTodolistTitle = (newTitle: string,) => {
        props.changeTodolistTitle(props.id, newTitle)
    }

    const onAllClickHandler = () => props.changeFilter(props.todolistID, "all");
    const onActiveClickHandler = () => props.changeFilter(props.todolistID, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.todolistID, "completed");

    return (
        <div>

            <button onClick={removeTodolistHandler}>✖</button>
            <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/></h3>

            <div>
                {/*universal component*/}
                <AddItemForm addItem={addTask}/>
            </div>
            <ul>
                {props.tasks.map((task) => {
                    const onClickHandler = () => {
                        props.removeTask(task.id, props.todolistID)
                    }
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked
                        props.changeTaskStatus(task.id, newIsDoneValue, props.todolistID)
                    }
                    const onChangeTitleHandler = (newTitle: string) => {
                        props.changeTaskTitle(task.id, newTitle, props.todolistID)
                    }


                    return (
                        <li className={task.isDone ? "is-done" : ""} key={task.id}>
                            <input type="checkbox" onChange={onChangeStatusHandler} checked={task.isDone}/>
                            <EditableSpan title={task.title} onChange={onChangeTitleHandler}/>
                            {/*<span>{task.title}</span>*/}
                            <button onClick={onClickHandler}>✖</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button className={props.filter === "all" ? "active-filter" : ""} onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === "active" ? "active-filter" : ""}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === "completed" ? "active-filter" : ""}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}