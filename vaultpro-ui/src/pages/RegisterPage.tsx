import { Container, Box } from '@mui/material';
import RegisterForm from '../components/RegisterForm';

const RegisterPage = () => (
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
      <RegisterForm />
    </Container>
  </Box>
);

export default RegisterPage;
