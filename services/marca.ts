import api from "@/lib/api";
import { MarcaRequest } from "@/types/marca/marca";

export const getMarcas = async () => {
  const response = await api.get("/admin/marca/");
  return response.data;
};

export const getByIdMarca = async (id: number) => {
  const response = await api.get(`/admin/marca/${id}/`);
  return response.data;
};

export const createMarca = async (data: MarcaRequest) => {
  const response = await api.post("/admin/marca/", data);
  return response.data;
};
