"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SiGoogle } from "@icons-pack/react-simple-icons";
import { Eye, EyeOff } from "lucide-react";
import { login } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarPass, setMostrarPass] = useState(false);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setCargando(true);
    try {
      await login(correo, password);
      router.push("/");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error al iniciar sesión");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="flex justify-center py-8 px-4">
      <div className="w-full max-w-sm border border-gray-200 rounded-md p-8 shadow-sm">
        <h1 className="text-center text-lg font-normal text-gray-600 mb-5">Ingresar</h1>

        {/* Google */}
        <button className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded py-2 text-sm text-gray-700 hover:bg-gray-50 transition mb-4">
          <SiGoogle className="w-4 h-4" />
          <span>Ingresar con Google</span>
        </button>

        {/* Divisor */}
        <div className="relative flex items-center mb-4">
          <div className="grow border-t border-gray-200" />
          <span className="shrink mx-3 text-xs text-gray-400">o ingresa con tu email</span>
          <div className="grow border-t border-gray-200" />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-xs rounded px-3 py-2 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
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

          {/* Contraseña */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs text-gray-600">
                Contraseña <span className="text-red-500">*</span>
              </label>
              <Link href="/recuperar-password" className="text-xs text-blue-500 hover:underline">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
            <div className="relative">
              <input
                type={mostrarPass ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-400 pr-10"
              />
              <button
                type="button"
                onClick={() => setMostrarPass(!mostrarPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {mostrarPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Botón ingresar */}
          <button
            type="submit"
            disabled={cargando}
            className="w-full bg-[#FF3C3C] hover:bg-[#e53030] text-white font-medium py-2.5 rounded text-sm transition disabled:opacity-60"
          >
            {cargando ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        {/* Link al register */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500 mb-2">¿No tienes una cuenta aún?</p>
          <Link
            href="/register"
            className="w-full block text-center border border-[#FF3C3C] text-[#FF3C3C] hover:bg-red-50 py-2 rounded text-sm transition"
          >
            Regístrate
          </Link>
        </div>

        <p className="text-xs text-gray-400 text-center mt-4">
          Al registrarte estás aceptando nuestros{" "}
          <Link href="#" className="text-blue-500 hover:underline">
            Términos y Condiciones
          </Link>
        </p>
      </div>
    </div>
  );
}
