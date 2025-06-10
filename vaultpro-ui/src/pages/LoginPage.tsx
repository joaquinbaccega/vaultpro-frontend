import { Container, Box } from '@mui/material';
import LoginForm from '../components/LoginForm';

const LoginPage = () => (
  <Container maxWidth="sm">
    <Box mt={4}>
      <LoginForm />
    </Box>
  </Container>
);

export default LoginPage;
