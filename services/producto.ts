import api from "@/lib/api";
import { ProductoRequest } from "@/types/producto/productoList";

export const getProductos = async () => {
  const response = await api.get("/productos/");
  return response.data.data;
};

export const createProducto = async (data: ProductoRequest) => {
  const response = await api.post("/admin/productos/create", data);
  return response.data.mensaje;
};
