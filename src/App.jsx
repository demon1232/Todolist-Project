import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';




function App() {
  const[name, setName] = useState("Ghulam");
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showFinished, setShowFinished] = useState(false) // default unchecked

  // Load todos from localStorage on mount
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos")
    if (storedTodos){
      settodos(JSON.parse(storedTodos))
    }
  }, [])

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  const handleEdit = (index) => {
    const newTodo = prompt("Edit your todo", todos[index].todo)
    if (newTodo !== null && newTodo.trim() !== "") {
      const newTodos = [...todos]
      newTodos[index].todo = newTodo
      settodos(newTodos)
    }
  }

  const handleDelete = (index) => {
    const isConfirmed = confirm("Are you sure you want to delete this todo?");
    if (!isConfirmed) return;
    const newTodos = todos.filter((_, i) => i !== index)
    settodos(newTodos)
  }

  const handleAdd = () => {
    if (!todo.trim()) return
    settodos([
      ...todos, 
      { 
        id: uuidv4(),
        todo: todo,
        isCompleted: false
      }
    ]);
    settodo("");
  };

  const handleChange = (e) => {
    settodo(e.target.value)
  }

  const handleCheckbox = (id) => {
    const newTodos = todos.map(item =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    )
    settodos(newTodos)
  };

  return (
    <>
      <Navbar />
      <div className='container mx-auto my-5 rounded-xl p-5 bg-violet-50 font-bold min-h-[80vh]'>
        <h1 className='text-2xl font-bold mb-4'>Todo List</h1>

        <div className='addTodo my-5 flex gap-2'>
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className='bg-white p-2 rounded-md border w-1/2'
          />
          <button
            onClick={handleAdd}
            className='bg-violet-50 hover:bg-black/90 p-2 text-lg text-black rounded-md'
          >
            Save
          </button>
        </div>

        <div className='mb-2'>
          <input
            type="checkbox" className='m-3'
            checked={showFinished}
            onChange={() => setShowFinished(!showFinished)}
          /> Show Finished
        </div>

        <h2 className='text-lg font-bold mt-4'>Your Todos</h2>
        <div className='Todos mt-4'>
          {todos.filter(todo => showFinished || !todo.isCompleted).length === 0 && (
            <div className='m-5'>No Todos to Display</div>
          )}

          {todos
            .filter(todo => showFinished || !todo.isCompleted)
            .map((item, index) => (
              <div key={item.id} className='Todo flex justify-between items-center bg-white p-3 my-2 rounded-md border'>
                
                <input 
                  name={item.id}
                  onChange={() => handleCheckbox(item.id)}
                  type="checkbox"
                  checked={item.isCompleted}
                />

                <div className={item.isCompleted ? "line-through" : ""}>
                  {item.todo}
                </div>

                <div className="buttons flex gap-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className='bg-violet-50 hover:bg-black/90 p-2 text-lg text-black rounded-md'
                  >
                    <MdEdit />

                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className='bg-violet-50 hover:bg-black/90 p-2 text-lg text-black rounded-md'
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App



