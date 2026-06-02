export interface Categoria {
  id: number;
  nombre: string;
  slug: string;
  idCategoriaPadre?: number | null; // Puede ser null para categorías padre
  subcategorias?: Categoria[]; // Para incluir las categorías hijas dentro de la categoría padre
}

export interface ListCategoria {
  id: number;
  nombre: string;
  idCategoriaPadre?: number | null; // Puede ser null para categorías padre
}
