import { Link } from "react-router-dom";
import Tasks from "./Kar";
import Spinner from "./Spinner";
import styles from "../Css/Start.module.css"
import { useContext } from "react";
import { TaskContext } from "../Context/ContactContext";

const Start = ({ tasks, boxes, del, loading, confirmDelete, query, search }) => {

    // const icon = document.querySelector('#toolBar')

    // const rotatee = () => {

    //     icon.classList.add('rot')

    // }

    // icon.addEventListener('click' , rotatee)

    // const iconRef = useRef(null)
    // const [dobare, setDobare] = useState(false)

    // useEffect(() => {

    //     const icon = iconRef.current

    //     const rotatee = () => {
    //         icon.style.transform = 'rotate(91deg)'
    //         icon.style.animationDelay = 400
    //     }

    //     icon.addEventListener('click', rotatee)

    //     //   return () => {
    //     //     icon.removeEventListener('click' , rotatee)
    //     //   }
    // }, [dobare])



    useContext(TaskContext)
    return (



        <>

            {loading ? (<Spinner />) : (

                <div>
                    <nav className="container text-center my-4">

                        <div className="row border-bottom pb-5">
                            <div className="col">
                                <button  className="btn btn-outline-info">
                                    <i className="fa-sharp fa-solid fa-bars"></i>

                                </button>
                            </div>

                            <div className="col-md-10">
                                <h1>
                                    TASK MANAGER
                                </h1>
                            </div>


                            <div className="col">
                                <Link to="/Add" className="btn btn-outline-info">Add</Link>
                            </div>

                        </div>

                        <br />

                        <div className="row">
                            <div className="col-6 mx-auto mt-5 pb-5 border-bottom">
                                <div className="input-group col-6">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search ..."
                                        aria-label="Example text with button addon"
                                        aria-describedby="button-addon1"
                                        value={query.text}
                                        onChange={search}
                                         />

                                    <button className="btn btn-outline-secondary" type="button" id="button-addon1">Find</button>
                                </div>


                            </div>
                        </div>

                    </nav>

                    <div>


                        {loading ? (<Spinner />) : (

                            <div className={styles.father}>
                                {
                                    tasks.length > 0 ? (
                                        tasks.map((t) => (

                                            <Tasks
                                                tasks={tasks}
                                                boxes={boxes}
                                                del={del}
                                                loading={loading}
                                                key={t.id}
                                                confirmDelete={() => confirmDelete(t.id, t.topic)}
                                                task={t}

                                            />

                                        ))
                                    ) : (
                                        <div>
                                            Not found
                                        </div>
                                    )
                                }
                            </div>

                        )}

                    </div>

                </div>

            )}
        </>
    )


}

export default Start;