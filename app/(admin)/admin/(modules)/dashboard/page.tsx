//app/(admin)/admin/(modules)/dashboard/page.tsx
//Pagina principal de administrador, donde puede visualizar su dashboard
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PackagePlus, Loader2 } from "lucide-react";
import { useDashboard } from "../../hooks/dashboard/useDashboard";
import { KpiGrid } from "../../components/dashboard/KpiGrid"
import { DashboardPanel } from "../../components/dashboard/DashboardPanel"

export default function DashboardPage() {
  const { data, loading, error } = useDashboard();

  if(loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center h-[70vh] text-gray-500 gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-[#FF3C3C]" />
        <p className="text-sm font-medium">Cargando métricas...</p>
      </div>
    );
  }

  if(error || !data) {
    return (
      <div className="flex-1 flex items-center justify-center h-[70vh]">
        <p className="text-red-500 font-medium">{error || "No se encontraron datos."}</p>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6 max-w-7xl mx-auto w-full">
      {/* Encabezado Estático */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Resumen General</h2>
          <p className="text-sm text-gray-500 mt-1">
            Monitorea el rendimiento de Tiendamia y gestiona tu inventario.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/admin/productos/nuevo" passHref>
            <Button className="bg-[#FF3C3C] hover:bg-[#E03030] text-white font-semibold h-10 px-4 rounded-xl shadow-sm transition-colors flex items-center gap-2 text-xs uppercase tracking-wider">
              <PackagePlus className="h-4 w-4" />
              <span>Nuevo Producto</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Componentes UI Inyectados */}
      <KpiGrid kpis={data.kpis} />
      <DashboardPanel ordenes={data.ordenesRecientes} />
    </div>
  );
}