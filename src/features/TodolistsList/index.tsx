import * as tasksActions from './tasks-actions'
import * as todoListsAsyncActions from './todolists-actions'
import {slice} from './todolist-reducer'

const todoListsActions = {
    ...todoListsAsyncActions,
    ...slice.actions
}

export {
    tasksActions,
    todoListsActions,
}