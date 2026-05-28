import { ProductoList } from "@/types/producto/productoList";
import { columns } from "../components/Table/columns";
import { useEffect, useState } from "react";
import { getProductos } from "@/services/producto";

export const useTableProduct = () => {
  const [productos, setProductos] = useState<ProductoList[]>([]);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const data = await getProductos();
        setProductos(data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    cargarProductos();
  }, []);

  const handleEdit = (id: number) => {
    console.log("Redirigiendo a editar producto ID:", id);
    // Aquí usarás: router.push(`/admin/productos/${id}`)
  };

  const handleDelete = (id: number) => {
    console.log("Abriendo modal de confirmación para eliminar ID:", id);
  };

  const handleStatusChange = (id: number, nuevoEstado: boolean) => {
    console.log(`Cambiando estado de producto ${id} a:`, nuevoEstado);
    // Aquí harás tu api.patch(`/productos/${id}/estado`, { estado: nuevoEstado })
  };

  const tablaColumns = columns(handleEdit, handleDelete, handleStatusChange);
  return { tablaColumns, productos };
};
