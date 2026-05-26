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

export async function getProfile(): Promise<UserProfile> {
  const { data } = await api.get('/api/usuario/me');
  return data as UserProfile;
}

export async function updateProfile(payload: Partial<UserProfile & { password?: string }>) {
  const { data } = await api.patch('/api/usuario/me', payload);
  return data;
}

export async function getAddresses() {
  const { data } = await api.get('/api/usuario/direcciones');
  return data;
}

export async function addAddress(address: any) {
  const { data } = await api.post('/api/usuario/direcciones', address);
  return data;
}

export async function deleteAddress(id: number) {
  const { data } = await api.delete(`/api/usuario/direcciones/${id}`);
  return data;
}
