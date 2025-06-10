import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import PrivateRoute from './components/PrivateRoute';
import RegisterPage from './pages/RegisterPage';
import Activar2FAPage from './pages/Activar2FAPage';
import ArchivosPage from './pages/ArchivosPage';

function App() {
  return (
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
        <Route path="/activar-2fa" element={
          <PrivateRoute>
            <Activar2FAPage />
          </PrivateRoute>
        } />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/archivos"
          element={
            <PrivateRoute>
              <ArchivosPage />
            </PrivateRoute>
          } />
        <Route
          path="/activar-2fa"
          element={
            <PrivateRoute>
              <ArchivosPage />
            </PrivateRoute>
          } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
