import { createBrowserRouter } from "react-router-dom";
import { Root } from "../Root";
import { AuthLayout, DashboardLayout } from "../layouts/index";
import { TaskPage, RegisterUserPage, LoginPage, DashboardPage } from "../pages/index";


export const router = createBrowserRouter( [

    {
        path:'/',
        element: <Root />,
        children: [
            /// Dashboard Routes
            {
                path: 'dashboard',
                element: <DashboardLayout />,
                children: [
                    {
                        path: '',
                        element: <DashboardPage />
                    },
                    {
                        path: 'tasks',
                        element: <TaskPage />
                    },

                ]
            },

            // Auth Routes
            {
                path: 'auth',
                element: <AuthLayout />,
                children: [
                    {
                        path: '',
                        element: <LoginPage />
                    },
                    {
                        path: 'register',
                        element: <RegisterUserPage />
                    }
                ]
            }
        ]
    }



]);