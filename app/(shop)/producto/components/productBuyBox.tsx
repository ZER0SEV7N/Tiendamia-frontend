//app/(shop)/producto/components/productoBuyBox.tsx
//Componente para la sección de compra del producto, incluyendo precio, 
//opciones de compra y botones de acción
"use client";
import { ProductBuyBoxProps } from "../types/interface";
import { Heart, CreditCard, Calendar } from "lucide-react";

//Componente para la sección de compra del producto, incluyendo precio, opciones de compra y botones de acción
export function ProductBuyBox({ precioOriginal, precioDescuento, descuento, cantidad, setCantidad, onComprar }: ProductBuyBoxProps) {
    return (
    <div className="w-full lg:w-72 shrink-0 flex flex-col gap-4">
      <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm relative">
        <button className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition">
          <Heart className="w-6 h-6" />
        </button>

        <div className="mb-4">
          <p className="text-sm text-gray-500 line-through">
            S/ {precioOriginal.toFixed(2)} <span className="text-[#00A650] font-bold no-underline ml-1">{descuento}% OFF</span>
          </p>
          <p className="text-3xl font-normal text-gray-900 mt-1">S/ {precioDescuento.toFixed(2)}</p>
        </div>

        <div className="bg-[#eaf8f0] border border-[#a3e5c0] text-[#008f39] text-xs font-bold p-3 rounded flex items-start gap-2 mb-4">
          <CreditCard className="w-5 h-5 shrink-0" />
          <p>Hasta 6 cuotas sin intereses con BCP, BBVA y Diners</p>
        </div>

        <div className="flex items-start gap-2 text-sm text-gray-800 mb-6">
          <Calendar className="w-5 h-5 shrink-0" />
          <div>
            <p className="font-bold text-[#00A650]">Llega en 5 a 10 días hábiles</p>
            <p className="text-xs text-gray-500 mt-0.5">con envío <span className="text-orange-500 font-bold italic">Express</span></p>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-5">
          <span className="text-sm font-medium">Cantidad</span>
          <select 
            className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none"
            value={cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}
          >
            {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <button onClick={onComprar} className="w-full py-3 bg-white border border-[#FF3C3C] text-[#FF3C3C] font-medium rounded hover:bg-red-50 transition">
            Agregar al carrito
          </button>
          <button className="w-full py-3 bg-[#FF3C3C] border border-[#FF3C3C] text-white font-medium rounded hover:bg-[#e53030] transition">
            Comprar
          </button>
        </div>
      </div>
      
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
        <p className="text-sm font-bold mb-3">Medios de pago</p>
        <div className="flex justify-center gap-2 flex-wrap opacity-60 grayscale mb-2">
          <span className="font-bold text-xs">VISA</span>
          <span className="font-bold text-xs">Mastercard</span>
          <span className="font-bold text-xs">AMEX</span>
        </div>
        <button className="text-xs text-blue-600 hover:underline">Ver todos los medios de pago</button>
      </div>
    </div>
  );
}