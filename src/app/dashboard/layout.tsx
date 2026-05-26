"use client";

import { Activity, Users, Calendar, Pill, Microscope, CreditCard, BarChart3, ShieldCheck, Settings, LogOut, Bell } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const navItems = [
  { icon: BarChart3, label: "Overview", href: "/dashboard" },
  { icon: Users, label: "Patients & EMR", href: "/dashboard/patients" },
  { icon: Calendar, label: "Roster Management", href: "/dashboard/roster" },
  { icon: Pill, label: "Pharmacy & Stock", href: "/dashboard/pharmacy" },
  { icon: Microscope, label: "Diagnostics", href: "/dashboard/diagnostics" },
  { icon: CreditCard, label: "Billing & Claims", href: "/dashboard/billing" },
  { icon: Activity, label: "AI Analytics", href: "/dashboard/analytics" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    // <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {/* <Sidebar className="border-r border-border/50 bg-card">
          <SidebarHeader className="p-4 border-b">
            <Link className="flex items-center space-x-2" href="/">
              <Activity className="h-6 w-6 text-primary" />
              <span className="font-headline font-bold text-lg tracking-tighter text-primary">PULSE<span className="text-accent">NODE</span></span>
            </Link>
          </SidebarHeader>
          <SidebarContent className="p-2">
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.href}
                    tooltip={item.label}
                    className="flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:bg-secondary"
                  >
                    <Link href={item.href}>
                      <item.icon className={`h-4 w-4 ${pathname === item.href ? 'text-primary' : 'text-muted-foreground'}`} />
                      <span className="font-medium text-sm">{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-4 border-t">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8 border">
                  <AvatarImage src="https://picsum.photos/seed/doc1/40px/40px" />
                  <AvatarFallback>DR</AvatarFallback>
                </Avatar>
                <div className="flex flex-col truncate">
                  <span className="text-xs font-bold font-headline">Dr. Sarah Chen</span>
                  <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Medical Director</span>
                </div>
              </div>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton className="text-muted-foreground hover:text-destructive">
                    <LogOut className="h-4 w-4" />
                    <span className="text-sm">Log Out</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </div>
          </SidebarFooter>
        </Sidebar> */}
        {/* <SidebarInset className="flex-1 flex flex-col min-w-0 bg-background overflow-hidden"> */}
          <header className="h-14 border-b bg-card/30 backdrop-blur-sm flex items-center justify-between px-6 sticky top-0 z-40">
            <div className="flex items-center gap-4">
              {/* <SidebarTrigger /> */}
              <h2 className="text-sm font-headline font-bold uppercase tracking-widest text-muted-foreground">
                {navItems.find(item => item.href === pathname)?.label || 'Dashboard'}
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground relative">
                <Bell className="h-4 w-4" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full border-2 border-background"></span>
              </Button>
              <div className="h-4 w-[1px] bg-border mx-1"></div>
              <div className="flex items-center gap-2 px-2 py-1 bg-accent/10 rounded-full border border-accent/20">
                <ShieldCheck className="h-3.5 w-3.5 text-accent" />
                <span className="text-[10px] font-bold text-accent uppercase tracking-tighter">HIPAA SECURE</span>
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto p-6 scroll-smooth">
            {children}
          </main>
        {/* </SidebarInset> */}
      </div>
    // </SidebarProvider>
  );
}
