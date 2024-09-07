import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from 'react-router-dom';
import TopBar1 from '../components/topbar1';
import TopBar2 from '../components/topbar2';
import axios from 'axios';

const HomePage = () => {
  const [pharmacies, setPharmacies] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null); // Ajout de l'état selectedPharmacy
  const navigate = useNavigate(); 

  // Récupération des pharmacies via l'API
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

  // Ouverture du menu pour une pharmacie spécifique
  const handleMenuOpen = (event, pharmacy) => {
    setAnchorEl(event.currentTarget);
    setSelectedPharmacy(pharmacy);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedPharmacy(null);
  };

  // Navigation vers la liste des produits
  const handleViewProducts = (pharmacyId) => {
    navigate(`/${pharmacyId}/list-product`); // Utilisation correcte de l'ID de la pharmacie dans l'URL
  };

  // Navigation vers les détails de la pharmacie
  const handleViewDetails = () => {
    if (selectedPharmacy) {
      navigate(`/pharmacy/${selectedPharmacy._id}`); // Utilisation de navigate pour rediriger vers la page des détails
    }
  };

  // Style de la carte
  const mapContainerStyle = {
    height: '400px',
    width: '100%',
  };

  return (
    <div style={{ fontFamily: 'Roboto Thin, sans-serif' }}>
      {/* Premier TopBar (logo, recherche, icône utilisateur) */}
      <TopBar1 />

      {/* Deuxième TopBar (menu) */}
      <TopBar2 />

      {/* Espacement entre la navbar et la carte */}
      <div style={{ marginTop: '20px' }}></div>

      <Grid container>
        {/* Carte Leaflet avec OpenStreetMap */}
        <Grid item xs={8}>
          <MapContainer center={[51.505, -0.09]} zoom={13} style={mapContainerStyle}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            {pharmacies.map((pharmacy, index) => (
              <Marker
                key={index}
                position={[pharmacy.localisation.latitude, pharmacy.localisation.longitude]}
              >
                <Popup>
                  {pharmacy.name}<br />
                  {pharmacy.address}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </Grid>

        {/* Liste des pharmacies cliquables avec un menu pour chaque */}
        <Grid item xs={4} style={{ padding: '10px' }}>
          {pharmacies.map((pharmacy, index) => (
            <Card key={index} style={{ marginBottom: '10px' }}>
              <CardContent>
                <Typography variant="h6">{pharmacy.name}</Typography>
                <Typography variant="body2">{pharmacy.address}</Typography>
                <Typography variant="body2">{pharmacy.phone}</Typography>

                {/* Icone du menu */}
                <IconButton
                  aria-label="more"
                  aria-controls={`menu-${index}`}
                  aria-haspopup="true"
                  onClick={(event) => handleMenuOpen(event, pharmacy)}
                >
                  <MoreVertIcon />
                </IconButton>

                {/* Menu déroulant pour chaque pharmacie */}
                <Menu
                  id={`menu-${index}`}
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl) && selectedPharmacy === pharmacy}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={() => handleViewProducts(pharmacy._id)}>Voir tous les produits</MenuItem>
                  <MenuItem onClick={handleViewDetails}>Afficher les détails</MenuItem>
                </Menu>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default HomePage;
