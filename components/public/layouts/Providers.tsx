//components/public/layouts/Providers.tsx
//Providers es un componente que envuelve a los componentes hijos con el contexto de autenticación.
//Objetivo: proporcionar el contexto de autenticación a toda la aplicación, permitiendo que los componentes hijos accedan a la información del usuario y a las funciones de autenticación.
"use client";

import { AuthProvider } from "@/context/context";
import { GoogleOAuthProvider } from "@react-oauth/google";

export function Providers({ children }: { children: React.ReactNode }) {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <AuthProvider>
                {children}
            </AuthProvider>
        </GoogleOAuthProvider>
    );
}