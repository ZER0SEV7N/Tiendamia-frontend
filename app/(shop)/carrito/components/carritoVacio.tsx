import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const CarritoVacio = () => {
    return (
        <div className="container mx-auto max-w-4xl py-12 flex flex-col items-center justify-center text-center space-y-6">
            <div className="bg-red-50 p-8 rounded-full">
                <ShoppingCart className="w-24 h-24 text-red-500" />
            </div>
            <div>
                <h2 className="text-3xl font-semibold text-slate-800">Hay un carrito que llenar</h2>
                <p className="text-slate-500 mt-2">¡No tienes productos en tu carrito!</p>
            </div>
            <Link href="/productos">
                <Button className="bg-red-500 hover:bg-red-600 text-white px-8 py-6 text-lg">
                Buscar productos
                </Button>
            </Link>
        </div>
    )
}