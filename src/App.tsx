import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValueType = "all" | "active" | "completed"
type TodolistsType = {
    id: string
    title: string
    filter: FilterValueType
}

function App() {
    // стейт значений отфильтрованных тасок
    // let [filter, setFilter] = useState<FilterValueType>('all')
    // стейт с названиями таск-листов
    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
            {id: v1(), title: 'What to learn', filter: 'all'},
            {id: v1(), title: 'What to buy', filter: 'all'},
        ])
    // стейт с тасками
    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false}
    ])
    // удаление тасок. Фильтром пробегаемся, получаем новый массив тасок без одной и сетаем его
    const removeTask = (id: string) => {
        tasks = tasks.filter(task => task.id !== id)
        setTasks(tasks)
    }

    // меняем стейт значений отфильтрованных тасок
    const changeFilter = (todolistID: string, value: FilterValueType) => {
        let todolist = todolists.find(tdl => tdl.id === todolistID)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }

    //добавляем новые таски (объекты тасок)
    const addTask = (title: string) => {
      let task = {id: v1(), title: title, isDone: false}
        let newTasks = [task, ...tasks]
        setTasks(newTasks)
    }

    const changeTaskStatus = (id: string, isDone: boolean) => {
      let task = tasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
            setTasks([...tasks])
        }
    }

    return (
        <div className="App">
            {todolists.map(tdl => {
                // фильтруем таски all completed active
                let tasksForTodoList = tasks // храним отфильтрованные таски. по умолчанию all
                if (tdl.filter === "active") {
                    tasksForTodoList = tasks.filter(task => !task.isDone)
                } else if (tdl.filter === "completed") {
                    tasksForTodoList = tasks.filter(task => task.isDone)
                }
                return(
                    <Todolist
                        key={tdl.id}
                        id={tdl.id}
                        title={tdl.title}
                        tasks={tasksForTodoList}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        filter={tdl.filter}
                        todolistID={tdl.id}/>
                )
            })}


        </div>
    );
}

export default App;
