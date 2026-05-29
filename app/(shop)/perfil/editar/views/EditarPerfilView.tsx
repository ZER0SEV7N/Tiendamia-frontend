"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export default function EditarPerfilView() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    correo: "",
    telefono: "",
    cambiarPassword: false,
  });

  useEffect(() => {
    import('@/lib/user').then(({ getProfile }) => {
      getProfile().then((u) => {
        setFormData({ 
          nombres: u.nombres || '', 
          apellidos: u.apellidos || '', 
          correo: u.correo || '', 
          telefono: u.telefono || '',
          cambiarPassword: false 
        });
      }).catch(() => {});
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: any = { nombres: formData.nombres, apellidos: formData.apellidos, telefono: formData.telefono };
    if (formData.cambiarPassword) {
      const nueva = window.prompt('Introduce la nueva contraseña:');
      if (nueva) payload.password = nueva;
    }

    import('@/lib/user').then(({ updateProfile }) => {
      updateProfile(payload).then(() => router.push('/perfil'));
    });
  };

  return (
    <div className="w-full max-w-4xl font-sans space-y-6 pl-2 animate-fade-in">
      
      {/* Botón Atrás */}
      <button
        onClick={() => router.push("/perfil")}
        className="flex items-center gap-2 text-sm font-semibold text-neutral-800 hover:text-black transition-colors bg-transparent border-none cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
        <span>Atrás</span>
      </button>

      {/* Título de la Sección */}
      <h1 className="text-3xl font-medium text-[#333333] tracking-tight">
        Editar información de la cuenta
      </h1>

      {/* Formulario Estructurado */}
      <form onSubmit={handleSubmit} className="space-y-6 pt-2">
        
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-[#333333]">
            Titular de la compra
          </h2>

          {/* Fila Grid para Nombre y Apellido */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-700">
                Nombre/s <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                value={formData.nombres}
                onChange={(e) => setFormData({ ...formData, nombres: e.target.value })}
                className="h-12 border-neutral-300 focus-visible:ring-neutral-400 bg-white rounded-md text-neutral-800"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-700">
                Apellido/s <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                value={formData.apellidos}
                onChange={(e) => setFormData({ ...formData, apellidos: e.target.value })}
                className="h-12 border-neutral-300 focus-visible:ring-neutral-400 bg-white rounded-md text-neutral-800"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-700">
              Teléfono
            </label>
            <Input
              type="text"
              value={formData.telefono}
              onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
              className="h-12 border-neutral-300 focus-visible:ring-neutral-400 bg-white rounded-md text-neutral-800"
            />
          </div>
        </div>

        {/* Campo de Email Estático / Lectura */}
        <div className="space-y-1">
          <p className="text-sm font-medium text-neutral-500">Email</p>
          <p className="text-[15px] font-normal text-neutral-800">
            {formData.correo}
          </p>
        </div>

        {/* Checkbox Cambiar Contraseña */}
        <div className="flex items-center space-x-3 pt-2">
          <Checkbox
            id="cambiarPassword"
            checked={formData.cambiarPassword}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, cambiarPassword: !!checked })
            }
            className="w-5 h-5 border-neutral-400 data-[state=checked]:bg-neutral-800 data-[state=checked]:border-neutral-800"
          />
          <label
            htmlFor="cambiarPassword"
            className="text-[15px] font-medium text-neutral-700 cursor-pointer select-none"
          >
            Cambiar contraseña de la cuenta
          </label>
        </div>

        {/* Botón de Guardar Cambios Exacto */}
        <div className="pt-4">
          <Button
            type="submit"
            className="bg-[#FF3C3C] hover:bg-red-600 text-white font-bold px-8 h-12 rounded-md text-base transition-colors shadow-sm"
          >
            Guardar cambios
          </Button>
        </div>

      </form>
    </div>
  );
}