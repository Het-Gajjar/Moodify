import { createBrowserRouter } from "react-router";
import Login from "./Features/Auth/pages/login";
import Register from "./Features/Auth/pages/Register";
import { Home } from "./Features/song/pages/Home";

export const router=createBrowserRouter([
    {
        path:'/',
        element:<Home/>
    },
    {
        path:'/login',
        element:<Login/>
    },
    {
        path:'/register',
        element:<Register/>
    }
])