"use client";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import SideBarAdmin from "../components/SideBarAdmin";

export default function AdministradorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TooltipProvider delayDuration={0}>
      <SidebarProvider>
        <SideBarAdmin />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 transition-[width,height] ease-linear">
            <SidebarTrigger className="-ml-1" />
            <div className="h-4 w-px bg-border mx-2" />
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
