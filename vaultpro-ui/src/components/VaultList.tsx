// src/components/VaultList.tsx
import React from 'react';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Stack,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import type { Contraseña } from '../services/passwordService';

interface Props {
  contraseñas: Contraseña[];
  onDelete: (id: string) => void;
}

const VaultList: React.FC<Props> = ({ contraseñas, onDelete }) => {
  if (!contraseñas.length) {
    return (
      <Typography variant="body1" color="text.secondary">
        No hay contraseñas guardadas.
      </Typography>
    );
  }

  return (
    <Stack spacing={2}>
      {contraseñas.map((c) => (
        <Paper
          key={c.id}
          elevation={2}
          sx={{
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              {c.nombre}
            </Typography>

            <Box display="flex" alignItems="center" gap={1} mt={0.5}>
              <PersonIcon fontSize="small" color="action" />
              <Typography variant="body2">{c.nombreUsuario}</Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={1} mt={0.5}>
              <LockIcon fontSize="small" color="action" />
              <Typography variant="body2">{c.contraseña}</Typography>
            </Box>
          </Box>

          <IconButton
            onClick={() => onDelete(c.id)}
            color="error"
            aria-label="Eliminar contraseña"
          >
            <DeleteIcon />
          </IconButton>
        </Paper>
      ))}
    </Stack>
  );
};

export default VaultList;
