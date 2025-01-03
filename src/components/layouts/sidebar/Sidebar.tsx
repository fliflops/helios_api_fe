import React from 'react'
import {
    Sidebar,
    SidebarContent,
    SidebarHeader
  } from "@/components/ui/sidebar"
import SidebarAdmin from './SidebarAdmin';

interface SidebarProps {

}

const AppSidebar: React.FC<SidebarProps> = () => {
    return (
        <Sidebar>
            <SidebarHeader>
                <div className='grid gap-2 h-14 text-center'>
                    <h3 className='font-sans font-semibold text-lg'>Helios API Hub</h3>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarAdmin/>
            </SidebarContent>
        </Sidebar>

    );
}

export default AppSidebar