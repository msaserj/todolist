import  * as appSelectors from './selectors'
import {RequestStatusType as T1, slice} from './app-reducer'
import {asyncActions } from './app-reducer'


const appReducer = slice.reducer
const actions = slice.actions

const appActions = {
    ...actions,
    ...asyncActions
}

export type RequestStatusType = T1

export {
    appSelectors,
    appReducer,
    appActions,
}