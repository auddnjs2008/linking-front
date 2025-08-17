import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useLocation } from "react-router-dom";
import { menuItems } from "./app-sidebar";
import { useMeQuery } from "@/hooks/rqhooks/user/useMeQuery";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { AvatarImage } from "./ui/avatar";

export function SiteHeader() {
  const pathname = useLocation();
  const { data } = useMeQuery();

  const title = menuItems.find((item) => item.url === pathname.pathname)?.title;

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{title}</h1>
        <div className="ml-auto flex gap-2 items-center rounded-sm hover:bg-gray-100 hover:cursor-pointer p-2">
          <Avatar>
            <AvatarImage
              src={data?.profile ?? "https://github.com/shadcn.png"}
              alt="@shadcn"
              className="size-7 rounded-full overflow-hidden"
            />
            <AvatarFallback>{data?.name}</AvatarFallback>
          </Avatar>
          <span>{data?.name}</span>
        </div>
      </div>
    </header>
  );
}
