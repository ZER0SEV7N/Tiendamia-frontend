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
    const [cargando, setCargando] = useState(false);
    const [captchaChecked, setCaptchaChecked] = useState(false);

    //Funcion para manejar el submit del formulario de login
    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!captchaChecked) {
            setError("Por favor verifica que no eres un robot.");
            return;
        }

        setError("");
        setCargando(true);

        try {
            await login(correo, password);
            if (typeof sincronizarCarrito === 'function') 
                await sincronizarCarrito();
    
            router.push("/");

        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Error al iniciar sesión");
            }
        } finally {
            setCargando(false);
        }
    }

    return {
        correo,
        setCorreo,
        password,
        setPassword,
        error,
        setError,
        cargando,
        captchaChecked,
        setCaptchaChecked,
        handleSubmit,
        loginConGoogle
    }
}