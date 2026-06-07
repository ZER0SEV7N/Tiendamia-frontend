//app/(admin)/admin/hooks/dashboard/useDashboard.tsx
//Hook personalizado para manejar la lógica del dashboard del admin, 
//incluyendo la obtención de KPIs y órdenes recientes
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Package, Tag } from "lucide-react";
import Link from "next/link";
import { OrdenReciente } from "@/lib/services/admin";

export function DashboardPanel({ ordenes }: { ordenes: OrdenReciente[] }) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            { /* Tabla de Ordenes */}
            <Card className="lg:col-span-2 border border-gray-100 shadow-sm rounded-2xl flex flex-col">
                <CardHeader className="border-b border-gray-50 pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold text-gray-800">Órdenes Recientes</CardTitle>
            <Button variant="ghost" size="sm" className="text-[#FF3C3C] hover:text-[#E03030] hover:bg-red-50 text-xs font-semibold uppercase tracking-wider">
              Ver todas <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0 flex-1 overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50/50 text-gray-500 font-semibold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-6 py-3">ID Orden</th>
                <th className="px-6 py-3">Cliente</th>
                <th className="px-6 py-3">Fecha</th>
                <th className="px-6 py-3">Total</th>
                <th className="px-6 py-3">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {ordenes.map((orden) => (
                <tr key={orden.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-900">{orden.id}</td>
                  <td className="px-6 py-4 text-gray-600">{orden.cliente}</td>
                  <td className="px-6 py-4 text-gray-500 text-xs">{orden.fecha}</td>
                  <td className="px-6 py-4 font-bold text-gray-700">S/ {orden.total.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider
                      ${orden.estado === "Entregada" ? "bg-emerald-100 text-emerald-700" : 
                        orden.estado === "Enviada" ? "bg-blue-100 text-blue-700" : 
                        orden.estado === "Cancelada" ? "bg-red-100 text-red-700" : 
                        "bg-amber-100 text-amber-700"}`}>
                      {orden.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Accesos Directos */}
      <Card className="border border-gray-100 shadow-sm rounded-2xl">
        <CardHeader className="border-b border-gray-50 pb-4">
          <CardTitle className="text-lg font-bold text-gray-800">Acciones Rápidas</CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-3">
          <Link href="/admin/categorias" className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-[#FF3C3C]/30 hover:bg-red-50/50 transition-all group">
            <div className="bg-gray-100 group-hover:bg-[#FF3C3C]/10 p-2 rounded-lg transition-colors">
              <Tag className="h-5 w-5 text-gray-600 group-hover:text-[#FF3C3C]" />
            </div>
            <div>
              <p className="font-semibold text-gray-800 text-sm">Gestionar Categorías</p>
              <p className="text-xs text-gray-500">Añade o edita el árbol</p>
            </div>
          </Link>
          <Link href="/admin/marcas" className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-[#FF3C3C]/30 hover:bg-red-50/50 transition-all group">
            <div className="bg-gray-100 group-hover:bg-[#FF3C3C]/10 p-2 rounded-lg transition-colors">
              <Package className="h-5 w-5 text-gray-600 group-hover:text-[#FF3C3C]" />
            </div>
            <div>
              <p className="font-semibold text-gray-800 text-sm">Administrar Marcas</p>
              <p className="text-xs text-gray-500">Configura marcas destacadas</p>
            </div>
          </Link>
        </CardContent>
      </Card>
    </div>
    );
}