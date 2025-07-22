import { AppSidebar } from "./app-sidebar";
import { SiteHeader } from "./site-header";
import { Outlet } from "react-router-dom";
import { SidebarInset, SidebarProvider } from "./ui/sidebar";

export function Layout() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <div className=" w-full h-screen flex flex-1 flex-col">
        <SidebarInset className="flex flex-col h-full w-full  p-5 bg-[#FAFAFA]">
          <div className="bg-white rounded-xl h-full shadow-xl ">
            <SiteHeader />
            <div className="flex flex-col h-[calc(100vh-100px)] overflow-y-auto">
              <Outlet />
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
