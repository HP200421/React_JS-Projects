import { createContext, useContext } from 'react';

export const TodoContext = createContext({
    todos : [
       {
            id: 1,
            todo : "Todo Message",
            completed: false
       }
    //    Similar tods with random id will be created
    ],
    addTodo : (todo) => {},
    updateTodo: (id, todo) => {},
    deleteTodo: (id) => {},
    todoCompleted: (id) => {}
})

export const TodoContextProvider = TodoContext.Provider

export function useTodo() {
    return useContext(TodoContext)
}