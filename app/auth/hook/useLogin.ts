//auth/login/hook/useLogin.tsx
//Hook para manejar la lógica de inicio de sesión en la página de login
// auth/login/hook/useLogin.tsx
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/context"; 
import { useCarrito } from "@/app/(shop)/carrito/hook/useCarrito"; 

export function useLogin() {
    const router = useRouter();
    const { login, loginConGoogle, autenticado } = useAuth();
    const { sincronizarCarrito } = useCarrito(autenticado);  
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [captchaChecked, setCaptchaChecked] = useState(false);

    //Funcion para manejar el submit del formulario de login
    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        //Che sos un robot?
        if (!captchaChecked) {
            setError("Por favor verifica que no eres un robot.");
            return;
        }

        setError("");
        setLoading(true);

        //Login
        try {
            const userdata = await login(correo, password);

            //Redirigir segun rol
            const rol = typeof userdata?.rol === "string" 
            ? userdata.rol 
            : (userdata?.rol as any)?.nombre;

            switch (rol?.toUpperCase()) {
                case "ADMIN":
                    router.push("/admin/dashboard");
                    break;
                case "USER": 
                    if (typeof sincronizarCarrito === 'function') {
                        await sincronizarCarrito();
                    }
                    router.push("/");
                    break;
                default:
                    setError("Rol de usuario desconocido: " + rol);
            }

        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Error al iniciar sesión");
            }
        } finally {
            setLoading(false);
        }
    }

    //Retorno de estados y funciones para el componente de login
    return {
        correo,
        setCorreo,
        password,
        setPassword,
        error,
        setError,
        loading,
        captchaChecked,
        setCaptchaChecked,
        handleSubmit,
        loginConGoogle
    }
}