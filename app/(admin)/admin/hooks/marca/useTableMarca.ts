import { Marca } from "@/types/marca/marca";
import { ColumnsMarca } from "../../components/marca/Columns-Marca";

interface UseTableMarcaProps {
  setMarcas: React.Dispatch<React.SetStateAction<Marca[]>>;
}

export const useTableMarca = ({ setMarcas }: UseTableMarcaProps) => {
  const handleDelete = (id: number) => {
    console.log("Abriendo modal de confirmación para eliminar ID:", id);
  };

  const handleStatusChange = async (id: number, nuevoEstado: boolean) => {
    try {
      setMarcas((prevMarcas) =>
        prevMarcas.map((m) =>
          m.id === id ? { ...m, estado: nuevoEstado } : m,
        ),
      );
    } catch (error) {
      console.error("Error al actualizar el estado en el servidor:", error);
      alert("No se pudo cambiar el estado de la marca.");
    }
  };

  const handleUpdateMarca = (id: number, datosActualizados: Partial<Marca>) => {
    setMarcas((prevMarcas) =>
      prevMarcas.map((m) =>
        m.id === id
          ? {
              ...m,
              ...datosActualizados,
              imagen_logo: datosActualizados.imagen_logo
                ? `${datosActualizados.imagen_logo.split("?")[0]}?t=${Date.now()}`
                : m.imagen_logo,
              imagen_banner: datosActualizados.imagen_banner
                ? `${datosActualizados.imagen_banner.split("?")[0]}?t=${Date.now()}`
                : m.imagen_banner,
            }
          : m,
      ),
    );
  };

  const tablaColumns = ColumnsMarca(
    handleDelete,
    handleStatusChange,
    handleUpdateMarca,
  );

  return { tablaColumns };
};
