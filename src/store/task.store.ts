import { StateCreator, create } from "zustand";
import { TaskResponse, TaskStatus } from "../interfaces";
import { TaskService } from "../services/task.service";
import { devtools } from "zustand/middleware";
import { AxiosResponse } from "axios";


export interface TaskState {
    tasks: TaskResponse[];
    draggingTaskId: string;

    getTasks: () => void;
    setDragginTaskId: (taskId: string) => void;
    getTaskByStatus: (status: TaskStatus ) => TaskResponse[];
    removeDragginTaskId: () => void;
    changeTaskStatus: (taskId: string, status: TaskStatus) => void;
    onTaskDrop: (status: TaskStatus) => void;
    newTask: (title: string, descrption: string, status?: TaskStatus) => Promise<TaskResponse>;
    deleteTask: (taskId: string) => Promise<AxiosResponse>;

}


const storeApi: StateCreator<TaskState> = (set, get) => ({

    // Props
    tasks: [
        { __v: '', _id: '', createdAt: '',
        date: '', description: '', title: '',
        updatedAt: '', status: 'pending', user: ''
    }],

    draggingTaskId: '',

    // Methods
    getTasks: async () => {

        try {

            const tasks = await TaskService.getTasks();
            console.log(Object.values(tasks));
            set({ tasks: Object.values(tasks) });

        } catch (error) {
            console.log(error);
            throw (error);
        }
    },

    setDragginTaskId: (taskId: string) => {
        set({ draggingTaskId: taskId });
    },
    
    getTaskByStatus: (status: TaskStatus) => {
        const tasks = get().tasks;
        return Object.values(tasks).filter(task => task.status === status);
    },

    changeTaskStatus: (taskId: string, status: TaskStatus) => {
        const task = get().tasks.filter( task => task._id === taskId );
        task[0].status = status;

        //? Forma nativa de zustand
        set( state  => ({
            tasks:
                [...state.tasks],
                task
        }));
    },

    onTaskDrop: (status: TaskStatus) => {
        const taskId = get().draggingTaskId;
        if(!taskId) return;

        get().changeTaskStatus(taskId, status);
        get().removeDragginTaskId();
    },

    removeDragginTaskId: () => set({ draggingTaskId: '' }),

    newTask: async (title: string, description: string, status: TaskStatus = 'pending') =>  {
        try {
            const tasks = await TaskService.createNewTask(title, description, status);
            set({ tasks: Object.values(tasks) });
            return tasks;
        } catch (error) {
            throw (error);
        }
    },

    deleteTask: async (taskId: string) => {
        try {
            const response = await TaskService.deleteTask(taskId);
            get().getTasks();
            return response;
        } catch (error) {
            throw (error);
        }
    }

});

// Creamos el store y lo exportamos
// Middleware persist para almacenar el store en nuestro localStorage o sessionStorage
export const useTaskStore = create<TaskState>()(
    devtools(storeApi)
)