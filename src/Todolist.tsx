import React, {useState} from "react";
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
}


export const Todolist = (props: PropsType) => {
    let [title, setTitle] = useState("")
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input onChange={(event => setTitle(event.currentTarget.value))} value={title}/>
                <button onClick={()=> {props.addTask(title)}}>+</button>
            </div>
            <ul>
                {props.tasks.map((task) => {
                    return (
                        <li key={task.id}>
                            <input type="checkbox" checked={task.isDone}/>
                            <span>{task.title}</span>
                            <button onClick={()=> {props.removeTask(task.id)}}>✖</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={() => {props.changeFilter("all")}}>All</button>
                <button onClick={() => {props.changeFilter("active")}}>Active</button>
                <button onClick={() => {props.changeFilter("completed")}}>Completed</button>
            </div>
        </div>
    )
}