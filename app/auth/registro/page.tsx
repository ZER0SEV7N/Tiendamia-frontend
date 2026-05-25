"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";

export default function RegistroPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    email: "",
    password: "",
    confirmPassword: "",
    recibirOfertas: false,
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Aquí se simula el éxito del registro / inicio de sesión
    console.log("Registrando usuario...", formData);
    
    // 👈 REDIRECCIÓN AUTOMÁTICA: Nos manda directo a la raíz del perfil
    router.push("/perfil");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Contenedor tipo tarjeta centralizado */}
      <Card className="w-full max-w-md bg-white border border-gray-200 shadow-sm rounded-lg">
        <CardContent className="p-8 space-y-6">
          
          {/* Título */}
          <h2 className="text-center text-2xl font-normal text-gray-800">
            Regístrate
          </h2>

          {/* Botón de Registro con Google */}
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center gap-2 border-gray-400 font-medium text-gray-700 h-11"
            onClick={() => alert("Simulación: Conectando con Google Auth")}
          >
            {/* SVG del ícono de Google */}
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l3.227-3.103C18.22 1.814 15.47 1 12.24 1 5.92 1 1 5.92 1 12s4.92 11 11.24 11c6.62 0 11.02-4.656 11.02-11.22 0-.753-.08-1.334-.18-1.78l-10.84.005z"
              />
            </svg>
            Ingresar con Google
          </Button>

          {/* Separador */}
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <span className="relative px-3 bg-white text-xs text-gray-500 uppercase tracking-wider">
              o regístrate con tu email
            </span>
          </div>

          {/* Formulario principal */}
          <form onSubmit={handleRegister} className="space-y-4">
            
            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">Nombre/s *</label>
              <Input 
                type="text" 
                required 
                onChange={(e) => setFormData({...formData, nombres: e.target.value})}
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">Apellido/s *</label>
              <Input 
                type="text" 
                required 
                onChange={(e) => setFormData({...formData, apellidos: e.target.value})}
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">Email *</label>
              <Input 
                type="email" 
                required 
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">Contraseña *</label>
              <Input 
                type="password" 
                required 
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
              <div className="bg-gray-100 text-[11px] text-gray-600 p-1.5 mt-1 rounded border border-gray-200">
                Nivel seguridad de contraseña: Sin contraseña
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">Confirmar contraseña *</label>
              <Input 
                type="password" 
                required 
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              />
            </div>

            {/* Checkbox Ofertas */}
            <div className="flex items-center gap-2 pt-2">
              <Checkbox 
                id="ofertas" 
                onCheckedChange={(checked) => setFormData({...formData, recibirOfertas: !!checked})}
              />
              <label htmlFor="ofertas" className="text-xs text-gray-500 cursor-pointer">
                Recibir ofertas de Tiendamia
              </label>
            </div>

            {/* Simulación del ReCAPTCHA (Solo visual como caja informativa) */}
            <div className="border border-gray-200 bg-gray-50 p-3 rounded flex items-center justify-between text-sm text-gray-600 mt-2">
              <div className="flex items-center gap-3">
                <input type="checkbox" className="w-6 h-6 border-gray-300 rounded cursor-pointer" />
                <span>No soy un robot</span>
              </div>
              <div className="text-center text-[10px] text-gray-400">
                <span className="block font-bold">reCAPTCHA</span>
                <span>Privacidad - Términos</span>
              </div>
            </div>

            {/* Botón enviar */}
            <div className="pt-4">
              <Button type="submit" className="w-full bg-[#E61C24] hover:bg-red-700 text-white font-bold h-11 uppercase text-sm tracking-wider">
                Regístrate
              </Button>
            </div>
          </form>

          {/* Sección inferior: Cambio de vista */}
          <div className="text-center space-y-3 pt-2">
            <p className="text-xs text-gray-500 font-medium">¿Ya tienes una cuenta?</p>
            <Link href="/login" passHref>
              <Button variant="outline" className="w-full border-[#E61C24] text-[#E61C24] hover:bg-red-50 font-bold h-11">
                Ingresar
              </Button>
            </Link>
          </div>

          {/* Términos y condiciones legales */}
          <p className="text-[10px] text-gray-400 text-center leading-relaxed">
            Al registrarte estás aceptando nuestros{" "}
            <a href="#" className="text-blue-500 underline">Términos y Condiciones</a>
          </p>

        </CardContent>
      </Card>
    </div>
  );
}