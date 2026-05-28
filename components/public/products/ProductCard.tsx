//Components/public/products/ProductCard.tsx
//Componente para mostrar un producto en la tienda
//Recibe un producto como prop y muestra su imagen, nombre, precio y un botón para agregar al carrito
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export interface ProductCardProps {
  id: string;
  titulo: string;
  imagen: string;
  precioOriginal?: number;
  precioDescuento: number;
  porcentajeDescuento?: number;
  prioridad?: boolean;
}

//Interfaz para las props del componente
export function ProductCard({
    id,
    titulo,
    imagen,
    precioOriginal,
    precioDescuento,
    porcentajeDescuento,
    prioridad = false,
}: ProductCardProps) {
    return ( 
        <Link href={`/producto/${id}`}>
            <Card className="rounded-md border border-neutral-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer h-full bg-white group">
                <CardContent className="p-4 flex flex-col items-start gap-2">
                    {/* Imagen del producto */}
                    <div className="relative w-full aspect-square bg-white flex items-center justify-center p-2">
                        <Image
                            src={imagen}
                            alt={titulo}
                            fill
                            priority={prioridad}
                            className="object-contain group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>

                    {/* Informacion del producto */}
                    <div className="flex flex-col flex-1 gap-1">
                        <h3 className="text-[13px] text-neutral-700 leading-tight line-clamp-2 min-h-[2.5rem]">
                            {titulo}
                        </h3>

                        <div className="mt-auto pt-2">
                            {/* Precio original con descuento si existe */}
                            {precioOriginal && (
                                <p className="text-[11px] text-neutral-400 line-through">
                                    Desde S/. {precioOriginal.toFixed(2)}
                                </p>
                            )}
                            <div className="flex items-center gap-2">
                                <span className="text-lg font-bold text-neutral-900">
                                    S/. {precioDescuento.toFixed(2)}
                                </span>
                                {porcentajeDescuento && (
                                    <span className="text-xs font-bold text-[#00A650]">
                                        {porcentajeDescuento}% OFF
                                    </span>
                                )}
                            </div>

                            {/* Footer */}
                            <p className="text-[11px] text-[#00A650] font-medium leading-tight mt-1.5">
                                Hasta 6 cuotas sin intereses con BCP, BBVA y Diners
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}