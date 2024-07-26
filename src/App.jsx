import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { FaEdit } from "react-icons/fa";
import { RiDeleteBinFill } from "react-icons/ri";
import { v4 as uuidv4 } from 'uuid';//generating the unique id for thr different tasks in Todo-List

function App() {
  const [todo, setTodo] = useState("")//This useState is used for text Inputs
  const [todos, setTodos] = useState([])//An Array which holds all the todo inputs from above useState
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos")) //This useEffect will run and it will load our all todo inputs
      setTodos(todos)
    }
  }, [])


  const StorageTodo = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos)) // Setting up a local storage to store the todo inputs
  }

  const toggleFinish = (e) => {
    setshowFinished(!showFinished)

  }



  const handleEdit = (e, id) => { // this function generally works to edit the todo list items 
    let edittodo = todos.filter(i => i.id === id)
    setTodo(edittodo[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    //newTodos[index].isCompleted=!newTodos[index].isCompleted
    setTodos(newTodos)
    StorageTodo() //For saving all the updates within the local storage
  }

  const handleDelete = (e, id) => { // this function generally works to delete the todo list items 
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    //newTodos[index].isCompleted=!newTodos[index].isCompleted
    setTodos(newTodos)
    StorageTodo() //For saving all the updates within the local storage
  }

  const handleAdd = () => { // this function generally works to update the todo list items 
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])//Here the unique id would be assinged to the respective Task
    setTodo("")
    StorageTodo() //For saving all the updates within the local storage
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }


  const handleCheckbox = (e) => { // this function generally works to update the checklist of todo list items 
    let id = e.target.name; //here the explanation is , the todo which has the same name would having isCompleted : true
    let index = todos.findIndex(item => {
      return item.id === id; // here we are generally confirming the id of that particular todo whose task has been completed and should be marked as true
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    StorageTodo() //For saving all the updates within the local storage
  }



  return (
    //relative mx-3 md:container md:mx-auto my-7 rounded-3xl p-5 min-h-[80vh] md:w-1/2 bg-white shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:translate-y-1
    //relative mx-3 md:container md:mx-auto my-7 rounded-3xl p-5 min-h-[80vh] md:w-1/2 bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg transform transition-all duration-300 hover:rotate-6 hover:scale-105 hover:shadow-2xl
    //relative mx-3 md:container md:mx-auto my-7 rounded-3xl p-5 min-h-[80vh] md:w-1/2 bg-white shadow-lg transform transition-all duration-300 hover:skew-y-6 hover:perspective-500 hover:scale-105 hover:shadow-2xl
    //relative mx-3 md:container md:mx-auto my-7 rounded-3xl p-5 min-h-[80vh] md:w-1/2 bg-white shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:translate-z-10
    //relative mx-3 md:container md:mx-auto my-7 rounded-3xl p-5 min-h-[80vh] md:w-1/2 bg-white shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:rotate-x-6 hover:rotate-y-6
    <>
      <Navbar />
      <div className="relative mx-3 md:container md:mx-auto my-7 rounded-3xl p-5 min-h-[80vh] md:w-1/2 transform transition-all duration-700 hover:scale-110 hover:shadow-2xl">

        <h1 className='font-bold text-center text-xl'>JustDoIt - Your Tasks Planner</h1>

        <div className="addTodo my-5 flex flex-col gap-4">

          <h2 className='text-lg font-bold'>Add your Tasks</h2>

          <div className="flex">

            <input onChange={handleChange} value={todo} type='text' placeholder='Write your Task Here' className='w-full rounded-full px-5 py-1' />

            <button onClick={handleAdd} disabled={todo.length <= 3} className='bg-slate-300 hover:bg-black hover:text-white p-2 py-1 text-sm font-bold text-black rounded-full disabled:bg-slate-300 disabled:text-black mx-2'>Save</button>
          </div>
        </div>

        <input className='my-7' onChange={toggleFinish} type="checkbox" checked={showFinished} /> Finished Tasks

        <h2 className='text-lg font-bold'>Your Tasks</h2>

        <div className="todos">
          {todos.length === 0 && <div className='font-semibold m-5'>No Tasks to be displayed</div>}
          {todos.map((item) => {

            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex justify-between my-3">
              <div className='flex gap-5'>
                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => handleEdit(e, item.id)} className='bg-slate-300 hover:bg-black hover:text-white p-2 py-1 text-sm font-bold text-black rounded-md mx-2'><FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-slate-300 hover:bg-black hover:text-white p-2 py-1 text-sm font-bold text-black rounded-md mx-2'><RiDeleteBinFill /></button>
              </div>
            </div>
          })}


        </div>

      </div>



    </>
  )
}

export default App
