import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValueType = "all" | "active" | "completed"

function App() {
    // стейт значений отфильтрованных тасок
    let [filter, setFilter] = useState<FilterValueType>('all')
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
    // фильтруем таски all completed active
    let tasksForTodoList = tasks // храним отфильтрованные таски. по умолчанию all
    if (filter === "active") {
        tasksForTodoList = tasks.filter(task => !task.isDone)
    } else if (filter === "completed") {
        tasksForTodoList = tasks.filter(task => task.isDone)
    }
    // меняем стейт значений отфильтрованных тасок
    const changeFilter = (value: FilterValueType) => {
      setFilter(value)
    }

    return (
        <div className="App">
            <Todolist
                title="What to learn?"
                tasks={tasksForTodoList}
                removeTask={removeTask}
                changeFilter={changeFilter}/>
        </div>
    );
}

export default App;
