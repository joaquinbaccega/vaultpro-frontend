import { Container, Box } from '@mui/material';
import RegisterForm from '../components/RegisterForm';

const RegisterPage = () => (
  <Container maxWidth="sm">
    <Box mt={4}>
      <RegisterForm />
    </Box>
  </Container>
);

export default RegisterPage;
