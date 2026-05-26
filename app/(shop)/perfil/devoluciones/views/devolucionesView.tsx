"use client";

import React from "react";
import { RefreshCw, ClipboardList, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

// 1. Datos simulados de devoluciones en Tiendamia
const DEVOLUCIONES_SIMULADAS = [
  {
    id: "DEV-77312-PE",
    ordenId: "TM-951102-PE",
    fechaSolicitud: "12 de Mayo, 2026",
    motivo: "Producto dañado / No funciona correctamente",
    estado: "Reembolso procesado",
    estadoColor: "text-green-600 bg-green-50 border-green-200",
    montoReembolso: "S/ 185.00",
    metodo: "Crédito en Billetera Tiendamia",
    producto: {
      nombre: "Audífonos In-Ear JBL Tune 125TWS True Wireless - Negro",
      tiendaOrigen: "Amazon EE.UU.",
      imagen: "🎧"
    }
  },
  {
    id: "DEV-75401-PE",
    ordenId: "TM-940215-PE",
    fechaSolicitud: "28 de Abril, 2026",
    motivo: "Talla / Modelo equivocado",
    estado: "En verificación de depósito",
    estadoColor: "text-blue-600 bg-blue-50 border-blue-200",
    montoReembolso: "S/ 320.00",
    metodo: "Tarjeta de Crédito (Visa)",
    producto: {
      nombre: "Zapatillas Deportivas Puma Electron E Unisex - Talla 10 US",
      tiendaOrigen: "Amazon EE.UU.",
      imagen: "👟"
    }
  }
];

export default function DevolucionesView() {
  return (
    <div className="w-full max-w-4xl font-sans space-y-6 pl-2 animate-fade-in">
      
      {/* Título de la sección copiado exactamente de image_4864a2.png */}
      <div className="border-b border-neutral-100 pb-4">
        <h1 className="text-3xl font-normal text-[#E61C24] tracking-tight">
          Tus solicitudes de devoluciones
        </h1>
        <div className="flex items-start gap-2 text-xs text-neutral-500 mt-2 bg-neutral-50 p-3 rounded-lg border border-neutral-200 max-w-3xl">
          <AlertCircle className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
          <p>
            Para hacer una nueva solicitud, su orden debe haber sido entregada y no deben haber pasado más de 7 días desde la entrega.
          </p>
        </div>
      </div>

      {/* Listado Dinámico */}
      <div className="space-y-6">
        {DEVOLUCIONES_SIMULADAS.map((dev) => (
          <div 
            key={dev.id} 
            className="border border-neutral-200 rounded-xl bg-white overflow-hidden shadow-sm transition-all hover:shadow-md"
          >
            {/* Cabecera del ticket de devolución */}
            <div className="bg-neutral-50 px-5 py-4 border-b border-neutral-200 flex flex-wrap justify-between items-center gap-4">
              <div className="flex gap-6 text-sm">
                <div>
                  <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">ID Devolución</p>
                  <p className="font-bold text-neutral-800 mt-0.5">{dev.id}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Asociado a la Orden</p>
                  <p className="text-neutral-600 font-medium mt-0.5">{dev.ordenId}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Fecha Solicitud</p>
                  <p className="text-neutral-600 mt-0.5">{dev.fechaSolicitud}</p>
                </div>
              </div>

              {/* Badge del Estado actual del reembolso */}
              <span className={`px-3 py-1 text-xs font-bold rounded-full border ${dev.estadoColor}`}>
                {dev.estado}
              </span>
            </div>

            {/* Cuerpo: Detalles del ítem devuelto */}
            <div className="p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              
              <div className="flex items-start gap-4 flex-1">
                {/* Miniatura del producto */}
                <div className="w-16 h-16 bg-neutral-100 rounded-lg flex items-center justify-center text-2xl border border-neutral-200 shrink-0 select-none">
                  {dev.producto.imagen}
                </div>

                {/* Info */}
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-neutral-800 line-clamp-2">
                    {dev.producto.nombre}
                  </h4>
                  <p className="text-xs text-neutral-500">
                    Motivo: <span className="text-neutral-700 font-medium">{dev.motivo}</span>
                  </p>
                  <p className="text-[11px] text-neutral-400 uppercase font-semibold">
                    Origen: {dev.producto.tiendaOrigen}
                  </p>
                </div>
              </div>

              {/* Desglose financiero del reembolso */}
              <div className="md:text-right border-t md:border-t-0 pt-4 md:pt-0 w-full md:w-auto space-y-1 shrink-0 border-neutral-100">
                <p className="text-xs text-neutral-400 font-medium">Monto a reembolsar</p>
                <p className="text-xl font-bold text-neutral-900">{dev.montoReembolso}</p>
                <p className="text-[11px] text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded border border-neutral-200 inline-block md:block">
                  {dev.metodo}
                </p>
              </div>

            </div>

            {/* Footer con Acciones */}
            <div className="px-5 py-3 bg-neutral-50/50 border-t border-neutral-100 flex justify-end gap-3">
              <Button
                className="bg-transparent border border-neutral-300 text-neutral-600 hover:bg-neutral-100 font-medium px-4 h-9 text-xs rounded-md transition-colors"
              >
                Ver historial de estados
              </Button>
              <Button
                className="bg-transparent border border-[#FF3C3C] text-[#FF3C3C] hover:bg-red-50 font-medium px-4 h-9 text-xs rounded-md transition-colors"
              >
                Comprobante de Nota de Crédito
              </Button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}