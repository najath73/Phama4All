import React, { useState } from 'react';
import { useAuth } from '../hooks/authContext';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Grid, Box, Alert, Link } from '@mui/material';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(username, password);
      navigate('/');
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      setError('Nom d\'utilisateur ou mot de passe incorrect');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Grid container spacing={2} sx={{ marginTop: '50px' }}>
        {/* Formulaire de connexion */}
        <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography component="h1" variant="h5" sx={{ textAlign: 'center', mb: 2 }}>
            Connexion
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Nom d'utilisateur"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  size="small"  
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Mot de passe"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  size="small" 
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Connexion
            </Button>

            {/* Lien d'inscription */}
            <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
              Vous n'avez pas de compte ?{' '}
              <Link href="/signup" underline="hover">
                Inscrivez-vous
              </Link>
            </Typography>
          </Box>
        </Grid>

        {/* Section droite avec une image */}
        <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box
            component="img"
            sx={{
              width: '100%',
              maxWidth: '500px',
              borderRadius: '10px',
            }}
            alt="Description de l'image"
            src="https://media.istockphoto.com/id/1215516053/fr/photo/service-mobile-ou-application-pour-lachat-de-m%C3%A9dicaments-dans-la-pharmacie-en-ligne.jpg?s=612x612&w=0&k=20&c=zOV4bSy4MJk4f0gbo_XRJsCfPP_ywV4mPlZF_iNmrTM="
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginPage;
