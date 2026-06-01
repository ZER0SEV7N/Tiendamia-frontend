"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import FormularioEditarView from "./components/FormularioEditarView";
import { getProfile, UserProfile } from "@/lib/user";

export default function PerfilPage() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [usuario, setUsuario] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getProfile()
      .then((data) => setUsuario(data))
      .catch((err) => {
        console.error("Error cargando perfil:", err);
        setError("No se pudo cargar tu perfil. Vuelve a intentarlo más tarde.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (mostrarFormulario) {
    return <FormularioEditarView onRegresar={() => setMostrarFormulario(false)} />;
  }

  if (loading) {
    return (
      <div className="space-y-6 w-full font-sans pl-2 animate-fade-in">
        <h1 className="text-3xl font-medium text-[#333333] tracking-tight">Mi cuenta</h1>
        <div className="space-y-4 pt-4">
          <div className="h-8 w-52 rounded-lg bg-slate-200 animate-pulse" />
          <div className="h-6 w-64 rounded-lg bg-slate-200 animate-pulse" />
          <div className="h-6 w-56 rounded-lg bg-slate-200 animate-pulse" />
        </div>
      </div>
    );
  }

  const nombreCompleto = usuario ? `${usuario.nombres || ""} ${usuario.apellidos || ""}`.trim() : "Usuario desconocido";
  const direcciones = usuario?.direcciones || [];

  return (
    <div className="space-y-6 w-full font-sans pl-2 animate-fade-in">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-medium text-[#333333] tracking-tight">Mi cuenta</h1>
          <p className="text-sm text-neutral-500 mt-1">Aquí puedes ver tu información real desde la base de datos.</p>
        </div>
        <Button
          onClick={() => setMostrarFormulario(true)}
          className="bg-[#FF3C3C] hover:bg-red-600 text-white font-bold px-6 h-11 rounded-md text-base transition-colors"
        >
          Editar perfil
        </Button>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="space-y-5 text-sm text-neutral-600">
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-neutral-400">Titular de la cuenta</p>
            <p className="mt-2 text-base font-semibold text-neutral-900">{nombreCompleto}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-neutral-400">Correo</p>
            <p className="mt-2 text-base font-semibold text-neutral-900">{usuario?.correo || "No registrado"}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-neutral-400">Teléfono</p>
            <p className="mt-2 text-base font-semibold text-neutral-900">{usuario?.telefono || "No registrado"}</p>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="space-y-4 text-sm text-neutral-600">
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-neutral-400">Direcciones registradas</p>
          </div>
          {direcciones.length > 0 ? (
            <div className="space-y-3">
              {direcciones.map((direccion: any) => (
                <div key={direccion.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-base font-semibold text-neutral-900">{direccion.direccion}</p>
                  <p className="text-sm text-neutral-600">
                    {direccion.departamento || ""} / {direccion.provincia || ""} / {direccion.distrito || ""}
                  </p>
                  {direccion.referencia && (
                    <p className="text-sm text-neutral-600">Ref.: {direccion.referencia}</p>
                  )}
                  <p className="text-xs uppercase tracking-[0.12em] text-neutral-400 mt-2">
                    {direccion.es_principal ? "Dirección principal" : "Dirección secundaria"}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-neutral-500">No tiene direcciones registradas en la base de datos.</p>
          )}
        </div>
      </div>
    </div>
  );
}
