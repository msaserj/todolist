import React, {useCallback} from 'react';
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
    console.log("App is called")
    //
    const dispatch = useDispatch();
    // выбираем из redux при помощи useSelect таски и тудулисты
    // это вместо локального стейта useState
    const todolists = useSelector<AppRootState, Array<TodolistsType>>(state => state.todolists)
    const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)


    const removeTask = useCallback((id: string, todolistID: string) => {
        dispatch(removeTaskAC(id, todolistID))
    },[dispatch])
    const addTask = useCallback((title: string, todolistID: string) => {
        dispatch(addTaskAC(title, todolistID))
    },[dispatch])
    const changeTaskStatus = useCallback((id: string, isDone: boolean, todolistID: string) => {
        dispatch(changeTaskStatusAC(id, isDone, todolistID))

    },[dispatch])
    const changeTaskTitle = useCallback((id: string, newTitle: string, todolistID: string) => {
        dispatch(changeTaskTitleAC(id, newTitle , todolistID))
    },[dispatch])

    const changeFilter = useCallback((todolistID: string, value: FilterValueType) => {
        dispatch(changeTodolistFilterAC(todolistID, value))
    },[dispatch])
    const removeTodolist = useCallback((id: string) => {
        const action = removeTodolistAC(id)
        dispatch(action)

    },[dispatch])
    const changeTodolistTitle = useCallback((id: string, newTitle: string) => {
        const action = changeTodolistTitleAC(id, newTitle)
        dispatch(action)
    }, [dispatch])
    const addTodoList = useCallback((title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)

    },[dispatch])

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
                        let tasksForTodoList = tasks[tdl.id] // храним отфильтрованные таски. по умолчанию all

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
