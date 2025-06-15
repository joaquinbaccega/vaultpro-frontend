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

interface Props {
  open: boolean;
  onSubmit: (codigo: string) => Promise<void>;
  onCancel: () => void;
}

const TwoFADialogLogin: React.FC<Props> = ({ open, onSubmit, onCancel }) => {
  const [codigo, setCodigo] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      await onSubmit(codigo);
      setCodigo('');
      setError('');
    } catch {
      setError('Código inválido. Intentá nuevamente.');
    }
  };

  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>Verificación 2FA</DialogTitle>
      <DialogContent>
        <TextField
          label="Código 2FA"
          fullWidth
          autoFocus
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
        />
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained">Validar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TwoFADialogLogin;
