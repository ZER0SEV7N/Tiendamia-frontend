"use client";

import React from "react";
import Image from "next/image";
import { Heart, ShoppingCart, Trash2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/app/(shop)/perfil/favoritos/hook/useWishlist";
import Link from "next/link";

function WishlistSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex items-center gap-4 p-4 border border-neutral-200 rounded-xl bg-white animate-pulse"
        >
          <div className="w-20 h-20 bg-neutral-200 rounded-lg shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-neutral-200 rounded w-3/4" />
            <div className="h-4 bg-neutral-200 rounded w-1/4" />
          </div>
          <div className="h-9 w-32 bg-neutral-200 rounded-md" />
          <div className="h-9 w-9 bg-neutral-200 rounded-md" />
        </div>
      ))}
    </div>
  );
}

function WishlistVacia() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-neutral-200 rounded-xl bg-white">
      <Heart className="w-14 h-14 text-neutral-200 mb-4" />
      <h3 className="text-lg font-semibold text-neutral-600 mb-1">
        Tu lista de favoritos está vacía
      </h3>
      <p className="text-sm text-neutral-400 mb-6 max-w-xs">
        Guarda los productos que te interesan para comprarlos después.
      </p>
      <Link href="/">
        <Button className="bg-[#E61C24] hover:bg-[#c41920] text-white font-medium px-6 rounded-lg">
          Explorar productos
        </Button>
      </Link>
    </div>
  );
}

export default function FavoritosView() {
  const { items, isLoading, error, eliminarItem } = useWishlist();

  return (
    <div className="w-full max-w-4xl font-sans space-y-6 pl-2 animate-fade-in">
      <div className="border-b border-neutral-100 pb-4">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-1 text-sm text-neutral-500 hover:text-[#E61C24] transition-colors mb-3"
        >
          <ArrowLeft className="w-4 h-4" />
          Atrás
        </button>
        <h1 className="text-3xl font-medium text-[#333333] tracking-tight">
          Favoritos
        </h1>
        {!isLoading && !error && (
          <p className="text-sm text-neutral-500 mt-1">
            {items.length} Producto{items.length !== 1 ? "s" : ""}
          </p>
        )}
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
          {error}
        </div>
      )}

      {isLoading ? (
        <WishlistSkeleton />
      ) : items.length === 0 ? (
        <WishlistVacia />
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.idWishlist}
              className="flex items-center gap-4 p-4 border border-neutral-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-20 h-20 shrink-0 relative rounded-lg overflow-hidden border border-neutral-100 bg-neutral-50">
                {item.imagenUrl ? (
                  <Image
                    src={item.imagenUrl}
                    alt={item.nombre}
                    fill
                    className="object-contain p-1"
                    sizes="80px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ShoppingCart className="w-8 h-8 text-neutral-300" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0 space-y-1">
                <p className="text-sm font-medium text-neutral-800 line-clamp-2 hover:text-[#E61C24] cursor-pointer transition-colors">
                  {item.nombre}
                </p>
                <p className="text-base font-bold text-neutral-900">
                  S/ {item.precio.toFixed(2)}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {item.enStock ? (
                  <Button
                    size="sm"
                    className="bg-[#E61C24] hover:bg-[#c41920] text-white font-medium px-4 h-9 rounded-lg text-xs gap-1.5"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Agregar al carrito
                  </Button>
                ) : (
                  <span className="px-3 py-1.5 text-xs font-semibold text-neutral-500 bg-neutral-100 border border-neutral-200 rounded-lg">
                    Fuera de stock
                  </span>
                )}

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => eliminarItem(item.idWishlist)}
                  className="h-9 w-9 p-0 border-neutral-200 hover:border-red-300 hover:bg-red-50 hover:text-[#E61C24] text-neutral-400 rounded-lg transition-colors"
                  title="Eliminar de favoritos"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
