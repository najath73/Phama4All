import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, Divider, Avatar } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import PharmacyIcon from '@mui/icons-material/LocalPharmacy';
import TopBar1 from '../components/topbar1';

// Style pour le Card contenant les détails de la pharmacie
const StyledCard = styled(Card)(({ theme }) => ({
  padding: '20px',
  backgroundColor: '#FFFFFF',
  borderRadius: '8px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  [theme.breakpoints.up('md')]: {
    width: '600px',
  },
}));

// Style pour l'Avatar
const StyledAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: '#4CAF50',
  width: '100px',
  height: '100px',
  margin: '0 auto',
}));

const PharmacyDetailPage = () => {
  const { id } = useParams(); // Récupérer l'ID de l'URL
  const [pharmacy, setPharmacy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPharmacy = async () => {
      try {
        const response = await axios.get(`https://back-pharmacie.onrender.com/pharmacies/${id}`);
        setPharmacy(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des détails de la pharmacie:', error);
        setError('Erreur lors du chargement des données.');
      } finally {
        setLoading(false);
      }
    };

    fetchPharmacy();
  }, [id]);

  if (loading) return <Typography>Chargement...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!pharmacy) return <Typography>Aucune pharmacie trouvée.</Typography>;

  return (
    <div style={{ fontFamily: 'Roboto Thin, sans-serif', backgroundColor: '#F5F5F5', minHeight: '100vh' }}>
      {/* TopBars */}
      <TopBar1 />

      <Grid container justifyContent="center" style={{ marginTop: '20px', padding: '20px' }}>
        <StyledCard>
          <Grid container alignItems="center" spacing={3}>
            <Grid item xs={12} md={4} style={{ textAlign: 'center' }}>
              <StyledAvatar>
                <PharmacyIcon style={{ fontSize: '60px', color: '#FFFFFF' }} />
              </StyledAvatar>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h5" style={{ fontWeight: 'bold', color: '#333333' }}>
                {pharmacy.name}
              </Typography>
              <Typography variant="body1" color="textSecondary" style={{ marginTop: '10px' }}>
                {pharmacy.address}
              </Typography>
              <Typography variant="body1" color="textSecondary" style={{ marginTop: '10px' }}>
                {pharmacy.phone}
              </Typography>
              <Divider style={{ margin: '20px 0' }} />
              <Typography variant="body2" color="textSecondary">
                <strong>Coordonnées:</strong> {pharmacy.localisation.latitude}, {pharmacy.localisation.longitude}
              </Typography>
            </Grid>
          </Grid>
        </StyledCard>
      </Grid>
    </div>
  );
};

export default PharmacyDetailPage;
