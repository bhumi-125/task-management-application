import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { BACKEND_URI } from "../enviroment";
import { toast } from "react-toastify";
import { useAuth } from './Auth.context'; // Import the AuthContext to access user data

export type Task = {
    title: string;
    description: string;
    isComplete: string;
    _id: string;
};

interface TaskContextIf {
    addTask: (title: string, desc: string) => void;
    getAllTasks: () => void;
    tasks: Task[];
    deleteTaskById: (id: string) => void;
    editTaskById: (id: string) => void;
}

const TaskContext = createContext<TaskContextIf>({
    addTask: () => {},
    getAllTasks: () => {},
    tasks: [],
    deleteTaskById: () => {},
    editTaskById: () => {}
});

export const useTask = () => {
    return useContext(TaskContext);
};

export const TaskProvider = ({ children }: { children: ReactNode }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const { user } = useAuth(); // Access user context

    useEffect(() => {
        if (user.email) {
            getAllTasks(); // Fetch tasks for the logged-in user
        } else {
            setTasks([]); // Clear tasks if user is not logged in
        }
    }, [user]); // Trigger on user change

    const addTask = async (title: string, desc: string) => {
        const response = await fetch(BACKEND_URI + "/task/add", {
            body: JSON.stringify({ title, desc }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            method: 'POST'
        });

        const data = await response.json();
        if (data.statusCode === 400) {
            throw new Error(data.message);
        }

        await getAllTasks(); // Refresh tasks after adding
        toast.success(data.msg);
    };

    const getAllTasks = async () => {
        const response = await fetch(BACKEND_URI + "/task/get-all", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            method: 'GET'
        });

        const data = await response.json();
        if (data.statusCode === 400) {
            throw new Error(data.message);
        } else {
            setTasks(data.tasks); // Set tasks for the logged-in user
        }
    };

    const deleteTaskById = async (id: string) => {
        const response = await fetch(BACKEND_URI + "/task/delete/" + id, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            method: 'DELETE'
        });

        const data = await response.json();
        if (data.statusCode === 400) {
            throw new Error(data.message);
        }

        await getAllTasks(); // Refresh tasks after deleting
        toast.success(data.msg);
    };

    const editTaskById = async (id: string) => {
        const response = await fetch(BACKEND_URI + "/task/edit/" + id, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            method: 'PUT'
        });

        const data = await response.json();
        if (data.statusCode === 400) {
            throw new Error(data.message);
        }

        await getAllTasks(); // Refresh tasks after editing
        toast.success(data.msg);
    };

    return (
        <TaskContext.Provider value={{ addTask, getAllTasks, tasks, deleteTaskById, editTaskById }}>
            {children}
        </TaskContext.Provider>
    );
};
