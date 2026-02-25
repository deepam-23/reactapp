import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { AuthResponse } from './types';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Auth/Login';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6A1B9A', // deep purple
    },
    secondary: {
      main: '#ffffff',
    },
    background: {
      default: '#000000',
      paper: '#121212',
    },
    text: {
      primary: '#ffffff',
      secondary: '#bbbbbb',
    }
  },
});

const App: React.FC = () => {
  const [user, setUser] = useState<AuthResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token is valid by making a test request
      // For now, we'll just set a dummy user if token exists
      // In production, you'd want to verify the token with the backend
      setUser({
        token,
        user: {
          id: '1',
          username: 'admin',
          email: 'admin@example.com',
          role: 'admin'
        }
      });
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData: AuthResponse) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
          <Typography>Loading...</Typography>
        </Box>
      </ThemeProvider>
    );
  }

  if (!user) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" sx={{ bgcolor: 'primary.main' }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'secondary.main' }}>
              Analytics Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Box sx={{ mt: 8, textAlign: 'center', px: 2, color: 'secondary.main' }}>
          <Typography variant="h2" gutterBottom>
            Welcome to the Analytics Dashboard
          </Typography>
          <Typography variant="h5" sx={{ mb: 4 }}>
            Sign in to explore your data
          </Typography>
          <Login onLogin={handleLogin} />
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Analytics Dashboard
          </Typography>
          <Typography variant="body2" sx={{ mr: 2 }}>
            Welcome, {user.user.username}
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Dashboard />
    </ThemeProvider>
  );
};

export default App;
