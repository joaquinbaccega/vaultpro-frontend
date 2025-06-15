// src/components/LoginForm.tsx
import { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  InputAdornment,
  Alert,
  Fade,
  Stack,
} from '@mui/material';
import { Email, Lock } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import TwoFADialogLogin from './TwoFADialogLogin';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show2FADialog, setShow2FADialog] = useState(false);
  const [tempCreds, setTempCreds] = useState<{ email: string; password: string } | null>(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setShow2FADialog(false);

    try {
      const response = await API.post('/auth/login', { email, password });

      // login exitoso sin 2FA
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (error: any) {
      const res = error.response?.data;

      // ⚠️ verifica que require2fa sea true y NO haya un mensaje de error de contraseña
      if (res?.require2fa === true && !res?.message?.toLowerCase().includes('contraseña')) {
        setTempCreds({ email, password });
        setShow2FADialog(true);
      } else {
        setError(res?.message || 'Credenciales inválidas');
      }
    }
  };

  const handle2FASubmit = async (codigo: string) => {
    try {
      const response = await API.post('/auth/login', {
        email: tempCreds?.email,
        password: tempCreds?.password,
        codigo2FA: codigo,
      });

      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch {
      setError('Código 2FA inválido');
    } finally {
      setShow2FADialog(false);
    }
  };

  return (
    <>
      <Fade in timeout={500}>
        <Box>
          <Typography variant="h5" align="center" mb={2} fontWeight={500}>
            Iniciar sesión en Vault Pro
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={handleLogin}
            display="flex"
            flexDirection="column"
            gap={2}
          >
            <TextField
              label="Email"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Contraseña"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
              }}
            />

            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Button type="submit" variant="contained">
                Ingresar
              </Button>

              <Button onClick={() => navigate('/register')} variant="text">
                Crear cuenta
              </Button>
            </Stack>
          </Box>
        </Box>
      </Fade>

      <TwoFADialogLogin
        open={show2FADialog}
        onSubmit={handle2FASubmit}
        onCancel={() => setShow2FADialog(false)}
      />

    </>
  );
};

export default LoginForm;
