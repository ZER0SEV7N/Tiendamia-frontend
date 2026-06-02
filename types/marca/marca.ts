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
  imagen_logo?: File | null;
  imagen_banner?: File | null;
  descripcion: string;
  destacada?: boolean;
  estado?: boolean;
}
