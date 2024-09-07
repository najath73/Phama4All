import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { styled, alpha } from '@mui/material/styles';
import pharma4alll from '../pharm4Alll.png'

// Style pour la barre de recherche
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15), // Fond de recherche sombre
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.25), // Fond au hover sombre
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
  color: '#000', // Icône de recherche en noir
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // padding vertical + taille de police depuis l'icône de recherche
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    color: '#000', // Texte de recherche en noir
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const TopBar1 = () => {
  return (
    <AppBar position="static" style={{ backgroundColor: '#F9F9F9' }}>  {/* Couleur beige */}
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Logo */} 
        <Typography variant="h6" noWrap component="div" sx={{ color: '#000' }}>
        <img src={pharma4alll} alt="Logo" style={{ height: '40px' }} />
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

        {/* Icône utilisateur */}
        <IconButton size="large" style={{ color: '#000' }} onClick={() => window.location.href = '/user/profile'}>
          <AccountCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar1;
