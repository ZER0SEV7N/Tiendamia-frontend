//app/auth/login/page.tsx
//Página de login, con formulario para ingresar email y contraseña, 
//botón para login con Google, y un checkbox simulado de reCAPTCHA
"use client";

import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useLogin } from "@/app/auth/hook/useLogin";
import { useState } from "react";
import { GoogleLogin } from '@react-oauth/google';
import { useRouter } from "next/navigation";

//La página de login se encarga de mostrar el formulario de inicio de sesión, 
//manejar la lógica de autenticación y mostrar errores si los hay.
export default function LoginPage() {
  const { 
    correo, setCorreo, password, setPassword, 
    error, setError, loading, captchaChecked, setCaptchaChecked, 
    handleSubmit, loginConGoogle 
  } = useLogin();
  
  const [mostrarPass, setMostrarPass] = useState(false);
  const router = useRouter();

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-md p-8 shadow-sm mx-auto mt-10">
      <h1 className="text-center text-lg font-normal text-gray-600 mb-5">
        Ingresar
      </h1>

      <div className="w-full flex justify-center mb-4">
        <GoogleLogin
          width="300"
          theme="outline"
          size="large"
          text="signin_with"
          onSuccess={async (credentialResponse) => {
            try {
              if (credentialResponse.credential) {
                await loginConGoogle(credentialResponse.credential);
                router.push("/"); 
              }
            } catch (err: unknown) {
              if (err instanceof Error) {
                setError(err.message);
              } else {
                setError("Error al iniciar sesión con Google.");
              }
            }
          }}
          onError={() => {
            setError("El inicio de sesión con Google fue cancelado o falló.");
          }}
        />
      </div>

      {/* Divisor */}
      <div className="relative flex items-center mb-4">
        <div className="grow border-t border-gray-200" />
        <span className="shrink mx-3 text-xs text-gray-400">
          o ingresa con tu email
        </span>
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
            <Link
              href="/recuperar-password"
              className="text-xs text-blue-500 hover:underline"
            >
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
              {mostrarPass ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* reCAPTCHA simulado */}
        <div className="border border-gray-300 rounded px-4 py-3 flex items-center justify-between bg-gray-50">
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={captchaChecked}
              onChange={(e) => setCaptchaChecked(e.target.checked)}
              className="w-4 h-4 accent-gray-600 cursor-pointer"
            />
            <span className="text-sm text-gray-700">No soy un robot</span>
          </label>
          <div className="flex flex-col items-center">
            {/* SVG del Captcha */}
            <svg viewBox="0 0 64 64" className="w-9 h-9" xmlns="http://www.w3.org/2000/svg">
              <path d="M32 4C16.536 4 4 16.536 4 32s12.536 28 28 28 28-12.536 28-28S47.464 4 32 4z" fill="#4A90D9"/>
              <path d="M32 12c-11.046 0-20 8.954-20 20s8.954 20 20 20 20-8.954 20-20-8.954-20-20-20z" fill="#fff"/>
              <path d="M32 18c-7.732 0-14 6.268-14 14s6.268 14 14 14 14-6.268 14-14-6.268-14-14-14z" fill="#4A90D9"/>
              <path d="M27 32l4 4 8-8" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
            <span className="text-[8px] text-gray-400 leading-tight text-center">reCAPTCHA</span>
            <span className="text-[7px] text-gray-300 leading-tight">Privacidad - Términos</span>
          </div>
        </div>

        {/* Boton ingresar */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#FF3C3C] hover:bg-[#e53030] text-white font-medium py-2.5 rounded text-sm transition disabled:opacity-60"
        >
          {loading ? "Ingresando..." : "Ingresar"}
        </button>
      </form>

      {/* Link al register */}
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500 mb-2">¿No tienes una cuenta aún?</p>
        <Link
          href="/auth/register"
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
  );
}