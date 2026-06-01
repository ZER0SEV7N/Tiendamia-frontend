//app/(shop)/producto/components/productoInfo.tsx
"use client";

import Link from "next/link";
import { ChevronLeft, ShieldCheck, RotateCcw, CreditCard, Truck, HeadphonesIcon } from "lucide-react";
import { useProducts } from "../hooks/useProducts";
import { ProductGallery } from "../components/productGallery";
import { ProductInfo } from "../components/productInfo";
import { ProductBuyBox } from "../components/productBuyBox";

export default function ProductPage({ params }: { params: { slug: string } }) {
    const {
        producto,
        imagenActiva,
        setImagenActiva,
        atributosSeleccionados,
        seleccionarAtributo,
        cantidad,
        setCantidad,
        handleAgregarAlCarrito,
    } = useProducts(params.slug);

    return (
    <div className="max-w-6xl mx-auto px-4 py-6 text-[#333333]">
      <Link href="/" className="inline-flex items-center gap-1 text-sm font-medium hover:underline mb-6">
        <ChevronLeft className="w-4 h-4" /> Atrás
      </Link>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="w-full lg:w-[45%]">
          <ProductGallery 
            imagenes={producto.imagenes} 
            titulo={producto.titulo} 
            imagenActiva={imagenActiva} 
            setImagenActiva={setImagenActiva} 
            sku={producto.id} 
          />
        </div>

        <div className="w-full lg:w-[55%] flex flex-col lg:flex-row gap-8">
          <ProductInfo 
            marca={producto.marca} 
            titulo={producto.titulo} 
            atributos={producto.atributos} 
            atributosSeleccionados={atributosSeleccionados} 
            seleccionarAtributo={seleccionarAtributo} 
            detalles={producto.detalles} 
          />
          <ProductBuyBox 
            precioOriginal={producto.precioOriginal} 
            precioDescuento={producto.precioDescuento} 
            descuento={producto.descuento} 
            cantidad={cantidad} 
            setCantidad={setCantidad} 
            onComprar={handleAgregarAlCarrito} 
          />
        </div>
      </div>

      <hr className="my-10 border-gray-200" />

      <section className="max-w-4xl">
        <h2 className="text-2xl font-bold mb-4">Conoce más detalles</h2>
        <p className="text-gray-700 leading-relaxed">{producto.descripcion}</p>
      </section>

      <hr className="my-10 border-gray-200" />

      <section>
        <div className="flex items-center gap-2 mb-6">
          <ShieldCheck className="w-6 h-6 text-black" />
          <div>
            <h3 className="font-bold text-lg leading-tight">Compra protegida</h3>
            <p className="text-sm text-gray-500">Disfruta de una experiencia de compra segura y confiable</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <TrustBadge icon={<ShieldCheck />} title="¿Qué es Tiendamia?" sub="Fácil, rápido y seguro" link="Cómo comprar" />
          <TrustBadge icon={<ShieldCheck />} title="Garantía de entrega" sub="100% garantizada" link="Saber más" />
          <TrustBadge icon={<RotateCcw />} title="Devoluciones" sub="Primeros 7 días" link="Saber más" />
          <TrustBadge icon={<CreditCard />} title="Pago 100% seguro" sub="Todas las tarjetas" link="Ver medios" />
          <TrustBadge icon={<Truck />} title="Info de Aduanas" sub="Para tu compra" link="Saber más" />
          <TrustBadge icon={<HeadphonesIcon />} title="Ayuda y atención" sub="Centro de ayuda" link="Contáctanos" />
        </div>
      </section>
    </div>
  );
}

// Sub-componente extraído (puede ir en components/public/ si se reutiliza)
function TrustBadge({ icon, title, sub, link }: { icon: React.ReactNode, title: string, sub: string, link: string }) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex flex-col items-center text-center justify-between h-full hover:shadow-sm transition-shadow cursor-pointer group">
      <div className="text-gray-800 mb-3 flex items-center justify-center h-10 w-10">{icon}</div>
      <div>
        <p className="font-bold text-sm text-gray-900 leading-tight mb-1">{title}</p>
        <p className="text-xs text-gray-500 mb-3">{sub}</p>
      </div>
      <span className="text-xs text-blue-600 group-hover:underline font-medium mt-auto border-t border-gray-200 pt-2 w-full">{link}</span>
    </div>
  );
}