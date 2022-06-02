import React from 'react';
import './App.css';
import {TaskType, Todolist} from "./components/Todolist";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/task-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";

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

    const dispatch = useDispatch();
    const todolists = useSelector<AppRootState, Array<TodolistsType>>(state => state.todolists)
    const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)


    // tasks
    const removeTask = (id: string, todolistID: string) => {
        dispatch(removeTaskAC(id, todolistID))
    }
    const addTask = (title: string, todolistID: string) => {
        dispatch(addTaskAC(title, todolistID))
    }
    const changeTaskStatus = (id: string, isDone: boolean, todolistID: string) => {
        dispatch(changeTaskStatusAC(id, isDone, todolistID))

    }
    const changeTaskTitle = (id: string, newTitle: string, todolistID: string) => {
        dispatch(changeTaskTitleAC(id, newTitle , todolistID))
    }

    const changeFilter = (todolistID: string, value: FilterValueType) => {
        dispatch(changeTodolistFilterAC(todolistID, value))
    }
    const removeTodolist = (id: string) => {
        const action = removeTodolistAC(id)
        dispatch(action)

    }
    const changeTodolistTitle = (id: string, newTitle: string) => {
        const action = changeTodolistTitleAC(id, newTitle)
        dispatch(action)
    }
    const addTodoList = (title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)

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
