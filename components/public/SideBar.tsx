"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "../ui/button";
import { ChevronDown, ShoppingCart, Heart, Search } from "lucide-react";
import { SiGoogle } from "@icons-pack/react-simple-icons";
import Link from "next/link";
import { useAuth } from "@/context/context"; 

function SideBar() {

  const { user: usuario, logout: handleLogout } = useAuth();

  return (
    <header className="w-full bg-[#FF3C3C] text-white px-4 py-3 shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-center gap-10">
        {/* LOGO */}
        <Link
          href="/"
          className="flex flex-col items-center cursor-pointer select-none shrink-0"
        >
          <span className="text-2xl font-black tracking-tight text-white font-sans">
            tienda<span className="text-white font-extrabold">mia</span>
          </span>
          <div className="w-14 h-1 bg-[#7000FF] rounded-full -mt-1 self-end mr-1" />
        </Link>

        {/* BARRA DE BÚSQUEDA */}
        <div className="flex flex-1 max-w-xl bg-white rounded-md overflow-hidden shadow-sm h-10 items-center">
          <button className="flex items-center gap-1 bg-neutral-100 text-neutral-800 text-sm font-medium px-4 h-full border-r border-neutral-200 hover:bg-neutral-200 transition-colors cursor-pointer">
            <span>Amazon</span>
            <ChevronDown className="h-4 w-4 text-neutral-500" />
          </button>
          <input
            type="text"
            placeholder="Buscar en Tiendamia"
            className="w-full px-4 text-sm text-neutral-800 bg-transparent placeholder-neutral-400 focus:outline-none"
          />
          <button className="px-4 h-full flex items-center justify-center text-neutral-800 hover:text-neutral-600 transition-colors cursor-pointer">
            <Search className="h-5 w-5 stroke-[2.5]" />
          </button>
        </div>

        {/* BOTONES */}
        <div className="relative z-50 flex items-center gap-6 text-sm font-medium shrink-0">
          {/* FAVORITOS */}
          <Button
            variant="link"
            className="text-white p-0 h-auto hover:no-underline hover:opacity-90 cursor-pointer"
          >
            <Heart className="h-6 w-6 stroke-[2]" />
          </Button>

          {/* REGÍSTRATE o nombre del usuario */}
          {usuario ? (
            <span className="text-white text-[15px] font-medium">
              Hola, {usuario.nombres?.split(" ")?.[0] ?? usuario.correo}
            </span>
          ) : (
            <Link
              href="/auth/register"
              className="text-white text-[15px] font-medium hover:opacity-90 transition-opacity"
            >
              Regístrate
            </Link>
          )}

          {/* MI CUENTA */}
          <HoverCard openDelay={0} closeDelay={150}>
            <HoverCardTrigger asChild>
              <button className="text-white bg-transparent border-none flex items-center gap-1 font-medium p-1 h-auto cursor-pointer text-[15px] focus:outline-none">
                <span>Mi cuenta</span>
                <ChevronDown className="h-4 w-4" />
              </button>
            </HoverCardTrigger>

            <HoverCardContent
              align="center"
              side="bottom"
              sideOffset={14}
              avoidCollisions={false}
              className="w-64 p-4 flex flex-col gap-3 bg-white rounded-md shadow-xl border border-neutral-100 z-[9999]"
            >
              {usuario ? (
                // Usuario logueado
                <>
                  <p className="text-sm text-gray-600 font-medium truncate">
                    {usuario.correo}
                  </p>
                  <hr className="border-neutral-200" />
                  <Link
                    href="/perfil"
                    className="text-sm text-gray-700 hover:text-black transition"
                  >
                    Mi perfil
                  </Link>
                  <Link
                    href="/mis-pedidos"
                    className="text-sm text-gray-700 hover:text-black transition"
                  >
                    Mis pedidos
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left text-sm text-red-500 hover:text-red-600 transition"
                  >
                    Cerrar sesión
                  </button>
                </>
              ) : (
                // Usuario no logueado
                <>
                  <button className="w-full flex items-center justify-center gap-2.5 h-10 px-4 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 hover:bg-neutral-50 rounded-lg transition-colors shadow-sm">
                    <SiGoogle />
                    <span>Ingresar con Google</span>
                  </button>

                  <div className="relative flex py-0.5 items-center">
                    <div className="grow border-t border-neutral-200"></div>
                    <span className="shrink mx-2 text-neutral-400 text-xs font-light">
                      o ingresa con tu email
                    </span>
                    <div className="grow border-t border-neutral-200"></div>
                  </div>

                  <Link
                    href="/auth/login"
                    className="w-full text-center bg-[#FF4141] hover:bg-[#E53A3A] text-white font-medium h-9 text-sm rounded-md shadow-sm transition-colors flex items-center justify-center"
                  >
                    Ingresar
                  </Link>
                </>
              )}
            </HoverCardContent>
          </HoverCard>

          {/* CARRITO */}
          <HoverCard openDelay={0} closeDelay={150}>
            <HoverCardTrigger asChild>
              <Link href="/carrito" className="text-white bg-transparent border-none p-1 h-auto relative flex items-center justify-center cursor-pointer focus:outline-none">
                <span className="relative inline-block">
                  <ShoppingCart className="h-6 w-6 text-white stroke-2" />
                  <span className="absolute -top-1.5 -right-1 bg-[#FF3C3C] text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full border-2 border-[#FF3C3C]">
                    0
                  </span>
                </span>
              </Link>
            </HoverCardTrigger>
            <HoverCardContent
              align="end"
              side="bottom"
              sideOffset={14}
              avoidCollisions={false}
              className="w-80 py-8 px-6 bg-white rounded-md shadow-xl border border-neutral-100 flex items-center justify-center relative z-[9999]"
            >
              <div className="absolute -top-2 right-4 w-4 h-4 bg-white rotate-45 border-l border-t border-neutral-100 shadow-[-2px_-2px_3px_rgba(0,0,0,0.02)]" />
              <p className="text-neutral-400 text-sm font-normal tracking-wide text-center selection:bg-transparent">
                ¡No tienes productos en tu carrito!
              </p>
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>
    </header>
  );
}

export default SideBar;