// src/components/TwoFADialog.tsx
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  InputAdornment,
} from '@mui/material';
import KeyIcon from '@mui/icons-material/Key';
import { useState } from 'react';

interface Props {
  open: boolean;
  onSubmit: (codigo: string) => void;
  onCancel: () => void;
}

const TwoFADialog = ({ open, onSubmit, onCancel }: Props) => {
  const [codigo, setCodigo] = useState('');

  const handleConfirm = () => {
    onSubmit(codigo);
    setCodigo('');
  };

  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>Verificación en dos pasos</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Código 2FA"
          type="text"
          fullWidth
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <KeyIcon />
              </InputAdornment>
            ),
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancelar</Button>
        <Button variant="contained" onClick={handleConfirm}>
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TwoFADialog;
