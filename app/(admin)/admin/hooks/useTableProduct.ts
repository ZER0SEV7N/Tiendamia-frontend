import { useRouter } from "next/navigation";
import { columns } from "../components/Table/columns";

export const useTableProduct = () => {
  const router = useRouter();

  const handleEdit = (id: number) => {
    console.log("Redirigiendo a editar producto ID:", id);
    router.push(`/admin/productos/editar/${id}`);
  };

  const handleDelete = (id: number) => {
    console.log("Abriendo modal de confirmación para eliminar ID:", id);
  };

  const handleStatusChange = (id: number, nuevoEstado: boolean) => {
    console.log(`Cambiando estado de producto ${id} a:`, nuevoEstado);
    // Aquí harás tu api.patch(`/productos/${id}/estado`, { estado: nuevoEstado })
  };

  const tablaColumns = columns(handleEdit, handleDelete, handleStatusChange);

  return { tablaColumns };
};
