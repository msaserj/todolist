import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

import {FilterValueType} from "./App";

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
    filter: FilterValueType
    removeTodolist: (id: string) => void
}


export const Todolist = (props: PropsType) => {
    // Хук для названия тасок
    let [title, setTitle] = useState("")
    let [error, setError] = useState<null | string>(null)


    const addTask = () => {
        if(title.trim() !== '') {
            props.addTask(title.trim(), props.todolistID)
            setTitle("")
        } else {
            setError("Title is required")
        }
    }

    const removeTodolistHandler = () => {
        props.removeTodolist(props.id)
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === "Enter") {
            addTask()

        }
    }
    const onAllClickHandler = () => props.changeFilter(props.todolistID, "all");
    const onActiveClickHandler = () => props.changeFilter(props.todolistID,"active");
    const onCompletedClickHandler = () => props.changeFilter(props.todolistID,"completed");

    return (
        <div>
            <button onClick={removeTodolistHandler}>✖</button>
            <h3>{props.title}</h3>
            <div>
                <input
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    value={title}
                    className={error? "error": ""}
                />
                <button onClick={addTask}>+</button>
                {error && <div className="error-message">{error}</div>}
            </div>
            <ul>
                {props.tasks.map((task) => {
                    const onClickHandler = () => {
                      props.removeTask(task.id, props.todolistID)
                    }
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                      let newIsDoneValue = e.currentTarget.checked
                        props.changeTaskStatus(task.id, newIsDoneValue, props.todolistID)
                    }
                    return (
                        <li className={task.isDone? "is-done": ""} key={task.id}>
                            <input type="checkbox" onChange={onChangeHandler} checked={task.isDone}/>
                            <span>{task.title}</span>
                            <button onClick={onClickHandler}>✖</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button className={props.filter === "all" ? "active-filter" : ""} onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === "active" ? "active-filter" : ""} onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === "completed" ? "active-filter" : ""} onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}