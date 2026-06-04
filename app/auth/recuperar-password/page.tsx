//app/auth/recuperar-password/page.tsx
//Página para solicitar recuperación de contraseña,
//donde el usuario ingresa su email, y se le envía un enlace para restablecer su contraseña.

"use client";

import { useState } from "react";
import Link from "next/link";
import { solicitarRecuperacion } from "@/lib/services/password";

export default function RecuperarPasswordPage() {
  const [correo, setCorreo] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //Funcion para manejar el submit del formulario de recuperación de contraseña
  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await solicitarRecuperacion(correo);
      setEnviado(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error al enviar el correo");
    } finally {
      setLoading(false);
    }
  };

  if (enviado) {
    return (
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-md p-8 shadow-sm text-center">
        <div className="text-green-500 text-5xl mb-4">✓</div>
        <h2 className="text-lg font-medium text-gray-700 mb-2">¡Correo enviado!</h2>
        <p className="text-sm text-gray-500">
          Revisá tu bandeja de entrada en <strong>{correo}</strong> y hacé clic en el enlace para restablecer tu contraseña.
        </p>
        <p className="text-xs text-gray-400 mt-3">El enlace expira en 15 minutos.</p>
        <Link href="/login" className="inline-block mt-6 text-sm text-[#FF3C3C] hover:underline">
          Volver al inicio de sesión
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-md p-8 shadow-sm">
      <h1 className="text-center text-lg font-normal text-gray-600 mb-2">Recuperar contraseña</h1>
      <p className="text-xs text-gray-400 text-center mb-6">
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
          disabled={loading}
          className="w-full bg-[#FF3C3C] hover:bg-[#e53030] text-white font-medium py-2.5 rounded text-sm transition disabled:opacity-60"
        >
          {loading ? "Enviando..." : "Enviarme enlace"}
        </button>
      </form>

      <div className="mt-4 text-center">
        <Link href="/login" className="text-xs text-gray-400 hover:text-gray-600 transition">
          ← Volver al inicio de sesión
        </Link>
      </div>
    </div>
  );
}