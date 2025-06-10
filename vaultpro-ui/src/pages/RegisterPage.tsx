import React, { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  Paper
} from '@mui/material';
import { register } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('User');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(email, password, rol);
      alert('Usuario registrado correctamente');
      navigate('/');
    } catch (error: any) {
      const msg = error.response?.data?.message || 'Error al registrar usuario';
      alert(msg);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Crear Cuenta
        </Typography>
        <form onSubmit={handleRegister}>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <TextField
            label="Contraseña"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <FormControl fullWidth margin="normal">
            <InputLabel id="rol-label">Rol</InputLabel>
            <Select
              labelId="rol-label"
              value={rol}
              label="Rol"
              onChange={(e) => setRol(e.target.value)}
            >
              <MenuItem value="User">Usuario</MenuItem>
              <MenuItem value="Admin">Administrador</MenuItem>
              <MenuItem value="Auditor">Auditor</MenuItem>
            </Select>
          </FormControl>

          <Box mt={3}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Registrarme
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default RegisterPage;
