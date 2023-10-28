import axios from "axios";

const serverURL = "http://localhost:9000";

export const getAllTasks = () => {
    const url = `${serverURL}/tasks`;
    return axios.get(url)
}

export const getOneTask = (taskId) => {
    const url = `${serverURL}/tasks/${taskId}`
    return axios.get(url)
}

export const getAllBoxes = () => {
    const url = `${serverURL}/boxes`;
    return axios.get(url)
}

export const createTask = (task) => {
    const url = `${serverURL}/tasks`;
    return axios.post(url, task)
}

export const createBox = (box) => {
    const url = `${serverURL}/boxes`;
    return axios.post(url, box)
}

export const editTask = (getTask , taskId) => {

    const url = `${serverURL}/tasks/${taskId}`;

    return axios.put(url, getTask)
}

export const deleteTask = (taskId) => {

const url = `${serverURL}/tasks/${taskId}`
return axios.delete(url)

}






