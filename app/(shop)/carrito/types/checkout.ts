//types/checkout

export interface DireccionForm {
    dirrecion: string;
    distrito: string;
    provincia: string;
    departamento: string;
    refencia?: string;
}

export interface TarjetaForm {
    numeroTarjeta: string;
    nombre: string;
    expiracion: string;
    cvv: string;
}

export interface PagoSimuladoPayload {
    pasarela: string;
    customer_token: string;
    ultimos_cuatro: string;
    marca_tarjeta_id: number;
}

export interface CheckoutPayload {
    direccion: DireccionForm;
    pago: PagoSimuladoPayload;
    total: number;
}