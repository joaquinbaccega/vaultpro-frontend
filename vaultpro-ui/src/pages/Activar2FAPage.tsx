import { Container, Box } from '@mui/material';
import TwoFactorSetup from '../components/TwoFactorSetup';

const Activar2FAPage = () => (
  <Container maxWidth="sm">
    <Box mt={4}>
      <TwoFactorSetup />
    </Box>
  </Container>
);

export default Activar2FAPage;
