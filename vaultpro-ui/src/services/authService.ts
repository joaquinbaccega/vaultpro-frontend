import API from './api';

export const login = async (email: string, password: string): Promise<string> => {
  const response = await API.post('/auth/login', { email, password });
  return response.data.token;
};

export const register = async (email: string, password: string, rol: string) => {
  await API.post('/auth/register', { email, password, rol });
};

export const activar2FA = async (): Promise<{
  secret: string;
  qrCodeBase64: string;
}> => {
  const token = localStorage.getItem('token');
  const response = await API.post('/auth/activar-2fa', null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};