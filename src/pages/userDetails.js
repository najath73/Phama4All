import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, IconButton, Grid, Avatar, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios';
import { useAuth } from '../hooks/authContext';


// Couleurs personnalisées
const styles = {
  card: {
    padding: '20px',
    backgroundColor: '#E0F2F1', // Vert d'eau clair
  },
  avatar: {
    backgroundColor: '#4DB6AC', // Vert d'eau plus foncé
    width: '80px',
    height: '80px',
  },
  icon: {
    fontSize: '60px',
    color: '#FFFFFF', // Blanc pour l'icône
  },
  editIcon: {
    color: '#00796B', // Vert d'eau sombre pour l'icône de modification
  },
  title: {
    fontWeight: 'bold',
    color: '#00796B', // Vert d'eau sombre pour le titre
  },
  detail: {
    marginTop: '20px',
    color: '#004D40', // Vert d'eau foncé pour les détails
  },
};

const UserDetailPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { userId } = useAuth(); // Utiliser le contexte d'authentification

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://back-pharmacie.onrender.com/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des détails de l\'utilisateur:', error);
        setError('Erreur lors du chargement des données.');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) return <Typography>Chargement...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!user) return <Typography>Aucun utilisateur trouvé.</Typography>;

  const handleEditClick = () => {
    // Logique pour rediriger vers une page de modification ou ouvrir une modal
    console.log('Edit user info');
  };

  return (
    <Grid container justifyContent="center" style={{ marginTop: '20px' }}>
      <Grid item xs={12} sm={8} md={6}>
        <Card style={styles.card}>
          {/* Avatar avec une icône d'utilisateur */}
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <Avatar style={styles.avatar}>
                <AccountCircleIcon style={styles.icon} />
              </Avatar>
            </Grid>

            <Grid item>
              <Typography variant="h5" style={styles.title}>
                {user.name} {user.firstname}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {user.email}
              </Typography>
            </Grid>

            {/* Icône pour modifier */}
            <Grid item>
              <Tooltip title="Modifier les informations">
                <IconButton onClick={handleEditClick} style={styles.editIcon}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>

          {/* Détails supplémentaires */}
          <CardContent>
            <Typography variant="h6" style={styles.detail}>
              Détails de l'utilisateur
            </Typography>
            <Typography variant="body1" style={styles.detail}>
              <strong>Rôle:</strong> {user.roles === 'simple_user' ? 'Utilisateur simple' : ''}
            </Typography>
            
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default UserDetailPage;
