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

export const descargarArchivo = async (id: string) => {
  const token = localStorage.getItem('token');
  const response = await API.get(`/archivos/${id}/descargar`, {
    responseType: 'blob',
    headers: { Authorization: `Bearer ${token}` }
  });

  const blob = new Blob([response.data], { type: response.headers['content-type'] });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = getFileNameFromHeader(response.headers['content-disposition']);
  a.click();
  window.URL.revokeObjectURL(url);
};

export const eliminarArchivo = async (id: string): Promise<void> => {
  const token = localStorage.getItem('token');
  await API.delete(`/archivos/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

const getFileNameFromHeader = (contentDisposition: string): string => {
  const match = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(contentDisposition);
  return match && match[1] ? match[1].replace(/['"]/g, '') : 'archivo';
};
