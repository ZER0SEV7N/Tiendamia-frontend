export interface carritoItem {
    idVariante: number;
    variacion: string;
    cantidad: number;
    precio: number;
    idDetalle?: number;
}

export interface carrito {
    idCarrito: number;
    tarifa: number;
    envio: number;
    total: number;
    items: carritoItem[];
}