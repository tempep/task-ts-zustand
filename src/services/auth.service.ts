import { AxiosError } from "axios";
import { taskApi } from "../api/task.api";
import { LoginResponse } from "../interfaces";


export class AuthService {

    static login = async (email: string, password: string):Promise<LoginResponse> => {

        try {
            const { data } = await taskApi.post<LoginResponse>('/login', { email, password });
            console.log(data);
            return data;

        } catch (error) {
            if( error instanceof AxiosError) {
                console.log(error.response?.data);
                throw (error.response?.data);
            }
            console.log(error);
            throw new Error('Unable to login');
        }
    }



}