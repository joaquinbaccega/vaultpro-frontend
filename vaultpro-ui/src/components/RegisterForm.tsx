// src/components/RegisterForm.tsx
import { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Paper,
  Box,
  InputAdornment,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/authService';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const RegisterForm = () => {
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
    <Paper
      elevation={4}
      sx={{
        p: 4,
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
        borderRadius: 3,
      }}
    >
      <Typography variant="h5" gutterBottom align="center">
        Crear Cuenta
      </Typography>

      <Box
        component="form"
        onSubmit={handleRegister}
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
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
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
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
          }}
        />

        <FormControl fullWidth>
          <InputLabel id="rol-label">Rol</InputLabel>
          <Select
            labelId="rol-label"
            value={rol}
            label="Rol"
            onChange={(e) => setRol(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <AdminPanelSettingsIcon />
              </InputAdornment>
            }
          >
            <MenuItem value="User">Usuario</MenuItem>
            <MenuItem value="Admin">Administrador</MenuItem>
            <MenuItem value="Auditor">Auditor</MenuItem>
          </Select>
        </FormControl>

        <Button type="submit" variant="contained" size="large">
          Registrarme
        </Button>
      </Box>
    </Paper>
  );
};

export default RegisterForm;
