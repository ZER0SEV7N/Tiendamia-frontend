import { useAuth } from "@/context/context";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useLoginAdmin = () => {
  const { login, hasRole, logout } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Intentamos iniciar sesión con las credenciales proporcionadas
      await login(email, password);
      // Verificamos si el usuario tiene el rol de ADMIN
      if (hasRole("ADMIN")) {
        // Si el usuario es un administrador, lo redirigimos al dashboard
        router.push("/admin/dashboard");
      } else {
        // Si el usuario no es un administrador, cerramos su sesión y mostramos un mensaje de error
        logout();
        setError(
          "Acceso denegado: Solo los administradores pueden ingresar aquí.",
        );
      }
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      setError("Credenciales inválidas. Por favor, inténtalo de nuevo.");
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
