import api from '@/lib/api';

export interface AuthResponse {
  token: string;
  correo: string;
  nombres: string;
  rol: string;
}

// Guardar sesión en localStorage
export function guardarSesion(data: AuthResponse) {
  localStorage.setItem("token", data.token);
  localStorage.setItem("usuario", JSON.stringify(data));
}

// Obtener token
export function obtenerToken(): string | null {
  return localStorage.getItem("token");
}

// Obtener usuario actual
export function obtenerUsuario(): AuthResponse | null {
  const u = localStorage.getItem("usuario");
  return u ? JSON.parse(u) : null;
}

// Cerrar sesión
export function cerrarSesion() {
  localStorage.removeItem("token");
  localStorage.removeItem("usuario");
}

// Verificar si está logueado
export function estaLogueado(): boolean {
  return !!obtenerToken();
}

// Login
export async function login(correo: string, password: string): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>('/auth/login', { correo, password });
  guardarSesion(data);
  return data;
}

// Register
export async function register(
  nombres: string,
  apellidos: string,
  correo: string,
  telefono: string,
  password: string
): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>('/auth/register', {
    nombres, apellidos, correo, telefono, password,
  });
  guardarSesion(data);
  return data;
}

// Recuperar password — envía email
export async function solicitarRecuperacion(correo: string): Promise<string> {
  const { data } = await api.post<{ mensaje: string }>('/auth/recuperar-password', { correo });
  return data.mensaje;
}

// Cambiar password con token del email
export async function cambiarPassword(token: string, nuevaPassword: string): Promise<string> {
  const { data } = await api.post<{ mensaje: string }>('/auth/cambiar-password', { token, nuevaPassword });
  return data.mensaje;
}