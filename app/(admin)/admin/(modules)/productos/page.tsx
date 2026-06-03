"use client";

import { useTableProduct } from "@/app/(admin)/admin/hooks/producto/useTableProduct";
import { Button } from "@/components/ui/button"; // Si usas shadcn para los botones de acción
import { Plus } from "lucide-react"; // Iconos útiles para acompañar los filtros
import { useRouter } from "next/navigation"; // Para navegación programática al crear un nuevo producto // Componente de filtros personalizado
import { useFilterProducto } from "../../hooks/producto/useFilterProducto";
import FiltrosInventario from "../../components/table/FiltrosInventario";
import { DataTable } from "../../components/table/data-table";

export default function ProductosPage() {
  const {
    busqueda,
    setBusqueda,
    estado,
    setEstado,
    selectedPadre,
    selectedHija,
    selectedNieta,
    opcionesPadre,
    opcionesHija,
    opcionesNieta,
    setProductos,
    productosFiltrados,
    handlePadreChange,
    handleHijaChange,
    handleNietaChange,
    handleAplicarFiltros,
  } = useFilterProducto();
  const { tablaColumns } = useTableProduct({ setProductos });
  const router = useRouter();

  return (
    <div className="p-6 space-y-6 w-full animate-fade-in">
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

        <Button
          className="bg-[#FF3C3C] hover:bg-[#E03030] text-white font-bold h-10 px-6 rounded-xl transition-colors shadow-sm shadow-red-100"
          onClick={() => router.push("/admin/productos/crear")}
        >
          Agregar Producto <Plus className="h-4 w-4 ml-2" />
        </Button>
      </div>

      <FiltrosInventario
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        estado={estado}
        setEstado={setEstado}
        catPadre={selectedPadre}
        catHija={selectedHija}
        catNieta={selectedNieta}
        categoriasPadre={opcionesPadre}
        categoriasHija={opcionesHija}
        categoriasNieta={opcionesNieta}
        onPadreChange={handlePadreChange}
        onHijaChange={handleHijaChange}
        onNietaChange={handleNietaChange}
        onAplicarFiltros={handleAplicarFiltros}
      />

      <div className="w-full">
        <DataTable columns={tablaColumns} data={productosFiltrados} />
      </div>
    </div>
  );
}
