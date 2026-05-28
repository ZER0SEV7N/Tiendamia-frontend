"use client";

import { useState } from "react";
import { SlidersHorizontal, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function FiltrosInventario() {
  // Estados para controlar los inputs
  const [busqueda, setBusqueda] = useState("");
  const [catPadre, setCatPadre] = useState("all");
  const [catHija, setCatHija] = useState("all");
  const [catNieta, setCatNieta] = useState("all");
  const [estado, setEstado] = useState("all");

  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm w-full space-y-4">
      {/* HEADER DISCRETO */}
      <div className="flex items-center gap-2 text-gray-800 font-bold text-xs uppercase tracking-wider pb-1.5 border-b border-gray-50">
        <SlidersHorizontal className="h-3.5 w-3.5 text-[#FF3C3C]" />
        <span>Filtros</span>
      </div>

      {/* CONTENEDOR EN UNA SOLA LÍNEA HORIZONTAL */}
      {/* flex-1 en los hijos asegura que se estiren proporcionalmente para ocupar todo el ancho */}
      <div className="flex flex-col md:flex-row items-stretch md:items-end gap-4 w-full">
        {/* 1. Nombre o ID */}
        <div className="flex flex-col gap-1.5 flex-1 min-w-[180px]">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">
            Nombre o ID
          </label>
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="pl-9 h-10 rounded-xl border-gray-200 bg-gray-50/50 focus-visible:ring-[#FF3C3C] w-full"
            />
          </div>
        </div>

        {/* 2. Categoría Padre */}
        <div className="flex flex-col gap-1.5 flex-1 min-w-[140px]">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">
            Cat. Padre
          </label>
          <Select value={catPadre} onValueChange={setCatPadre}>
            <SelectTrigger className="h-10 rounded-xl border-gray-200 bg-gray-50/50 focus:ring-[#FF3C3C] w-full">
              <SelectValue placeholder="Todas" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="calzado">Calzado</SelectItem>
              <SelectItem value="electronica">Electrónica</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 3. Categoría Hija */}
        <div className="flex flex-col gap-1.5 flex-1 min-w-[140px]">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">
            Cat. Hija
          </label>
          <Select value={catHija} onValueChange={setCatHija}>
            <SelectTrigger className="h-10 rounded-xl border-gray-200 bg-gray-50/50 focus:ring-[#FF3C3C] w-full">
              <SelectValue placeholder="Todas" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="zapatillas">Zapatillas</SelectItem>
              <SelectItem value="smartwatches">Smartwatches</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 4. Categoría Nieta */}
        <div className="flex flex-col gap-1.5 flex-1 min-w-[140px]">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">
            Cat. Nieta
          </label>
          <Select value={catNieta} onValueChange={setCatNieta}>
            <SelectTrigger className="h-10 rounded-xl border-gray-200 bg-gray-50/50 focus:ring-[#FF3C3C] w-full">
              <SelectValue placeholder="Todas" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="urbano">Urbano</SelectItem>
              <SelectItem value="running">Running</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 5. Estado */}
        <div className="flex flex-col gap-1.5 flex-1 min-w-[130px]">
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

        {/* 6. Único Botón de Acción */}
        {/* md:w-auto asegura que mantenga su proporción ideal sin deformarse en pantallas grandes */}
        <div className="w-full md:w-auto">
          <Button className="bg-[#FF3C3C] hover:bg-[#E03030] text-white font-bold h-10 px-6 rounded-xl transition-colors shadow-sm shadow-red-100 text-xs uppercase tracking-wider w-full md:w-auto whitespace-nowrap">
            Aplicar Filtros
          </Button>
        </div>
      </div>
    </div>
  );
}
