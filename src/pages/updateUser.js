import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { TextField, Button, Box, Typography, Container, Card, CardContent, Grid } from '@mui/material';
import { useAuth } from '../hooks/authContext';

const UpdateUser = () => {
  const { id } = useAuth(); // Assurez-vous que cela récupère bien l'ID de l'utilisateur connecté
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: '',
    name: '',
    firstname: '',
    email: '',
    password: '',
    roles: 'simple_user',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get(`/users/${id}/`);
        const { username, name, firstname, email, roles } = response.data;
        setUserData({ username, name, firstname, email, roles });
      } catch (error) {
        console.error("Erreur lors de la récupération des données de l'utilisateur :", error);
      }
    };

    fetchUserData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await api.patch(`/users/${id}/`, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/list-user');
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
      <Card sx={{ width: '100%', padding: 3, backgroundColor: 'transparent', boxShadow: 'none', border: '1px solid #e0e0e0' }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3, textAlign: 'center' }}>
          Modifier les informations utilisateur
        </Typography>
        <CardContent>
          <Box component="form" onSubmit={handleUpdate} noValidate sx={{ mt: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  name="username"
                  label="Nom d'utilisateur"
                  value={userData.username}
                  onChange={handleChange}
                  fullWidth
                  required
                  size="small"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  label="Nom"
                  value={userData.name}
                  onChange={handleChange}
                  fullWidth
                  required
                  size="small"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="firstname"
                  label="Prénom"
                  value={userData.firstname}
                  onChange={handleChange}
                  fullWidth
                  required
                  size="small"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="email"
                  label="Email"
                  value={userData.email}
                  onChange={handleChange}
                  fullWidth
                  required
                  size="small"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="password"
                  label="Mot de passe"
                  type="password"
                  value={userData.password}
                  onChange={handleChange}
                  fullWidth
                  required
                  size="small"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="outlined"
                  fullWidth
                  sx={{
                    border: '1px solid #000',
                    '&:hover': {
                      backgroundColor: '#f5f5f5',
                    },
                  }}
                >
                  Mettre à jour
                </Button>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default UpdateUser;
