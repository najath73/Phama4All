import React, { useState, useEffect, useRef } from 'react';
import { Grid, Card, CardContent, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MyLocationIcon from '@mui/icons-material/MyLocation'; // Importer l'icône pour recentrer sur la position
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from 'react-router-dom';
import TopBar1 from '../components/topbar1';
import axios from 'axios';
import L from 'leaflet';
import userIconImage from '../placeholder.png'; // Remplacez par le chemin réel de l'image de l'icône utilisateur
import pharmacyIconImage from '../marker.png'; // Remplacez par le chemin réel de l'image de l'icône pharmacie

const HomePage = () => {
  const [pharmacies, setPharmacies] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [userPosition, setUserPosition] = useState(null);
  const mapRef = useRef(null); // Référence pour accéder à la carte
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

  // Récupération de la position actuelle de l'utilisateur
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserPosition([latitude, longitude]);
      },
      (error) => {
        console.error('Erreur lors de la récupération de la position:', error);
      },
      { enableHighAccuracy: true }
    );
  }, []);

  // Icône personnalisée pour la position de l'utilisateur avec texte "Vous êtes ici"
  const userIcon = L.divIcon({
    className: 'custom-user-icon',
    html: `
      <div style="display: flex; align-items: center;">
        <img src="${userIconImage}" style="width: 38px; height: 38px;" />
        <span style="margin-left: 5px; background-color: white; padding: 2px;">Vous êtes ici</span>
      </div>
    `,
    iconSize: [38, 38],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38],
  });

  // Icône personnalisée pour les pharmacies avec nom à côté
  const createPharmacyIcon = (pharmacyName) =>
    L.divIcon({
      className: 'custom-pharmacy-icon',
      html: `
        <div style="display: flex; align-items: center;">
          <img src="${pharmacyIconImage}" style="width: 38px; height: 38px;" />
          <span style="margin-left: 5px; background-color: white; padding: 2px;">${pharmacyName}</span>
        </div>
      `,
      iconSize: [38, 38],
      iconAnchor: [19, 38],
      popupAnchor: [0, -38],
    });

  // Fonction pour recentrer la carte sur la position actuelle de l'utilisateur
  const handleCenterOnUser = () => {
    if (userPosition && mapRef.current) {
      mapRef.current.flyTo(userPosition, 13); // Recentre la carte sur la position actuelle avec un niveau de zoom de 13
    }
  };

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
    navigate(`/${pharmacyId}/list-product`);
  };

  // Navigation vers les détails de la pharmacie
  const handleViewDetails = () => {
    if (selectedPharmacy) {
      navigate(`/pharmacy/${selectedPharmacy._id}`);
    }
  };

  // Style de la carte
  const mapContainerStyle = {
    height: '100vh',
    width: '100%',
    position: 'relative',
  };

  // Style de l'icône flottante
  const iconStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    zIndex: 1000,
    backgroundColor: 'white',
    borderRadius: '50%',
    padding: '5px',
  };

  return (
    <div style={{ fontFamily: 'Roboto Thin, sans-serif' }}>
      <TopBar1 />
      <div style={{ marginTop: '20px' }}></div>
      <Grid container>
        <Grid item xs={8} style={{ position: 'relative' }}>
          {userPosition ? (
            <>
              <MapContainer center={userPosition} zoom={13} style={mapContainerStyle} ref={mapRef}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap contributors"
                />
                {/* Marqueur de la position de l'utilisateur avec texte et icône personnalisée */}
                <Marker position={userPosition} icon={userIcon}>
                  <Popup>Vous êtes ici</Popup>
                </Marker>
                {pharmacies.map((pharmacy, index) => (
                  <Marker
                    key={index}
                    position={[pharmacy.localisation.latitude, pharmacy.localisation.longitude]}
                    icon={createPharmacyIcon(pharmacy.name)}
                  >
                    <Popup>
                      {pharmacy.name}<br />
                      {pharmacy.address}
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
              {/* Icône flottante pour recentrer la carte */}
              <IconButton
                onClick={handleCenterOnUser}
                style={iconStyle}
                color="primary"
              >
                <MyLocationIcon />
              </IconButton>
            </>
          ) : (
            <p>Chargement de votre position...</p>
          )}
        </Grid>

        <Grid item xs={4} style={{ padding: '10px' }}>
          {pharmacies.map((pharmacy, index) => (
            <Card key={index} style={{ marginBottom: '10px' }}>
              <CardContent>
                <Typography variant="h6">{pharmacy.name}</Typography>
                <Typography variant="body2">{pharmacy.address}</Typography>
                <Typography variant="body2">{pharmacy.phone}</Typography>
                <IconButton
                  aria-label="more"
                  aria-controls={`menu-${index}`}
                  aria-haspopup="true"
                  onClick={(event) => handleMenuOpen(event, pharmacy)}
                >
                  <MoreVertIcon />
                </IconButton>
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
