// src/pages/TwoFactorSetup.tsx
import { useEffect, useState } from 'react';
import {
  Typography,
  CircularProgress,
  Box,
  Button,
  Paper,
  Divider,
  Fade,
} from '@mui/material';
import { activar2FA } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const TwoFactorSetup = () => {
  const [secret, setSecret] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    activar2FA()
      .then((data) => {
        setSecret(data.secret);
        setQrCode(data.qrCodeBase64);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Box
        minHeight="80vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Fade in timeout={500}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <Paper
          elevation={4}
          sx={{
            p: 4,
            borderRadius: 4,
            maxWidth: 500,
            width: '100%',
            backdropFilter: 'blur(6px)',
            backgroundColor: 'rgba(255,255,255,0.85)',
          }}
        >
          <Typography variant="h5" gutterBottom textAlign="center">
            Activar Autenticación 2FA
          </Typography>

          <Typography variant="body1" gutterBottom textAlign="center">
            Escaneá este código QR con Google Authenticator u otra app compatible con TOTP.
          </Typography>

          <Box display="flex" justifyContent="center" my={3}>
            <Box
              component="img"
              src={qrCode}
              alt="QR Code 2FA"
              sx={{
                maxWidth: '300px',
                width: '100%',
                height: 'auto',
                borderRadius: 2,
                boxShadow: 1,
              }}
            />
          </Box>

          <Divider sx={{ my: 2 }} />

          <Typography variant="body2" gutterBottom>
            También podés ingresar el siguiente código manualmente:
          </Typography>

          <Typography
            variant="body1"
            fontWeight="bold"
            textAlign="center"
            sx={{ wordBreak: 'break-word', mb: 2 }}
          >
            {secret}
          </Typography>

          <Button
            variant="contained"
            fullWidth
            onClick={() => navigate('/dashboard')}
          >
            Volver al Dashboard
          </Button>
        </Paper>
      </Box>
    </Fade>
  );
};

export default TwoFactorSetup;
