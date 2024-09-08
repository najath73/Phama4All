import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Chip } from '@mui/material';
import axios from 'axios';
import TopBar1 from '../components/topbar1';
import TopBar2 from '../components/topbar2';
import { useAuth } from '../hooks/authContext'; 

// Composant pour afficher le statut de la commande avec des couleurs spécifiques
const StatusChip = ({ status }) => {
  const getStatusStyle = () => {
    switch (status) {
      case 'confirmed':
        return { backgroundColor: '#4CAF50', color: '#fff' }; // Vert
      case 'shipped':
        return { backgroundColor: '#2196F3', color: '#fff' }; // Bleu
      case 'delivered':
        return { backgroundColor: '#FF9800', color: '#fff' }; // Orange
      case 'cancelled':
        return { backgroundColor: '#F44336', color: '#fff' }; // Rouge
      case 'returned':
        return { backgroundColor: '#FFEB3B', color: '#000' }; // Jaune
      default:
        return { backgroundColor: '#9E9E9E', color: '#fff' }; // Gris (pour 'pending' ou autres)
    }
  };

  return (
    <Chip
      label={status.charAt(0).toUpperCase() + status.slice(1)}
      style={{ ...getStatusStyle(), fontWeight: 'bold', textTransform: 'uppercase' }}
    />
  );
};

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth(); // Récupération de l'utilisateur connecté

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Récupère toutes les commandes depuis l'API
        const response = await axios.get('https://back-pharmacie.onrender.com/orders');
        // Filtre les commandes pour ne garder que celles de l'utilisateur connecté
        const userOrders = response.data.filter(order => order.user === user.id);
        setOrders(userOrders);
      } catch (error) {
        console.error('Erreur lors du chargement des commandes:', error);
      }
    };

    if (user && user.id) {
      fetchOrders();
    }
  }, [user]);

  return (
    <div>
      {/* Premier et deuxième TopBar */}
      <TopBar1 />
      <TopBar2 />

      {/* Liste des commandes de l'utilisateur connecté */}
      <Grid container spacing={3} style={{ marginTop: '20px', padding: '10px' }}>
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card style={{ margin: '10px', padding: '10px', borderRadius: '12px' }}>
                <CardContent>
                  <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                    {order.pharmacy.name}
                  </Typography>
                  <Typography variant="body2" style={{ margin: '10px 0' }}>
                    Commandé par: {user.name}
                  </Typography>

                  {order.productsInOrder.map((productInOrder, idx) => (
                    <div key={idx} style={{ marginBottom: '10px' }}>
                      <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                        {productInOrder.product.name}
                      </Typography>
                      <Typography variant="body2">
                        Quantité: {productInOrder.quantity}
                      </Typography>
                      <Typography variant="body2">
                        Prix unitaire: {productInOrder.unitPrice.toFixed(2)} €
                      </Typography>
                    </div>
                  ))}

                  {/* Affichage du statut avec un code couleur */}
                  <StatusChip status={order.status} />

                  <Typography variant="body2" style={{ marginTop: '10px', color: '#999' }}>
                    Date: {new Date(order.date).toLocaleDateString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" style={{ textAlign: 'center', marginTop: '20px' }}>
            Aucune commande trouvée.
          </Typography>
        )}
      </Grid>
    </div>
  );
};

export default OrdersList;
