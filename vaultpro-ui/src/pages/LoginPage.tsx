import { Container, Box } from '@mui/material';
import LoginForm from '../components/LoginForm';

const LoginPage = () => (
  <Box
    sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(to right, #e0f7fa, #fff)',
    }}
  >
    <Container maxWidth="sm">
      <Box
        sx={{
          p: 4,
          bgcolor: 'rgba(255, 255, 255, 0.75)',
          backdropFilter: 'blur(12px)',
          borderRadius: 4,
          boxShadow: 3,
        }}
      >
        <LoginForm />
      </Box>
    </Container>
  </Box>
);

export default LoginPage;
