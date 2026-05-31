//Components/public/ProtectedRoute.tsx
//ProtectedRoute es un componente que se utiliza para proteger rutas específicas en la aplicación. 
//Solo permite el acceso a usuarios autenticados y, opcionalmente, a usuarios con roles específicos.
//Objetivo: asegurar la pasarela de pago, solo los usuarios autenticados pueden acceder a ella.
"use client";

import { useAuth } from "@/context/context";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { CarritoSkeleton } from "@/app/(shop)/carrito/components/carritoSkeleton";

interface Props {
    children: React.ReactNode;
    rolesPermitidos?: string[]; 
}

//Componente para proteger rutas específicas, solo permite acceso a usuarios autenticados y con roles específicos
export const ProtectedRoute = ({ children, rolesPermitidos }: Props) => {
    const { autenticado, isLoading, hasRole } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if(!isLoading) {
            if(!autenticado) {
                router.push(`/auth/login?redirect=${pathname}`);
            } else if (rolesPermitidos && !rolesPermitidos.some(role => hasRole(role))) {
                router.push(`/auth/access-denied`);
            }
        }
    }, [isLoading, autenticado, hasRole, rolesPermitidos, router, pathname]);

    if(isLoading) 
        return <CarritoSkeleton />;
    
    if(!autenticado || (rolesPermitidos && !rolesPermitidos.some(role => hasRole(role))))
        return null; 

    return <>{children}</>;
}