const API_URL = "http://localhost:8080";

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
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ correo, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error al iniciar sesión");
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
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombres, apellidos, correo, telefono, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error al registrarse");
  guardarSesion(data);
  return data;
}

// Recuperar password — envía email
export async function solicitarRecuperacion(correo: string): Promise<string> {
  const res = await fetch(`${API_URL}/auth/recuperar-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ correo }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error al enviar el correo");
  return data.mensaje;
}

// Cambiar password con token del email
export async function cambiarPassword(token: string, nuevaPassword: string): Promise<string> {
  const res = await fetch(`${API_URL}/auth/cambiar-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, nuevaPassword }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error al cambiar la contraseña");
  return data.mensaje;
}
