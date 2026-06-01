import api from "@/lib/api";

export const getMarcas = async () => {
  const response = await api.get("/admin/marca/");
  return response.data;
};
