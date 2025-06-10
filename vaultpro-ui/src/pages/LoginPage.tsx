import { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [require2FA, setRequire2FA] = useState(false);
  const [codigo2FA, setCodigo2FA] = useState('');
  const navigate = useNavigate();


  const handleLogin = async () => {
    try {
      const response = await API.post('/auth/login', {
        email,
        password,
        codigo2FA: codigo2FA || null
      });
      console.log('Login response:', response.data);
      
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
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Iniciar Sesión</Typography>
      <form onSubmit={handleLogin}>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Contraseña"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {require2FA && (
          <TextField
            label="Código 2FA"
            fullWidth
            margin="normal"
            value={codigo2FA}
            onChange={(e) => setCodigo2FA(e.target.value)}
          />
        )}

        <Button type="submit" variant="contained" color="primary">Ingresar</Button>
      </form>
    </Container>
  );
};

export default LoginPage;
