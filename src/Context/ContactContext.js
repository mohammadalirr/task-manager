import { createContext } from "react";

export const TaskContext = createContext({
    loading: false,
    setLoading: () => {},
    filteredTasks: [],
    setFilteredTasks: () => {},
    tasks: [],
    task: {},
    setTasks: () => {},
    boxes: [],
    setBoxes: () => {},
    taskQuery: {},
    onTaskChange: () => {},
    deleteTask: () => {},
    createTask: () => {},
    taskSearch: () => {},

})