import { useEffect, useState } from 'react';
import { Container, Typography, Divider, CircularProgress } from '@mui/material';
import { getPerfil } from '../services/userService';
import {
  obtenerContraseñas,
  crearContraseña,
  eliminarContraseña,
} from '../services/passwordService';
import VaultForm from '../components/VaultForm';
import VaultList from '../components/VaultList';
import type { Contraseña } from '../services/passwordService';
import { useNavigate } from 'react-router-dom';
import FileUploadForm from '../components/FileUploadForm';
import FileList from '../components/FileList';
import { iniciarConexion, detenerConexion } from '../services/signalrClient';


import {
  descargarArchivo,
  eliminarArchivo,
  listarArchivos,
  type Archivo
} from '../services/fileService';


const DashboardPage = () => {
  const [perfil, setPerfil] = useState<{ email: string; rol: string } | null>(null);
  const [contraseñas, setContraseñas] = useState<Contraseña[]>([]);
  const [loading, setLoading] = useState(true);
  const [archivos, setArchivos] = useState<Archivo[]>([]);

  const navigate = useNavigate();

  const cargarContraseñas = async () => {
    const data = await obtenerContraseñas();
    setContraseñas(data);
  };

  const cargarArchivos = async () => {
    const data = await listarArchivos();
    setArchivos(data);
  };

  useEffect(() => {
    getPerfil().then(setPerfil).catch(() => (window.location.href = '/'));
    cargarContraseñas();
    cargarArchivos();

    iniciarConexion(cargarArchivos, cargarArchivos);


    return () => {
      detenerConexion();
    };
  }, []);


  const handleCrear = async (nombre: string, usuario: string, clave: string) => {
    await crearContraseña({ nombre, nombreUsuario: usuario, contraseña: clave });
    await cargarContraseñas();
  };

  const handleEliminar = async (id: string) => {
    await eliminarContraseña(id);
    await cargarContraseñas();
  };



  useEffect(() => {
    getPerfil()
      .then(setPerfil)
      .catch(() => {
        localStorage.removeItem('token');
        navigate('/');
      });

    cargarContraseñas().finally(() => setLoading(false));
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Bienvenido, {perfil?.email}
      </Typography>

      <Typography variant="h6" gutterBottom>Agregar Contraseña</Typography>
      <VaultForm onSubmit={handleCrear} />

      <Divider sx={{ my: 4 }} />

      <Typography variant="h6" gutterBottom>Mis Contraseñas</Typography>
      <VaultList contraseñas={contraseñas} onDelete={handleEliminar} />

      <Typography variant="h6" gutterBottom>Vault de Archivos</Typography>
      <FileUploadForm onUpload={cargarArchivos} />
      <FileList
        archivos={archivos}
        onDownload={descargarArchivo}
        onDelete={async (id) => {
          await eliminarArchivo(id);
          await cargarArchivos();
        }}
      />
    </Container>
  );
};

export default DashboardPage;
