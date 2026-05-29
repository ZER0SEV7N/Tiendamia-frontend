"use client";

import React, { useEffect, useState } from "react";
import { Package, ChevronRight, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getOrders, Orden } from "@/lib/user";

export default function MisOrdenesView() {
  const [ordenes, setOrdenes] = useState<Orden[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrdenes = async () => {
      try {
        const data = await getOrders();
        setOrdenes(data);
      } catch (err) {
        console.error("Error cargando órdenes:", err);
        setError("No se pudieron cargar tus órdenes");
      } finally {
        setLoading(false);
      }
    };

    fetchOrdenes();
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-4xl font-sans space-y-6 pl-2 animate-fade-in">
        <div className="border-b border-neutral-100 pb-4">
          <h1 className="text-3xl font-medium text-[#333333] tracking-tight">
            Mis órdenes
          </h1>
        </div>
        <div className="flex justify-center items-center py-12">
          <Loader className="w-6 h-6 text-neutral-400 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl font-sans space-y-6 pl-2 animate-fade-in">
      
      {/* Título de la sección */}
      <div className="border-b border-neutral-100 pb-4">
        <h1 className="text-3xl font-medium text-[#333333] tracking-tight">
          Mis órdenes
        </h1>
        <p className="text-sm text-neutral-500 mt-1">
          Revisa el estado de tus compras realizadas desde la base de datos.
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Lista de Pedidos */}
      <div className="space-y-6">
        {ordenes.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-neutral-200 rounded-lg">
            <Package className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
            <p className="text-neutral-500 text-sm">Aún no tienes órdenes registradas.</p>
          </div>
        ) : (
          ordenes.map((orden) => (
            <div 
              key={orden.id} 
              className="border border-neutral-200 rounded-xl bg-white overflow-hidden shadow-sm transition-all hover:shadow-md"
            >
              {/* Cabecera del pedido */}
              <div className="bg-neutral-50 px-5 py-4 border-b border-neutral-200 flex flex-wrap justify-between items-center gap-4">
                <div className="flex gap-6 text-sm">
                  <div>
                    <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Número de orden</p>
                    <p className="font-bold text-neutral-800 mt-0.5">{orden.id}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Fecha de compra</p>
                    <p className="text-neutral-600 mt-0.5">{orden.fecha}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Total pagado</p>
                    <p className="font-bold text-neutral-900 mt-0.5">{orden.total}</p>
                  </div>
                </div>

                {/* Badge de Estado */}
                <span className={`px-3 py-1 text-xs font-bold rounded-full border ${orden.estadoColor}`}>
                  {orden.estado}
                </span>
              </div>

              {/* Cuerpo / Lista de productos dentro de la orden */}
              <div className="p-5 divide-y divide-neutral-100">
                {orden.productos.map((producto, index) => (
                  <div key={index} className="flex items-start gap-4 py-4 first:pt-0 last:pb-0">
                    {/* Caja/Contenedor de Imagen */}
                    <div className="w-16 h-16 bg-neutral-100 rounded-lg flex items-center justify-center text-2xl border border-neutral-200 shrink-0 select-none">
                      {producto.imagen}
                    </div>

                    {/* Detalles del Producto */}
                    <div className="space-y-1 flex-1">
                      <h4 className="text-sm font-medium text-neutral-800 line-clamp-2 hover:text-[#FF3C3C] cursor-pointer transition-colors">
                        {producto.nombre}
                      </h4>
                      <div className="flex items-center gap-3 text-xs text-neutral-500">
                        <span>Cantidad: <strong className="text-neutral-700">{producto.cantidad}</strong></span>
                        <span className="w-1 h-1 bg-neutral-300 rounded-full" />
                        <span className="bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded text-[11px] font-medium border border-neutral-200">
                          {producto.tiendaOrigen}
                        </span>
                      </div>
                    </div>

                    {/* Botón de acción por producto / Ver Detalle */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-neutral-400 hover:text-[#FF3C3C] hover:bg-neutral-50 h-9 w-9 p-0 rounded-full shrink-0"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  </div>
                ))}
              </div>

              {/* Footer de la orden: Acciones generales */}
              <div className="px-5 py-3 bg-neutral-50/50 border-t border-neutral-100 flex justify-end gap-3">
                <Button
                  className="bg-transparent border border-neutral-300 text-neutral-600 hover:bg-neutral-100 font-medium px-4 h-9 text-xs rounded-md transition-colors"
                >
                  Seguimiento de envío
                </Button>
                <Button
                  className="bg-transparent border border-[#FF3C3C] text-[#FF3C3C] hover:bg-red-50 font-medium px-4 h-9 text-xs rounded-md transition-colors"
                >
                  Detalles del pedido
                </Button>
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
}