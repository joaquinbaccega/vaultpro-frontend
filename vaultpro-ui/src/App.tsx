import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import Activar2FAPage from './pages/Activar2FAPage';
import ArchivosPage from './pages/ArchivosPage';
import PrivateRoute from './components/PrivateRoute';
import TwoFADialog from './components/TwoFADialog'; // 👈 asegurate de tener este archivo

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/activar-2fa"
            element={
              <PrivateRoute>
                <Activar2FAPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/archivos"
            element={
              <PrivateRoute>
                <ArchivosPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>

      {/* 👇 Esto debe ir fuera de <Routes /> pero dentro del componente App */}
      <TwoFADialog />
    </>
  );
}

export default App;
