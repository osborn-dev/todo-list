import { useState } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'


function Input({ setTasks }) {
  const [task, setTask] = useState('')

  const add = () => {
    if (task === '') {
      toast.error('Please add a task!');
    } else {
      axios.post('http://localhost:3001/add', { task: task })
        .then(result => {
          setTasks(prevTasks => [...prevTasks, result.data]);
          setTask(''); // Clears input field after adding
        })
        .catch(err => console.log(err));
        toast.success('Task Created!')
    }
  };



  return (
    <div className="create_form">
      <input 
      type="text" 
      value={task}
      placeholder="Add a task"
      onChange={(e) => setTask(e.target.value)} />
      <button type="button" onClick={add}>Add</button>
    </div>
  )
}
export default Input