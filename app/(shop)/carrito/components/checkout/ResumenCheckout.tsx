//carrito/components/checkout/ResumenCheckout.tsx
//ResumenCheckout es un componente que se encarga de mostrar un resumen de la orden
//durante el proceso de checkout, incluyendo los detalles de la dirección de envío,
//método de pago y el total a pagar.
//Objetivo: proporcionar al usuario un resumen claro y conciso de su orden antes de finalizar la compra.
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";
import { carrito } from "../../types/carrito";

interface Props {
  Carrito: carrito;
  isProcessing: boolean;
}

export const ResumenCheckout = ({ Carrito, isProcessing }: Props) => {
    const subtotalProductos = Carrito.items.reduce((acc, item) => acc + item.precio, 0);

    return (
        <Card className="rounded-md border-slate-200 shadow-sm sticky top-6">
            <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold text-slate-800">Resumen de Orden</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-600">
                <div className="flex justify-between text-sm">
                    <span>Productos ({Carrito.items.length})</span>
                    <span>S/ {subtotalProductos.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span>Tarifa Tiendamia</span>
                    <span>S/ {Carrito.tarifa.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span>Envío a Perú</span>
                    <span>S/ {Carrito.envio.toFixed(2)}</span>
                </div>
                <div className="border-t my-4 pt-4 flex justify-between items-center">
                    <span className="text-lg font-bold text-slate-800">Total a pagar</span>
                    <span className="text-2xl font-bold text-slate-800">S/ {Carrito.total.toFixed(2)}</span>
                </div>

            <Button 
                type="submit" 
                disabled={isProcessing}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-6 text-lg rounded-md mt-4 transition-colors"
            >
                {isProcessing ? "Procesando pedido..." : "Pagar y Completar Pedido"}
            </Button>

            <div className="flex items-center gap-2 text-xs text-slate-500 mt-6 pt-4 border-t">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Transmisión de datos simulada de forma segura
            </div>
        </CardContent>
    </Card>
  );
};