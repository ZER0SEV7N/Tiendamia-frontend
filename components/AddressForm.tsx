"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Para detectar la URL actual
import { User, ShoppingBag, RefreshCw, MapPin, Wallet, Gift, Heart } from "lucide-react";

export default function ProfileSidebar() {
  const pathname = usePathname(); // Captura si estás en /perfil/direcciones, etc.
  const username = "Daniel";

  const menuItems = [
    { name: "Información de la cuenta", href: "/perfil", icon: User },
    { name: "Mis órdenes", href: "/perfil/ordenes", icon: ShoppingBag },
    { name: "Devoluciones", href: "/perfil/devoluciones", icon: RefreshCw },
    { name: "Mis direcciones", href: "/perfil/direcciones", icon: MapPin }, 
    { name: "Mi billetera", href: "/perfil/billetera", icon: Wallet },
    { name: "Invita y gana", href: "/perfil/invita", icon: Gift },
    { name: "Favoritos", href: "/perfil/favoritos", icon: Heart },
  ];

  return (
    <div className="w-full md:w-64 flex flex-col gap-6 p-4">
      <div>
        <h2 className="text-xl font-semibold text-gray-800">Hola {username}</h2>
        <p className="text-sm text-gray-500">¡Te damos la bienvenida!</p>
      </div>

      <nav className="flex flex-col gap-1">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          // Verificamos si la URL actual coincide con el botón para activarlo
          const isActive = pathname === item.href;

          return (
            <Link
              key={index}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${
                isActive
                  ? "text-[#E61C24] bg-red-50/50" // Rojo corporativo Tiendamia si está activo
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "text-[#E61C24]" : "text-gray-400"}`} />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}