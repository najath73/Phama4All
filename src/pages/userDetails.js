import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, IconButton, Grid, Avatar, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuth } from '../hooks/authContext';
import TopBar1 from '../components/topbar1';
import TopBar2 from '../components/topbar2';

const styles = {
  card: {
    padding: '20px',
    backgroundColor: '#E0F2F1',
  },
  avatar: {
    backgroundColor: '#4DB6AC',
    width: '80px',
    height: '80px',
  },
  icon: {
    fontSize: '60px',
    color: '#FFFFFF',
  },
  editIcon: {
    color: '#00796B',
  },
  title: {
    fontWeight: 'bold',
    color: '#00796B',
  },
  detail: {
    marginTop: '20px',
    color: '#004D40',
  },
};

const UserDetailPage = () => {
  const { user } = useAuth(); // Récupérer l'utilisateur connecté via useAuth

  if (!user) return <Typography>Aucun utilisateur trouvé.</Typography>;

  const handleEditClick = () => {
    // Logique pour rediriger vers une page de modification ou ouvrir une modal
    console.log('Modifier les informations utilisateur');
  };

  return (
    <div style={{ fontFamily: 'Roboto Thin, sans-serif', backgroundColor: '#F0F4F7', minHeight: '100vh' }}>
      <TopBar1 />
      <TopBar2 />
      <Grid container justifyContent="center" style={{ marginTop: '20px' }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card style={styles.card}>
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
              <Grid item>
                <Tooltip title="Modifier les informations">
                  <IconButton onClick={handleEditClick} style={styles.editIcon}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
            <CardContent>
              <Typography variant="h6" style={styles.detail}>
                Détails de l'utilisateur
              </Typography>
              <Typography variant="body1" style={styles.detail}>
                <strong>Rôle:</strong> {user.roles.includes('simple_user') ? 'Utilisateur simple' : ''}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default UserDetailPage;