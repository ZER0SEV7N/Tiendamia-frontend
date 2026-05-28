export interface ProductoList {
  id: number;
  nombre: string;
  slug: string;
  imagenUrl: string;
  descripcion: string;
  nombreCategoria: string;
  nombreMarca: string;
  estado: boolean;
}

export interface ProductoRequest {
  nombre: string;
  slug: string;
  descripcion: string;
  imagenUrl: string;
  categoriaId: number;
  marcaId: number;
  variaciones: VariacionRequest[];
}

export interface VariacionRequest {
  codigoInventario: string;
  precio: number;
  stock: number;
  imagenUrl: string;
  caracteristicas: CaracteristicaRequest[];
}

export interface CaracteristicaRequest {
  atributoNombre: string;
  valorTexto: string;
}
