export type Rol = "ADMIN" | "USER";

//Tipo para el usuario registrado en el sistema
export type User = {
  id: number;
  nombres: string;
  apellidos?: string | null;
  correo: string;
  telefono?: string | null;
  activo: boolean;
  rol: Rol | string;
  google_id?: string | null;
};

//Omitimos campos que no son necesarios para el registro por google
export type RegisterPayload = Omit<
  User,
  "id" | "activo" | "rol" | "google_id"
> & {
  password: string;
};

//Tipo para el usuario autenticado con Google, que puede no tener contraseña ni rol asignado
export interface AuthContextType {
  user: User | null;
  token: string | null;
  autenticado: boolean;
  isLoading: boolean;

  login: (
    correo: string,
    password: string,
    redirectTo?: string,
  ) => Promise<User>;
  loginConGoogle: (googleToken: string) => Promise<void>;
  register: (userData: RegisterPayload) => Promise<void>;
  logout: () => void;

  hasRole: (role: Rol | string) => boolean;
}
