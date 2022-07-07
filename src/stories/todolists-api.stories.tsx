import React, {useEffect, useState} from 'react'
import axios from 'axios'


export default {
    title: 'API'
}
const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "308995b0-279e-454d-86b5-76d8f685d1ee"
    }
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
            .then((res) => {
                console.log(res.status)
                setState(res.data)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title: "NEWWWTitle"}, settings)
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
        const todolistId = 'd47c7eb4-23b3-41f5-880a-9eb115183254';
        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings)
            .then((res) => {
                console.log(res.status)
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'd47c7eb4-23b3-41f5-880a-9eb115183254'
        axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title: "SUPER"}, settings)
            .then((res) => {
                console.log(res.status)
                setState(res.data)
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}

