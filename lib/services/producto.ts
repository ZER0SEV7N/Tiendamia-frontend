import api from "@/lib/api";
import { ProductoRequest, VariacionRequest } from "@/types/producto/productoList";

//Obtener catálogo público
export const getProductos = async () => {
  const response = await api.get("/productos/catalogo");
  return response.data.data;
};

//Obtener por ID (Admin)
export const getProductoById = async (id: number) => {
  const response = await api.get(`/productos/${id}`);
  return response.data.data;
};

//Obtener por Slug (Para tu página de producto cliente que hicimos)
export const getProductoBySlug = async (slug: string) => {
  const response = await api.get(`/productos/slug/${slug}`);
  return response.data.data;
};

//Crear producto
export const createProducto = async (data: ProductoRequest) => {
  const response = await api.post("/productos", data); // O "/admin/productos" si cambiaste el backend
  return response.data.mensaje;
};

//Actualizar producto (Usamos PUT como en el backend)
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
  const response = await api.put(`/productos/${id}`, {
    idCategoria,
    idMarca,
    nombre,
    slug,
    imagenUrl,
    descripcion,
    estado,
  });
  return response.data.mensaje;
};

//Crear variación
export const createVariacion = async (productoId: number, data: VariacionRequest) => {
  const response = await api.post(`/productos/${productoId}/variaciones`, data);
  return response.data.mensaje;
};

//Actualizar variación (Usamos PUT)
export const updateVariacion = async (cdgoInventario: string, data: VariacionRequest) => {
  const response = await api.put(`/productos/variaciones/${cdgoInventario}`, data);
  return response.data.mensaje;
};

//Cambiar estado (Usamos PATCH como en el backend)
export const cambiarEstado = async (id: number) => {
  const response = await api.patch(`/productos/${id}/estado`);
  return response.data.mensaje;
};