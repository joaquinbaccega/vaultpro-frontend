import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Alert,
} from '@mui/material';
import { useTwoFA } from '../context/TwoFAContext';
import API from '../services/api';

const TwoFADialog: React.FC = () => {
  const { show2FADialog, complete2FA } = useTwoFA();
  const [codigo, setCodigo] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      await API.get('/auth/validar-2fa', {
        params: { codigo2fa: codigo },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setCodigo('');
      setError('');
      complete2FA(); // Reintenta la acción
    } catch {
      setError('Código incorrecto. Intentá nuevamente.');
    }
  };

  return (
    <Dialog open={show2FADialog} onClose={() => {}}>
      <DialogTitle>Validación 2FA requerida</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          fullWidth
          label="Código 2FA"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
        />
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} variant="contained">Verificar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TwoFADialog;
