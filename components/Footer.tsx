import Link from "next/link";
import { Mail, Check } from "lucide-react";
import {
  SiFacebook,
  SiInstagram,
  SiX,
  SiYoutube,
} from "@icons-pack/react-simple-icons";
import { Button } from "./ui/button";

function Footer() {
  return (
    <footer className="w-full bg-[#f4f4f4] text-[#666666] pt-12 pb-6 border-t border-gray-200 font-sans relative">
      {/* Contenedor Principal con fondo blanco para la sección superior interna */}
      <div className="w-full bg-white pb-12">
        <div className="max-w-300 mx-auto px-4 md:px-6 space-y-12">
          {/* SECTION 1: Carrusel / Título de Marcas */}
          <div className="text-center space-y-6 pt-4">
            <h3 className="text-xl font-bold text-[#333333] tracking-tight">
              Las marcas más buscadas
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-70 grayscale">
              <span className="font-bold text-2xl tracking-tighter text-black">
                ‹ ANS
              </span>
              <span className="font-semibold text-2xl text-black">adidas</span>
              <span className="font-bold text-2xl text-black">Apple</span>
              <span className="font-medium text-2xl text-black">asics</span>
              <span className="font-bold text-2xl text-black">Canon</span>
              <span className="font-normal text-2xl text-black">Carters</span>
              <span className="font-black text-xl text-black">CASIO</span>
              <span className="font-extrabold text-2xl text-black">CAT</span>
              <span className="font-medium text-xl text-black">Columbia ›</span>
            </div>
          </div>

          {/* SECTION 2: Newsletter y Redes Sociales */}
          <div className="bg-[#f8f9fa] border border-[#e9ecef] p-8 rounded-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Formulario de Suscripción */}
            <div className="space-y-3 lg:col-span-7">
              <p className="text-[15px] text-[#333333] font-bold">
                ¡Suscríbete a nuestro Newsletter!
              </p>
              <div className="w-full max-w-xl">
                <form className="flex items-start w-full gap-0">
                  <div className="flex-1 flex flex-col">
                    <input
                      type="email"
                      placeholder="¡Ingresa tu e-mail!"
                      defaultValue="¡Ingresa tu e-mail!"
                      className="w-full px-4 py-3 text-sm border border-[#ff0000] rounded-l-md focus:outline-none bg-white text-gray-400"
                    />
                    <span className="text-xs text-[#ff0000] mt-1 font-medium flex items-center gap-1">
                      🛈 Este campo es obligatorio.
                    </span>
                  </div>
                  <Button
                    type="submit"
                    className="flex items-center justify-center gap-2 px-6 py-3.25 bg-[#ff3b30] hover:bg-[#e0241b] text-white font-bold text-sm rounded-r-md transition-colors h-11.5"
                  >
                    <Mail className="w-5 h-5" />
                    Recibir ofertas
                  </Button>
                </form>
              </div>
            </div>

            {/* Redes Sociales */}
            <div className="space-y-4 lg:col-span-5 lg:pl-8">
              <p className="text-[15px] text-[#333333] font-bold">
                Síguenos en nuestras redes
              </p>
              <div className="flex gap-3">
                <Link
                  href="#"
                  className="p-3 bg-[#1877F2] text-white rounded-full hover:opacity-90 transition-opacity flex items-center justify-center"
                >
                  <SiFacebook className="w-5 h-5" />
                </Link>

                <Link
                  href="#"
                  className="p-3 bg-linear-to-tr from-[#f91c00] via-[#e1306c] to-[#bc18d4] text-white rounded-full hover:opacity-90 transition-opacity flex items-center justify-center"
                >
                  <SiInstagram className="w-5 h-5" />
                </Link>

                <Link
                  href="#"
                  className="p-3 bg-[#1DA1F2] text-white rounded-full hover:opacity-90 transition-opacity flex items-center justify-center"
                >
                  <SiX className="w-5 h-5" />
                </Link>

                <Link
                  href="#"
                  className="p-3 bg-[#FF0000] text-white rounded-full hover:opacity-90 transition-opacity flex items-center justify-center"
                >
                  <SiYoutube className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>

          {/* SECTION 3: Enlaces de Información */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 pt-4 text-[13px]">
            {/* Col 1 */}
            <div className="space-y-3">
              <h4 className="font-bold text-[#333333] text-[14px]">
                Información útil
              </h4>
              <ul className="space-y-2 text-[#444444]">
                <li className="hover:text-black cursor-pointer">
                  ¿Qué es Tiendamia?
                </li>
                <li className="hover:text-black cursor-pointer">
                  Vender en Tiendamia
                </li>
                <li className="hover:text-black cursor-pointer">Blog</li>
                <li className="hover:text-black cursor-pointer">
                  Programa de afiliados
                </li>
                <li className="hover:text-black cursor-pointer text-[#0076ff]">
                  Centro de ayuda en línea
                </li>
                <li className="hover:text-black cursor-pointer pt-2">
                  Medios de pago
                </li>
                <li className="hover:text-black cursor-pointer">
                  Términos y condiciones
                </li>
                <li className="hover:text-black cursor-pointer">
                  Información de aduanas
                </li>
                <li className="hover:text-black cursor-pointer">
                  Políticas de devolución de productos
                </li>
                <li className="hover:text-black cursor-pointer">Marcas</li>
              </ul>
            </div>

            {/* Col 2 */}
            <div className="space-y-3">
              <h4 className="font-bold text-[#333333] text-[14px]">
                Centro de ayuda
              </h4>
              <ul className="space-y-2 text-[#444444]">
                <li className="hover:text-black cursor-pointer">
                  Preguntas frecuentes
                </li>
                <li className="hover:text-black cursor-pointer">
                  Propiedad intelectual
                </li>
                <li className="hover:text-black cursor-pointer">
                  Política de calidad
                </li>
                <li className="font-bold text-[#333333] text-[14px] pt-2">
                  (+51) 641 9422
                </li>
                <li className="text-gray-400 text-xs leading-relaxed">
                  De Lunes a Sábados en el horario de 07:00hs a 14:00hs
                </li>
              </ul>
            </div>

            {/* Col 3 */}
            <div className="space-y-3">
              <h4 className="font-bold text-[#333333] text-[14px]">
                Todo en un solo lugar
              </h4>
              <ul className="space-y-2 text-[#444444]">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600 stroke-3" /> Envío
                  asegurado
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600 stroke-3" /> Tienes{" "}
                  <span className="font-bold">Garantía de entrega</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600 stroke-3" />{" "}
                  Productos originales
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600 stroke-3" /> El mejor
                  precio
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600 stroke-3" /> Comprá
                  fácil, rápido y seguro
                </li>
              </ul>
            </div>

            {/* Col 4 */}
            <div className="space-y-3">
              <h4 className="font-bold text-[#333333] text-[14px]">
                Comprá con tranquilidad
              </h4>
              <p className="text-[#555555] leading-relaxed">
                Tiendamia cuenta con los certificados verificados para
                garantizar la seguridad de la compra.
              </p>
              <div className="pt-2">
                {/* Badge de simulación Trust Guard */}
                <div className="border border-gray-300 px-2 py-1 inline-block text-[10px] font-mono tracking-tighter text-gray-500 rounded bg-gray-50">
                  <span className="text-green-600 font-bold">TRUST</span>GUARD
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Franja Inferior Gris Ocurscuro/Claro para Métodos de Pago y Derechos */}
      <div className="w-full bg-[#f4f4f4] pt-8 pb-12">
        <div className="max-w-300 mx-auto px-4 md:px-6 space-y-6">
          <hr className="border-gray-300 my-4" />

          {/* SECTION 4: Métodos de Pago */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-[#333333]">Métodos de pago:</p>
            <div className="flex flex-wrap gap-2 items-center">
              {/* Tarjeta VISA */}
              <div className="bg-white border border-gray-200 px-3 py-1.5 rounded shadow-sm text-[11px] font-black text-blue-800 italic tracking-tighter">
                VISA
              </div>
              {/* Tarjeta Mastercard */}
              <div className="bg-white border border-gray-200 px-3 py-1.5 rounded shadow-sm text-[11px] font-bold text-red-500 flex items-center gap-0.5">
                <span className="text-orange-400">●</span>mastercard
              </div>
              {/* Tarjeta AMEX */}
              <div className="bg-sky-50 border border-gray-200 px-3 py-1.5 rounded shadow-sm text-[10px] font-bold bg-sky-50 text-sky-700 border-sky-200">
                AMEX
              </div>
              {/* Tarjeta Diners Club */}
              <div className="bg-white border border-gray-200 px-3 py-1.5 rounded shadow-sm text-[10px] font-serif text-blue-900 font-bold">
                Diners Club
              </div>
              {/* Tarjeta Discover */}
              <div className="bg-white border border-gray-200 px-3 py-1.5 rounded shadow-sm text-[11px] font-bold text-orange-600 tracking-tight">
                DISCOVER
              </div>
              {/* Tarjeta PayPal */}
              <div className="bg-white border border-gray-200 px-3 py-1.5 rounded shadow-sm text-[11px] font-extrabold text-blue-700 italic">
                Pay<span className="text-sky-500">Pal</span>
              </div>
            </div>
          </div>

          {/* Derechos Reservados */}
          <div className="pt-4 text-left">
            <p className="text-[11px] text-[#888888] leading-relaxed">
              © 2014 - 2026 - Tiendamia - Todos los derechos reservados - Todas
              las marcas son propiedad de sus respectivos dueños
            </p>
          </div>
        </div>
      </div>

      {/* Botón flotante "Ayuda en línea" fijado exactamente como en la imagen */}
      <div className="fixed bottom-0 right-4 z-50">
        <button className="bg-[#222222] text-white px-5 py-2.5 rounded-t-lg text-xs font-bold shadow-lg hover:bg-black transition-colors border-t border-x border-gray-800">
          Ayuda en línea
        </button>
      </div>
    </footer>
  );
}

export default Footer;
