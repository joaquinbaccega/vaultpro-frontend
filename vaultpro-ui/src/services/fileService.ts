import API from './api';

export interface Archivo {
  id: string;
  nombreOriginal: string;
  tipoMime: string;
  subidoEn: string;
}

export const listarArchivos = async (): Promise<Archivo[]> => {
  const token = localStorage.getItem('token');
  const response = await API.get('/archivos', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const subirArchivo = async (file: File): Promise<void> => {
  const token = localStorage.getItem('token');
  const formData = new FormData();
  formData.append('archivo', file);

  await API.post('/archivos', formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const descargarArchivo = (id: string) => {
  const token = localStorage.getItem('token');
  const url = `${API.defaults.baseURL}/archivos/${id}`;
  window.open(`${url}?token=${token}`, '_blank');
};

export const eliminarArchivo = async (id: string): Promise<void> => {
  const token = localStorage.getItem('token');
  await API.delete(`/archivos/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};
