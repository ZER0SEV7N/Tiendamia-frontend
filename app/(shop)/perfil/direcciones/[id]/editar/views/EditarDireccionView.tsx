"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { getAddressById, updateAddress } from "@/lib/user";
import { Direccion } from "@/app/(shop)/perfil/types/direccion";

export default function EditarDireccionView() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const [direccion, setDireccion] = useState<Direccion | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    async function loadAddress() {
      try {
        setLoading(true);
        const data = await getAddressById(id);
        setDireccion(data);
        setError(null);
      } catch (err: any) {
        console.error("Error cargando dirección:", err);
        setError("No se pudo cargar la dirección. Intenta de nuevo.");
      } finally {
        setLoading(false);
      }
    }

    loadAddress();
  }, [id]);

  const handleChange = (field: keyof Direccion, value: string | boolean) => {
    if (!direccion) return;
    setDireccion({ ...direccion, [field]: value } as Direccion);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!direccion) return;

    try {
      setSaving(true);
      await updateAddress(id, {
        direccion: direccion.direccion,
        referencia: direccion.referencia,
        departamento: direccion.departamento,
        provincia: direccion.provincia,
        distrito: direccion.distrito,
        es_principal: direccion.es_principal,
      });
      router.push("/perfil/direcciones");
    } catch (err: any) {
      console.error("Error actualizando dirección:", err);
      setError("No se pudo actualizar la dirección. Verifica los datos e intenta de nuevo.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full max-w-4xl font-sans pl-2 pb-10 animate-fade-in">
        <div className="space-y-6">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-800 hover:text-black"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
            Volver
          </button>
          <div className="space-y-4">
            {[1, 2].map((key) => (
              <div key={key} className="h-12 bg-slate-200 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!direccion) {
    return (
      <div className="w-full max-w-4xl font-sans pl-2 pb-10">
        <div className="space-y-4 text-neutral-700">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-800 hover:text-black"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
            Volver
          </button>
          <p className="text-base">No se encontró la dirección que intentas editar.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl font-sans space-y-6 pl-2 pb-10 animate-fade-in">
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-800 hover:text-black"
      >
        <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
        Volver
      </button>

      <h1 className="text-3xl font-medium text-[#333333] tracking-tight">Editar dirección</h1>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 pt-2">
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-700">Dirección</label>
            <Input
              type="text"
              value={direccion.direccion}
              onChange={(e) => handleChange("direccion", e.target.value)}
              className="h-12 border-neutral-300 focus-visible:ring-neutral-400 bg-white rounded-md text-neutral-800"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-700">Referencia</label>
            <Input
              type="text"
              value={direccion.referencia || ""}
              onChange={(e) => handleChange("referencia", e.target.value)}
              className="h-12 border-neutral-300 focus-visible:ring-neutral-400 bg-white rounded-md text-neutral-800"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-700">Departamento</label>
              <Input
                type="text"
                value={direccion.departamento}
                onChange={(e) => handleChange("departamento", e.target.value)}
                className="h-12 border-neutral-300 focus-visible:ring-neutral-400 bg-white rounded-md text-neutral-800"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-700">Provincia</label>
              <Input
                type="text"
                value={direccion.provincia}
                onChange={(e) => handleChange("provincia", e.target.value)}
                className="h-12 border-neutral-300 focus-visible:ring-neutral-400 bg-white rounded-md text-neutral-800"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-700">Distrito</label>
              <Input
                type="text"
                value={direccion.distrito}
                onChange={(e) => handleChange("distrito", e.target.value)}
                className="h-12 border-neutral-300 focus-visible:ring-neutral-400 bg-white rounded-md text-neutral-800"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Checkbox
              id="esPrincipal"
              checked={direccion.es_principal}
              onCheckedChange={(checked) => handleChange("es_principal", !!checked)}
              className="w-5 h-5 border-neutral-400 data-[state=checked]:bg-neutral-800 data-[state=checked]:border-neutral-800"
            />
            <label htmlFor="esPrincipal" className="text-[15px] font-medium text-neutral-700 select-none">
              Marcar como dirección principal
            </label>
          </div>
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            disabled={saving}
            className="bg-[#FF3C3C] hover:bg-red-600 text-white font-bold px-8 h-12 rounded-md text-base transition-colors shadow-sm"
          >
            {saving ? (
              <span className="inline-flex items-center gap-2">
                <Loader className="w-4 h-4 animate-spin" /> Guardando...
              </span>
            ) : (
              "Guardar cambios"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
