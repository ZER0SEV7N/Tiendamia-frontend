//app/(admin)/admin/components/dashboard/kpiGrid.tsx
//Componente para mostrar las KPIs en el dashboard del admin, con diseño de grid y estilos
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Package, ShoppingCart, Users, TrendingUp } from "lucide-react";
import { KpiData} from "@/lib/services/admin";

export function KpiGrid({ kpis }: { kpis: KpiData }) {
    const kpiCards = [
    {
      titulo: "Ingresos Totales", valor: `S/ ${kpis.ingresosTotales.valor.toLocaleString()}`, 
      desc: kpis.ingresosTotales.porcentaje, icon: DollarSign, color: "text-emerald-600", bg: "bg-emerald-100"
    },
    {
      titulo: "Órdenes Nuevas", valor: kpis.ordenesNuevas.valor, 
      desc: kpis.ordenesNuevas.porcentaje, icon: ShoppingCart, color: "text-blue-600", bg: "bg-blue-100"
    },
    {
      titulo: "Productos Activos", valor: kpis.productosActivos.valor, 
      desc: kpis.productosActivos.descripcion, icon: Package, color: "text-violet-600", bg: "bg-violet-100"
    },
    {
      titulo: "Nuevos Clientes", valor: kpis.nuevosClientes.valor.toLocaleString(), 
      desc: kpis.nuevosClientes.porcentaje, icon: Users, color: "text-orange-600", bg: "bg-orange-100"
    },
  ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpiCards.map((kpi, idx) => {
                const Icono = kpi.icon;
                return (
                    <Card key={idx} className="border border-gray-100 shadow-sm rounded-2xl">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-semibold text-gray-600">{kpi.titulo}</CardTitle>
                            <div className={`p-2 rounded-lg ${kpi.bg}`}>
                                <Icono className={`h-4 w-4 ${kpi.color}`} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900">{kpi.valor}</div>
                            <p className="text-xs text-gray-500 font-medium mt-1 flex items-center gap-1">
                                <TrendingUp className="h-3 w-3 text-emerald-500" /> {kpi.desc}
                            </p>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}