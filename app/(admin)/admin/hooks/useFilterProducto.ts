/* eslint-disable react-hooks/exhaustive-deps */
import { getAllCategorias } from "@/services/categoria";
import { getProductos } from "@/services/producto";
import { Categoria } from "@/types/categoria/categoria";
import { ProductoList } from "@/types/producto/productoList";
import { useState, useMemo, useEffect } from "react";

export const useFilterProducto = () => {
  const [productos, setProductos] = useState<ProductoList[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const [busqueda, setBusqueda] = useState("");
  const [estado, setEstado] = useState("all");

  const [selectedPadre, setSelectedPadre] = useState<string>("all");
  const [selectedHija, setSelectedHija] = useState<string>("all");
  const [selectedNieta, setSelectedNieta] = useState<string>("all");

  const [filtrosAplicados, setFiltrosAplicados] = useState({
    busqueda: "",
    estado: "all",
    padreId: "all",
    hijaId: "all",
    nietaId: "all",
    nombresHijasValidas: [] as string[],
    nombresNietasValidas: [] as string[],
    nombreNietaSeleccionada: "",
  });

  useEffect(() => {
    const cargarCategorias = async () => {
      try {
        const response = await getAllCategorias();
        setCategorias(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const cargarProductos = async () => {
      try {
        const data = await getProductos();
        setProductos(data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    cargarProductos();
    cargarCategorias();
  }, []);

  const categoriasIniciales = categorias || [];

  const opcionesPadre = categoriasIniciales;

  const opcionesHija = useMemo(() => {
    if (selectedPadre === "all") return [];
    const padre = categoriasIniciales.find(
      (c) => String(c.id) === selectedPadre,
    );
    return padre?.subcategorias || [];
  }, [selectedPadre, categoriasIniciales]);

  const opcionesNieta = useMemo(() => {
    if (selectedHija === "all") return [];
    const hija = opcionesHija.find((c) => String(c.id) === selectedHija);
    return hija?.subcategorias || [];
  }, [selectedHija, opcionesHija]);

  const handlePadreChange = (id: string) => {
    setSelectedPadre(id);
    setSelectedHija("all");
    setSelectedNieta("all");
  };

  const handleHijaChange = (id: string) => {
    setSelectedHija(id);
    setSelectedNieta("all");
  };

  const handleNietaChange = (id: string) => {
    setSelectedNieta(id);
  };

  const handleAplicarFiltros = () => {
    const nietaObj = opcionesNieta.find((n) => String(n.id) === selectedNieta);

    const hijaObj = opcionesHija.find((h) => String(h.id) === selectedHija);
    const nombresNietasDeLaHija =
      hijaObj?.subcategorias?.map((n) => n.nombre) || [];

    const padreObj = categoriasIniciales.find(
      (p) => String(p.id) === selectedPadre,
    );
    const nombresNietasDelPadre: string[] = [];
    padreObj?.subcategorias?.forEach((h) => {
      h.subcategorias?.forEach((n) => nombresNietasDelPadre.push(n.nombre));
    });

    setFiltrosAplicados({
      busqueda: busqueda.trim().toLowerCase(),
      estado,
      padreId: selectedPadre,
      hijaId: selectedHija,
      nietaId: selectedNieta,
      nombreNietaSeleccionada: nietaObj ? nietaObj.nombre : "",
      nombresHijasValidas: nombresNietasDeLaHija,
      nombresNietasValidas: nombresNietasDelPadre,
    });
  };

  const productosFiltrados = useMemo(() => {
    return productos.filter((producto) => {
      if (filtrosAplicados.busqueda) {
        const matchNombre = producto.nombre
          ?.toLowerCase()
          .includes(filtrosAplicados.busqueda);
        const matchId = String(producto.id).includes(filtrosAplicados.busqueda);
        if (!matchNombre && !matchId) return false;
      }

      if (filtrosAplicados.estado !== "all") {
        const esActivo = filtrosAplicados.estado === "activo";
        if (producto.estado !== esActivo) return false;
      }

      if (filtrosAplicados.nietaId !== "all") {
        if (
          producto.nombreCategoria !== filtrosAplicados.nombreNietaSeleccionada
        )
          return false;
      } else if (filtrosAplicados.hijaId !== "all") {
        if (
          !filtrosAplicados.nombresHijasValidas.includes(
            producto.nombreCategoria,
          )
        )
          return false;
      } else if (filtrosAplicados.padreId !== "all") {
        if (
          !filtrosAplicados.nombresNietasValidas.includes(
            producto.nombreCategoria,
          )
        )
          return false;
      }

      return true;
    });
  }, [productos, filtrosAplicados]);

  const resetCascade = () => {
    setBusqueda("");
    setEstado("all");
    setSelectedPadre("all");
    setSelectedHija("all");
    setSelectedNieta("all");
    setFiltrosAplicados({
      busqueda: "",
      estado: "all",
      padreId: "all",
      hijaId: "all",
      nietaId: "all",
      nombresHijasValidas: [],
      nombresNietasValidas: [],
      nombreNietaSeleccionada: "",
    });
  };

  return {
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
    resetCascade,
  };
};
