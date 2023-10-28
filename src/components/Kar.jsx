import styles from '../Css/Tasks.module.css'
import Spinner from './Spinner';
import { Link } from 'react-router-dom';



const Tasks = ({ task, boxes, del, loading, confirmDelete }) => {


    return (

        <>
                            <div className={styles.card}>
                                <div className="card" style={{ width: "18rem", display: "flex", flexWrap: "wrap" }} >
                                    <div className="card-header">{task.topic}</div>
                                    <div className="card-body">
                                        <div className="card-item" style={{ padding: ".3rem" }}>{`Dt:  ${task.date}`}</div>
                                        <div className="card-item" style={{ padding: ".3rem" }}>Im:  <i className="fa-solid fa-circle" style={{ color: task.color }}></i></div>
                                        <div className="card-item" style={{ padding: ".3rem" }}>{`Id:  ${task.id}`}</div>
                                        <div className="card-item" style={{ padding: ".3rem" }}>{`Box:  ${task.type}`}</div>


                                        <hr />
                                        <div>
                                            <input className="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
                                        </div>

                                    </div>
                                    <div className="card-footer btn-group" role={'group'} aria-label="Basic mixed styles example">
                                        <Link to={`edit/${task.id}`} className='btn btn-info'>Edit</Link>
                                        <button to={task.id} className='btn btn-danger' onClick={confirmDelete}>Delete</button>
                                    </div>
                                </div>
                            </div>
        </>

    )
}

export default Tasks;