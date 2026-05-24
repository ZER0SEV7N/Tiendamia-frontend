import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ShieldCheck } from "lucide-react";
import { carrito } from "../types/carrito";

interface Props {
    carrito: carrito;
}

export const ResumenCompra = ({ carrito}: Props) => {
    const subtotalProductos = carrito.items.reduce((acc, item) => acc + item.precio, 0);

    return (
        <Card className="rounded-md border-slate-200 shadow-sm sticky top-6">
            <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold text-slate-800">Detalle de la compra</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-600">
                
                <div className="flex justify-between text-sm">
                    <span>Productos ({carrito.items.length})</span>
                    <span>S/ {subtotalProductos.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span>Tarifa Tiendamia</span>
                    <span>S/ {carrito.tarifa.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span>Envío a Perú</span>
                    <span>S/ {carrito.envio.toFixed(2)}</span>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-slate-800">Subtotal</span>
                    <span className="text-2xl font-bold text-slate-800">S/ {carrito.total.toFixed(2)}</span>
                </div>

                <Button className="w-full bg-red-500 hover:bg-red-600 text-white py-6 text-lg rounded-md mt-4">
                    Comenzar compra
                </Button>

                <div className="bg-emerald-50 text-emerald-800 text-xs p-3 rounded-md flex items-center gap-2 mt-4">
                    <span className="font-bold border border-emerald-800 px-1 rounded text-[10px]">💳</span>
                    Hasta 6 cuotas sin intereses con BCP, BBVA y Diners
                </div>

                <Separator className="my-6" />

                <div className="space-y-3">
                    <p className="font-medium text-sm text-slate-800">¿Tienes un cupón de descuento?</p>
                    <div className="flex space-x-2">
                        <Input placeholder="Ingresa código del cupón" className="flex-1" />
                        <Button variant="outline" className="text-red-500 border-red-500 hover:bg-red-50">
                                Aplicar
                        </Button>
                    </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-600 mt-6 pt-4">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    Tienes garantía de entrega
                </div>
            </CardContent>
        </Card>
     );
}