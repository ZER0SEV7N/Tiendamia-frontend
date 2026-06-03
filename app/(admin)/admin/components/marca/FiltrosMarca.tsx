"use client";

import { SlidersHorizontal, Search, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FiltrosMarcaProps {
  // Valores actuales de los filtros provenientes del hook useFilterMarca
  busqueda: string;
  estado: string;
  destacada: string;

  // Setters para actualizar los estados individuales
  setBusqueda: (value: string) => void;
  setEstado: (value: string) => void;
  setDestacada: (value: string) => void;

  // Acciones finales del hook
  onAplicarFiltros: () => void;
  onResetFiltros: () => void;
}

export default function FiltrosMarca({
  busqueda,
  estado,
  destacada,
  setBusqueda,
  setEstado,
  setDestacada,
  onAplicarFiltros,
  onResetFiltros,
}: FiltrosMarcaProps) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm w-full space-y-4">
      {/* HEADER DISCRETO */}
      <div className="flex items-center gap-2 text-gray-800 font-bold text-xs uppercase tracking-wider pb-1.5 border-b border-gray-50">
        <SlidersHorizontal className="h-3.5 w-3.5 text-[#FF3C3C]" />
        <span>Filtros de Marcas</span>
      </div>

      {/* CONTENEDOR EN UNA SOLA LÍNEA HORIZONTAL / RESPONSIVE */}
      <div className="flex flex-col md:flex-row items-stretch md:items-end gap-4 w-full">
        {/* Filtro por Nombre o ID */}
        <div className="flex flex-col gap-1.5 flex-1 min-w-50">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">
            Buscar Marca
          </label>
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Nombre, slug o ID..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="pl-9 h-10 rounded-xl border-gray-200 bg-gray-50/50 focus-visible:ring-[#FF3C3C] w-full"
            />
          </div>
        </div>

        {/* Filtro de Estado */}
        <div className="flex flex-col gap-1.5 flex-1 md:max-w-50 min-w-35">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">
            Estado
          </label>
          <Select value={estado} onValueChange={setEstado}>
            <SelectTrigger className="h-10 rounded-xl border-gray-200 bg-gray-50/50 focus:ring-[#FF3C3C] w-full">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="activo">Activo</SelectItem>
              <SelectItem value="inactivo">Inactivo</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Filtro de Destacada */}
        <div className="flex flex-col gap-1.5 flex-1 md:max-w-50 min-w-35">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">
            Destacada
          </label>
          <Select value={destacada} onValueChange={setDestacada}>
            <SelectTrigger className="h-10 rounded-xl border-gray-200 bg-gray-50/50 focus:ring-[#FF3C3C] w-full">
              <SelectValue placeholder="Todas" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="si">Sí, destacadas</SelectItem>
              <SelectItem value="no">No destacadas</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Botones de Acción */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          {/* Botón Resetear */}
          <Button
            type="button"
            variant="outline"
            onClick={onResetFiltros}
            className="h-10 px-4 rounded-xl border-gray-200 text-gray-500 hover:text-gray-900 hover:bg-gray-50 flex items-center gap-2 text-xs uppercase font-bold tracking-wider cursor-pointer flex-1 md:flex-initial"
            title="Limpiar filtros"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span className="md:hidden lg:inline">Limpiar</span>
          </Button>

          {/* Botón Aplicar */}
          <Button
            onClick={onAplicarFiltros}
            className="bg-[#FF3C3C] hover:bg-[#E03030] text-white font-bold h-10 px-6 rounded-xl transition-colors shadow-sm shadow-red-100 text-xs uppercase tracking-wider flex-1 md:flex-initial whitespace-nowrap cursor-pointer"
          >
            Aplicar Filtros
          </Button>
        </div>
      </div>
    </div>
  );
}
