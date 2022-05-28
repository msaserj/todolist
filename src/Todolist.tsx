import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

import {FilterValueType} from "./App";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValueType) => void
    addTask: (title: string) => void
    changeTaskStatus: (id: string, isDone: boolean) => void
}


export const Todolist = (props: PropsType) => {
    // Хук для названия тасок
    let [title, setTitle] = useState("")
    let [error, setError] = useState<null | string>(null)


    const addTask = () => {
        if(title.trim() !== '') {
            props.addTask(title.trim())
            setTitle("")
        } else {
            setError("Title is required")
        }
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
    const onAllClickHandler = () => {
        props.changeFilter("all")
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active")
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed")
    }

    return (
        <div>
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
                      props.removeTask(task.id)
                    }
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                      let newIsDoneValue = e.currentTarget.checked
                        props.changeTaskStatus(task.id, newIsDoneValue)
                    }
                    return (
                        <li key={task.id}>
                            <input type="checkbox" onChange={onChangeHandler} checked={task.isDone}/>
                            <span>{task.title}</span>
                            <button onClick={onClickHandler}>✖</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All
                </button>
                <button onClick={onActiveClickHandler}>Active
                </button>
                <button onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}