import {createBrowserRouter} from "react-router-dom";
import App from '@/App';
import { Auth } from "@/features/auth";
import Link from '@/components/Link';

const route = createBrowserRouter([
    {
        path:'/',
        element: <App/>,  
        children: [
            {
                path:'/user',
                element: <>User</>,
                handle: {
                    crumb: () => (
                        <Link path='/user' label="User Management"/>
                    )
                }
            },
            {
                path:'/role',
                element: <>Role</>,
                handle: {
                    crumb: () => (
                        <Link path='/role' label="Role Management"/>
                    )
                }
            }
        ]  
    },
    {
        path:'/login',
        element: <Auth/>
    },
])

export default route
