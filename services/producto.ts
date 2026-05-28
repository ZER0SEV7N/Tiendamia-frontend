import api from "@/lib/api";

export const getProductos = async () => {
  const response = await api.get("/productos/");
  return response.data.data;
};
