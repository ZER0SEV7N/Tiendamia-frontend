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

export const useCarrito = (isAuthenticated: boolean) => {
    const [carritoState, setCarritoState] = useState<carrito | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    //Funcion para cargar el carrito del invitado
    const carritoInvitado = (items: carritoItem[]): carrito => {
        const subtotal = items.reduce((acc, item) => acc + item.precio, 0);
        const tarifa = subtotal * 0.10;
        const envio = subtotal > 0 ? subtotal * 0.20 : 0;
        const total = subtotal + tarifa + envio;
        return {
            idCarrito: 0,
            items,
            tarifa,
            envio,
            total
        };
    }

    //Funcion para obtener el carrito del usuario o del invitado
    //Si el usuario esta autenticado, obtenemos su carrito desde la API, 
    //sino obtenemos el carrito del invitado desde el localStorage
    const obtenerCarritoInvitado = () => {
        const localData = localStorage.getItem("tiendamia_cart");
        if (localData) setCarritoState(JSON.parse(localData));
        else setCarritoState({ idCarrito: 0, tarifa: 0, envio: 0, total: 0, items: [] });
        
        setIsLoading(false);
    };

    //Funcion para cargar el carrito del usuario autenticado desde la API
    const cargarCarrito = useCallback(async () => {
    if (!isAuthenticated) {
      obtenerCarritoInvitado();
      return;
    }

    setIsLoading(true);
    try {
      const { data } = await api.get<response<carrito>>("/carrito");
      setCarritoState(data.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al cargar el carrito");
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);


    //UseEffect para obtener el carrito al cargar el componente
    useEffect(() => {
        cargarCarrito();
    }, [cargarCarrito]);

    //Funcion para calcular el carrito del invitado a partir de los items en localStorage
    const actualizarCantidad = async (idVariante: number, nuevaCantidad: number) => {
        if (nuevaCantidad < 1) return;

        if (isAuthenticated) {
            try {
                const { data } = await api.patch<response<carrito>>("/carrito/actualizar", {
                    items: [{ idVariante, cantidad: nuevaCantidad }]
                });
                setCarritoState(data.data);
            } catch (err: any) {
                console.error("Error al actualizar en el servidor", err);
            }

        } else {
            const localData = localStorage.getItem("tiendamia_cart");
            let currentItems: carritoItem[] = localData ? JSON.parse(localData).items : [];

            currentItems = currentItems.map(item => {
                if (item.idVariante === idVariante) {
                    return { 
                        ...item, 
                        cantidad: nuevaCantidad, 
                        precio: nuevaCantidad * (item.precio / item.cantidad) 
                    };
                }
                return item;
            });

            const nuevoCarrito = carritoInvitado(currentItems);
            localStorage.setItem("tiendamia_cart", JSON.stringify(nuevoCarrito));
            setCarritoState(nuevoCarrito);
        }
    };

    //Funcion para eliminar un item del carrito
    const eliminarItem = async (idDetalle: number) => {
        if (isAuthenticated) {
            try {
                const { data } = await api.delete<response<carrito>>(`/carrito/eliminar/${idDetalle}`);
                setCarritoState(data.data);
            } catch (err: any) {
                console.error("Error al eliminar del servidor", err);
            }

        } else {
            const localData = localStorage.getItem("tiendamia_cart");
            if (localData) {
                const currentItems: carritoItem[] = JSON.parse(localData).items;
                const filtrados = currentItems.filter(item => item.idVariante !== idDetalle);
                
                const nuevoCarrito = carritoInvitado(filtrados);
                localStorage.setItem("tiendamia_cart", JSON.stringify(nuevoCarrito));
                setCarritoState(nuevoCarrito);
            }

        }
    };

    //Funcion para sincronizar el carrito del invitado con el servidor al iniciar sesion
    const sincronizarCarrito = async () => {
        const localData = localStorage.getItem("tiendamia_cart");
        if(!localData) return;

        const { items }: carrito = JSON.parse(localData);
        if(items.length === 0) return;

        try{
            const itemsRequest = items.map(item => ({
                idVariante: item.idVariante,
                cantidad: item.cantidad
            }));
            await api.post("/carrito/agregar", { items: itemsRequest });
            localStorage.removeItem("tiendamia_cart");
        } catch (err) {
            console.error("Error sincronizando el carrito de invitado con el servidor", err);
        }
    }

    return {
        carritoState,
        isLoading,
        error,
        actualizarCantidad,
        eliminarItem,
        sincronizarCarrito
    };
}
