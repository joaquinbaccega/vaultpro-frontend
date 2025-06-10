import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Paper,
} from '@mui/material';

interface Props {
  onSubmit: (nombre: string, nombreUsuario: string, contraseña: string) => void;
}

const VaultForm: React.FC<Props> = ({ onSubmit }) => {
  const [nombre, setNombre] = useState('');
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [clave, setClave] = useState('');

  const handleSubmit = () => {
    if (!nombre || !nombreUsuario || !clave) return;
    onSubmit(nombre, nombreUsuario, clave);
    setNombre('');
    setNombreUsuario('');
    setClave('');
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Box display="flex" gap={2} flexDirection="column" maxWidth={500}>
      <TextField label="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
      <TextField label="Usuario" value={nombreUsuario} onChange={(e) => setNombreUsuario(e.target.value)} />
      <TextField label="Contraseña" value={clave} onChange={(e) => setClave(e.target.value)} />
      <Button variant="contained" onClick={handleSubmit}>Guardar</Button>
      </Box>
    </Paper>
  );
};

export default VaultForm;
