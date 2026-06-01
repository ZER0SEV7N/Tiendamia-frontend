/* eslint-disable react-hooks/incompatible-library */
"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function ProductosDataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5, // Cantidad de filas por página
      },
    },
  });

  const { pageIndex } = table.getState().pagination;
  const pageCount = table.getPageCount();
  const totalRows = table.getFilteredRowModel().rows.length;

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Contenedor de la Tabla */}
      <Table>
        <TableHeader className="bg-gray-50/70 border-b border-gray-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-transparent">
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="text-xs font-bold text-gray-500 uppercase tracking-wider h-12 vertical-middle"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="border-b border-gray-100 last:border-none hover:bg-gray-50/40 transition-colors"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="py-3.5 align-middle">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center text-muted-foreground"
              >
                No se encontraron productos registrados.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Footer / Componente de Paginación */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50/30">
        {/* Contador Izquierdo */}
        <p className="text-sm font-medium text-gray-500">
          Mostrando{" "}
          <span className="text-gray-900">
            {totalRows === 0
              ? 0
              : pageIndex * table.getState().pagination.pageSize + 1}
            -
            {Math.min(
              (pageIndex + 1) * table.getState().pagination.pageSize,
              totalRows,
            )}
          </span>{" "}
          de <span className="text-gray-900">{totalRows}</span> productos
        </p>

        {/* Controladores de Página */}
        <div className="flex items-center gap-1.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="rounded-xl border-gray-200 text-gray-600 hover:bg-gray-50 h-9 font-medium"
          >
            Anterior
          </Button>

          {/* Generador dinámico de números basado en tu sketch */}
          {Array.from({ length: pageCount }).map((_, index) => (
            <Button
              key={index}
              size="sm"
              onClick={() => table.setPageIndex(index)}
              className={`h-9 w-9 rounded-xl font-bold transition-all text-xs ${
                pageIndex === index
                  ? "bg-[#FF3C3C] text-white hover:bg-[#E03030] shadow-sm shadow-red-100"
                  : "bg-transparent text-gray-600 border border-transparent hover:bg-gray-100"
              }`}
            >
              {index + 1}
            </Button>
          ))}

          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="rounded-xl border-gray-200 text-gray-600 hover:bg-gray-50 h-9 font-medium"
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  );
}
