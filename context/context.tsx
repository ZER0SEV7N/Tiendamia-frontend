/* eslint-disable react-hooks/immutability */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { createContext, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { User, AuthContextType, RegisterPayload } from '@/context/types/user'; // Asegúrate de importar RegisterPayload

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();

    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Cargar la sesion del usuario
    useEffect(() => {
        initAuth();
    }, []);

    // Funcion para inicializar la autenticación al cargar la aplicación
    const initAuth = async () => {
        const storedToken = localStorage.getItem('tiendamia_token');

        if (storedToken) {
            setToken(storedToken);
            api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;

            try {
                const { data } = await api.get('/auth/perfil');
                // Asume que tu endpoint /auth/perfil devuelve { data: usuario }
                setUser(data.data);
            } catch (error) {
                console.error("Error al cargar perfil:", error);
                logout();
            }
        }
        setIsLoading(false);
    };

    // Funcion para iniciar sesión con correo y contraseña
    const login = async (correo: string, password: string) => {
        try {
            const { data } = await api.post('/auth/login', { correo, password });
            const jwt = data.token;
            // Estandariza si tu backend devuelve data.user o data.usuario
            const userData = data.usuario || data.user; 

            guardarSesion(jwt, userData);
        } catch (error: any) {
            throw new Error(error.response?.data?.message || "Error al iniciar sesión");
        }
    };

    // Funcion para iniciar sesión con Google
    const loginConGoogle = async (googleToken: string) => {
        try {
            const { data } = await api.post('/auth/google', { token: googleToken });
            const jwt = data.token;
            const userData = data.usuario || data.user;
            
            guardarSesion(jwt, userData);
        } catch (error: any) {
            throw new Error(error.response?.data?.message || "Error al iniciar sesión con Google");
        }
    };

    // Funcion para registrar un usuario
    const register = async (payload: RegisterPayload) => {
        try {
            const { data } = await api.post('/auth/register', payload);
            const jwt = data.token;
            const userData = data.usuario || data.user;

            guardarSesion(jwt, userData);
        } catch (error: any) {
            throw new Error(error.response?.data?.message || "Error al registrarse");
        }
    };
    // Funcion para verificar roles
    const hasRole = (role: string): boolean => {
        if (!user || !user.rol) return false;
        
        // Verifica si tu backend devuelve el rol como string ("USER") 
        // o como un objeto ({ id: 2, nombre: "USER" })
        const userRole = typeof user.rol === 'string' ? user.rol : (user.rol as any)?.nombre;
        
        return userRole?.toUpperCase() === role.toUpperCase();
    };

    // Funcion auxiliar para guardar la sesión en localStorage y actualizar el estado
    const guardarSesion = (jwt: string, userData: User) => {
        localStorage.setItem("tiendamia_token", jwt);
        api.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
        setToken(jwt);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("tiendamia_token");
        delete api.defaults.headers.common["Authorization"];
        setToken(null);
        setUser(null);
        router.push("/auth/login"); 
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isAuthenticated: !!token,
                isLoading,
                login,
                loginConGoogle,
                register,
                logout,
                hasRole
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Hook personalizado para usar el contexto fácilmente
//Unir repositorio
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) 
        throw new Error("useAuth debe ser usado dentro de un AuthProvider");
    
    return context;
};