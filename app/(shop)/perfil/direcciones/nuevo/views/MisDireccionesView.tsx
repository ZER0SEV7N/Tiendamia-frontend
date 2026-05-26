"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function NuevaDireccionView() {
  const router = useRouter();

  // Estado del formulario con datos iniciales basados en image_547c02.png
  const [formData, setFormData] = useState({
    nombreCompleto: "Edson Leonardo",
    apellidoCompleto: "Rojas Cabia",
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dirección registrada con éxito:", formData);
    // Te regresa automáticamente al listado de tus direcciones al guardar
    router.push("/perfil/direcciones");
  };

  return (
    <div className="w-full max-w-4xl font-sans space-y-6 pl-2 pb-10 animate-fade-in">
      
      {/* Botón Atrás */}
      <button
        type="button"
        onClick={() => router.push("/perfil/direcciones")}
        className="flex items-center gap-2 text-sm font-semibold text-neutral-800 hover:text-black transition-colors bg-transparent border-none cursor-pointer outline-none"
      >
        <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
        <span>Atrás</span>
      </button>

      {/* Título de la sección */}
      <h1 className="text-3xl font-normal text-[#333333] tracking-tight">
        Agregar nueva dirección
      </h1>

      <form onSubmit={handleSubmit} className="space-y-8 pt-2">
        
        {/* ================= TITULAR DE LA COMPRA ================= */}
        <div className="space-y-5">
          <h2 className="text-lg font-bold text-[#333333]">Titular de la compra</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            {/* Nombre */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-700 flex items-center gap-1 select-none">
                Nombre completo <span className="text-red-500">*</span>
                <HelpCircle className="w-4 h-4 text-blue-500 stroke-[2.5]" />
              </label>
              <Input
                type="text"
                value={formData.nombreCompleto}
                onChange={(e) => setFormData({ ...formData, nombreCompleto: e.target.value })}
                className="h-12 border-neutral-300 focus-visible:ring-neutral-400 bg-white rounded-md text-neutral-800"
                required
              />
            </div>

            {/* Apellido */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-700 select-none">
                Apellido completo <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                value={formData.apellidoCompleto}
                onChange={(e) => setFormData({ ...formData, apellidoCompleto: e.target.value })}
                className="h-12 border-neutral-300 focus-visible:ring-neutral-400 bg-white rounded-md text-neutral-800"
                required
              />
            </div>

            {/* Tipo de Documento */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-700 select-none">
                Tipo de documento <span className="text-red-500">*</span>
              </label>
              <Select 
                value={formData.tipoDocumento} 
                onValueChange={(val) => setFormData({ ...formData, tipoDocumento: val })}
              >
                <SelectTrigger className="h-12 border-neutral-300 text-neutral-500 bg-white">
                  <SelectValue placeholder="Seleccione el tipo de documento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DNI">DNI (Documento Nacional de Identidad)</SelectItem>
                  <SelectItem value="CE">Carnet de Extranjería</SelectItem>
                  <SelectItem value="RUC">RUC (Registro Único de Contribuyentes)</SelectItem>
                  <SelectItem value="PASAPORTE">Pasaporte</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Número de Documento */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-700 select-none">
                Documento <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                placeholder="Ej: 178598533"
                value={formData.documento}
                onChange={(e) => setFormData({ ...formData, documento: e.target.value })}
                className="h-12 border-neutral-300 focus-visible:ring-neutral-400 bg-white rounded-md text-neutral-800"
                required
              />
            </div>
          </div>

          {/* Checkbox de Mayoría de Edad */}
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


        <div className="space-y-5">
          <h2 className="text-lg font-bold text-[#333333]">Dirección de envío a Perú</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            {/* Dirección Completa */}
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

            {/* Referencia de Entrega */}
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
              <Select 
                value={formData.departamento} 
                onValueChange={(val) => setFormData({ ...formData, departamento: val, provincia: "", distrito: "" })}
              >
                <SelectTrigger className="h-12 border-neutral-300 text-neutral-500 bg-white">
                  <SelectValue placeholder="Seleccione una Región/Departamento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lima">Lima</SelectItem>
                  <SelectItem value="arequipa">Arequipa</SelectItem>
                  <SelectItem value="la-libertad">La Libertad</SelectItem>
                </SelectContent>
              </Select>
            </div>

           
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-700 select-none">
                Provincia <span className="text-red-500">*</span>
              </label>
              <Select 
                value={formData.provincia} 
                onValueChange={(val) => setFormData({ ...formData, provincia: val, distrito: "" })}
                disabled={!formData.departamento}
              >
                <SelectTrigger className="h-12 border-neutral-300 text-neutral-500 bg-white disabled:bg-neutral-50 disabled:text-neutral-400">
                  <SelectValue placeholder="Seleccione una provincia" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lima-prov">Lima</SelectItem>
                  <SelectItem value="cañete">Cañete</SelectItem>
                </SelectContent>
              </Select>
            </div>

            
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-700 select-none">
                Distrito <span className="text-red-500">*</span>
              </label>
              <Select 
                value={formData.distrito} 
                onValueChange={(val) => setFormData({ ...formData, distrito: val })}
                disabled={!formData.provincia}
              >
                <SelectTrigger className="h-12 border-neutral-300 text-neutral-500 bg-white disabled:bg-neutral-50 disabled:text-neutral-400">
                  <SelectValue placeholder="Seleccione un distrito" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sjl">San Juan de Lurigancho</SelectItem>
                  <SelectItem value="miraflores">Miraflores</SelectItem>
                  <SelectItem value="los-olivos">Los Olivos</SelectItem>
                </SelectContent>
              </Select>
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

            {/* Teléfono / Celular con el Prefijo Integrado */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-700 flex items-center gap-1 select-none">
                Teléfono/Celular <span className="text-red-500">*</span>
                <HelpCircle className="w-4 h-4 text-blue-500 stroke-[2.5]" />
              </label>
              
              <div className="flex rounded-md border border-neutral-300 overflow-hidden bg-white focus-within:ring-2 focus-within:ring-neutral-400 focus-within:border-transparent transition-all">
                {/* Prefijo estático Perú */}
                <div className="flex items-center gap-2 px-3 bg-neutral-50 border-r border-neutral-200 select-none text-neutral-600 font-medium text-sm">
                  <span className="text-base">🇵🇪</span>
                  <span>+51</span>
                </div>
                {/* Input de dígitos */}
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

        {/* Botón de Enviar Rojo */}
        <div className="pt-2">
          <Button
            type="submit"
            className="bg-[#FF3C3C] hover:bg-red-600 text-white font-bold px-10 h-12 rounded-md text-base transition-colors shadow-sm"
          >
            Guardar
          </Button>
        </div>

      </form>
    </div>
  );
}