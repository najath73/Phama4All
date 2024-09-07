import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';
import TopBar1 from '../components/topbar1';
import TopBar2 from '../components/topbar2';

const AllPharmacies = () => {
  const [pharmacies, setPharmacies] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);// Pour le menu déroulant
  const [selectedPharmacy, setSelectedPharmacy] = useState(null); // Pharmacie sélectionnée

  useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        const response = await axios.get('https://back-pharmacie.onrender.com/pharmacies');
        setPharmacies(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des pharmacies:', error);
      }
    };

    fetchPharmacies();
  }, []);

  // Ouvre le menu pour la pharmacie sélectionnée
  const handleMenuOpen = (event, pharmacy) => {
    setAnchorEl(event.currentTarget);
    setSelectedPharmacy(pharmacy);
  };

  // Ferme le menu
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedPharmacy(null);
  };

  // Navigation vers les détails de la pharmacie
  const handleViewDetails = () => {
    window.location.href = `/pharmacy/${selectedPharmacy._id}`;
  };

  // Navigation vers les produits de la pharmacie
  const handleViewProducts = () => {
    window.location.href = `/pharmacy/${selectedPharmacy._id}/products`;
  };

  return (
    <div style={{ fontFamily: 'Roboto Thin, sans-serif', backgroundColor: '#F0F4F7', minHeight: '100vh' }}>
      {/* TopBars */}
      <TopBar1 />
      <TopBar2 />

      {/* Contenu des pharmacies */}
      <Grid container spacing={2} style={{ padding: '20px' }}>
        {pharmacies.map((pharmacy, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card style={{ margin: '10px', backgroundColor: '#FFFFFF' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{pharmacy.name}</Typography>
                <Typography variant="body2">Adresse : {pharmacy.address}</Typography>
                <Typography variant="body2">Téléphone : {pharmacy.phone}</Typography>
                <Typography variant="body2">
                  Localisation : Lat: {pharmacy.localisation.latitude}, Long: {pharmacy.localisation.longitude}
                </Typography>

                {/* Bouton pour ouvrir le menu */}
                <IconButton
                  aria-label="more"
                  aria-controls={`menu-${index}`}
                  aria-haspopup="true"
                  onClick={(event) => handleMenuOpen(event, pharmacy)}
                >
                  <MoreVertIcon />
                </IconButton>

                {/* Menu déroulant */}
                <Menu
                  id={`menu-${index}`}
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl) && selectedPharmacy === pharmacy}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleViewDetails}>Voir les détails</MenuItem>
                  <MenuItem onClick={handleViewProducts}>Voir les produits</MenuItem>
                </Menu>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default AllPharmacies;
