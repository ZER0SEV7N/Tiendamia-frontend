"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getProfile, updateProfile } from "@/lib/user";

export default function EditarPerfilView() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    correo: "",
    telefono: "",
    cambiarPassword: false,
    password: "",
  });
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfile()
      .then((u) => {
        setFormData({
          nombres: u.nombres || "",
          apellidos: u.apellidos || "",
          correo: u.correo || "",
          telefono: u.telefono || "",
          cambiarPassword: false,
          password: "",
        });
      })
      .catch(() => {
        // no action on failure here
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSavePassword = () => {
    if (!newPassword || !confirmPassword) {
      setPasswordError("Completa ambos campos para actualizar la contraseña.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("Las contraseñas no coinciden.");
      return;
    }

    setFormData({
      ...formData,
      cambiarPassword: true,
      password: newPassword,
    });
    setPasswordModalOpen(false);
    setPasswordError(null);
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleCancelPassword = () => {
    setPasswordModalOpen(false);
    setPasswordError(null);
    setNewPassword("");
    setConfirmPassword("");
    if (!formData.password) {
      setFormData({ ...formData, cambiarPassword: false });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: any = {
      nombres: formData.nombres,
      apellidos: formData.apellidos,
      telefono: formData.telefono,
    };
    if (formData.cambiarPassword && formData.password) {
      payload.password = formData.password;
    }

    setSaving(true);
    try {
      await updateProfile(payload);
      router.push('/perfil');
    } catch (error) {
      console.error("Error guardando perfil:", error);
    } finally {
      setSaving(false);
    }
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

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-neutral-700">Contraseña</p>
              <p className="text-sm text-neutral-500">
                {formData.cambiarPassword ? "Se actualizará al guardar." : "No se modificará si no abres la ventana."}
              </p>
            </div>
            <Button
              type="button"
              onClick={() => setPasswordModalOpen(true)}
              className="bg-[#FF3C3C] hover:bg-red-600 text-white font-bold px-4 h-11 rounded-md text-sm transition-colors"
            >
              Cambiar contraseña
            </Button>
          </div>
          {formData.cambiarPassword && (
            <p className="text-sm text-emerald-700">Nueva contraseña lista para guardar.</p>
          )}
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            className="bg-[#FF3C3C] hover:bg-red-600 text-white font-bold px-8 h-12 rounded-md text-base transition-colors shadow-sm"
            disabled={saving}
          >
            {saving ? "Guardando cambios..." : "Guardar cambios"}
          </Button>
        </div>
      </form>

      {passwordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold text-neutral-900">Actualizar contraseña</h2>
                <p className="text-sm text-neutral-500">Ingresa una contraseña nueva y confírmala.</p>
              </div>
              <button
                type="button"
                onClick={handleCancelPassword}
                className="text-sm font-semibold text-neutral-600 hover:text-neutral-950"
              >
                Cerrar
              </button>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700">Nueva contraseña</label>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Ingrese nueva contraseña"
                  className="h-12 border-neutral-300 focus-visible:ring-neutral-400 bg-white rounded-md text-neutral-800"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700">Confirmar contraseña</label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repite la contraseña"
                  className="h-12 border-neutral-300 focus-visible:ring-neutral-400 bg-white rounded-md text-neutral-800"
                />
              </div>
              {passwordError && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  {passwordError}
                </div>
              )}
              <div className="flex justify-end gap-3 pt-2">
                <Button type="button" onClick={handleCancelPassword} className="bg-gray-100 text-gray-800 hover:bg-gray-200">
                  Cancelar
                </Button>
                <Button type="button" onClick={handleSavePassword} className="bg-[#FF3C3C] hover:bg-red-600 text-white">
                  Guardar contraseña
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>

      </form>
    </div>
  );
}