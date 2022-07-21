import React, {useCallback, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../App/hooks";
import {
    addTodolistTC,
    changeTodolistFilterAC,
    fetchTodolistsTC,
    FilterValueType,
    removeTodolistTC,
    TodolistDomainType
} from "./todolist-reducer";
import {addTaskTC, changeTodolistTitleTC, removeTaskTC, TasksStateType, updateTaskTC} from "./task-reducer";
import {TaskStatuses} from "../../api/todolists-api";
import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";

type PropsType = {
    demo?: boolean
}

export const TodolistsList: React.FC<PropsType> = ({demo = false}) => {
    const dispatch = useAppDispatch();
    // выбираем из redux при помощи useSelect таски и тудулисты
    // это вместо локального стейта useState
    const todolists = useAppSelector<Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useAppSelector<TasksStateType>(state => state.tasks)

    const removeTask = useCallback((todolistID: string, id: string) => {
        dispatch(removeTaskTC(todolistID, id))
    }, [dispatch])

    const addTask = useCallback((todolistID: string, title: string) => {
        dispatch(addTaskTC(todolistID, title))
    }, [dispatch])

    const changeTaskStatus = useCallback((todolistID: string, taskId: string, status: TaskStatuses) => {
        dispatch(updateTaskTC(todolistID, taskId, {status}))

    }, [dispatch])
    const changeTaskTitle = useCallback((todolistID: string, id: string, title: string) => {
        dispatch(updateTaskTC(todolistID, id, {title}))
    }, [dispatch])

    const changeFilter = useCallback((todolistID: string, value: FilterValueType) => {
        dispatch(changeTodolistFilterAC(todolistID, value))
    }, [dispatch])

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistTC(todolistId))

    }, [dispatch])
    const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
        dispatch(changeTodolistTitleTC(todolistId, title))
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])

    useEffect(() => {
        if (!demo) {
            dispatch(fetchTodolistsTC())
        }

    }, [])

    return (
        <>
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
                                    todolist={tdl}
                                    key={tdl.id}
                                    tasks={tasksForTodoList}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeTaskStatus}
                                    removeTodolist={removeTodolist}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodolistTitle={changeTodolistTitle}
                                    demo={demo}/>
                            </Paper>
                        </Grid>
                    )
                })}
            </Grid>
        </>
    )
}