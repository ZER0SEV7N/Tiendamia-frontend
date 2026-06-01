//app/(shop)/producto/components/productoInfo.tsx
"use client";
import { ProductInfoProps } from "../types/interface";

export function ProductoInfo({ marca, titulo, atributos, variantesSeleccionadas, seleccionarVariante, detalles }: ProductInfoProps) {
    return (
        <div className="flex-1 flex flex-col gap-5">
            <div>
                <p className="text-[#0071CE] font-bold text-sm hover:underline cursor-pointer mb-1">{marca}</p>
                <h1 className="text-2xl font-normal text-gray-900 leading-tight">{titulo}</h1>
            </div>

            <div className="space-y-4 pt-2">
                {atributos.map((attr) => (
                    <div key={attr.nombre}>
                        <p className="text-sm text-gray-700 mb-2">
                            <span className="font-bold">{attr.nombre}:</span> {variantesSeleccionadas[attr.nombre] || "Selecciona una opción"}
                        </p>
                        <div className="flex flex-wrap gap-2">
                        {attr.opciones.map((opcion) => (
                            <button
                             key={opcion}
                             onClick={() => seleccionarVariante(attr.nombre, opcion)}
                             className={`text-sm px-4 py-2 border rounded-md transition-all ${
                                 variantesSeleccionadas[attr.nombre] === opcion 
                                 ? "border-black border-2 font-medium bg-gray-50" 
                                 : "border-gray-300 text-gray-600 hover:border-gray-500"
                             }`}
                            >
                            {opcion}
                            </button>
                        ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="pt-6">
                <h3 className="font-bold text-lg mb-3">Detalles del producto</h3>
                <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
                    {Object.entries(detalles).map(([key, value]) => (
                        <div key={key}>
                            <span className="font-bold block text-gray-800 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                            <span className="text-gray-600">{String(value)}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}