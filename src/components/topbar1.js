import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, InputBase, Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
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
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawerItems = (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      style={{ width: 250 }}
    >
      <List>
        <ListItem button onClick={() => navigate('/user-orders')}>
          <ListItemText primary="Les produits" />
        </ListItem>
        {user && (
          <>
            <ListItem button onClick={() => navigate('/user-orders')}>
              <ListItemText primary="Mes commandes" />
            </ListItem>
            <ListItem button onClick={handleLogout}>
              <ListItemText primary="Déconnexion" />
            </ListItem>
          </>
        )}
        {!user && (
          <ListItem button onClick={() => navigate('/login')}>
            <ListItemText primary="Connexion" />
          </ListItem>
        )}
      </List>
      <Divider />
    </div>
  );

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
            {!searchOpen && ( // Masquer l'icône de recherche quand la barre est ouverte
              <IconButton onClick={toggleSearch} sx={{ display: { xs: 'none', md: 'block' } }}>
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

          {/* Menus pour écrans larges */}
          <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1, justifyContent: 'flex-end' }}>
            <Button
              onClick={() => navigate('/user-orders')}
              sx={{
                fontSize: 12,
                fontWeight: 600,
                color: '#000',
                display: { xs: 'none', md: 'block' },
                '&:hover': {
                  color: '#004d40',
                },
              }}
            >
              Les produits
            </Button>

            {user && (
              <>
                <Button
                  onClick={() => navigate('/user-orders')}
                  sx={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: '#000',
                    display: { xs: 'none', md: 'block' },
                    '&:hover': {
                      color: '#004d40',
                    },
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
                    display: { xs: 'none', md: 'block' },
                    '&:hover': {
                      color: '#004d40',
                    },
                  }}
                >
                  Déconnexion
                </Button>
                {/* Icône utilisateur */}
                <IconButton
                  size="large"
                  style={{ color: '#000', display: { xs: 'none', md: 'block' } }}
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
                  fontSize: 12,
                  fontWeight: 600,
                  color: '#000',
                  display: { xs: 'none', md: 'block' },
                  '&:hover': {
                    color: '#004d40',
                  },
                }}
              >
                Connexion
              </Button>
            )}

            {/* Menu hamburger pour mobile */}
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ display: { xs: 'block', md: 'none' } }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon style={{ color: '#000' }} />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      {/* Drawer pour mobile */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerItems}
      </Drawer>
    </>
  );
};

export default TopBar1;
