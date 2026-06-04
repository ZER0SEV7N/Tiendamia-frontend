"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getWishlist,
  eliminarDeWishlist,
  agregarAWishlist,
} from "@/lib/services/wishlist";
import { WishlistItem } from "@/app/(shop)/perfil/favoritos/types/wishlist";

export const useWishlist = () => {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cargarWishlist = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getWishlist();
      setItems(data);
    } catch {
      setError("No se pudo cargar tu lista de favoritos.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    cargarWishlist();
  }, [cargarWishlist]);

  const eliminarItem = async (idWishlist: number) => {
    setItems((prev) => prev.filter((i) => i.idWishlist !== idWishlist));
    try {
      await eliminarDeWishlist(idWishlist);
    } catch {
      cargarWishlist();
    }
  };

  const agregarItem = async (idProducto: number) => {
    try {
      const nuevo = await agregarAWishlist(idProducto);
      setItems((prev) => [...prev, nuevo]);
    } catch {
      setError("No se pudo agregar el producto a favoritos.");
    }
  };

  return {
    items,
    isLoading,
    error,
    eliminarItem,
    agregarItem,
    recargar: cargarWishlist,
  };
};
