"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Edit2, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// Estructura exacta de tu ProductoList de Java
export interface ProductoList {
  id: number;
  nombre: string;
  slug: string;
  imagenUrl: string;
  descripcion: string;
  nombreCategoria: string;
  nombreMarca: string;
  estado: boolean;
}

export const columns = (
  onEdit: (id: number) => void,
  onDelete: (id: number) => void,
  onStatusChange: (id: number, nuevoEstado: boolean) => void,
): ColumnDef<ProductoList>[] => [
  {
    accessorKey: "imagenUrl",
    header: "MINIATURA",
    cell: ({ row }) => (
      <div className="relative h-12 w-12 overflow-hidden rounded-xl bg-gray-100 border border-gray-200">
        <Image
          src={row.original.imagenUrl || "/placeholder-product.png"}
          alt={row.original.nombre}
          fill
          className="object-cover"
        />
      </div>
    ),
  },
  {
    accessorKey: "nombre",
    header: "PRODUCTO",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-semibold text-gray-900 line-clamp-1">
          {row.original.nombre}
        </span>
        <span className="text-xs text-muted-foreground uppercase tracking-wider mt-0.5">
          {row.original.slug}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "nombreCategoria",
    header: "CATEGORÍA",
    cell: ({ row }) => (
      <Badge
        variant="secondary"
        className="bg-blue-50 text-blue-600 hover:bg-blue-50 border-none px-3 py-1 font-medium text-xs tracking-wide uppercase"
      >
        {row.original.nombreCategoria}
      </Badge>
    ),
  },
  {
    accessorKey: "nombreMarca",
    header: "MARCA",
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className="bg-gray-50 text-gray-700 border-gray-200 px-2.5 py-0.5 font-semibold text-xs tracking-wider uppercase"
      >
        {row.original.nombreMarca}
      </Badge>
    ),
  },
  {
    accessorKey: "estado",
    header: "ESTADO",
    cell: ({ row }) => (
      <Switch
        checked={row.original.estado}
        onCheckedChange={(checked) => onStatusChange(row.original.id, checked)}
        // Ajustamos el color naranja por tu #FF3C3C nativo al activarse
        className="data-[state=checked]:bg-[#FF3C3C]"
      />
    ),
  },
  {
    id: "acciones",
    header: "ACCIONES",
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onEdit(row.original.id)}
          className="h-8 w-8 text-gray-500 hover:text-gray-900 hover:bg-gray-100"
        >
          <Edit2 className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(row.original.id)}
          className="h-8 w-8 text-gray-400 hover:text-[#FF3C3C] hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
];
