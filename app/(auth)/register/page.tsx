"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SiGoogle } from "@icons-pack/react-simple-icons";
import { Eye, EyeOff } from "lucide-react";
import { register } from "@/lib/auth";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    nombres: "", apellidos: "", correo: "",
    telefono: "", password: "", confirmar: "",
  });
  const [mostrarPass, setMostrarPass] = useState(false);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const nivelSeguridad = (pass: string) => {
    if (!pass) return { texto: "Sin contraseña", color: "text-gray-400" };
    if (pass.length < 6) return { texto: "Muy débil", color: "text-red-500" };
    if (pass.length < 8) return { texto: "Débil", color: "text-orange-500" };
    if (/[A-Z]/.test(pass) && /[0-9]/.test(pass)) return { texto: "Fuerte", color: "text-green-600" };
    return { texto: "Media", color: "text-yellow-500" };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirmar) {
      setError("Las contraseñas no coinciden");
      return;
    }
    setCargando(true);
    try {
      await register(form.nombres, form.apellidos, form.correo, form.telefono, form.password);
      router.push("/");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error al registrarse");
    } finally {
      setCargando(false);
    }
  };

  const seguridad = nivelSeguridad(form.password);

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-md p-8 shadow-sm">
      <h1 className="text-center text-lg font-normal text-gray-600 mb-5">Regístrate</h1>

      {/* Google */}
      <button className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded py-2 text-sm text-gray-700 hover:bg-gray-50 transition mb-4">
        <SiGoogle className="w-4 h-4" />
        <span>Ingresar con Google</span>
      </button>

      {/* Divisor */}
      <div className="relative flex items-center mb-4">
        <div className="grow border-t border-gray-200" />
        <span className="shrink mx-3 text-xs text-gray-400">o regístrate con tu email</span>
        <div className="grow border-t border-gray-200" />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-xs rounded px-3 py-2 mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Nombres */}
        <div>
          <label className="text-xs text-gray-600 mb-1 block">
            Nombre/s <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={form.nombres}
            onChange={(e) => setForm({ ...form, nombres: e.target.value })}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
          />
        </div>

        {/* Apellidos */}
        <div>
          <label className="text-xs text-gray-600 mb-1 block">
            Apellido/s <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={form.apellidos}
            onChange={(e) => setForm({ ...form, apellidos: e.target.value })}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
          />
        </div>

        {/* Email */}
        <div>
          <label className="text-xs text-gray-600 mb-1 block">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            required
            value={form.correo}
            onChange={(e) => setForm({ ...form, correo: e.target.value })}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
          />
        </div>

        {/* Contraseña */}
        <div>
          <label className="text-xs text-gray-600 mb-1 block">
            Contraseña <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={mostrarPass ? "text" : "password"}
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
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
          <p className={`text-xs mt-1 ${seguridad.color}`}>
            Nivel seguridad de contraseña: {seguridad.texto}
          </p>
        </div>

        {/* Confirmar contraseña */}
        <div>
          <label className="text-xs text-gray-600 mb-1 block">
            Confirmar contraseña <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            required
            value={form.confirmar}
            onChange={(e) => setForm({ ...form, confirmar: e.target.value })}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
          />
        </div>

        {/* Checkbox ofertas */}
        <label className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer">
          <input type="checkbox" className="rounded" />
          Recibir ofertas de Tiendamia
        </label>

        {/* Boton registrar */}
        <button
          type="submit"
          disabled={cargando}
          className="w-full bg-[#FF3C3C] hover:bg-[#e53030] text-white font-medium py-2.5 rounded text-sm transition disabled:opacity-60"
        >
          {cargando ? "Registrando..." : "Regístrate"}
        </button>
      </form>

      {/* Link al login */}
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500 mb-2">¿Ya tienes una cuenta?</p>
        <Link
          href="/login"
          className="w-full block text-center border border-[#FF3C3C] text-[#FF3C3C] hover:bg-red-50 py-2 rounded text-sm transition"
        >
          Ingresar
        </Link>
      </div>

      <p className="text-xs text-gray-400 text-center mt-4">
        Al registrarte estás aceptando nuestros{" "}
        <Link href="#" className="text-blue-500 hover:underline">
          Términos y Condiciones
        </Link>
      </p>
    </div>
  );
}