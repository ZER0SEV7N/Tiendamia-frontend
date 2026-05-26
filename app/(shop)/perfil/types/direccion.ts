export interface Direccion {
  id: number;
  direccion: string;
  distrito: string;
  provincia: string;
  departamento: string;
  referencia?: string;
  es_principal: boolean;
  createAt: string;
}

export interface DireccionFormData {
  nombreCompleto: string;
  apellidoCompleto: string;
  tipoDocumento: string;
  documento: string;
  mayorEdad: boolean;
  direccion: string;
  referencia: string;
  departamento: string;
  provincia: string;
  distrito: string;
  codigoPostal: string;
  telefono: string;
}
