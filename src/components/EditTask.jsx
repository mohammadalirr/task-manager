import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../Css/AddTask.module.css";

import { editTask, getOneTask,} from "../helpers/services/jsonServer";

// import { useState, useEffect } from "react"
// import { useParams, useNavigate } from "react-router-dom"

// import { getAllBoxes, editTask } from "../helpers/services/jsonServer"


const EditTask = ({ boxes, task, setTask, forceRender, setForceRender }) => {


    const { taskId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {

        const fetchData = async () => {

            try {
                const { data: taskData } = await getOneTask(taskId)

                setTask(taskData)

            } catch (err) {
                console.log(err.message)
            }

        }

        fetchData()
    }, [])

    const taskEditor = (event) => {
        setTask({...task,
            [event.target.name] : event.target.value,
        });
    };

    const submitForm = async (event) => {
        event.preventDefault()

        try {
            const { data } = await editTask(task, taskId)

            if(data) {
                setForceRender(!forceRender);
                navigate("/")
            }
    
            
        } catch (error) {
            console.log(error.message)
        }

    }



    // const navigate = useNavigate()

    // const { taskId } = useParams()

    // const [edit, setEdit] = useState({
    //     topic: "",
    //     date: "",
    //     color: "",
    //     type: "",
    //     id: ""
    // })

    // useEffect(() => {
    //     const fetchData = async () => {

    //         try {
    //             const { data: taskData } = await editTask(taskId)

    //             setEdit(taskData)

    //         } catch (err) {
    //             console.log(err.massage)
    //         }

    //     }
    //     fetchData()
    // }, [])

    // const setTaskInfo = (event) => {

    //     setEdit({
    //         ...edit,
    //         [event.target.name]: [event.target.value]
    //     })

    // }

    // const submitForm = async (event) => {
    //     event.preventDefault();
    //     try {
    //       const { data } = await editTask(edit, taskId);
    //       if (data) {
    //         setForceRender(!forceRender);
    //         navigate("/contacts");
    //       }
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   };


    return (
        <form
            className="container col-md-4 p-5 my-5"
            onSubmit={submitForm}>
            <h2 className="mb-5">Add new task</h2>

            <div className="justify-content-center">
                <div className="row">
                    <input
                        className="form-control col-md-12 mb-3"
                        placeholder="Title"
                        type="text"
                        name="topic"
                        value={task.topic}
                        onChange={taskEditor}
                        required={true} />
                </div>


                <div className="row text-start">
                    <div>
                        Done date
                    </div>
                    <input

                        className="form-control col-md-12 mb-3"
                        type="date"
                        name="date"
                        value={task.date}
                        onChange={taskEditor}
                        required={true} />
                </div>

                <div className="row text-start">
                    <div>
                        <i className="fa-regular fa-star"></i>
                        {" "}Importance
                    </div>
                    <select
                        className="form-control col-md-12 mb-3"

                        name="color"
                        value={task.color}
                        onChange={taskEditor}
                        required={true} >

                        <option value="">{" "}</option>
                        <option value="green">Green</option>
                        <option value="#ffcd39">Yellow</option>
                        <option value="red">Red</option>
                    </select>
                </div >

                <div className="row text-start">
                    <div>
                        <i className="fa-solid fa-box"></i>
                        {" "}Box
                    </div>
                    <select
                        name="type"
                        value={task.type}
                        onChange={taskEditor}
                        className="form-control col-md-12 mb-4"
                        required={true} >


                        <option value="">{" "}</option>
                        {
                            boxes.map((b) => (
                                <option value={b.type} key={b.id}>{b.type}</option>
                            ))
                        }
                    </select>
                </div>

                <div className="row">
                    <input
                        placeholder="ID"
                        className="form-control col-md-12 mb-3"
                        type="number"
                        name="id"
                        value={task.id}
                        onChange={taskEditor}
                        required={true} />
                </div>
                <br />
                <hr style={{ color: "darkcyan" }} />
                <div>
                    <button name="submit" type="submit" className="btn mb-3" style={{ backgroundColor: "darkcyan", color: "whitesmoke" }}>Build</button>
                </div>

            </div>
        </form>

    )



}

export default EditTask;