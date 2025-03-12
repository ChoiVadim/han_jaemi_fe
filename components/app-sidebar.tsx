"use client";

import {
  Home,
  Youtube,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ArrowUpCircle,
  Bell,
  CreditCard,
  User,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { JaemiLogo } from "@/components/jaemi-logo";

const platformItems = [
  {
    title: "Learning",
    icon: Home,
    href: "/study",
  },
  {
    title: "Youtube",
    icon: Youtube,
    href: "/youtube",
  },
  {
    title: "TOPIC",
    icon: FileText,
    href: "/topic",
  },
];

type HistoryItem = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  type: "youtube" | "topic" | "study";
};

export function AppSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { open, setOpen, toggleSidebar } = useSidebar();
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // TODO: Fetch history from API
  // Only access localStorage after component is mounted (client-side)
  useEffect(() => {
    const searchHistory = localStorage.getItem("searchHistory");
    if (searchHistory) {
      setHistory(JSON.parse(searchHistory));
    }
  }, []);

  const handleSignOut = () => {
    // Here you would typically handle the sign out logic
    router.push("/");
  };

  return (
    <div className="flex relative">
      <Sidebar
        className={cn(
          "border-r border-border bg-sidebar transition-all duration-300 ease-in-out",
          open ? "w-64 min-w-[16rem]" : "w-[60px] min-w-[60px]"
        )}
        collapsible="none"
      >
        <SidebarHeader
          className={cn(
            "flex transition-all duration-300 ease-in-out",
            open ? "justify-between px-5 py-3" : "justify-center py-3"
          )}
        >
          {open ? (
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-primary-foreground">
                <JaemiLogo size={28} />
              </div>
              <div className="flex flex-col text-left">
                <h1 className="text-sm font-semibold">HanJaemi</h1>
                <p className="text-xs text-muted-foreground">Learning Korean</p>
              </div>
            </Link>
          ) : (
            <Link href="/" className="flex items-center justify-center">
              <div className="flex h-10 w-10 items-center justify-center rounded bg-primary text-primary-foreground">
                <JaemiLogo size={32} />
              </div>
            </Link>
          )}
        </SidebarHeader>

        <SidebarContent
          className={cn(
            "transition-all duration-300 ease-in-out",
            open ? "px-2" : ""
          )}
        >
          <SidebarGroup>
            {open && (
              <SidebarGroupLabel className="text-xs font-normal text-muted-foreground">
                Platform
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              {open ? (
                <SidebarMenu>
                  {platformItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        title={item.title}
                        className={cn(
                          "transition-all duration-300 ease-in-out h-9 justify-start gap-2 px-3",
                          pathname === item.href
                            ? "bg-accent text-accent-foreground"
                            : "hover:bg-accent/50"
                        )}
                      >
                        <Link href={item.href} className="flex items-center">
                          <item.icon className="shrink-0 h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              ) : (
                <div className="flex flex-col items-center gap-1 py-3">
                  {platformItems.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className={cn(
                        "h-10 w-10 flex items-center justify-center rounded-md transition-all duration-300 ease-in-out",
                        pathname === item.href
                          ? "bg-accent text-accent-foreground"
                          : "hover:bg-accent/50"
                      )}
                      title={item.title}
                    >
                      <item.icon className="h-5 w-5" />
                    </Link>
                  ))}
                </div>
              )}
            </SidebarGroupContent>
          </SidebarGroup>

          {open && (
            <SidebarGroup className="pt-3">
              <SidebarGroupLabel className="text-xs font-normal text-muted-foreground">
                History
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    {history.map((item) => (
                      <SidebarMenuButton
                        asChild
                        className="h-9 justify-start gap-2 px-3 hover:bg-accent/50"
                      >
                        <Link href={`/youtube/${item.id}`}>
                          <div className="grid place-items-center h-4 w-4">
                            YT
                          </div>
                          <span key={item.id}>{item.title || "Untitled"}</span>
                        </Link>
                      </SidebarMenuButton>
                    ))}
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )}
        </SidebarContent>

        <SidebarFooter className="mt-auto">
          {open ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full flex items-center justify-between p-3 h-auto rounded-none border-t"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 rounded">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="user"
                      />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        SC
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start text-left">
                      <span className="text-sm">Choi Vadim</span>
                      <span className="text-xs text-muted-foreground">
                        tsoivadim97@gmail.com
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                side="right"
                className="w-56 ml-1"
                sideOffset={0}
              >
                <DropdownMenuItem className="flex gap-2 items-center">
                  <ArrowUpCircle className="h-4 w-4" />
                  <span>Upgrade to Pro</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex gap-2 items-center">
                  <User className="h-4 w-4" />
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex gap-2 items-center">
                  <CreditCard className="h-4 w-4" />
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex gap-2 items-center">
                  <Bell className="h-4 w-4" />
                  <span>Notifications</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="flex gap-2 items-center"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex flex-col">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="py-3 flex justify-center cursor-pointer">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="user"
                      />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        SC
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  side="right"
                  className="w-56 ml-1"
                  sideOffset={0}
                >
                  <DropdownMenuItem className="flex gap-2 items-center">
                    <ArrowUpCircle className="h-4 w-4" />
                    <span>Upgrade to Pro</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex gap-2 items-center">
                    <User className="h-4 w-4" />
                    <span>Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex gap-2 items-center">
                    <CreditCard className="h-4 w-4" />
                    <span>Billing</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex gap-2 items-center">
                    <Bell className="h-4 w-4" />
                    <span>Notifications</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className="flex gap-2 items-center"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </SidebarFooter>
      </Sidebar>

      {/* Toggle button positioned to the right of the sidebar */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        className="absolute top-4 h-6 w-6 rounded-full bg-background border shadow-sm z-50 transition-all duration-300"
        style={{
          left: open ? "calc(var(--sidebar-width) - 12px)" : "46px",
        }}
      >
        {open ? (
          <ChevronLeft className="h-3 w-3" />
        ) : (
          <ChevronRight className="h-3 w-3" />
        )}
      </Button>
    </div>
  );
}
