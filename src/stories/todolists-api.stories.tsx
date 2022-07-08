import React, {useEffect, useState} from 'react'
import {todolistsAPI} from "../api/todolists-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        todolistsAPI.getTodolists()
            .then((res)=> {
                setState(res.data)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.createTodolists("MEGA_List")
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'b2b5c8b4-5c7a-4727-ac22-c3eeb40305f1'
        todolistsAPI.updateTodolist(todolistId, "MEGA-UPDATE")
            .then((res) => {
                console.log(res.status)
                setState(res.data)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '8b21800d-9b2f-42d1-a209-5e2deb8bd90c';
        todolistsAPI.deleteTodolists(todolistId)
            .then((res) => {
                console.log(res.status)
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)
    const getTasks = () => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        todolistsAPI.getTasks(todolistId)
            .then((res)=> {
                setState(res.data.items)
            })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder="todolistId" value={todolistId}
                   onChange={(e)=>{setTodolistId(e.currentTarget.value)}} />
            <button onClick={getTasks}>Get Task</button>
        </div>
    </div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskTitle, setTaskTitle] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)
    const createTask = () => {
        todolistsAPI.createTask(todolistId, taskTitle)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
    <div>
        <input placeholder="todolistId" value={todolistId}
        onChange={(e)=>{setTodolistId(e.currentTarget.value)}} />
        <input placeholder="TaskTitle" value={taskTitle}
        onChange={(e)=>{setTaskTitle(e.currentTarget.value)}} />
        <button onClick={createTask}>Create Task</button>
    </div>
    </div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('MyTask')
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    const [description, setDescription] = useState<string>('MyTaskDescription')
    const [status, setStatus] = useState<number>(0)
    const [priority, setPriority] = useState<number>(0)
    const [startData, setStartData] = useState<string>('')
    const [deadLine, setDeadLine] = useState<string>('')
    const createTask = () => {
        todolistsAPI.updateTask(todolistId, taskId, {
            deadline: deadLine,
            description: description,
            priority: priority,
            startDate: startData,
            status: status,
            title: title
        })
            .then((res) => {
                setState(res.data)
            })
        // 12534a05-5c3e-40f2-a8ac-e2da67aea32b
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder="TodolistId" value={todolistId} onChange={(e)=>{setTodolistId(e.currentTarget.value)}} />
            <input placeholder="TaskId" value={taskId} onChange={(e)=>{setTaskId(e.currentTarget.value)}} />

            <input placeholder="TaskTitle" value={title} onChange={(e)=>{setTitle(e.currentTarget.value)}} />
            <input placeholder="TaskDescription" value={description} onChange={(e)=>{setDescription(e.currentTarget.value)}} />
            <input placeholder="TaskStatus" value={status} type="number" onChange={(e)=>{setStatus(+e.currentTarget.value)}} />
            <input placeholder="TaskPriority" value={priority} type="number" onChange={(e)=>{setPriority(+e.currentTarget.value)}} />
            <button onClick={createTask}>Update Task</button>
        </div>
    </div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    const DeleteTask = () => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        todolistsAPI.deleteTask(todolistId, taskId)
            .then((res)=> {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder="todolistId" value={todolistId}
                   onChange={(e)=>{setTodolistId(e.currentTarget.value)}} />
            <input placeholder="TaskId" value={taskId}
                   onChange={(e)=>{setTaskId(e.currentTarget.value)}} />
            <button onClick={DeleteTask}>Create Task</button>
        </div>
    </div>
}



