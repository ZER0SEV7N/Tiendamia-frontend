/* eslint-disable @typescript-eslint/no-explicit-any */
import { getMarcas } from "@/services/marca";
import { Marca } from "@/types/marca/marca";
import { useState, useMemo, useEffect } from "react";

export const useFilterMarca = () => {
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [estado, setEstado] = useState("all");
  const [destacada, setDestacada] = useState("all");

  const [filtrosAplicados, setFiltrosAplicados] = useState({
    busqueda: "",
    estado: "all",
    destacada: "all",
  });

  useEffect(() => {
    const cargarMarcas = async () => {
      try {
        const response = await getMarcas();
        setMarcas(response.data || []);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    cargarMarcas();
  }, []);

  const handleAplicarFiltros = () => {
    setFiltrosAplicados({
      busqueda: busqueda.trim().toLowerCase(),
      estado,
      destacada,
    });
  };

  const marcasFiltradas = useMemo(() => {
    return marcas.filter((marca) => {
      // Filtro por búsqueda (Nombre o ID)
      if (filtrosAplicados.busqueda) {
        const matchNombre = marca.nombre
          ?.toLowerCase()
          .includes(filtrosAplicados.busqueda);
        const matchId = String(marca.id).includes(filtrosAplicados.busqueda);

        if (!matchNombre && !matchId) return false;
      }

      // Filtro por Estado (activo / inactivo)
      if (filtrosAplicados.estado !== "all") {
        const esActivo = filtrosAplicados.estado === "activo";
        // Soporta tanto si tu interfaz usa 'estado' o 'activo'
        const estadoMarca = (marca as any).estado ?? (marca as any).activo;
        if (estadoMarca !== esActivo) return false;
      }

      // Filtro por Destacada (sí / no)
      if (filtrosAplicados.destacada !== "all") {
        const esDestacada = filtrosAplicados.destacada === "si";
        if (!!marca.destacada !== esDestacada) return false;
      }

      return true;
    });
  }, [marcas, filtrosAplicados]);

  const resetFiltros = () => {
    setBusqueda("");
    setEstado("all");
    setDestacada("all");
    setFiltrosAplicados({
      busqueda: "",
      estado: "all",
      destacada: "all",
    });
  };

  return {
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
  };
};
