"use client";

import { ProtectedRoute } from "@/components/public/layouts/ProtectedRoute";
import { useCarrito } from "../hook/useCarrito";
import { useCheckout } from "../hook/useCheckout";
import { FormularioDireccion } from "../components/checkout/FormularioDireccion";
import { FormularioPago } from "../components/checkout/FormularioPago";
import { ResumenCheckout } from "../components/checkout/ResumenCheckout";

export default function CheckoutPage() {
  const { carritoState, isLoading: isLoadingCarrito } = useCarrito(true);
  
  const {
    direccion,
    setDireccion,
    tarjeta,
    setTarjeta,
    isProcessing,
    procesarPago
  } = useCheckout(carritoState);

  if (isLoadingCarrito || !carritoState) {
    return <div className="p-10 text-center">Cargando datos de facturación...</div>;
  }

  return (
    <ProtectedRoute rolesPermitidos={["USER", "ADMIN"]}>
      <div className="container mx-auto max-w-6xl py-8 px-4">
        <h1 className="text-3xl font-semibold mb-8 text-slate-800">Finalizar compra</h1>

        <form onSubmit={procesarPago} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* COLUMNA IZQUIERDA: Formularios */}
          <div className="lg:col-span-2 space-y-6">
            <FormularioDireccion direccion={direccion} setDireccion={setDireccion} />
            <FormularioPago tarjeta={tarjeta} setTarjeta={setTarjeta} />
          </div>

          {/* COLUMNA DERECHA: Resumen */}
          <div className="space-y-6">
            <ResumenCheckout Carrito={carritoState} isProcessing={isProcessing} />
          </div>

        </form>
      </div>
    </ProtectedRoute>
  );
}