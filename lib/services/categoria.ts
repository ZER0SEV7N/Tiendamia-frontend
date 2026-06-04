import api from "@/lib/api";

export const getAllCategorias = async () => {
  const response = await api.get("/admin/categorias/");
  return response.data;
};
