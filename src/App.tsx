//import { Outlet } from "react-router-dom"

import { Navigate, Outlet } from "react-router-dom";
import Header from "@/components/layouts/header/Header";
import { useAppSelector } from "./hooks/redux.hooks"
import { getAccessToken } from "./lib/redux/slices/auth.slice"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import AppSidebar from "./components/layouts/sidebar/Sidebar";
import { Separator } from "./components/ui/separator";
import AppBreadcrumb from "./components/layouts/breadcrumbs/Breadcrumbs";
// import { TruckerClearance } from "./features/trucker-clearance";

function App() {
  const token = useAppSelector(getAccessToken);
  if(!token) return <Navigate to='/login' replace/>
  return (
    <SidebarProvider>
      <AppSidebar/>
      <SidebarInset>
          <Header>
            <SidebarTrigger className="-ml-1"/>
            <Separator orientation="vertical" className="mr-2 h-6"/>
            <AppBreadcrumb/>
          </Header>
          <div className="flex flex-1 flex-col gap-4 p-4">
              <Outlet/>
            {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              <div className="aspect-video rounded-xl bg-muted" />
              <div className="aspect-video rounded-xl bg-muted" />
              <div className="aspect-video rounded-xl bg-muted" />
            </div>
            <div className="100vh flex-1 rounded-xl bg-muted" /> */}
        </div>
          {/* <div className="relative top-20 px-5">
              
          </div> */}
      </SidebarInset>
    </SidebarProvider>
   
  )
}

export default App
