import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { theme } from './theme';
import { TwoFAProvider } from './context/TwoFAContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TwoFAProvider>
        <App />
      </TwoFAProvider>
    </ThemeProvider>
  </React.StrictMode>
);
