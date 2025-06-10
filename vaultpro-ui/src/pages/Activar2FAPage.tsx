import { useEffect, useState } from 'react';
import { Container, Typography, CircularProgress, Box, Button, Paper } from '@mui/material';
import { activar2FA } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const Activar2FAPage = () => {
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

  if (loading) return <CircularProgress />;

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h5" gutterBottom>Activar Autenticación 2FA</Typography>
        <Typography variant="body1" gutterBottom>
          Escaneá este código QR con Google Authenticator u otra app TOTP.
        </Typography>

        <Box display="flex" justifyContent="center" my={3}>
          <img src={qrCode} alt="QR Code 2FA" />
        </Box>

        <Typography variant="body2">O ingresá este código manualmente:</Typography>
        <Typography variant="body1" fontWeight="bold" gutterBottom>{secret}</Typography>

        <Button variant="contained" onClick={() => navigate('/dashboard')}>Volver al Dashboard</Button>
      </Paper>
    </Container>
  );
};

export default Activar2FAPage;
