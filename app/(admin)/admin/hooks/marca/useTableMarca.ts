import { Marca } from "@/types/marca/marca";
import { ColumnsMarca } from "../../components/marca/Columns-Marca";

interface UseTableMarcaProps {
  setMarcas: React.Dispatch<React.SetStateAction<Marca[]>>;
}

export const useTableMarca = ({ setMarcas }: UseTableMarcaProps) => {
  const handleDelete = (id: number) => {
    console.log("Abriendo modal de confirmación para eliminar ID:", id);
    // Aquí podrías abrir un modal de confirmación para eliminar la marca
  };

  const handleStatusChange = async (id: number, nuevoEstado: boolean) => {
    try {
      // Aquí podrías hacer una llamada a la API para cambiar el estado de la marca
      setMarcas((prevMarcas) =>
        prevMarcas.map((m) =>
          m.id === id ? { ...m, destacada: nuevoEstado } : m,
        ),
      );
      // Después de actualizar el estado, podrías refrescar la lista de marcas o actualizar el estado local
    } catch (error) {
      console.error("Error al actualizar el estado en el servidor:", error);
      alert("No se pudo cambiar el estado de la marca.");
    }
  };

  const tablaColumns = ColumnsMarca(handleDelete, handleStatusChange);

  return { tablaColumns };
};
