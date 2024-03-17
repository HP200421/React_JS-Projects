import { useState, useEffect } from 'react'
import { TodoContextProvider } from './context/index'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

function App() {
  // Basic todo functionality
  const [todos, setTodos] = useState([]) // Initial value is as empty array

  const addTodo = (todo) => {
    setTodos((prev) => [{id: Date.now(), ...todo}, ...prev])  // We are adding new todo to our old values in array
  }

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo )))
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const todoCompleted = (id) =>{
    setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ? {...prevTodo, completed: !prevTodo.completed} : prevTodo ))
  }

  // Local Storage functionality

  // Getting the todos from localstorage
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))
    
    if(todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])

  // For storing the data in localstorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  return (
    <TodoContextProvider value={{todos, addTodo, updateTodo, deleteTodo, todoCompleted}}>
        <div className="bg-[#172842] min-h-screen py-8">
          <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                      {/* Todo from is here */}
                        <TodoForm />
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/* Loop and TodoItem goes here */}
                        {todos.map((todo) => (
                          <div key={todo.id}
                            className="w-full"
                          >
                            <TodoItem todo={todo} />
                          </div>
                        ))}
                    </div>
                </div>
       </div>
    </TodoContextProvider>
  )
}

export default App
