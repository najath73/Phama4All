import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';  // Importer useNavigate

const TopBar2 = () => {
  const navigate = useNavigate();  // Initialiser useNavigate

  return (
    <AppBar position="static" style={{ backgroundColor: '#A0D6B4' }}>  {/* Vert mousse teinte 2 */}
      <Toolbar style={{ justifyContent: 'left' }}>
        <Button color="inherit" onClick={() => navigate('/all-pharmacies')}>Toutes les pharmacies</Button>
        <Button color="inherit" onClick={() => navigate('/user-orders')}>Mes commandes</Button>
        {/* Ajouter d'autres menus selon les besoins */}
      </Toolbar>
    </AppBar>
  );
};

export default TopBar2;
