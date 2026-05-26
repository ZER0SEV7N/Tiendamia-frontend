/* eslint-disable @typescript-eslint/no-explicit-any */
//Hooks/useCheckout.ts
//Hook personalizado para manejar el proceso de checkout en el carrito de compras
//Objetivo: centralizar la lógica de checkout, 
//incluyendo validación de datos, comunicación con el backend y manejo de estados relacionados con el proceso de pago.
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { DireccionForm, TarjetaForm, CheckoutPayload } from "../types/checkout";
import { carrito } from "../types/carrito";

export const useCheckout = (Carrito: carrito | null) => {
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(false);

    //Formulario de direccion (si no se tiene una direccion guardada)
    const [direccion, setDireccion] = useState<DireccionForm>({
        direccion: "",
        distrito: "",
        provincia: "",
        departamento: "",
        referencia: "",
    });

    //Formulario de tarjeta (si no se tiene una tarjeta guardada)
    const [tarjeta, setTarjeta] = useState<TarjetaForm>({
        numeroTarjeta: "",
        nombre: "",
        expiracion: "",
        cvv: "",
    });

    //Funcion para manejar el proceso de checkout
    const procesarPago = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        if(!Carrito || Carrito.items.length === 0) return;
    
        setIsProcessing(true);
        try{
            const ultimosCuatro = tarjeta.numeroTarjeta.replace(/\s/g, "").slice(-4) || "4321";
            const marcaTarjetaId = tarjeta.numeroTarjeta.startsWith("4") ? 1 : 2; // Ejemplo: Visa=1, MasterCard=2

            const payload: CheckoutPayload = {
                direccion,
                pago: {
                    pasarela: "SIMULADA_INTERNAL",
                    customer_token: "tok_simulated_" + Math.random().toString(36).substring(2, 15),
                    ultimos_cuatro: ultimosCuatro,
                    marca_tarjeta_id: marcaTarjetaId,
                },
                total: Carrito.total,
            };

            const { data } = await api.post("/api/ordenes/crear", payload);
            if(data.success) {
                localStorage.removeItem("tiendamia_cart");
                router.push(`/carrito/success?orderId=${data.data.id}`);
            }
        } catch (error: any) {
            console.error("Error al procesar el pago:", error);
            const message = error?.response?.data?.message || error?.message || "Error al procesar el pago";
            alert(message);
        } finally {
            setIsProcessing(false);
        }
    };

    return {
        direccion,
        setDireccion,
        tarjeta,
        setTarjeta,
        isProcessing,
        procesarPago,
    }
}