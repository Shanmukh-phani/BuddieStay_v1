import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Avatar, Box, Button, Divider, Typography } from '@mui/material';
import { Home, Info, Lock, Help, Menu, Gavel, PrivacyTip, ExitToApp } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Assume user is logged in. Change as necessary.
  
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleListItemClick = (index) => {
    setActiveItem(index);
  };

  const handleLogout = () => {
    // Clear authentication data (if any)
    localStorage.removeItem('authToken'); // or sessionStorage.removeItem('authToken') if you use sessionStorage
    localStorage.removeItem('hostel_id'); // or sessionStorage.removeItem('authToken') if you use sessionStorage


    setIsLoggedIn(false);
    // Redirect to login page
    navigate('/admin-login');
  };

  return (
    <>
      {/* <IconButton onClick={toggleDrawer}> */}
        <Menu onClick={toggleDrawer}/>
      {/* </IconButton> */}
      <Drawer anchor="left" open={isOpen} onClose={toggleDrawer}>
        <Box
          sx={{
            width: 250,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
            p: 2,
            background: 'linear-gradient(135deg, #1e3c72, #2a5298)',
            color: '#fff',
          }}
        >
          {/* Logo and Profile Section */}
          <Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mb: 2,
              }}
            >
              <img src="/path-to-your-logo.png" alt="Logo" width="100" />
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mb: 2,
              }}
            >
              <Avatar
                src="/path-to-profile-image.jpg"
                alt="Profile"
                sx={{ width: 80, height: 80, border: '2px solid #fff' }}
              />
            </Box>
            <Typography align="center" variant="h6" gutterBottom>
              John Doe
            </Typography>
          </Box>

          {/* Menu Items */}
          <Box>
            <List>

              {[
                { text: 'Home', icon: <Home />, link: '/admin/home' },
                { text: 'About Us', icon: <Info />, link: '/about' },
                { text: 'Terms & Conditions', icon: <Gavel />, link: '/terms' },
                { text: 'Privacy Policy', icon: <PrivacyTip />, link: '/privacy' },
                { text: 'Help Center', icon: <Help />, link: '/help' },
              ].map((item, index) => (
                <ListItem
                  button
                  key={item.text}
                  onClick={() => handleListItemClick(index)}
                  sx={{
                    backgroundColor: activeItem === index ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                    borderRadius: '8px',
                    mb: 1,
                  }}
                  component={Link}
                  to={item.link}
                >
                  <ListItemIcon sx={{ color: '#fff' }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} sx={{ color: '#fff' }} />
                </ListItem>
              ))}

              
            </List>

          </Box>

          {/* Bottom Login/Logout Button */}
          <Box>
            <Divider sx={{ mb: 2, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
            {isLoggedIn ? (
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                startIcon={<ExitToApp />}
                onClick={handleLogout}
                sx={{
                  backgroundColor: '#ff6f61',
                  '&:hover': {
                    backgroundColor: '#ff564f',
                  },
                }}
              >
                Logout
              </Button>
            ) : (
              <Button
                component={Link}  // Add this line to make the button a link
                to="/buddie-login"        // Set the path for the login page
                variant="contained"
                color="secondary"
                fullWidth
                startIcon={<Lock />}
                sx={{
                  backgroundColor: '#ff6f61',
                  '&:hover': {
                    backgroundColor: '#ff564f',
                  },
                }}
              >
                Login
              </Button>
            )}
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default AdminSidebar;
