import { useState } from 'react';
import { TextField, Button, Typography, Paper, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [require2FA, setRequire2FA] = useState(false);
  const [codigo2FA, setCodigo2FA] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await API.post('/auth/login', {
        email,
        password,
        codigo2FA: codigo2FA || null,
      });

      localStorage.setItem('token', response.data.token);
      alert('Login exitoso');
      navigate('/dashboard');
    } catch (error: any) {
      if (error.response?.data?.require2fa) {
        setRequire2FA(true);
        alert('Este usuario requiere código 2FA');
      } else {
        alert('Credenciales inválidas');
      }
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom align="center">
        Iniciar Sesión
      </Typography>
      <Box
        component="form"
        onSubmit={handleLogin}
        display="flex"
        flexDirection="column"
        gap={2}
      >
        <TextField
          label="Email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Contraseña"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {require2FA && (
          <TextField
            label="Código 2FA"
            fullWidth
            value={codigo2FA}
            onChange={(e) => setCodigo2FA(e.target.value)}
          />
        )}
        <Button type="submit" variant="contained">
          Ingresar
        </Button>
      </Box>
    </Paper>
  );
};

export default LoginForm;
