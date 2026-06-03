"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { Calendar, Layers, Eye, Link2 } from "lucide-react";
import { Marca } from "@/types/marca/marca";

interface ModalDetalleMarcaProps {
  marca: Marca | null;
}

export default function ModalDetalleMarca({ marca }: ModalDetalleMarcaProps) {
  if (!marca) return null;

  // Formatear la fecha de creación de la marca
  const fechaFormateada = new Date(marca.createAt).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Dialog>
      <DialogTrigger className="flex items-center gap-1 p-2 text-sm text-gray-500 hover:text-gray-700">
        <Eye className="h-4 w-4" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-137.5 p-0 overflow-hidden border-none bg-white rounded-2xl shadow-2xl">
        {/* Cabecera con Banner y Logo */}
        <div className="relative h-44 w-full bg-linear-to-r from-gray-100 to-gray-200">
          <Image
            src={marca.imagen_banner || "/placeholder-banner.png"}
            alt={`Banner de ${marca.nombre}`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />

          {/* Contenedor del Logo Superpuesto */}
          <div className="absolute -bottom-10 left-6 h-20 w-20 overflow-hidden rounded-2xl border-4 border-white bg-white shadow-md">
            <div className="relative h-full w-full bg-gray-50">
              <Image
                src={marca.imagen_logo || "/placeholder-brand.png"}
                alt={`Logo de ${marca.nombre}`}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Badges de Estado y Destacado sobre el banner */}
          <div className="absolute top-4 right-4 flex gap-2">
            <Badge
              className={
                marca.estado
                  ? "bg-green-500/90 text-white border-none backdrop-blur-sm"
                  : "bg-gray-500/90 text-white border-none backdrop-blur-sm"
              }
            >
              {marca.estado ? "Activo" : "Inactivo"}
            </Badge>
            {marca.destacada && (
              <Badge className="bg-amber-500/90 text-white border-none backdrop-blur-sm">
                ★ Destacada
              </Badge>
            )}
          </div>
        </div>

        {/* Cuerpo del Modal */}
        <div className="pt-12 px-6 pb-6">
          <DialogHeader className="text-left">
            <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              {marca.nombre}
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground font-medium mt-0.5 flex items-center gap-1">
              <Link2 className="h-3 w-3" /> /{marca.slug}
            </DialogDescription>
          </DialogHeader>

          <hr className="my-4 border-gray-100" />

          {/* Área con scroll por si la descripción es muy extensa */}
          <ScrollArea className="max-h-60 pr-2">
            <div className="space-y-4">
              {/* Sección Descripción */}
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                  <Layers className="h-3.5 w-3.5" /> Descripción de la Marca
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-xl border border-gray-100 whitespace-pre-line">
                  {marca.descripcion ||
                    "Esta marca no cuenta con una descripción detallada en este momento."}
                </p>
              </div>

              {/* Grid de Metadatos (Visibilidad y Fecha de Registro) */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex items-center gap-2.5 bg-gray-50/50 p-2.5 rounded-xl border border-gray-100">
                  <div className="p-1.5 bg-red-50 text-[#FF3C3C] rounded-lg">
                    <Eye className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">
                      Visibilidad
                    </p>
                    <p className="text-xs font-semibold text-gray-700">
                      {marca.estado ? "Público en tienda" : "Oculto"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 bg-gray-50/50 p-2.5 rounded-xl border border-gray-100">
                  <div className="p-1.5 bg-blue-50 text-blue-500 rounded-lg">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">
                      Creado el
                    </p>
                    <p className="text-xs font-semibold text-gray-700">
                      {fechaFormateada !== "Invalid Date"
                        ? fechaFormateada
                        : marca.createAt}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
