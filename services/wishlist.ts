import api from "@/lib/api";
import { WishlistItem } from "@/app/(shop)/perfil/favoritos/types/wishlist";
import { response } from "@/types/response";

// Obtiene todos los favoritos del usuario autenticado
export const getWishlist = async (): Promise<WishlistItem[]> => {
  const { data } = await api.get<response<WishlistItem[]>>("/wishlist");
  return data.data;
};

// Agrega un producto a favoritos
export const agregarAWishlist = async (idProducto: number): Promise<WishlistItem> => {
  const { data } = await api.post<response<WishlistItem>>(`/wishlist/agregar/${idProducto}`);
  return data.data;
};

// Elimina un item de favoritos por su ID de wishlist
export const eliminarDeWishlist = async (idWishlist: number): Promise<void> => {
  await api.delete(`/wishlist/eliminar/${idWishlist}`);
};

// Verifica si un producto ya esta en favoritos
export const checkEnWishlist = async (idProducto: number): Promise<boolean> => {
  const { data } = await api.get<response<boolean>>(`/wishlist/check/${idProducto}`);
  return data.data;
};