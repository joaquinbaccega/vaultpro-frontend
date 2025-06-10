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

const DashboardPage = () => {
  const [perfil, setPerfil] = useState<{ email: string; rol: string } | null>(null);
  const [contraseñas, setContraseñas] = useState<Contraseña[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const cargarContraseñas = async () => {
    const data = await obtenerContraseñas();
    setContraseñas(data);
  };

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
    </Container>
  );
};

export default DashboardPage;
