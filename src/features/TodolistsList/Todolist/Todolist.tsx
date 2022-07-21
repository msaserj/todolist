import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {Button} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {Task} from "./Task/Task";
import {TaskStatuses, TaskType} from "../../../api/todolists-api";
import {FilterValueType, TodolistDomainType} from "../todolist-reducer";
import {useAppDispatch} from "../../../App/hooks";
import {fetchTasksTC} from "../task-reducer";


type PropsType = {
    todolist: TodolistDomainType
    //todolistID: string
    //id: string
    //title: string
    tasks: Array<TaskType>
    changeFilter: (todolistID: string, value: FilterValueType) => void
    addTask: (todolistID: string, title: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, status: TaskStatuses) => void
    changeTaskTitle: (todolistID: string, id: string, title: string) => void
    removeTask: (todolistID: string, taskId: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    //filter: FilterValueType
    removeTodolist: (id: string) => void
    demo?: boolean
}

export const Todolist = React.memo(({demo = false, ...props}: PropsType) => {

    const dispatch = useAppDispatch();

    console.log("Todolist is called")
    // всё переехало в отдельную универсальную компоненту
    const addTask = useCallback((title: string) => {
        props.addTask(props.todolist.id, title)
    },[props.todolist.title, props.todolist.id])
    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolist.id)
    }
    const changeTodolistTitle = useCallback((newTitle: string,) => {
        props.changeTodolistTitle(props.todolist.id, newTitle)
    }, [props.todolist.id, props.changeTodolistTitle])

    const onAllClickHandler = useCallback(() => props.changeFilter(props.todolist.id, "all"),[props.changeFilter, props.todolist.id]);
    const onActiveClickHandler = useCallback(() => props.changeFilter(props.todolist.id, "active"), [props.changeFilter, props.todolist.id]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter(props.todolist.id, "completed"), [props.changeFilter, props.todolist.id]);

    let tasksForTodoList = props.tasks
    if (props.todolist.filter === "active") {
        tasksForTodoList = props.tasks.filter(task => task.status === TaskStatuses.New)
    }
    if (props.todolist.filter === "completed") {
        tasksForTodoList = props.tasks.filter(task => task.status === TaskStatuses.Completed)
    }

    useEffect(()=> {
        if (!demo) {
            dispatch(fetchTasksTC(props.todolist.id))
        }

    }, [])

    return (
        <div>
            {/*<button onClick={removeTodolistHandler}>✖</button>*/}
            <EditableSpan title={props.todolist.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolistHandler}>
                <DeleteIcon/>
            </IconButton>
            {/*universal component*/}
            <AddItemForm addItem={addTask}/>
            <ul>
                {
                    tasksForTodoList.map((task) => {
                    return <Task changeTaskStatus={props.changeTaskStatus}
                                 changeTaskTitle={props.changeTaskTitle}
                                 removeTask={props.removeTask}
                                 task={task}
                                 todolistId={props.todolist.id}
                                 key={task.id}
                    />
                    })
                }
            </ul>
            <div>
                <Button size="large" variant={props.todolist.filter === "all" ? "outlined" : "text"} onClick={onAllClickHandler}>All
                </Button>
                <Button color={"warning"} size="large" variant={props.todolist.filter === "active" ? "outlined" : "text"}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button color={"success"} size="large" variant={props.todolist.filter === "completed" ? "outlined" : "text"}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )
})


