export interface Marca {
  id: number;
  nombre: string;
  slug: string;
  descripcion: string;
  destacada: boolean;
  imagen_banner: string;
  imagen_logo: string;
  createAt: string;
}

export interface MarcaRequest {
  nombre: string;
  slug: string;
  imagen_logo?: string | null;
  imagen_banner?: string | null;
  descripcion: string;
  destacada?: boolean;
  estado?: boolean;
}
