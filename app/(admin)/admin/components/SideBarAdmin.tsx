"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, LayoutDashboard, Package, User } from "lucide-react";
import { useAuth } from "@/context/context";

function SideBarAdmin() {
  const { logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/admin/auth/login");
  };

  // Rutas
  const menuItems = [
    {
      title: "Inicio",
      url: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Inventario",
      url: "/admin/productos",
      icon: Package,
    },
  ];

  return (
    <Sidebar className="border-r border-zinc-200 dark:border-zinc-800 font-['Mulish',_sans-serif]">
      {/* Header */}
      <SidebarHeader className="p-0 overflow-hidden select-none">
        <div className="bg-[#FF3C3C] flex flex-col items-center justify-center pt-8 pb-6 px-4 text-center text-white relative">
          {/* Logo*/}
          <div className="mb-4 flex flex-col items-center">
            <span className="text-2xl font-black tracking-tight text-white italic">
              tiendamia
            </span>
            <div className="h-1 w-16 bg-[#7000FF] rounded-full mt-0.5 ml-8" />
          </div>
        </div>
      </SidebarHeader>

      {/* CONTENIDO: Menú estático (Inicio y Producto) */}
      <SidebarContent className="px-3 py-4 gap-1">
        <SidebarMenu>
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = pathname === item.url;

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  className={`
                    w-full h-11 justify-start gap-4 px-4 rounded-xl transition-all font-medium text-[14px]
                    ${
                      isActive
                        ? "bg-[#FF3C3C]/8 text-[#FF3C3C] hover:bg-[#FF3C3C]/12 hover:text-[#FF3C3C]"
                        : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900"
                    }
                  `}
                >
                  <Link href={item.url}>
                    <IconComponent
                      className={`h-5 w-5 shrink-0 transition-colors ${
                        isActive ? "text-[#FF3C3C]" : "text-zinc-400"
                      }`}
                    />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      {/* FOOTER: Perfil fijo y Cerrar Sesión */}
      <SidebarFooter className="p-3 border-t border-zinc-100 dark:border-zinc-900">
        <SidebarMenu className="gap-1">
          {/* Botón de Perfil Fijo */}
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className={`
                w-full h-11 justify-start gap-4 px-4 rounded-xl font-medium text-[14px] transition-all
                ${
                  pathname === "/perfil"
                    ? "bg-[#FF3C3C]/8 text-[#FF3C3C]"
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                }
              `}
            >
              <Link href="/perfil">
                <User
                  className={`h-5 w-5 ${pathname === "/perfil" ? "text-[#FF3C3C]" : "text-zinc-400"}`}
                />
                <span>Mi Perfil</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Botón de Cerrar Sesión */}
          <SidebarMenuItem>
            <SidebarMenuButton
              className="w-full h-11 justify-start gap-4 px-4 rounded-xl font-semibold text-[14px] text-zinc-500 hover:bg-red-50 hover:text-[#FF3C3C] dark:hover:bg-red-950/20 transition-all"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 text-zinc-400 group-hover:text-[#FF3C3C]" />
              <span>Cerrar Sesión</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export default SideBarAdmin;
