//lib/services/admin.ts
//Archivo de servicio para manejar las peticiones relacionadas al admin
import api from "../api";

export interface KpiData {
    ingresosTotales: { valor: number; porcentaje: string };
    ordenesNuevas: { valor: number; porcentaje: string };
    productosActivos: { valor: number; descripcion: string };
    nuevosClientes: { valor: number; porcentaje: string };
}

export interface OrdenReciente {
  id: string;
  cliente: string;
  fecha: string;
  total: number;
  estado: "Pendiente" | "Enviada" | "Entregada" | "Cancelada";
}

export interface DashboardData {
  kpis: KpiData;
  ordenesRecientes: OrdenReciente[];
}

export const getDashboardStats = async (): Promise<DashboardData> => {
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        kpis: {
          ingresosTotales: { valor: 24562.00, porcentaje: "+15% desde el mes pasado" },
          ordenesNuevas: { valor: 142, porcentaje: "+8% desde el mes pasado" },
          productosActivos: { valor: 385, descripcion: "En 12 categorías" },
          nuevosClientes: { valor: 1204, porcentaje: "+22% desde el mes pasado" }
        },
        ordenesRecientes: [
          { id: "TM-001023", cliente: "Juan Pérez", fecha: "Hoy, 10:23 AM", total: 1299.00, estado: "Pendiente" },
          { id: "TM-001022", cliente: "María Gómez", fecha: "Hoy, 09:15 AM", total: 349.50, estado: "Enviada" },
          { id: "TM-001021", cliente: "Carlos Ruiz", fecha: "Ayer, 04:30 PM", total: 4500.00, estado: "Entregada" },
          { id: "TM-001020", cliente: "Ana Torres", fecha: "Ayer, 11:10 AM", total: 120.00, estado: "Cancelada" },
        ]
      });
    }, 800); // 800ms de carga simulada
  });
};