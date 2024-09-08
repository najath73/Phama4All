import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Grid, Box, Alert, Link } from '@mui/material';
import axios from 'axios';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [firstname, setFirstname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      username,
      name,
      firstname,
      email,
      password,
      roles: 'simple_user', // Rôle par défaut
      pharmacy: null, // Pas associé à une pharmacie par défaut
    };

    try {
      // Requête vers l'API pour créer un nouvel utilisateur
      await axios.post('https://back-pharmacie.onrender.com/users', newUser);
      setSuccess('Inscription réussie ! Vous pouvez maintenant vous connecter.');
      setError(''); // Réinitialiser les erreurs en cas de succès
      setTimeout(() => {
        navigate('/login'); // Redirection après 2 secondes
      }, 2000);
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      setError('Une erreur est survenue lors de l\'inscription.');
      setSuccess('');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Grid container spacing={2} sx={{ marginTop: '50px' }}>
        {/* Formulaire d'inscription */}
        <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography component="h1" variant="h5" sx={{ textAlign: 'center', mb: 2 }}>
            Inscription
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            {success && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {success}
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
                  label="Nom"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Prénom"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
              S'inscrire
            </Button>

            {/* Lien de redirection vers la connexion */}
            <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
              Vous avez déjà un compte ?{' '}
              <Link href="/login" underline="hover">
                Connectez-vous
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

export default SignupPage;
