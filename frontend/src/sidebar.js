import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Avatar, Box, Button, Divider, Typography } from '@mui/material';
import { Home, Info, Lock, Help, Menu, Gavel, PrivacyTip } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleListItemClick = (index) => {
    setActiveItem(index);
  };

  return (
    <>
      <IconButton onClick={toggleDrawer}>
        <Menu />
      </IconButton>
      <Drawer anchor="left" open={isOpen} onClose={toggleDrawer}>
        <Box
          sx={{
            width: 250,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
            p: 2,
            // background: '#385850',
            background: 'linear-gradient(45deg, black, transparent)',
            color: '#fff',
            pt:30
          }}
        >
          {/* Logo and Profile Section */}
          {/* <Box>
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
          </Box> */}

          {/* Menu Items */}
          <Box>
            <List>
              {[
                { text: 'Home', icon: <Home />, link: '/home' },
                { text: 'About Us', icon: <Info />, link: '/about' },
                { text: 'Terms & Conditions', icon: <Gavel />, link: '/terms' },
                // { text: 'Privacy Policy', icon: <PrivacyTip />, link: '/privacy' },
                { text: 'Help Center', icon: <Help />, link: '/help' },
              ].map((item, index) => (
                <ListItem
                  button
                  key={item.text}
                  onClick={() => handleListItemClick(index)}
                  sx={{
                    backgroundColor: activeItem === index ? 'rgba(255, 255, 255, 0.2)' : 'revert-layer',
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

          {/* Bottom Login Button */}
          <Box>
            <Divider sx={{ mb: 2, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
            <Button
              component={Link}  // Add this line to make the button a link
              to="/admin-login"        // Set the path for the login page
              variant="contained"
              color="secondary"
              fullWidth
              startIcon={<Lock />}
              sx={{
                backgroundColor: '#F9AA33',
                '&:hover': {
                  backgroundColor: '#F9AA33',
                },
              }}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;
