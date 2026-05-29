"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, HelpCircle, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import api from "@/lib/api";
import { DireccionFormData } from "../../../types/direccion";
import { LocationData } from "../../services/nominatimService";
import dynamic from "next/dynamic";

// CARGA ASÍNCRONA CON TIPADO SEGURO: Evita errores de sobrecarga en TypeScript y bloqueos SSR
const FreeAddressMap = dynamic<{
  onLocationResolved: (datos: LocationData) => void;
  onError?: (mensaje: string) => void;
}>(
  () => import("../../components/FreeAddressMap"),
  { 
    ssr: false, 
    loading: () => (
      <div className="h-64 bg-neutral-100 flex items-center justify-center border rounded-lg animate-pulse text-neutral-400 text-sm font-medium">
        Cargando interfaz de mapa interactivo...
      </div>
    ) 
  }
);

export default function NuevaDireccionView() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<any>(null);

  const [formData, setFormData] = useState<DireccionFormData>({
    nombreCompleto: "",
    apellidoCompleto: "",
    tipoDocumento: "",
    documento: "",
    mayorEdad: false,
    direccion: "",
    referencia: "",
    departamento: "",
    provincia: "",
    distrito: "",
    codigoPostal: "",
    telefono: "",
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await api.get("/usuario/me");
        setUserInfo(response.data);
        setFormData(prev => ({
          ...prev,
          nombreCompleto: response.data.nombres || "",
          apellidoCompleto: response.data.apellidos || "",
          telefono: response.data.telefono?.replace(/\D/g, "") || "",
        }));
      } catch (err: any) {
        console.error("Error cargando información del usuario:", err);
        setError("No se pudo cargar tu información");
      }
    };
    fetchUserInfo();
  }, []);

  // ACCIÓN DEFINITIVA: Solo se dispara cuando se selecciona una dirección real o se hace clic en el mapa
  const handleMapLocationResolved = (datos: LocationData) => {
    setFormData(prev => ({
      ...prev,
      direccion: datos.direccion,
      departamento: datos.departamento,
      provincia: datos.provincia,
      distrito: datos.distrito,
      codigoPostal: datos.codigoPostal
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!formData.direccion || !formData.departamento || !formData.provincia || !formData.distrito) {
        setError("Por favor completa todos los campos requeridos");
        setLoading(false);
        return;
      }

      const direccionData = {
        direccion: formData.direccion,
        distrito: formData.distrito,
        provincia: formData.provincia,
        departamento: formData.departamento,
        referencia: formData.referencia || "",
        es_principal: false,
      };

      const response = await api.post("/usuario/direcciones", direccionData);
      console.log("Dirección guardada con éxito:", response.data);
      router.push("/perfil/direcciones");
    } catch (err: any) {
      console.error("Error guardando dirección:", err);
      setError(err.response?.data?.error || "Error al guardar la dirección. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl font-sans space-y-6 pl-2 pb-10 animate-in fade-in-50 duration-500">
      
      {/* Botón Atrás */}
      <button
        type="button"
        onClick={() => router.push("/perfil/direcciones")}
        className="flex items-center gap-2 text-sm font-semibold text-neutral-800 hover:text-black transition-colors bg-transparent border-none cursor-pointer outline-none hover:translate-x-[-4px] duration-200"
      >
        <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
        <span>Atrás</span>
      </button>

      {/* Título */}
      <h1 className="text-3xl font-normal text-[#333333] tracking-tight">
        Agregar nueva dirección
      </h1>

      {/* Alerta de Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 animate-in shake">
          <p className="text-red-700 text-sm font-medium">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8 pt-2">
        
        {/* TITULAR DE LA COMPRA */}
        <div className="space-y-5">
          <h2 className="text-lg font-bold text-[#333333]">Titular de la compra</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-700 flex items-center gap-1 select-none">
                Nombre completo <span className="text-red-500">*</span>
                <HelpCircle className="w-4 h-4 text-blue-500 stroke-[2.5]" />
              </label>
              <Input
                type="text"
                value={formData.nombreCompleto}
                onChange={(e) => setFormData({ ...formData, nombreCompleto: e.target.value })}
                className="h-12 border-neutral-300 focus-visible:ring-neutral-400 bg-white rounded-md text-neutral-800 transition-all duration-200"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-700 select-none">
                Apellido completo <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                value={formData.apellidoCompleto}
                onChange={(e) => setFormData({ ...formData, apellidoCompleto: e.target.value })}
                className="h-12 border-neutral-300 focus-visible:ring-neutral-400 bg-white rounded-md text-neutral-800 transition-all duration-200"
                required
              />
            </div>
            
            {/* ... Tus inputs originales de documento se mantienen aquí ... */}
          </div>

          <div className="flex items-center space-x-3 pt-1">
            <Checkbox
              id="mayorEdad"
              checked={formData.mayorEdad}
              onCheckedChange={(checked) => setFormData({ ...formData, mayorEdad: !!checked })}
              className="w-5 h-5 border-neutral-400 data-[state=checked]:bg-neutral-800 data-[state=checked]:border-neutral-800"
              required
            />
            <label htmlFor="mayorEdad" className="text-sm font-medium text-neutral-700 cursor-pointer select-none">
              Soy mayor de 18 años <span className="text-red-500">*</span>
            </label>
          </div>
        </div>

        {/* INTERFAZ DEL MAPA (Los inputs no cambian mientras se escribe en el buscador del mapa) */}
        <FreeAddressMap 
          onLocationResolved={handleMapLocationResolved} 
          onError={(msg) => setError(msg)} 
        />

        {/* DIRECCIÓN DE ENVÍO A PERÚ */}
        <div className="space-y-5">
          <h2 className="text-lg font-bold text-[#333333]">Dirección de envío a Perú</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-700 select-none">
                Dirección <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                placeholder="Ingrese su dirección completa"
                value={formData.direccion}
                onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                className="h-12 border-neutral-300 focus-visible:ring-neutral-400 bg-white rounded-md text-neutral-800"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-600 select-none">
                Referencia de entrega
              </label>
              <Input
                type="text"
                placeholder="Indique cómo ubicar la casa"
                value={formData.referencia}
                onChange={(e) => setFormData({ ...formData, referencia: e.target.value })}
                className="h-12 border-neutral-300 focus-visible:ring-neutral-400 bg-white rounded-md text-neutral-800"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-700 select-none">
                Región/Departamento <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                placeholder="Ej: Lima"
                value={formData.departamento}
                onChange={(e) => setFormData({ ...formData, departamento: e.target.value })}
                className="h-12 border-neutral-300 focus-visible:ring-neutral-400 bg-neutral-50 rounded-md text-neutral-800 font-medium"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-700 select-none">
                Provincia <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                placeholder="Ej: Lima"
                value={formData.provincia}
                onChange={(e) => setFormData({ ...formData, provincia: e.target.value })}
                className="h-12 border-neutral-300 focus-visible:ring-neutral-400 bg-neutral-50 rounded-md text-neutral-800 font-medium"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-700 select-none">
                Distrito <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                placeholder="Ej: Miraflores"
                value={formData.distrito}
                onChange={(e) => setFormData({ ...formData, distrito: e.target.value })}
                className="h-12 border-neutral-300 focus-visible:ring-neutral-400 bg-neutral-50 rounded-md text-neutral-800 font-medium"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-700 select-none">
                Código postal <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                placeholder="Ej: 11516"
                value={formData.codigoPostal}
                onChange={(e) => setFormData({ ...formData, codigoPostal: e.target.value })}
                className="h-12 border-neutral-300 focus-visible:ring-neutral-400 bg-white rounded-md text-neutral-800"
                required
              />
            </div>

            {/* Teléfono / Celular */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-700 flex items-center gap-1 select-none">
                Teléfono/Celular <span className="text-red-500">*</span>
                <HelpCircle className="w-4 h-4 text-blue-500 stroke-[2.5]" />
              </label>
              <div className="flex rounded-md border border-neutral-300 overflow-hidden bg-white focus-within:ring-2 focus-within:ring-neutral-400 focus-within:border-transparent transition-all">
                <div className="flex items-center gap-2 px-3 bg-neutral-50 border-r border-neutral-200 select-none text-neutral-600 font-medium text-sm">
                  <span className="text-base">🇵🇪</span>
                  <span>+51</span>
                </div>
                <input
                  type="tel"
                  placeholder="912345678"
                  value={formData.telefono}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value.replace(/\D/g, "") })}
                  className="w-full h-11 px-3 bg-transparent text-sm text-neutral-800 outline-none placeholder:text-neutral-400"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* BOTONERA ROJA */}
        <div className="pt-2 flex gap-3">
          <Button
            type="submit"
            disabled={loading}
            className="bg-[#FF3C3C] hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold px-10 h-12 rounded-md text-base transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                Guardando...
              </>
            ) : (
              "Guardar"
            )}
          </Button>
          <Button
            type="button"
            onClick={() => router.push("/perfil/direcciones")}
            disabled={loading}
            className="bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 text-gray-800 font-bold px-10 h-12 rounded-md text-base transition-all duration-200"
          >
            Cancelar
          </Button>
        </div>

      </form>
    </div>
  );
}