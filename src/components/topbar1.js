import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { styled, alpha } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import pharma4alll from '../pharm4Alll.png';
import { useAuth } from '../hooks/authContext';

// Style pour la barre de recherche
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#000',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // Correction du calc()
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    color: '#000',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const TopBar1 = () => {
  const navigate = useNavigate();
  const { logout } = useAuth(); // Utiliser le contexte d'authentification

  return (
    <AppBar position="static" style={{ backgroundColor: '#F9F9F9' }}>
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Typography variant="h6" noWrap component="div" sx={{ color: '#000' }}>
          <img src={pharma4alll} alt="Logo" style={{ height: '40px' }} onClick={() => navigate('/')} />
        </Typography>

        {/* Barre de recherche centrée */}
        <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Rechercher un produit ou une pharmacie..."
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </div>
        <Button
          color="inherit"
          onClick={logout} // Assurez-vous que la fonction logout est définie dans votre contexte
          sx={{ ml: 2 }} // Ajout d'un espacement à gauche pour le bouton
        >
          Déconnexion
        </Button>

        {/* Icône utilisateur */}
        <IconButton
          size="large"
          style={{ color: '#000' }}
          onClick={() => navigate(`/users/:id`)} // Utilisation correcte des backticks pour l'URL
        >
          <AccountCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar1;
