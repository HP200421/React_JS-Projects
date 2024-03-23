import { createSlice, nanoid } from "@reduxjs/toolkit";
// nanoid generates unique id

// initial state -> store

const initialState = {
    todos : [
        {
            id: 1, 
            text: "Hello World"
        }
    ]
}

export const todoSlice = createSlice({
    name : 'todo',
    initialState,
    reducers : {
        addTodo : (state, action) => {
            const todo = {
                id: nanoid(),
                text: action.payload.text
            }
            state.todos.push(todo)
        },
        removeTodo : (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload)
        }
    }
})

// individual reducers export is necessary
export const {addTodo, removeTodo} = todoSlice.actions

export default todoSlice.reducer