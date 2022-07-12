import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, FilterValueType,
    removeTodolistAC,
    todolistReducer
} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, taskReducer} from "./state/task-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "./api/todolists-api";



export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducers() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    //todolists
    let [todolists, dispatchToTodolistsReducer] = useReducer(todolistReducer,[
        {id: todolistID1, title: 'What to learn', filter: 'all', addedData: '', order: 0},
        {id: todolistID2, title: 'What to buy', filter: 'all', addedData: '', order: 0},
    ])

    let [tasks, dispatchToTasksReducer] = useReducer(taskReducer,{
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', status: TaskStatuses.Completed, todoListId: todolistID1, description: '',
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
       dispatchToTasksReducer(removeTaskAC(id, todolistID))
    }
    const addTask = (title: string, todolistID: string) => {
        dispatchToTasksReducer(addTaskAC({
            todoListId: todolistID,
            title: title,
            status: TaskStatuses.New,
            addedDate: "",
            deadline: "",
            description: "",
            order: 0,
            priority: 0,
            startDate: "",
            id: "1"
        }))
    }
    const changeTaskStatus = (id: string, status: TaskStatuses, todolistID: string) => {
       dispatchToTasksReducer(changeTaskStatusAC(id, status, todolistID))

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
        const action = addTodolistAC({
            id: v1(),
            addedData: "",
            order: 0,
            title: title,
        })
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

export default AppWithReducers;
