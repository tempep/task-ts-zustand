import { User } from "./index";


export interface LoginResponse {
    token: string;
    user: User;
}