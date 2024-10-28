import { Calendar, Home, Inbox, Search, Settings, Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Logo from "@/public/logo.png";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/home",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "/inbox",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "/calendar",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "/search",
    icon: Search,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <div className="flex h-screen">
      {/* Entire Content Wrapped in a Sheet */}
      <Sheet>
        {/* Trigger for opening the sidebar */}
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="m-4">
            <Menu className="w-5 h-5" />
            <span className="sr-only">Open sidebar</span>
          </Button>
        </SheetTrigger>

        {/* Sidebar Content within the Sheet */}
        <SheetContent side="left" className="p-0 w-[260px]">
          <div className="border-r bg-muted/40 min-h-full flex flex-col">
            {/* Logo and Brand */}
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Link href="/" className="flex items-center gap-2 font-semibold">
                <Image src={Logo} alt="Logo" className="size-6" />
                <p className="text-xl font-bold">
                  Cal<span className="text-primary">Marshal</span>
                </p>
              </Link>
            </div>

            {/* Sidebar Menu */}
            <Sidebar>
              <SidebarContent className="flex-1">
                <SidebarGroup>
                  <SidebarGroupLabel>Application</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton asChild>
                            <Link href={item.url}>
                              <div className="flex items-center gap-2 p-2 hover:bg-muted/50 rounded-md">
                                <item.icon className="w-5 h-5" />
                                <span>{item.title}</span>
                              </div>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}