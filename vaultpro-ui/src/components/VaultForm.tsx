// src/components/VaultForm.tsx
import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Paper,
  Typography,
  InputAdornment,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import TitleIcon from '@mui/icons-material/Title';

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
    <Paper elevation={3} sx={{ p: 3, maxWidth: 600 }}>
      <Typography variant="h6" gutterBottom>
        Nueva Contraseña
      </Typography>
      <Box display="flex" gap={2} flexDirection="column">
        <TextField
          label="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <TitleIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Usuario"
          value={nombreUsuario}
          onChange={(e) => setNombreUsuario(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Contraseña"
          value={clave}
          type="password"
          onChange={(e) => setClave(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button variant="contained" onClick={handleSubmit}>
          Guardar
        </Button>
      </Box>
    </Paper>
  );
};

export default VaultForm;
