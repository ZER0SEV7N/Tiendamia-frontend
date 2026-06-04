//Servicio para manejar las operaciones relacionadas con la contraseña, 
//como solicitar recuperación y restablecer contraseña.
import api from "@/lib/api";

//Solicitar recuperación de contraseña
export const solicitarRecuperacion = async (correo: string) => {
    const { data } = await api.post("/auth/recuperar-password", { correo });
    return data.mensaje;
}

//Restablecer contraseña usando el token del correo
export const cambiarPassword = async (token: string, password: string) => {
  const { data } = await api.post("/auth/cambiar-password", { token, password });
  return data;
};