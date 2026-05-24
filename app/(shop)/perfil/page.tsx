"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import FormularioEditarView from "./components/FormularioEditarView";

export default function PerfilPage() {
  {/* Estado controlador: iniciamos en true para que aparezca la vista del formulario directamente */}
  const [mostrarFormulario, setMostrarFormulario] = useState(true);

  const usuario = {
    nombreCompleto: "Edson Leonardo Rojas Cabia",
    email: "edsonleonardorojascabia@gmail.com"
  };

  {/* RENDER CONDICIONAL: Si está activo, renderiza tu componente modular */}
  if (mostrarFormulario) {
    return (
      <FormularioEditarView onRegresar={() => setMostrarFormulario(false)} />
    );
  }

  {/* Vista de lectura base secundaria (si se presiona "Atrás") */}
  return (
    <div className="space-y-6 w-full font-sans pl-2 animate-fade-in">
      <h1 className="text-3xl font-medium text-[#333333] tracking-tight">
        Mi cuenta
      </h1>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-[#333333]">
          Información de la cuenta
        </h3>

        <div className="space-y-0.5">
          <p className="text-[15px] font-bold text-[#333333]">Titular de la cuenta</p>
          <p className="text-[15px] text-[#555555] font-normal">{usuario.nombreCompleto}</p>
          <p className="text-[15px] text-[#555555] font-normal">{usuario.email}</p>
        </div>

        <div className="pt-2">
          <Button 
            onClick={() => setMostrarFormulario(true)} 
            variant="outline" 
            className="border-[#FF3C3C] text-[#FF3C3C] hover:bg-red-50 font-normal px-7 h-10 rounded-md text-base transition-colors"
          >
            Editar
          </Button>
        </div>
      </div>
    </div>
  );
}