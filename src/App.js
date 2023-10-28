import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useParams } from "react-router-dom"
import Start from './components/Start'
import AddTask from './components/AddTask'
import EditTask from './components/EditTask';
import {
  getAllTasks,
  getAllBoxes,
  createTask,
  deleteTask
} from './helpers/services/jsonServer';
import { confirmAlert } from 'react-confirm-alert';


import './App.css';
import { TaskContext } from './Context/ContactContext';

const App = () => {

  // const { taskId } = useParams()


  const [loading, setLoading] = useState(false);
  const [forceRender, setForceRender] = useState(false);
  const [filteredTasks, setFilteredTasks] = useState([])
  const [tasks, setTasks] = useState([]); //ذریافت اطلاعات تسک ها از سرور
  const [boxes, setBoxes] = useState([]); // دریافت اطلاعات باکس ها از سرور
  const [task, setTask] = useState({}); // ساخت غالب فرم سپس پر شدن از طریق اینپوت ها و ارسال به سرور
  // const [del, setDel] = useState()
  // const [deleteItem , setDeleteItem] = useState()
  const [taskQuery, setTaskQuery] = useState({ text: "" });
  const navigate = useNavigate()
  useEffect(() => {

    const fetchData = async () => {
      try {

        // setLoading(false)
        setLoading(true)
        const { data: tasksData } = await getAllTasks();
        const { data: boxesData } = await getAllBoxes();
        setTasks(tasksData);
        setFilteredTasks(tasksData)
        setBoxes(boxesData);
        setLoading(false)
        // console.log(boxes);

        // console.log(tasks);
        // setLoading(false)
      } catch (error) {
        // setLoading(false)
        // console.log(error.message)
        setLoading(false)
        console.log(error.message)

      }
    }
    fetchData()
  }, []);


  useEffect(() => {

    const fetchData = async () => {
      try {
        setLoading(true)
        const { data: tasksData } = await getAllTasks();

        setTasks(tasksData);
        setLoading(false)
      } catch (error) {
        <div>Something Wrong</div>
      }
    }
    fetchData()
  }, [forceRender])



  const createTaskForm = async (event) => {
    event.preventDefault()

    try {
      const { status } = await createTask(task);

      if (status === 201) {
        setTask({});
        setForceRender(!forceRender);
        navigate('/');


      }
    } catch (err) {
      console.log(err.message)
    }
  };


  const buildTask = (event) => {

    setTask({
      ...task,
      [event.target.name]: event.target.value
    });
  };


  const confirmDelete = (taskId, topic) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui border border-secondary m-5'>
            <div className='m-4'>
              <h1 className='m-4'>Attention</h1>
              <span className='m-3'><strong>Are you sure</strong> you want to delete {topic} ?</span>
              <br />
              <button className='btn btn-secondary m-4' onClick={onClose}>No</button>
              <button
                className='btn btn-danger m-2'
                onClick={() => {
                  removeTask(taskId);
                  onClose();
                }}
              >
                Yes, Delete it!
              </button>

            </div>
          </div>
        );
      }
    });
  }

  const removeTask = async (taskId) => {
    try {
      const response = await deleteTask(taskId);
      if (response) {
        const { data: tasksData } = await getAllTasks();
        setTasks(tasksData)
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  // const editTaskForm = async event => {
  //   event.preventDefault()

  //   try {
  //     const { data } = await editTask(getTask,taskId)

  //     if (data) {
  //       setForceRender(!forceRender)
  //       navigate('/')
  //     }

  //   } catch (err) {
  //     console.log(err.message)
  //   }
  // }

  //   const taskEditor = (event) => {

  // setTask({
  //   ...getTask,
  //   [event.target.name] : [event.target.value]
  // })

  // }

  const taskSearch = (event) => {
    setTaskQuery({ ...taskQuery, text: event.target.value });
    const allTasks = tasks.filter((task) => {
      return task.topic
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });

    setFilteredTasks(allTasks);
  };




  return (
    <TaskContext.Provider
    value={{
      loading,
      setLoading,
      task,
      setTasks,
      setFilteredTasks,
      taskQuery,
      tasks,
      filteredTasks,
      boxes,
      buildTask,
      deleteTask: confirmDelete,
      createTask: createTaskForm,
      taskSearch,
    }}
    >
        <div>
          <Routes>
            <Route
              path='/'
              element={<Start
                query={taskQuery}
                tasks={filteredTasks}
                boxes={boxes}
                loading={loading}
                confirmDelete={confirmDelete}
                search={taskSearch}
              // getFilter={getFilteredTasks}
              />} />

            <Route
              path='/Add'
              element={<AddTask
                tasks={tasks}
                boxes={boxes}
                buildTask={buildTask}
                task={task}
                createTaskForm={createTaskForm} />} />

            <Route
              path='/edit/:taskId'
              element={
                <EditTask
                  forceRender={forceRender}
                  setForceRender={setForceRender}
                  boxes={boxes}
                  task={task}
                  setTask={setTask}
                // taskEditor={taskEditor} 
                // editTaskForm={editTaskForm}
                />
              } />

          </Routes>
        </div>
        <br />
        <div style={{ display: "flex" }}>
        </div>
    </TaskContext.Provider>


  );
};

export default App;


