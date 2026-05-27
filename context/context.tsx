/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/immutability */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { createContext, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { User, AuthContextType, RegisterPayload } from '@/context/types/user';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        initAuth();
    }, []);

    const initAuth = async () => {
        const storedToken = localStorage.getItem('tiendamia_token');

        if (storedToken) {
            setToken(storedToken);
            api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;

            try {
                const { data } = await api.get('/auth/perfil');
                setUser(data.data as User);
            } catch (error) {
                console.error("Error al cargar perfil:", error);
                logout();
            }
        }
        setIsLoading(false);
    };

    const login = async (correo: string, password: string) => {
        try {
            const { data } = await api.post('/auth/login', { correo, password });
            const payload = data.data; 
            const jwt = payload.token;

            const userData: User = {
                id: payload.id || 0, 
                correo: payload.correo,
                nombres: payload.nombres,
                rol: payload.rol,
                activo: true
            };

            guardarSesion(jwt, userData);
        } catch (error: any) {
            throw new Error(error.response?.data?.mensaje || error.response?.data?.message || "Error al iniciar sesión");
        }
    };

    const loginConGoogle = async (googleToken: string) => {
        try {
            const { data } = await api.post('/auth/google', { token: googleToken });
            
            const payload = data.data;
            const jwt = payload.token;

            const userData: User = {
                id: payload.id || 0,
                correo: payload.correo,
                nombres: payload.nombres,
                rol: payload.rol,
                activo: true
            };
            
            guardarSesion(jwt, userData);
        } catch (error: any) {
            throw new Error(error.response?.data?.mensaje || "Error al iniciar sesión con Google");
        }
    };

    const register = async (payloadRequest: RegisterPayload) => {
        try {
            const { data } = await api.post('/auth/register', payloadRequest);
            
            // Dependiendo de si tu register devuelve el token igual que el login
            const payload = data.data;
            const jwt = payload.token;

            const userData: User = {
                id: payload.id || 0,
                correo: payload.correo,
                nombres: payload.nombres,
                rol: payload.rol || "USER",
                activo: true
            };

            guardarSesion(jwt, userData);
        } catch (error: any) {
            throw new Error(error.response?.data?.mensaje || "Error al registrarse");
        }
    };

    const hasRole = (role: string): boolean => {
        if (!user || !user.rol) return false;
        
        //Maneja ambos casos: cuando viene del Login ("USER") y cuando viene del Perfil ({id: 2, nombre: "USER"})
        const userRole = typeof user.rol === 'string' ? user.rol : (user.rol as any)?.nombre;
        return userRole?.toUpperCase() === role.toUpperCase();
    };

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
        router.push("/"); 
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                autenticado: !!token,
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

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) 
        throw new Error("useAuth debe ser usado dentro de un AuthProvider");
    
    return context;
};