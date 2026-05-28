/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuth } from "@/context/context";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useLoginAdmin = () => {
  const { login, logout } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(""); // Limpiar errores previos

    try {
      // Capturamos al usuario logueado
      const usuarioLogueado = await login(email, password);

      console.log("Usuario recibido del login:", usuarioLogueado);

      // Extraemos el rol directamente
      const userRole =
        typeof usuarioLogueado?.rol === "string"
          ? usuarioLogueado.rol
          : (usuarioLogueado?.rol as any)?.nombre;

      // Verificamos si el rol es ADMIN
      if (userRole?.toUpperCase() === "ADMIN") {
        // Si es un administrador, directo al dashboard
        router.push("/admin/dashboard");
      } else {
        // Si no es un ADMIN, cerramos la sesión de inmediato por seguridad
        logout();
        setError(
          "Acceso denegado: Solo los administradores pueden ingresar aquí.",
        );
      }
    } catch (err: any) {
      console.error("Error al iniciar sesión:", err);
      setError(
        err.message || "Credenciales inválidas. Por favor, inténtalo de nuevo.",
      );
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
    error,
  };
};
