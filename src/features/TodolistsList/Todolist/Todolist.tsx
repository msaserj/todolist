import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {Button} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {Task} from "./Task/Task";
import {TaskStatuses, TaskType} from "../../../api/todolists-api";
import {FilterValueType, TodolistDomainType} from "../todolist-reducer";
import {useAppDispatch} from "../../../App/hooks";
import {fetchTasks} from "../task-reducer";
import {useActions} from "../../../App/store";
import {tasksActions, todoListsActions} from "../index";

type PropsType = {
    todolist: TodolistDomainType;
    tasks: Array<TaskType>;
    demo?: boolean;
};

export const Todolist = React.memo(({demo = false, ...props}: PropsType) => {
    const dispatch = useAppDispatch();

    const {changeTodolistFilter, removeTodolist, changeTodolistTitle} = useActions(todoListsActions)
    const {addTask} = useActions(tasksActions)

    const addTaskCB = useCallback(
        (title: string) => {
            addTask({todolistId: props.todolist.id, title});
        },
        [props.todolist.title, props.todolist.id]
    );
    const removeTodolistHandler = () => {
        removeTodolist(props.todolist.id);
    };
    const changeTodolistTitleCB = useCallback(
        (title: string) => {
            changeTodolistTitle({todolistId: props.todolist.id, title});
        },
        [props.todolist.id]
    );

    const onClickFilterButton = useCallback(
        (filter: FilterValueType) => changeTodolistFilter({todolistId: props.todolist.id, filter: filter}),
        [props.todolist.id]
    );

    let tasksForTodoList = props.tasks;
    if (props.todolist.filter === "active") {
        tasksForTodoList = props.tasks.filter(
            (task) => task.status === TaskStatuses.New
        );
    }
    if (props.todolist.filter === "completed") {
        tasksForTodoList = props.tasks.filter(
            (task) => task.status === TaskStatuses.Completed
        );
    }
    const renderButtonFilter = (buttonFilter: FilterValueType,
                                color: any,
                                text: string) => {
        return <Button color={color} size="large"
                       variant={props.todolist.filter === "completed" ? "outlined" : "text"}
                       onClick={()=>onClickFilterButton(buttonFilter)}>{text}</Button>}

    useEffect(() => {
        if (!demo) {
            dispatch(fetchTasks(props.todolist.id));
        }
    }, []);

    return (
        <div>
            <EditableSpan title={props.todolist.title} onChange={changeTodolistTitleCB}/>
            <IconButton onClick={removeTodolistHandler} disabled={props.todolist.entityStatus === "loading"}>

                <DeleteIcon/>

            </IconButton>
            <AddItemForm addItem={addTaskCB} disabled={props.todolist.entityStatus === "loading"}/>
            <ul>
                {tasksForTodoList.map((task) => {
                    return (
                        <Task task={task} todolistId={props.todolist.id} key={task.id}/>
                    );
                })}
            </ul>
            <div>
                {renderButtonFilter('all', 'primary', 'All')}
                {renderButtonFilter('active', 'warning', 'Active')}
                {renderButtonFilter('completed', 'success', 'Completed')}

            </div>
        </div>
    );
});
