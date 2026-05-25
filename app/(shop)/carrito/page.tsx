"use client";

import { useCarrito } from "./hook/useCarrito";
import { CarritoVacio } from "./components/carritoVacio";
import { ResumenCompra } from "./components/resumenCompra";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Plus, Minus } from "lucide-react";
import { CarritoSkeleton } from "./components/carritoSkeleton";

export default function CarritoPage() {
  const { carritoState, isLoading, error, actualizarCantidad, eliminarItem } = useCarrito(isAuthenticated);
  
  if (isLoading) return <CarritoSkeleton />;
  if (error) return <div className="p-10 text-center text-red-500">{error}</div>;
  if (!carritoState || carritoState.items.length === 0) return <CarritoVacio />;

  return (
    <div className="container mx-auto max-w-6xl py-8 px-4">
      <h1 className="text-3xl font-semibold mb-8 text-slate-800">Mi carrito</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* COLUMNA IZQUIERDA: Productos */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="rounded-md border-slate-200 shadow-sm">
            <CardHeader className="bg-slate-50 border-b pb-4">
              <div className="flex items-center space-x-2">
                <span className="text-xl">🇺🇸</span>
                <CardTitle className="text-lg font-medium text-slate-700">Productos de USA</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {carritoState.items.map((item) => (
                <div key={item.idVariante} className="p-6 flex flex-col sm:flex-row gap-6 items-start border-b last:border-0">
                  <div className="w-24 h-24 bg-slate-100 rounded-md flex items-center justify-center flex-shrink-0">
                    <span className="text-xs text-slate-400">IMG</span>
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <h3 className="font-medium text-slate-800 leading-tight line-clamp-2">
                      {item.variacion}
                    </h3>
                    
                    <div className="flex items-center space-x-4 pt-2">
                      <div className="flex items-center border border-slate-300 rounded-md">
                        <button 
                          onClick={() => actualizarCantidad(item.idVariante, item.cantidad - 1)}
                          className="px-3 py-1 text-slate-500 hover:bg-slate-100 rounded-l-md"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-1 font-medium text-sm border-x border-slate-300">
                          {item.cantidad}
                        </span>
                        <button 
                          onClick={() => actualizarCantidad(item.idVariante, item.cantidad + 1)}
                          className="px-3 py-1 text-slate-500 hover:bg-slate-100 rounded-r-md"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <button 
                        onClick={() => eliminarItem(isAuthenticated ? (item.idDetalle || 0) : item.idVariante)} 
                        className="text-slate-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="text-right sm:ml-auto">
                    <p className="text-2xl font-bold text-slate-800">
                      S/ {item.precio.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter className="bg-slate-50 text-sm text-slate-600 p-4 rounded-b-md">
              <span className="text-emerald-600 font-medium mr-1">Llega en 5 a 10 días hábiles</span> 
              seleccionando envío Express al comprar
            </CardFooter>
          </Card>
        </div>

        {/* COLUMNA DERECHA: Resumen */}
        <div className="space-y-6">
          <ResumenCompra carrito={carritoState} isAuthenticated={isAuthenticated} />
        </div>
      </div>
    </div>
  );
}