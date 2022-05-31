import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./components/Todolist";
import {v1} from "uuid";

export type FilterValueType = "all" | "active" | "completed"
type TodolistsType = {
    id: string
    title: string
    filter: FilterValueType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })

    // удаление тасок. Фильтром пробегаемся, получаем новый массив тасок без одной и сетаем его
    const removeTask = (id: string, todolistID: string) => {
        let todolistTasks = tasks[todolistID]
        tasks[todolistID] = todolistTasks.filter(task => task.id !== id)
        setTasks({...tasks})
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
    const addTask = (title: string, todolistID: string) => {
      let task = {id: v1(), title: title, isDone: false}
        let todolistTasks = tasks[todolistID]
        tasks[todolistID] = [task, ...todolistTasks]
        setTasks({...tasks})
    }

    const changeTaskStatus = (id: string, isDone: boolean, todolistID: string) => {
        let todolistTasks = tasks[todolistID]
      let task = todolistTasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }
    const removeTodolist = (id: string) => {
        // добавим в стейт список тудулистов, ид которых не равны удаляемым.
        setTodolists(todolists.filter(tdl => tdl.id !== id))
        // удалим таски для этого тудулиста из второго стейта где хранятся таски
        delete tasks[id]
        // сетаем в стейт копию объекта и отрисовываем
        setTasks({...tasks})
    }



    return (
        <div className="App">
            {todolists.map(tdl => {
                let allTodolistTasks = tasks[tdl.id]
                let tasksForTodoList = allTodolistTasks // храним отфильтрованные таски. по умолчанию all
                if (tdl.filter === "active") {
                    tasksForTodoList = allTodolistTasks.filter(task => !task.isDone)
                } else if (tdl.filter === "completed") {
                    tasksForTodoList = allTodolistTasks.filter(task => task.isDone)
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
                        todolistID={tdl.id}
                        removeTodolist={removeTodolist}
                    />
                )
            })}


        </div>
    );
}

export default App;
