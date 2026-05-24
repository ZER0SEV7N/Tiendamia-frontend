"use client";

import { useState } from "react";
import { solicitarRecuperacion } from "@/lib/auth";

export default function RecuperarPasswordPage() {
  const [correo, setCorreo] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setCargando(true);
    try {
      await solicitarRecuperacion(correo);
      setEnviado(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error al enviar el correo");
    } finally {
      setCargando(false);
    }
  };

  if (enviado) {
    return (
      <div className="flex justify-center py-16 px-4">
        <div className="w-full max-w-md text-center">
          <div className="text-green-500 text-5xl mb-4">✓</div>
          <h2 className="text-lg font-medium text-gray-700 mb-2">¡Correo enviado!</h2>
          <p className="text-sm text-gray-500">
            Revisá tu bandeja de entrada en <strong>{correo}</strong> y hacé clic en el enlace para restablecer tu contraseña.
          </p>
          <p className="text-xs text-gray-400 mt-3">El enlace expira en 15 minutos.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center py-10 px-4">
      <div className="w-full max-w-md">
        <p className="text-sm text-gray-600 mb-6">
          Ingresa tu email para recibir un enlace y restablecer tu contraseña.
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-xs rounded px-3 py-2 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-gray-600 mb-1 block">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              required
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
            />
          </div>

          <button
            type="submit"
            disabled={cargando}
            className="bg-[#FF3C3C] hover:bg-[#e53030] text-white font-medium px-6 py-2 rounded text-sm transition disabled:opacity-60"
          >
            {cargando ? "Enviando..." : "Enviarme enlace"}
          </button>
        </form>
      </div>
    </div>
  );
}
