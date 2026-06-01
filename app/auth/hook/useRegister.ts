//auth/hook/useRegister.tsx
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/context";

export function useRegister() {
    const router = useRouter();
    const { register, loginConGoogle } = useAuth();
    const [nombres, setNombres] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [correo, setCorreo] = useState("");
    const [telefono, setTelefono] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");
    const [cargando, setCargando] = useState(false);

    //Funcion para manejar el submit del formulario de registro
    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(password !== confirmPassword) 
            return setError("Las contraseñas no coinciden");

        setError("");
        setCargando(true);

        try {
            await register({
                nombres, 
                apellidos: apellidos || " ",
                correo,
                telefono: telefono || " ",
                password
            });

            router.push("/");
        } catch (err: unknown) {
            if (err && typeof err === 'object' && 'response' in err) {
                const axiosErr = err as { response: { data: { error?: string } } };
                setError(axiosErr.response?.data?.error || "Error al registrarse");
            }
            else {
                setError("Error al registrarse");
            }
        } finally {
            setCargando(false);
        }
    }

    return {
        nombres,
        setNombres,
        apellidos,
        setApellidos,
        correo,
        setCorreo,
        telefono,
        setTelefono,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        error,
        setError,
        cargando,
        handleSubmit,
        loginConGoogle
    }
}