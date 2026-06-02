import api from "@/lib/api";
import {
  ProductoRequest,
  VariacionRequest,
} from "@/types/producto/productoList";

export const getProductos = async () => {
  const response = await api.get("/productos/");
  return response.data.data;
};

export const getProductoById = async (id: string) => {
  const response = await api.get(`/productos/detalle/${id}`);
  return response.data.data;
};

export const createProducto = async (data: ProductoRequest) => {
  const response = await api.post("/admin/productos/create", data);
  return response.data.mensaje;
};

export const updateProducto = async (
  id: number,
  idCategoria: number,
  idMarca: number,
  nombre: string,
  slug: string,
  imagenUrl: string,
  descripcion: string,
  estado: boolean,
) => {
  const response = await api.post(`/admin/productos/update/${id}`, {
    nombre,
    slug,
    imagenUrl,
    descripcion,
    idCategoria,
    idMarca,
    estado,
  });
  return response.data.mensaje;
};

export const createVariacion = async (id: number, data: VariacionRequest) => {
  const response = await api.post(
    `/admin/productos/variacion/create/${id}`,
    data,
  );
  return response.data.mensaje;
};

export const updateVariacion = async (
  cdgoInventario: string,
  data: VariacionRequest,
) => {
  const response = await api.post(
    `/admin/productos/variacion/update/${cdgoInventario}`,
    data,
  );
  return response.data.mensaje;
};

export const cambiarEstado = async (id: number, estado: boolean) => {
  const response = await api.put(`/admin/productos/estado/${id}`, {
    estado,
  });
  return response.data.mensaje;
};
