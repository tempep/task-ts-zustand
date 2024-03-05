import { AxiosError, AxiosResponse } from "axios";
import { taskApi } from "../api/task.api";
import { TaskResponse, TaskStatus } from "../interfaces";




export class TaskService {

    static getTasks = async (): Promise<TaskResponse> => {

        try {
            const { data } = await taskApi.get<TaskResponse>('/tasks');
            return data;
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response?.data);
                throw (error.response?.data);
            }
            console.log(error);
            throw new Error('Unable to get the tasks');
        }
    }

    static createNewTask = async (title: string, description: string, status: TaskStatus): Promise<TaskResponse> => {
        try {
            const { data } = await taskApi.post<TaskResponse>('/tasks', { title, description, status });
            return data;
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response?.data);
                throw (error.response?.data);
            }
            console.log(error);
            throw new Error('Unable to create the task');
        }
    }

    static deleteTask = async (taskId: string): Promise<AxiosResponse> => {
        try {
            console.log(taskId);
            const id = taskId;
            console.log(id);
            const response = await taskApi.delete<AxiosResponse>(`/tasks/${taskId}`);
            return response;
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response?.data);
                throw (error.response?.data);
            }
            console.log(error);
            throw new Error('Unable to create the task');
        }
    }

}