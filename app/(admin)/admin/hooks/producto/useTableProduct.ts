import { useRouter } from "next/navigation";
import { cambiarEstado } from "@/lib/services/producto";
import { ProductoList } from "@/types/producto/productoList";
import { ColumnsProducto } from "../../components/producto/Colums-Producto";

interface UseTableProductProps {
  setProductos: React.Dispatch<React.SetStateAction<ProductoList[]>>;
}

export const useTableProduct = ({ setProductos }: UseTableProductProps) => {
  const router = useRouter();

  const handleEdit = (id: number) => {
    console.log("Redirigiendo a editar producto ID:", id);
    router.push(`/admin/productos/editar/${id}`);
  };

  const handleDelete = (id: number) => {
    console.log("Abriendo modal de confirmación para eliminar ID:", id);
  };

  const handleStatusChange = async (id: number, nuevoEstado: boolean) => {
    try {
      await cambiarEstado(id);
      setProductos((prevProductos) =>
        prevProductos.map((p) =>
          p.id === id ? { ...p, estado: nuevoEstado } : p,
        ),
      );
      router.refresh();
    } catch (error) {
      console.error("Error al actualizar el estado en el servidor:", error);
      alert("No se pudo cambiar el estado del producto.");
    }
  };

  const tablaColumns = ColumnsProducto(
    handleEdit,
    handleDelete,
    handleStatusChange,
  );

  return { tablaColumns };
};
