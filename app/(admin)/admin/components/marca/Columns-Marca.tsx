"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Edit2, Trash2, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import ModalMarca from "./ModalMarca";
import { Marca } from "@/types/marca/marca";

export const ColumnsMarca = (
  onDelete: (id: number) => void,
  onStatusChange: (id: number, nuevoEstado: boolean) => void,
  onViewDetails?: (id: number) => void, // Añadido para ver detalle
): ColumnDef<Marca>[] => [
  {
    accessorKey: "imagen_logo",
    header: "LOGO",
    cell: ({ row }) => (
      <div className="relative h-12 w-12 overflow-hidden rounded-xl bg-gray-100 border border-gray-200">
        <Image
          src={row.original.imagen_logo || "/placeholder-brand.png"}
          alt={row.original.nombre}
          fill
          className="object-cover"
        />
      </div>
    ),
  },
  {
    accessorKey: "nombre",
    header: "MARCA",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-semibold text-gray-900 line-clamp-1">
          {row.original.nombre}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "destacada",
    header: "DESTACADA",
    cell: ({ row }) => (
      <Badge
        variant={row.original.destacada ? "default" : "secondary"}
        className={
          row.original.destacada
            ? "bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-50 px-2.5 py-0.5 text-xs font-semibold"
            : "bg-gray-100 text-gray-400 border-none px-2.5 py-0.5 text-xs"
        }
      >
        {row.original.destacada ? "SÍ" : "NO"}
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
        className="data-[state=checked]:bg-[#FF3C3C]"
      />
    ),
  },
  {
    id: "acciones",
    header: "ACCIONES",
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        {/* Ver Detalle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onViewDetails && onViewDetails(row.original.id)}
          className="h-8 w-8 text-gray-500 hover:text-blue-600 hover:bg-blue-50"
        >
          <Eye className="h-4 w-4" />
        </Button>

        {/* Editar */}
        <ModalMarca
          isEdit={true}
          icons={<Edit2 className="h-4 w-4" />}
          marcaId={row.original.id.toString()}
        />

        {/* Eliminar */}
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
