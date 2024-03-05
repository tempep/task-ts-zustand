import axios from "axios";
import { useAuthStore } from "../store/auth.store";



const taskApi = axios.create({
    baseURL: 'http://localhost:3000/api'
});

//Todo: interceptors
// Leer el store de Zustand

taskApi.interceptors.request.use(
    (config) => {

        const token = useAuthStore.getState().token;

        if( token ) {
            config.headers['Authorization'] = `Bearer ${ token }`
        }

        return config;

    }
);

export {
    taskApi
}