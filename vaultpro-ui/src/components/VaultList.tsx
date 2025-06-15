// src/components/VaultList.tsx
import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Stack,
  Tooltip,
  CircularProgress,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useTwoFA } from '../context/TwoFAContext';
import { obtenerClave } from '../services/authService';

interface ContraseñaBase {
  id: string;
  nombre: string;
  nombreUsuario: string;
}

interface Props {
  contraseñas: ContraseñaBase[];
  onDelete: (id: string) => void;
}

const VaultList: React.FC<Props> = ({ contraseñas, onDelete }) => {
  const { request2FA } = useTwoFA();
  const [visibles, setVisibles] = useState<Record<string, string | null>>({});
  const [loading, setLoading] = useState<string | null>(null);

  const verContraseña = async (id: string) => {
    setLoading(id);

    try {
      const clave = await obtenerClave(id);
      setVisibles((prev) => ({ ...prev, [id]: clave }));
    } catch (err: any) {
      if (err.response?.data && err.response?.data?.message?.includes('2FA')) {
        request2FA(() => verContraseña(id)); // Reintenta cuando se verifique el código
      } else {
        alert('No se pudo obtener la contraseña');
      }
    } finally {
      setLoading(null);
    }
  };

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
              {loading === c.id ? (
                <CircularProgress size={16} />
              ) : visibles[c.id] ? (
                <Typography variant="body2">{visibles[c.id]}</Typography>
              ) : (
                <Tooltip title="Ver contraseña">
                  <IconButton size="small" onClick={() => verContraseña(c.id)}>
                    <VisibilityIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              )}
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
