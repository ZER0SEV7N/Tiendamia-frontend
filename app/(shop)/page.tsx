import { ProductCard } from "@/components/public/products/ProductCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Link from "next/link";
import { Menu } from "lucide-react";

const ofertas = [
  { id: "1", titulo: "Lattafa Khamrah - Vainilla, Especia Caliente, Ámbar, Canela...", imagen: "https://m.media-amazon.com/images/I/61k3tJ7X41L._SL1500_.jpg", precioOriginal: 145.33, precioDescuento: 100.23, porcentajeDescuento: 31 },
  { id: "2", titulo: "Chaqueta de lluvia Columbia Men's Glennaker Lake II", imagen: "https://m.media-amazon.com/images/I/81PjP0Q+WTL._AC_UX569_.jpg", precioOriginal: 261.12, precioDescuento: 104.63, porcentajeDescuento: 60 },
  { id: "3", titulo: "Bose QuietComfort Headphones - Auriculares Bluetooth Inalám...", imagen: "https://m.media-amazon.com/images/I/51r26t2jKQL._AC_SL1500_.jpg", precioOriginal: 1339.17, precioDescuento: 801.97, porcentajeDescuento: 40 },
  { id: "4", titulo: "Zapatillas de entrenamiento/para trabajo Nike Air Monarch IV...", imagen: "https://m.media-amazon.com/images/I/71wLpW15QyL._AC_UY575_.jpg", precioOriginal: 317.08, precioDescuento: 253.66, porcentajeDescuento: 20 },
  { id: "5", titulo: "Ultimate Ears WONDERBOOM 4 Portable Waterproof Bluetooth Spe...", imagen: "https://m.media-amazon.com/images/I/81xU21w83aL._AC_SL1500_.jpg", precioOriginal: 373.00, precioDescuento: 261.08, porcentajeDescuento: 30 },
  { id: "6", titulo: "Apple AirPods Pro (2nd Generation) Wireless Ear Buds", imagen: "https://m.media-amazon.com/images/I/61SUj2aKoEL._AC_SL1500_.jpg", precioOriginal: 999.00, precioDescuento: 749.00, porcentajeDescuento: 25 },
];

function Home() {
  return ( 
    <div className="min-h-screen bg-[#f5f5f5] pb-10">
      {/* Navbar */}
      <div className="bg-[#FF3C3C] border-t border-red-500 text-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 flex items-center text-[13px] font-bold overflow-x-auto no-scrollbar">
          <button className="flex items-center gap-1 py-3 pr-6 hover:text-red-100 transition whitespace-nowrap">
            <Menu className="w-4 h-4" /> Todas las Categorías
          </button>
            <div className="flex items-center gap-6 whitespace-nowrap">
              <Link href="#" className="py-3 hover:text-red-100 flex items-center gap-1">Ofertas del día <span className="bg-yellow-400 text-black text-[9px] px-1.5 py-0.5 rounded-sm">NUEVO</span></Link>
              <Link href="#" className="py-3 hover:text-red-100">Lo más vendido</Link>
              <Link href="#" className="py-3 hover:text-red-100">Outlet</Link>
              <Link href="#" className="py-3 hover:text-red-100">Mis pedidos</Link>
              <Link href="#" className="py-3 hover:text-red-100 flex items-center gap-1">Invita y Gana <span className="bg-yellow-400 text-black text-[9px] px-1.5 py-0.5 rounded-sm">NUEVO</span></Link>
            </div>
        </div>
      </div>
      
        <main className="max-w-6xl mx-auto px-4 mt-6 space-y-10">
          {/* Banner principal con imagen y texto promocional */}
          <div className="w-full bg-linear-to-r from-purple-800 to-purple-600 rounded-lg h-64 md:h-80 flex items-center justify-center text-white text-3xl font-black shadow-md">
             [Banner Principal Zapatillas]
          </div>
          <div className="w-full bg-indigo-900 rounded-lg h-16 flex items-center justify-center text-white font-bold shadow-md">
            [Banner Paga con tu tarjeta 6x]
          </div>

          {/* Seccion ofertas del dia  */}
          <section className="bg-[#cc0000] rounded-lg p-6 shadow-md">
            {/* Cabecera */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div className="flex items-center gap-4">
                <h2 className="text-white text-3xl font-bold tracking-tight">Ofertas del día</h2>
                <button className="bg-[#ff4444] text-white border border-[#ff6666] text-sm px-4 py-1.5 rounded hover:bg-[#ff5555] transition">
                  Ver más
                </button>
              </div>  

              {/* Contador Visual (Estático por ahora) */}
              <div className="flex items-center gap-3">
                <span className="text-white text-sm font-medium">Finalizan en:</span>
                <div className="flex gap-2 text-center">
                  <div className="bg-white text-black rounded p-1.5 min-w-[3rem]">
                    <span className="block font-bold text-xl leading-none">11</span>
                    <span className="text-[10px] uppercase font-semibold">Horas</span>
                  </div>
                  <div className="bg-white text-black rounded p-1.5 min-w-[3rem]">
                    <span className="block font-bold text-xl leading-none">40</span>
                    <span className="text-[10px] uppercase font-semibold">Minutos</span>
                  </div>
                  <div className="bg-white text-black rounded p-1.5 min-w-[3rem]">
                    <span className="block font-bold text-xl leading-none">31</span>
                    <span className="text-[10px] uppercase font-semibold">Segundos</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Carrusel de Productos */}
            <Carousel 
               opts={{
                align: "start",
                loop: false,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:ml-4">
                {ofertas.map((producto, index) => (
                  // CAMBIO AQUÍ: Agregamos basis- para definir cuántos mostrar
                  <CarouselItem 
                    key={producto.id} 
                    className="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 pl-2 md:pl-4"
                  >
                    <ProductCard
                      id={producto.id}
                      titulo={producto.titulo}
                      imagen={producto.imagen}
                      precioOriginal={producto.precioOriginal}
                      precioDescuento={producto.precioDescuento}
                      porcentajeDescuento={producto.porcentajeDescuento}
                      prioridad={index < 4}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex -left-4 bg-white/90 hover:bg-white text-black border-none shadow-lg" />
              <CarouselNext className="hidden md:flex -right-4 bg-white/90 hover:bg-white text-black border-none shadow-lg" />
            </Carousel>
          </section>
        </main> 
    </div>
  );
}

export default Home;
