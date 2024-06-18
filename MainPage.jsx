import { useEffect, useState } from "react";
import Input from "./Input";
import axios from 'axios'
import { TiDelete } from "react-icons/ti";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { RiCheckboxCircleFill } from "react-icons/ri";

function MainPage() { 
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3001/get')
    .then(result => setTasks(result.data))
    .catch(err => (err))
  }, [])
  // edit button on the left
  const editTask = (id) => {
    axios.put(`http://localhost:3001/update/${id}`)
    .then(result => setTasks(result.data))
    .catch(err => (err)) 
  }

  const deleteTask = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`)
      .then(() => {
        setTasks(prevTasks => prevTasks.filter(task => task._id !== id));
      })
      .catch(err => console.error(err));
};


  return (
    <div className="home">
      <h2>̶T̶̶a̶̶s̶̶k̶ ̶L̶̶i̶̶s̶̶t̶</h2>
      <Input  setTasks={setTasks}/>
        <div className="task-wrapper">
        {
          tasks.length === 0
           ? <div className="center"><h3>No Record</h3></div> 
           :
          tasks.map(task => (
            <div className={`task ${task.done ? 'completed' : ''}`} key={task._id}>
              <div className="checkbox" onClick={() => editTask(task._id)}>
                {task.done ? <RiCheckboxCircleFill className="icons" /> : <MdCheckBoxOutlineBlank className="icons" />}
                
              <p>{task.task}</p>
              </div>
              <div>
              <span onClick={() => deleteTask(task._id)}><TiDelete className="icon" /></span>
              </div>
            </div>
          ))
        }
        </div>
    </div>
  )
}
export default MainPage