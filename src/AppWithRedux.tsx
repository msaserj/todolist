import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from "./components/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistReducer
} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, taskReducer} from "./state/task-reducer";

export type FilterValueType = "all" | "active" | "completed"

export type TodolistsType = {
    id: string
    title: string
    filter: FilterValueType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    //todolists
    let [todolists, dispatchToTodolistsReducer] = useReducer(todolistReducer,[
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, dispatchToTasksReducer] = useReducer(taskReducer,{
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
    // tasks
    const removeTask = (id: string, todolistID: string) => {
       dispatchToTasksReducer(removeTaskAC(id, todolistID))
    }
    const addTask = (title: string, todolistID: string) => {
        dispatchToTasksReducer(addTaskAC(title, todolistID))
    }
    const changeTaskStatus = (id: string, isDone: boolean, todolistID: string) => {
       dispatchToTasksReducer(changeTaskStatusAC(id, isDone, todolistID))

    }
    const changeTaskTitle = (id: string, newTitle: string, todolistID: string) => {
        dispatchToTasksReducer(changeTaskTitleAC(id, newTitle , todolistID))
    }

    const changeFilter = (todolistID: string, value: FilterValueType) => {
        dispatchToTodolistsReducer(changeTodolistFilterAC(todolistID, value))
    }
    const removeTodolist = (id: string) => {
        const action = removeTodolistAC(id)
        dispatchToTasksReducer(action)
        dispatchToTodolistsReducer(action)
    }
    const changeTodolistTitle = (id: string, newTitle: string) => {
        const action = changeTodolistTitleAC(id, newTitle)
        dispatchToTodolistsReducer(action)
    }
    const addTodoList = (title: string) => {
        const action = addTodolistAC(title)
        dispatchToTodolistsReducer(action)
        dispatchToTasksReducer(action)
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
                            tasksForTodoList = allTodolistTasks.filter(task => !task.isDone)
                        } else if (tdl.filter === "completed") {
                            tasksForTodoList = allTodolistTasks.filter(task => task.isDone)
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

export default AppWithRedux;
