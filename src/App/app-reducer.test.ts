import {appReducer, InitialStateType, setAppErrorAC, setAppStatusAC} from "./app-reducer";

let startState: InitialStateType

beforeEach(() => {
   startState = {
       status: 'idle',
       error: null,
       isInitialized: true
   }
})

test('correct error message should be set', () => {

    const endState = appReducer(startState, setAppErrorAC({error: 'some error'}))
    expect(endState.error).toBe('some error')
})


test('correct status should be set', () => {

    const endState = appReducer(startState, setAppStatusAC({status: 'loading'}))
    expect(endState.status).toBe('loading')
})
