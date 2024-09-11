import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, useMediaQuery, useTheme } from '@mui/material';
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
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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

  const handleOpen = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOrder = async () => {
    try {
      const orderData = {
        pharmacy_id: id,
        productsInOrder: [
          {
            product: selectedProduct.product.id,
            quantity: quantity,
          }
        ]
      };
      const { token } = user;
      await api.post(`/orders`, orderData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Commande réussie');
      handleClose();  // Fermer la modal après la commande
      navigate("/user-orders");
    } catch (error) {
      console.error('Erreur lors de la commande:', error);
    }
  };

  return (
    <div>
      <TopBar1 />

      <Grid container spacing={2} style={{ marginTop: '20px', padding: '10px' }}>
        {products.map((productInPharmacy, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card style={{
              borderRadius: '10px',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              backgroundColor: '#F9F9F9',
              margin: '10px'
            }}>
              <CardContent>
                <Typography variant="h6" style={{ fontWeight: 'bold', color: '#333' }}>
                  {productInPharmacy.product.name}
                </Typography>
                <Typography variant="body2" style={{ color: '#777' }}>
                  {productInPharmacy.product.description}
                </Typography>
                <Typography variant="body2" style={{ marginTop: '10px', color: '#000' }}>
                  Prix : {productInPharmacy.price} €
                </Typography>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: '#9FE2BF',
                    color: 'white',
                    marginTop: '10px',
                    transition: 'background-color 0.3s ease',
                    display: 'block',
                    width: '100%',
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#76c7a7'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#9FE2BF'}
                  onClick={() => handleOpen(productInPharmacy)}
                >
                  Commander
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Passer une commande</DialogTitle>
        <DialogContent>
          <Typography variant="h6" style={{ fontWeight: 'bold', color: '#333' }}>
            {selectedProduct?.product.name}
          </Typography>
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
          <Button onClick={handleClose} style={{ color: '#f44336' }}>
            Annuler
          </Button>
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
