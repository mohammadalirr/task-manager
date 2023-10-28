import "../Css/AddTask.module.css";

const AddTask = ({ boxes, createTaskForm , buildTask , task }) => {
    return (
        <form 
        className="container col-md-4 p-5 my-5"
        onSubmit={createTaskForm}>
            <h2 className="mb-5">Add new task</h2>

            <div className="justify-content-center">
                <div className="row">
                    <input 
                    className="form-control col-md-12 mb-3"
                        placeholder="Title"
                        type="text"
                        name="topic"
                        value={task.topic}
                        onChange={buildTask}
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
                        onChange={buildTask}
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
                        onChange={buildTask}
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
                        onChange={buildTask}
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
                        onChange={buildTask}
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

export default AddTask;
