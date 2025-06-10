import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import FolderIcon from '@mui/icons-material/Folder';
import LogoutIcon from '@mui/icons-material/Logout';
import ShieldIcon from '@mui/icons-material/Shield'; // 👈 NUEVO
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap>
            Vault Pro Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#f1f5f9',
          },
        }}
      >
        <Toolbar />
        <List>
          <ListItemButton
            selected={location.pathname === '/dashboard'}
            onClick={() => navigate('/dashboard')}
          >
            <ListItemIcon><LockIcon /></ListItemIcon>
            <ListItemText primary="Contraseñas" />
          </ListItemButton>

          <ListItemButton
            selected={location.pathname === '/archivos'}
            onClick={() => navigate('/archivos')}
          >
            <ListItemIcon><FolderIcon /></ListItemIcon>
            <ListItemText primary="Archivos" />
          </ListItemButton>

          <ListItemButton
            selected={location.pathname === '/activar-2fa'}
            onClick={() => navigate('/activar-2fa')}
          >
            <ListItemIcon><ShieldIcon /></ListItemIcon>
            <ListItemText primary="Activar autenticador" />
          </ListItemButton>

          <ListItemButton onClick={handleLogout}>
            <ListItemIcon><LogoutIcon /></ListItemIcon>
            <ListItemText primary="Cerrar sesión" />
          </ListItemButton>
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
