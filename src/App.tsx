import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import {TaskPriorities, TaskStatuses, TaskType} from "./api/todolists-api";
import {FilterValueType, TodolistDomainType} from "./state/todolist-reducer";


// export type TodolistsType = {
//     id: string
//     title: string
//     filter: FilterValueType
// }

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistDomainType>>([
        {id: todolistID1, title: "What to learn", filter: "all", addedData: '', order: 0},
        {id: todolistID1, title: "What to buy", filter: "all", addedData: '', order: 0}
        ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS',status: TaskStatuses.Completed, todoListId: todolistID1, description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: v1(), title: 'JS', status: TaskStatuses.Completed, todoListId: todolistID1, description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: v1(), title: 'ReactJS', status: TaskStatuses.Completed, todoListId: todolistID1, description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', status: TaskStatuses.Completed, todoListId: todolistID2, description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: v1(), title: 'GraphQL', status: TaskStatuses.Completed, todoListId: todolistID2, description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
        ]
    })
    // tasks
    const removeTask = (id: string, todolistID: string) => {
        let todolistTasks = tasks[todolistID]
        tasks[todolistID] = todolistTasks.filter(task => task.id !== id)
        setTasks({...tasks})
    }
    const addTask = (title: string, todolistID: string) => {
        let task = {id: v1(), title: title, status: TaskStatuses.New, todoListId: todolistID, description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
        let todolistTasks = tasks[todolistID]
        tasks[todolistID] = [task, ...todolistTasks]
        setTasks({...tasks})
    }
    const changeTaskStatus = (id: string, status: TaskStatuses, todolistID: string) => {
        let todolistTasks = tasks[todolistID]
        let task = todolistTasks.find(t => t.id === id)
        if (task) {
            task.status = status
            setTasks({...tasks})
        }
    }
    const changeTaskTitle = (id: string, newTitle: string, todolistID: string) => {
        let todolistTasks = tasks[todolistID]
        let task = todolistTasks.find(t => t.id === id)
        if (task) {
            task.title = newTitle
            setTasks({...tasks})
        }
    }
    //todolists

    const changeFilter = (todolistID: string, value: FilterValueType) => {
        let todolist = todolists.find(tdl => tdl.id === todolistID)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
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
    const changeTodolistTitle = (id: string, newTitle: string) => {
        let todolist = todolists.find(tdl => tdl.id === id)
        if (todolist) {
            todolist.title = newTitle
            setTodolists([...todolists])
        }
    }
    const addTodoList = (title: string) => {
        let newTodolistId = v1()
        let newTodolist: TodolistDomainType = {id: newTodolistId, title: title, filter: 'all', addedData: '', order: 0}
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [newTodolistId]: []})
    }


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                {/*universal component*/}
                <Grid style={{padding: "20px"}} container>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map(tdl => {
                        let allTodolistTasks = tasks[tdl.id]
                        let tasksForTodoList = allTodolistTasks // храним отфильтрованные таски. по умолчанию all
                        if (tdl.filter === "active") {
                            tasksForTodoList = allTodolistTasks.filter(task => task.status === TaskStatuses.New)
                        } else if (tdl.filter === "completed") {
                            tasksForTodoList = allTodolistTasks.filter(task => task.status === TaskStatuses.Completed)
                        }
                        return (
                            <Grid item xs={12} md={6} xl={4}>
                                <Paper style={{padding: "10px"}} elevation={3}>
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
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}/>
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default App;