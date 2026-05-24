//Tipo de dato para el usuario
export type User = {
    id: number;
    nombres: string;
    apellidos: string;
    correo: string;
    password: string;
    telefono: string;
    activo: boolean;
}

//Tipo de dato para oauth de google 
export type GoogleUser = {
    id: string;
    email: string;
    nombres: string;
    google_id: string;
};

export interface AuthContext {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (token: string, redirectTo?: string) => Promise<void>;
    logout: () => void;
    register: (userData: Omit<User, 'id'>) => Promise<void>;
    loginWithGoogle: (googleToken: string) => Promise<void>;
    hasRole: (role: string) => boolean;
}
