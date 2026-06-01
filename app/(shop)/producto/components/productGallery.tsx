//app/(shop)/producto/components/productoGallery.tsx
"use client";
import Image from "next/image";
import { ProductGalleryProps } from "../types/interface";

export function ProductoGallery({ imagenes, titulo, imagenActiva, setImagenActiva, sku }: ProductGalleryProps) {
    return (
        <div className="w-full flex flex-col gap-4">
            <div className="relative w-full aspect-square bg-white border border-gray-200 rounded-md flex items-center justify-center">
                <Image src={imagenes[imagenActiva]} alt={titulo} fill className="object-contain p-4" priority />
            </div>
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                {imagenes.map((img, index) => (
                <button
                    key={index}
                    onClick={() => setImagenActiva(index)}
                    className={`relative w-16 h-16 border rounded-md shrink-0 bg-white overflow-hidden transition-all ${
                    imagenActiva === index ? "border-black border-2" : "border-gray-200 hover:border-gray-400"
                    }`}
                >
                    <Image src={img} alt={`Miniatura ${index + 1}`} fill className="object-contain p-1" />
                </button>
                ))}
            </div>
            <p className="text-xs text-gray-400 mt-2">SKU/Artículo: {sku.toUpperCase()}</p>
        </div>
    );
}
