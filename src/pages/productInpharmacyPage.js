import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import TopBar1 from '../components/topbar1';
import TopBar2 from '../components/topbar2';

const PharmacyProducts = () => {
  const { id } = useParams();  // Récupère l'ID de la pharmacie depuis l'URL
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`https://back-pharmacie.onrender.com/pharmacies/${id}/products`);
        setProducts(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des produits:', error);
        console.log(id)
      }
    };

    fetchProducts();
  }, [id]);

  return (
    <div>
      {/* Premier et deuxième TopBar */}
      <TopBar1 />
      <TopBar2 />

      {/* Affichage des produits de la pharmacie */}
      <Grid container style={{ marginTop: '20px', padding: '10px' }} spacing={3}>
        {products.map((productInPharmacy, index) => (
          <Grid item xs={4} key={index}>
            <Card style={{ margin: '10px' }}>
              <CardContent>
                <Typography variant="h6">{productInPharmacy.product.name}</Typography>
                <Typography variant="body2">{productInPharmacy.product.description}</Typography>
                <Typography variant="body2">Prix : {productInPharmacy.price} €</Typography>
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
                    >
                    Commander 
                    </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default PharmacyProducts;
