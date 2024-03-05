import { StateCreator, create } from "zustand";
import { User } from "../interfaces/user.interface";
import { devtools, persist } from "zustand/middleware";
import { AuthService } from "../services/auth.service";


type AuthStatus = 'authorizared' | 'unauthorized' | 'pending';

export interface AuthState {
    // Properties
    status: AuthStatus;
    token?: string;
    user?: User;

    //Methods
    loginUser: (email: string, password: string) => Promise<void>;
    getUserEmail: () => string | void;

}


const storeApi: StateCreator<AuthState> = (set, get) => ({

    // Valores por defecto de las properties
    status:'pending',
    token: undefined,
    user: undefined,

    // Definimos la funcionalidad de los methods
    loginUser: async (email: string, password: string) => {
        try {
            const { token, user } = await AuthService.login(email, password);
            set({ status:'authorizared', token, user });
            
        } catch (error) {
            set({ status: 'unauthorized', token: undefined, user: undefined });
            throw (error);
        }
    },

    getUserEmail: () => {
        if(get().user?.email) {
            return get().user?.email;
        }
        return '';
    }




});


// Creamos el store y lo exportamos
// Middleware persist para almacenar el store en nuestro localStorage o sessionStorage
export const useAuthStore = create<AuthState>()(
    devtools(
        persist(
            storeApi,
            { name: 'auth-store' }
        )
    )
);