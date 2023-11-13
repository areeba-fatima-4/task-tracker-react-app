import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import Footer from './components/Footer';
import About from './components/About';
import { useState, useEffect } from "react"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import './App.css';
import Motivation from './components/Motivation';

function App() {
 
  const [showAddTask, setShowAddTask] = useState(false)

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const taskFromServer = await fetchTasks()
      setTasks(taskFromServer)
    }
    getTasks()
  }, [])


  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks', {
      headers: {
        'Access-Control-Allow-Origin':'*'
      }
    })
    const data = await res.json()
    return data
  }

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      headers: {
        'Access-Control-Allow-Origin':'*'
      }
    })
    const data = await res.json()
    return data
  }

  //Add Task
  const addTask = async (task) => {
   const res = await fetch(
    'http://localhost:5000/tasks',
     { 
      method : 'POST',
      headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin':'*'
      },
      body: JSON.stringify(task)
     })

     const data = await res.json()
     setTasks([...tasks, data])

  }

  //Delete Task
  const deleteTask = async (id) => {
    await fetch(
      `http://localhost:5000/tasks/${id}`,
      {
         method: 'DELETE',
        headers: {
        'Access-Control-Allow-Origin':'*'
        },
    }
    )

    console.log('delete', id)
    setTasks(tasks.filter( (it) =>  it.id !== id))
  }

  //Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updatedTask = {...taskToToggle, reminder: !taskToToggle.reminder}
    const res = await fetch(
      `http://localhost:5000/tasks/${id}`,
      { method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          'Access-Control-Allow-Origin':'*'
        },
        body: JSON.stringify(updatedTask)
      }
    )
    const data = await res.json()
    console.log('toggle', id)
    setTasks(tasks.map((it) => 
      it.id === id ? {...it, reminder: !it.reminder} : it
    ))
  }

    //Show Add Task
    const toggleShowAddTask = () =>
     setShowAddTask(!showAddTask)

  return (
    <Router>
    <div className='container'>
        <Header 
        onAdd= {toggleShowAddTask} 
        showAdd = {showAddTask}
        />
         <Routes>
            <Route path='/' 
             element= {
              <>
               { showAddTask &&
                <AddTask 
                onAdd = { addTask }
               />}
                {  (tasks.length > 0) ?
                <Tasks
                tasks={tasks}
                onDelete = {deleteTask}
                onToggle = {toggleReminder}
                />
                : "No tasks to show"
                }
              </>
            }
            />
            <Route path='/about' element={<About/>}/>
         </Routes>
         <Motivation/>
         <Footer/>
    </div>
    </Router>
  );
}

export default App;
