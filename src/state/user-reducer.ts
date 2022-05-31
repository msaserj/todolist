type StateType = {
    age: number
    childrenCount: number
    name: string
}
type ActionType = {
    type: string
    [key: string]: any
}

// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописанному type в этом action (инструкции) я поменяю state
export const userReducer = (state: StateType, action: ActionType) => {
    switch (action.type) {
        case 'INCREMENT-AGE':
            let newState = {...state}
            newState.age = state.age + 1
            return newState
        case 'INCREMENT-CHILDREN-COUNT':
            let newState2 = {...state}
            newState2.childrenCount = state.childrenCount + 1
            return newState2
        case 'CHANGE-NAME':
            let newState3 = {...state}
            let newName = "Viktor"
            newState3.name = newName
            return newState3
        default:
            throw new Error('I don\'t understand this type')
    }
}


