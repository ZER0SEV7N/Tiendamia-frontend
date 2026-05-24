"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { cambiarPassword } from "@/lib/auth";

function CambiarPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [mostrar, setMostrar] = useState(false);
  const [error, setError] = useState("");
  const [exito, setExito] = useState(false);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (!token) setError("Token inválido. Solicita un nuevo enlace de recuperación.");
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== confirmar) {
      setError("Las contraseñas no coinciden");
      return;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    setCargando(true);
    try {
      await cambiarPassword(token, password);
      setExito(true);
      setTimeout(() => router.push("/login"), 3000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error al cambiar la contraseña");
    } finally {
      setCargando(false);
    }
  };

  if (exito) {
    return (
      <div className="flex justify-center py-16 px-4">
        <div className="w-full max-w-sm text-center">
          <div className="text-green-500 text-5xl mb-4">✓</div>
          <h2 className="text-lg font-medium text-gray-700 mb-2">¡Contraseña actualizada!</h2>
          <p className="text-sm text-gray-500">Ya puedes iniciar sesión con tu nueva contraseña.</p>
          <p className="text-xs text-gray-400 mt-2">Redirigiendo al login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center py-8 px-4">
      <div className="w-full max-w-sm border border-gray-200 rounded-md p-8 shadow-sm">
        <h1 className="text-center text-lg font-normal text-gray-600 mb-5">Nueva contraseña</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-xs rounded px-3 py-2 mb-4">
            {error}
            {!token && (
              <div className="mt-2">
                <Link href="/recuperar-password" className="text-blue-500 underline">
                  Solicitar nuevo enlace
                </Link>
              </div>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-gray-600 mb-1 block">
              Nueva contraseña <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={mostrar ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-400 pr-10"
              />
              <button type="button" onClick={() => setMostrar(!mostrar)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                {mostrar ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-600 mb-1 block">
              Confirmar contraseña <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              required
              value={confirmar}
              onChange={(e) => setConfirmar(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
            />
          </div>

          <button
            type="submit"
            disabled={cargando || !token}
            className="w-full bg-[#FF3C3C] hover:bg-[#e53030] text-white font-medium py-2.5 rounded text-sm transition disabled:opacity-60"
          >
            {cargando ? "Guardando..." : "Guardar nueva contraseña"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function CambiarPasswordPage() {
  return (
    <Suspense fallback={<div className="flex justify-center py-16 text-gray-400 text-sm">Cargando...</div>}>
      <CambiarPasswordForm />
    </Suspense>
  );
}
