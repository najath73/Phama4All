import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useParams } from 'react-router-dom';
import TopBar1 from '../components/topbar1';
import api from '../utils/api';
import { useAuth } from '../hooks/authContext';
import { useNavigate } from 'react-router-dom';

const PharmacyProducts = () => {
  const { id } = useParams();  // Récupère l'ID de la pharmacie depuis l'URL
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);  // État pour ouvrir/fermer la modal
  const [selectedProduct, setSelectedProduct] = useState(null); // Produit sélectionné pour la commande
  const [quantity, setQuantity] = useState(1);  // Quantité par défaut
  const { user } = useAuth(); // Récupération de l'utilisateur connecté
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get(`/pharmacies/${id}/products`);
        setProducts(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des produits:', error);
      }
    };

    fetchProducts();
  }, [id]);

  // Ouvrir la modal et définir le produit sélectionné
  const handleOpen = (product) => {
    console.log(product)
    setSelectedProduct(product);
    setOpen(true);
    console.log(selectedProduct)
  };

  // Fermer la modal
  const handleClose = () => {
    setOpen(false);
  };

  // Fonction pour gérer la commande
  const handleOrder = async () => {
    try {
      const orderData = {
        pharmacy_id: id,
        producstInOrder: [
          {
            product: selectedProduct.product.id,
            quantity: quantity,
          }
        ]
      };
      console.log(selectedProduct.product.id)
      console.log(orderData)
      const { token } = user
      // Envoyer les données de commande à l'API
      await api.post(`/orders`, orderData, {
        headers: {
          Authorization: `Bearer ${token}`
     }});
      console.log('Commande réussie');
      handleClose();  // Fermer la modal après la commande
      navigate("/user-orders")
      
    } catch (error) {
      console.error('Erreur lors de la commande:', error);
    }
  };

  return (
    <div>
      {/* Premier et deuxième TopBar */}
      <TopBar1 />

      {/* Affichage des produits de la pharmacie */}
      <Grid container style={{ marginTop: '20px', padding: '10px' }} spacing={3}>
        {products.map((productInPharmacy, index) => (
          <Grid item xs={4} key={index}>
            <Card style={{ margin: '10px', borderRadius: '10px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', backgroundColor: '#F9F9F9' }}>
              <CardContent>
                <Typography variant="h6" style={{ fontWeight: 'bold', color: '#333' }}>{productInPharmacy.product.name}</Typography>
                <Typography variant="body2" style={{ color: '#777' }}>{productInPharmacy.product.description}</Typography>
                <Typography variant="body2" style={{ marginTop: '10px', color: '#000' }}>Prix : {productInPharmacy.price} €</Typography>
                {/* Bouton pour commander le produit */}
                <Button 
                  variant="contained" 
                  style={{ 
                    backgroundColor: '#9FE2BF', // Vert d'eau
                    color: 'white', 
                    marginTop: '10px',
                    transition: 'background-color 0.3s ease', // Transition pour le hover
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#76c7a7'} // Couleur lors du hover
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#9FE2BF'} // Retour à la couleur originale
                  onClick={() => handleOpen(productInPharmacy)} // Ouvrir la modal pour commander
                >
                  Commander 
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modal pour commander */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Passer une commande</DialogTitle>
        <DialogContent>
          <Typography variant="h6" style={{ fontWeight: 'bold', color: '#333' }}>{selectedProduct?.product.name}</Typography>
          <TextField
            label="Quantité"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            fullWidth
            margin="normal"
            InputProps={{ inputProps: { min: 1 } }}
            variant="outlined"
            style={{ backgroundColor: '#FFF' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ color: '#f44336' }}>Annuler</Button>
          <Button 
            onClick={handleOrder} 
            style={{
              textTransform: 'none', 
              fontSize: '16px',
              transition: 'font-weight 0.3s ease',
              color: '#000',
            }}
            onMouseEnter={(e) => (e.target.style.fontWeight = 'bold')}
            onMouseLeave={(e) => (e.target.style.fontWeight = 'normal')}
          >
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PharmacyProducts;
