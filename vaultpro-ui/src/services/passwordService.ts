import API from './api';

export interface Contraseña {
  id: string;
  nombre: string;
  nombreUsuario: string;
  contraseña: string;
  creadoEn: string;
}

export const obtenerContraseñas = async (): Promise<Contraseña[]> => {
  const token = localStorage.getItem('token');
  const response = await API.get('/contraseñas', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const crearContraseña = async (data: {
  nombre: string;
  nombreUsuario: string;
  contraseña: string;
}): Promise<void> => {
  const token = localStorage.getItem('token');
  await API.post('/contraseñas', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const eliminarContraseña = async (id: string): Promise<void> => {
  const token = localStorage.getItem('token');
  await API.delete(`/contraseñas/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
