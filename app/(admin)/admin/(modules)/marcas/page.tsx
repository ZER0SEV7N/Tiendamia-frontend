"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "../../components/table/data-table";
import { Plus } from "lucide-react";
import { useTableMarca } from "../../hooks/marca/useTableMarca";
import { useFilterMarca } from "../../hooks/marca/useFilterMarca";
import FiltrosMarca from "../../components/marca/FiltrosMarca";

function Page() {
  const {
    busqueda,
    setBusqueda,
    estado,
    setEstado,
    destacada,
    setDestacada,
    setMarcas,
    marcasFiltradas,
    handleAplicarFiltros,
    resetFiltros,
  } = useFilterMarca();
  const { tablaColumns } = useTableMarca({ setMarcas });

  return (
    <div className="p-6 space-y-6 w-full animate-fade-in">
      {/* HEADER PRINCIPAL */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            Marcas
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Gestiona las marcas de tus productos para una mejor organización y
            filtrado en tu inventario.
          </p>
        </div>

        {/* Aquí puedes envolver este botón con tu <DialogTrigger> del Modal de Marca */}
        <Button className="bg-[#FF3C3C] hover:bg-[#E03030] text-white font-bold h-10 px-6 rounded-xl transition-colors shadow-sm shadow-red-100 cursor-pointer">
          Agregar Marca <Plus className="h-4 w-4 ml-2" />
        </Button>
      </div>

      {/* BLOQUE DE FILTROS HORIZONTALES */}
      <FiltrosMarca
        busqueda={busqueda}
        estado={estado}
        destacada={destacada}
        setBusqueda={setBusqueda}
        setEstado={setEstado}
        setDestacada={setDestacada}
        onAplicarFiltros={handleAplicarFiltros}
        onResetFiltros={resetFiltros}
      />

      {/* TABLA DE DATOS CON MARCAS FILTRADAS */}
      <div className="w-full">
        <DataTable columns={tablaColumns} data={marcasFiltradas} />
      </div>
    </div>
  );
}

export default Page;
