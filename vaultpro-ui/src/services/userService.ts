import API from './api';

export const getPerfil = async (): Promise<{ email: string; rol: string }> => {
  const token = localStorage.getItem('token');
  const response = await API.get('/auth/perfil', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
