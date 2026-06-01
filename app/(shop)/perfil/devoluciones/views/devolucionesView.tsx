"use client";

import React from "react";
import { RefreshCw, AlertCircle } from "lucide-react";

export default function DevolucionesView() {
  return (
    <div className="w-full max-w-4xl font-sans space-y-6 pl-2 animate-fade-in">
      
      {/* Título de la sección */}
      <div className="border-b border-neutral-100 pb-4">
        <h1 className="text-3xl font-normal text-[#333333] tracking-tight">
          Tus solicitudes de devoluciones
        </h1>
        <div className="flex items-start gap-2 text-xs text-neutral-500 mt-2 bg-neutral-50 p-3 rounded-lg border border-neutral-200 max-w-3xl">
          <AlertCircle className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
          <p>
            Para hacer una nueva solicitud, su orden debe haber sido entregada y no deben haber pasado más de 7 días desde la entrega.
          </p>
        </div>
      </div>

      {/* Mensaje vacío */}
      <div className="text-center py-16 border border-dashed border-neutral-200 rounded-lg">
        <RefreshCw className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
        <p className="text-neutral-600 text-base font-medium">No tienes solicitudes de devolución</p>
        <p className="text-neutral-400 text-sm mt-1">Las devoluciones que realices aparecerán aquí.</p>
      </div>
    </div>
  );
}
