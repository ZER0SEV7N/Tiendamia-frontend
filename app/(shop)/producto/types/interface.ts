export interface ProductGalleryProps {
  imagenes: string[];
  titulo: string;
  imagenActiva: number;
  setImagenActiva: (index: number) => void;
  sku: string;
}

export interface ProductInfoProps {
  marca: string;
  titulo: string;
  atributos: { nombre: string; opciones: string[] }[];
  atributosSeleccionados: Record<string, string>;
  seleccionarAtributo: (atributo: string, opcion: string) => void;
  detalles: any;
}

export interface ProductBuyBoxProps {
  precioOriginal: number;
  precioDescuento: number;
  descuento: number;
  cantidad: number;
  setCantidad: (c: number) => void;
  onComprar: () => void;
}