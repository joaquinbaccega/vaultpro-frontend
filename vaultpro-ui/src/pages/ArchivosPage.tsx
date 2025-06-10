import { useEffect, useState } from 'react';
import {
  Typography,
  CircularProgress,
} from '@mui/material';
import DashboardLayout from '../layouts/DashboardLayout';
import FileUploadForm from '../components/FileUploadForm';
import FileList from '../components/FileList';
import {
  listarArchivos,
  descargarArchivo,
  eliminarArchivo,
  type Archivo,
} from '../services/fileService';
import { iniciarConexion, detenerConexion } from '../services/signalrClient';

const ArchivosPage = () => {
  const [archivos, setArchivos] = useState<Archivo[]>([]);
  const [loading, setLoading] = useState(true);

  const cargarArchivos = async () => {
    const data = await listarArchivos();
    setArchivos(data);
  };

  useEffect(() => {
    cargarArchivos().finally(() => setLoading(false));
    iniciarConexion(cargarArchivos, cargarArchivos);

    return () => {
      detenerConexion();
    };
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 10 }} />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Typography variant="h4" gutterBottom>
        Vault de Archivos
      </Typography>

      <FileUploadForm onUpload={cargarArchivos} />

      <FileList
        archivos={archivos}
        onDownload={descargarArchivo}
        onDelete={async (id) => {
          await eliminarArchivo(id);
          await cargarArchivos();
        }}
      />
    </DashboardLayout>
  );
};

export default ArchivosPage;
