//Componente para mostrar el esqueleto de carga del carrito de compras
//Utilizamos componentes de Skeleton para simular la estructura del carrito mientras se cargan los datos reales
//Objetivo: Mejorar la experiencia del usuario mostrando un indicador visual de que el contenido se está cargando
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const CarritoSkeleton = () => {
    return (
        <div className="container mx-auto max-w-6xl py-8 px-4">
            {/* Título del carrito */}
            <Skeleton className="h-10 w-48 mb-8" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* COLUMNA IZQUIERDA: Lista de Productos */}
                <div className="lg:col-span-2 space-y-4">
                    <Card className="rounded-md border-slate-200 shadow-sm">
                        <CardHeader className="bg-slate-50 border-b pb-4">
                            <Skeleton className="h-6 w-48" />
                        </CardHeader>
                        <CardContent className="p-0">
                            {[1,2].map((i) => (
                                <div key={i} className="p-6 flex flex-col sm:flex-row gap-6 items-start border-b last:border-0">
                                    {/* Imagen */}
                                    <Skeleton className="w-24 h-24 rounded-md flex-shrink-0" />
                                    
                                    {/* Detalles del producto */}
                                    <div className="flex-1 space-y-3 w-full">
                                        <Skeleton className="h-5 w-3/4" />
                                        <Skeleton className="h-4 w-1/2" />
                                        {/* Controles de cantidad */}
                                        <div className="pt-2">
                                        <Skeleton className="h-8 w-32" />
                                        </div>
                                    </div>
                                    {/* Precio */}
                                    <div className="sm:ml-auto">
                                        <Skeleton className="h-8 w-24" />
                                    </div>
                                </div>
                            ))};
                        </CardContent>
                    </Card>
                </div>

                {/* COLUMNA DERECHA: Resumen del pedido */}
                <div className="space-y-6">
                    <Card className="rounded-md border-slate-200 shadow-sm">
                        <CardHeader className="pb-4">
                            <Skeleton className="h-7 w-40" />
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <div className="py-2">
                                <Skeleton className="h-px w-full" /> {/* Separator */}
                            </div>
                            <div className="flex justify-between items-center">
                                <Skeleton className="h-6 w-20" />
                                <Skeleton className="h-8 w-32" />
                            </div>
                            <Skeleton className="h-12 w-full mt-4" /> {/* Botón principal */}
                            <Skeleton className="h-10 w-full mt-4" /> {/* Caja de cuotas */}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
