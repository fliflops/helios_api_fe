import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem,SidebarGroupContent } from '@/components/ui/sidebar';
import {admin} from '@/lib/router.modules';
import React from 'react'
import { NavLink } from 'react-router-dom';

interface SidebarAdminProps {

}

const SidebarAdmin: React.FC<SidebarAdminProps> = () => {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Administration</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {
                        admin.map(item => (
                            <SidebarMenuItem key={item.module_key}>
                                <SidebarMenuButton asChild>
                                    <NavLink to={item.route}>
                                        {({ isActive }) => (
                                            <div className={`flex w-full ${isActive ? 'bg-slate-500' : ''}`}>
                                                {item.module_name}
                                            </div>
                                        )}
                                    </NavLink>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        )) 
                    }
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>

    );
}

export default SidebarAdmin