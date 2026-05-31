import api from '@/lib/api';

export type UserProfile = {
  id: number;
  nombres: string;
  apellidos: string;
  correo: string;
  telefono?: string;
  activo?: boolean;
  rol?: string;
  direcciones?: any[];
};

export type OrdenProducto = {
  nombre: string;
  tiendaOrigen: string;
  cantidad: number;
  imagen: string;
};

export type Orden = {
  id: string;
  fecha: string;
  estado: string;
  estadoColor: string;
  total: string;
  productos: OrdenProducto[];
};

export async function getProfile(): Promise<UserProfile> {
  const { data } = await api.get('/auth/perfil');
  return data as UserProfile;
}

export async function updateProfile(payload: Partial<UserProfile & { password?: string }>) {
  const { data } = await api.patch('/auth/perfil', payload);
  return data;
}

export async function getOrders(): Promise<Orden[]> {
  const { data } = await api.get('/usuario/ordenes');
  return data as Orden[];
}

export async function getAddressById(id: number) {
  const { data } = await api.get(`/usuario/direcciones/${id}`);
  return data;
}

export async function updateAddress(id: number, payload: Partial<{
  direccion: string;
  referencia: string;
  departamento: string;
  provincia: string;
  distrito: string;
  es_principal?: boolean;
}>) {
  const { data } = await api.put(`/usuario/direcciones/${id}`, payload);
  return data;
}

export async function getAddresses() {
  const { data } = await api.get('/usuario/direcciones');
  return data;
}

export async function addAddress(address: any) {
  const { data } = await api.post('/usuario/direcciones', address);
  return data;
}

export async function deleteAddress(id: number) {
  const { data } = await api.delete(`/usuario/direcciones/${id}`);
  return data;
}
