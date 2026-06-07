//app/(admin)/admin/hooks/dashboard/useDashboard.tsx
//Hook personalizado para manejar la lógica del dashboard del admin, 
//incluyendo la obtención de KPIs y órdenes recientes
import { useState, useEffect } from "react";
import { getDashboardStats, DashboardData } from "@/lib/services/admin";

//Función principal del hook, que maneja el estado de carga, datos y errores
export function useDashboard() {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try{
                setLoading(true);
                const stats = await getDashboardStats();
                setData(stats);
            } catch (err: unknown) {
                setError("Error al cargar los datos del dashboard.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return { data, loading, error };
}
