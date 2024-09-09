import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { styled, alpha } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/authContext';

// Style pour la barre de recherche
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
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
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 0, // Commence avec 0
      '&:focus': {
        width: '20ch', // S'élargit au clic
      },
    },
  },
}));

const TopBar1 = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  return (
    <>
      {/* Première petite barre verte */}
      <AppBar position="static" style={{ backgroundColor: '#004d40', height: '30px' }}>
        <Toolbar>
          <Typography variant="caption" style={{ flexGrow: 1, textAlign: 'center', color: '#fff' }}>
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Deuxième barre principale */}
      <AppBar position="static" style={{ backgroundColor: '#F9F9F9', height: '80px' }}>
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Logo */}
          <Typography variant="h6" noWrap component="div" sx={{ color: '#000' }}>
            <div
              onClick={() => navigate('/')}
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: '24px',
                letterSpacing: '0.05em',
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer'
              }}
            >
              <span style={{ fontWeight: 400, color: '#10A760', marginLeft: '8px' }}>Pharma</span>
              <span style={{ fontWeight: 700, color: '#000' }}>4All</span>
            </div>
          </Typography>

          {/* Barre de recherche */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {!searchOpen && ( // Hide the search icon when the search is open
              <IconButton onClick={toggleSearch}>
                <SearchIcon style={{ color: '#000' }} />
              </IconButton>
            )}
            {searchOpen && (
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Rechercher..."
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
            )}
          </div>
          <Button
            onClick={() => navigate('/user-orders')}
            sx={{
              fontSize: 12,
              fontWeight: 600,
              color: '#000',
              backgroundColor: 'transparent',
            }}
          >
            Les produits
          </Button>
          {/* Menus */}
          {user && (
            <>
              <Button
                onClick={() => navigate('/user-orders')}
                sx={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: '#000',
                  backgroundColor: 'transparent',
                }}
              >
                Mes commandes
              </Button>
              <Button
                onClick={handleLogout}
                sx={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: '#000',
                  backgroundColor: 'transparent',
                }}
              >
                Déconnexion
              </Button>
              {/* Icône utilisateur */}
              <IconButton
                size="large"
                style={{ color: '#000' }}
                onClick={() => navigate(`/users/:id`)}
              >
                <AccountCircle />
              </IconButton>
            </>
          )}
          {!user && (
            <Button
              onClick={() => navigate("/login")}
              sx={{
                color: '#000',
                backgroundColor: 'transparent',
                '&:hover': {
                  color: '#555',
                  backgroundColor: 'transparent',
                },
              }}
            >
              Connexion
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default TopBar1;
