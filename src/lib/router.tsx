import {createBrowserRouter} from "react-router-dom";
import App from '@/App';
import { Auth } from "@/features/auth";
import Link from '@/components/Link';
import { User } from "@/features/admin/user-management";
import {Role, RoleView,RoleCreate, RoleUpdate} from '@/features/admin/role-management';
import { HomeView } from "@/features/home";

const route = createBrowserRouter([
    {
        path:'/',
        element: <App/>,  
        children: [
            {
                index: true,
                element: <HomeView/>,
                handle: {
                    crumb: () => (
                        <Link path='/' label="Home"/>
                    )
                }
            },
            {
                path:'/user',
                element: <User/>,
                handle: {
                    crumb: () => (
                        <Link path='/user' label="User Management"/>
                    )
                }
            },
            {
                path:'/role',
                element: <Role/>,
                handle: {
                    crumb: () => (
                        <Link path='/role' label="Role Management"/>
                    )
                },
                children:[
                    {
                        index:true,
                        element: <RoleView/>
                    },
                    {
                        path: 'create',
                        element: <RoleCreate/>,
                        handle: {
                            crumb: (path:string) => (
                                <Link path={path} label='Create Role'/>
                            )
                        }
                    },
                    {
                        path: ':id',
                        element: <RoleUpdate/>,
                        handle: {
                            crumb: (path:string) => (
                                <Link path={path} label='Update Role'/>
                            )
                        }
                    }
                ]
            }
        ]  
    },
    {
        path:'/login',
        element: <Auth/>
    },
])

export default route
