"use client";

import { ProductosDataTable } from "@/app/(admin)/admin/components/Table/data-table";
import { useTableProduct } from "../../hooks/useTableProduct";
import { Button } from "@/components/ui/button"; // Si usas shadcn para los botones de acción
import { Plus, SlidersHorizontal } from "lucide-react"; // Iconos útiles para acompañar los filtros
import FiltrosInventario from "../../components/Table/FiltrosInventario";

export default function ProductosPage() {
  const { tablaColumns } = useTableProduct();

  return (
    <div className="p-6 space-y-6 w-full animate-fade-in">
      {/* HEADER PRINCIPAL */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            Inventario de Productos
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Gestiona el catálogo, las categorías hijas y el stock de las
            variaciones.
          </p>
        </div>

        <Button className="bg-[#FF3C3C] hover:bg-[#E03030] text-white font-bold h-10 px-6 rounded-xl transition-colors shadow-sm shadow-red-100">
          Agregar Producto <Plus className="h-4 w-4 ml-2" />
        </Button>
      </div>

      {/* FILTROS */}
      <FiltrosInventario />

      {/* --- BLOQUE DE LA TABLA DATA TABLE --- */}
      <div className="w-full">
        <ProductosDataTable columns={tablaColumns} data={[]} />
      </div>
    </div>
  );
}
