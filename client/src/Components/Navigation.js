import React, { useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem,
  Avatar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AuthButton from './AuthButton';
import { useAuth0 } from '@auth0/auth0-react';

function Navigation() {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));
  const { isLoading, isAuthenticated, user, loginWithRedirect, logout } = useAuth0();

  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  useEffect(() => {
    const savedAuthStatus = localStorage.getItem('authStatus');
    if (savedAuthStatus === 'authenticated') {
      isAuthenticated = true;
    }
  }, []);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6">My Journalate</Typography>
          {isLargeScreen ? (
            <div style={{ marginLeft: 'auto' }}>
              {isLoading ? (
                <div>Loading...</div> 
              ) : isAuthenticated ? (
                <>
                  <IconButton onClick={handleMenuClick}>
                    <Avatar alt={user.name} src={user.picture} />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem>{user.name}</MenuItem>
                    <MenuItem component="a" href="/"> Write Journal</MenuItem>
                    <MenuItem component="a" href="/journals">
                      My Journals
                    </MenuItem>
                    <MenuItem onClick={() => logout({ returnTo: window.location.origin })}>
                      Logout
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <AuthButton />
              )}
            </div>
          ) : (
            <IconButton edge="end" color="inherit" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      {!isLargeScreen && (
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
          <List>
            {isAuthenticated ? (
              <>
                <ListItem>
                  <ListItemIcon>
                    <Avatar alt={user.name} src={user.picture} />
                  </ListItemIcon>
                  <ListItemText primary={user.name} />
                </ListItem>
                <NavItem to="/journals" text="My Journals" />
                <ListItem>
                  <ListItemText>
                    <AuthButton />
                  </ListItemText>
                </ListItem>
              </>
            ) : (
              <ListItem>
                <ListItemText>
                  <AuthButton />
                </ListItemText>
              </ListItem>
            )}
          </List>
        </Drawer>
      )}
    </>
  );
}

function NavItem({ to, text }) {
  return (
    <ListItem component="a" href={to}>
      <ListItemText primary={text} />
    </ListItem>
  );
}

export default Navigation;
