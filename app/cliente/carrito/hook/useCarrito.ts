/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
//hook/useCarrito
//Hook para manejar la logica del carrito de compras
//Objetivo: Permitir a los componentes acceder al estado del carrito y a las funciones para agregar, 
//eliminar y actualizar items en el carrito

import { useState, useEffect, useCallback } from 'react';
import api from '@/lib/api';
import { carrito, carritoItem } from '../types/carrito';
import { response } from '@/types/response';

export const useCarrito = () => {
    const [carritoState, setCarritoState] = useState<carrito | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    //Funcion para obtener el carrito del usuario
    //Callback para evitar que la funcion se vuelva a crear en cada renderizado
    const obtenerCarrito = useCallback(async () => {
        setIsLoading(true);
        try{
            const { data } = await api.get<response<carrito>>('/carrito');
            setCarritoState(data.data);
        }catch (error: any){
            setError(error.response?.data?.message || 'Error al obtener el carrito');
        }finally {
            setIsLoading(false);
        }
    }, []);

    //UseEffect para obtener el carrito al cargar el componente
    useEffect(() => {
        obtenerCarrito();
    }, [obtenerCarrito]);

    const actualizarCantidad = async (idVariante: number, cantidad: number) => {
        if(cantidad < 1) return;
        try {
            const { data } = await api.patch<response<carrito>>("/api/carrito/actualizar", {
                items: [{ idVariante, cantidad }]
            });
            setCarritoState(data.data);
        } catch (error: any) {
            setError(error.response?.data?.message || 'Error al actualizar el carrito');
        }
    };

    const eliminarItem = async (idDetalle: number) => {
        try {
            const { data } = await api.delete<response<carrito>>(`/api/carrito/eliminar/${idDetalle}`);
            setCarritoState(data.data);
        }catch (error: any) {
            setError(error.response?.data?.message || 'Error al eliminar el item del carrito');
        }
    };

    return {
        carrito: carritoState,
        isLoading,
        error,
        actualizarCantidad,
        eliminarItem
    };
}
