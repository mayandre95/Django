import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react';
import axios from "axios";

function App() {
  const url = "http://127.0.0.1:8000/";
  const url2 = process.env.BACKEND_URL;
  console.log(url2)

  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputTask, setInputTask] = useState("");
  const [activeTask, setActiveTask] = useState(null)

  const getAllTask = () => {
    setIsLoading(true)

    axios.get(url + "todo/list/")
      .then(res => {
        setTasks(res.data)
        console.log(res.data)

        setIsLoading(false)
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
      })
  };

  const handleCange = (e) => {
    setInputTask(e.target.value)
    console.log(inputTask)
  };

  const addTask = () => {
    setIsLoading (true)

    if(activeTask == null){

    axios.post(url + "todo/add/", {
      "title":inputTask,
      "status":false
    }).then (res => {
      getAllTask()

      setIsLoading(false)
      setInputTask("")
      setActiveTask(null)
    }).then (err => {
      console.error(err)

      setIsLoading(false)
    })}
    else {
      axios.put(url + `todo/${activeTask.id}/update/`,{
        'title': inputTask,
        'status': activeTask.status
      }).then(res =>{
        setInputTask('')
        getAllTask()
      }).then(err => {
        console.error(err)
      })
    }
  };

  const deleteTask = task => {
    axios.delete(url + `todo/${task.id}/delete/`).then (res => {
      getAllTask()
    }).catch (err => {
      console.error(err)
    })
  };

  const checkTask = task => {
    axios.put(url + `todo/${task.id}/update/`,{
      'title': task.title,
      'status': !task.status
    }).then(res =>{
      setInputTask('')
      getAllTask()
    }).then(err => {
      console.error(err)
    })
  };

  const updateTask = task => {
    setActiveTask(task)
    setInputTask(task.title)
  };

  useEffect(()=> {
    getAllTask()
  },[])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Django-react todo App
        </p>
      </header>
      <body className="body">
        <div className="imput-task">
          <input type="text" placeholder="Ajouter une tâche" value={inputTask} onChange={e => handleCange(e)}/>
          <button onClick={addTask} disabled={!inputTask.trim()}>Ajouter</button>
        </div>
        <ul>
          { isLoading ? <h4>Is loading...</h4> 
          :
            tasks.map( task => {
              return (
                <div className="task-list" key={task.id}>
            <input 
              type="checkbox" 
              onChange={e => {checkTask(task)}}
              checked={task.status ?? true}/>
            <li>{
              task.status ? <strike>{task.title}</strike>
              : task.title
            }
            </li>
            <div className="button">
              <button className="edit" onClick={e=>updateTask(task)}>Edit</button>
              <button className="del" onClick={e=>{deleteTask(task)}}>X</button>
            </div>
          </div>
              )
            })
          }
        </ul>
      </body>
    </div>
  );
}

export default App;
