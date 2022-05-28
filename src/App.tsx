import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type FilterValueType = "all" | "active" | "completed"

function App() {
    // стейт значений отфильтрованных тасок
    let [filter, setFilter] = useState<FilterValueType>('all')
    // стейт с тасками
    let [tasks, setTasks] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "Rest API", isDone: false},
        {id: 5, title: "GraphQL", isDone: false}
    ])
    // удаление тасок. Фильтром пробегаемся, получаем новый массив тасок без одной и сетаем его
    const removeTask = (id: number) => {
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
