import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton, DialogContent, DialogTitle,DialogActions,Card, Dialog, CardContent, Grid, Box, Link, Button } from '@mui/material';
import { styled } from '@mui/system';
import profileImage from './assets/buddie.jpg';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { List, ListItem, ListItemText } from '@mui/material';
import { Place as PlaceIcon } from '@mui/icons-material';




const HeaderContainer = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    // justifyContent: 'flex-start',
    justifyContent: 'space-between',
    mb: 4,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '14px 16px',
    // borderRadius: '4px',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    boxSizing: 'border-box',
    backgroundColor: '#fff',
    zIndex: 1000,
  });
  
  const StayText = styled(Typography)({
    fontFamily: '"Sofia", sans-serif',
    fontSize: '24px',
    fontWeight: 'bold',
    color: 'orange',
  });
  
  const BuddieText = styled(Typography)({
    fontFamily: '"Sofia", sans-serif',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
  });
  
  
  const ProfileIcon = styled(IconButton)({
    borderRadius: '50%',
    backgroundColor: '#ddd',
    width: '40px',
    height: '40px',
  });
  





// Home component
const Header = () => {



    const [selectedCity, setSelectedCity] = useState('');
const [isLocationDialogOpen, setIsLocationDialogOpen] = useState(false);

const handleLocationClick = () => {
  setIsLocationDialogOpen(true);
};

const handleLocationDialogClose = () => {
  setIsLocationDialogOpen(false);
};

const handleCitySelect = (city) => {
  setSelectedCity(city);
};

const handleLocationConfirm = () => {
  // Store the selected city in local storage
  localStorage.setItem('selectedCity', selectedCity);
  setIsLocationDialogOpen(false);
};

    return (
       
<>
            <AppBar position="static">
                <HeaderContainer>
                    <Box display="flex" alignItems="center">
                        <IconButton color="inherit" onClick={handleLocationClick}>
                            <PlaceIcon style={{ color: '#006399' }} />
                            <Typography variant="h6" style={{ marginRight: '16px', color: '#333' }}>
                                {selectedCity || 'Select City'}
                            </Typography>
                        </IconButton>
                    </Box>
                    <Box display="flex" alignItems="center">
                        <StayText variant="h4" component="h1" style={{ color: '#006399' }}>
                            Stay
                        </StayText>
                        <BuddieText variant="h4" component="h1" style={{ marginRight: '10px' }}>
                            Buddie
                        </BuddieText>
                        <ProfileIcon>
                            <img src={profileImage} alt="Profile" style={{ width: '100%', height: '100%' }} />
                        </ProfileIcon>
                    </Box>
                </HeaderContainer>
            </AppBar>

            {/* Location Dialog */}
            <Dialog open={isLocationDialogOpen} onClose={handleLocationDialogClose} fullWidth={true} maxWidth="sm">
                <DialogTitle>Select a City</DialogTitle>
                <DialogContent>
                    <List>
                        <ListItem button selected={selectedCity === 'Hyderabad'} onClick={() => handleCitySelect('Hyderabad')}>
                            <ListItemText primary="Hyderabad" />
                        </ListItem>
                        <ListItem button selected={selectedCity === 'Mumbai'} onClick={() => handleCitySelect('Mumbai')}>
                            <ListItemText primary="Mumbai" />
                        </ListItem>
                        <ListItem button selected={selectedCity === 'Chennai'} onClick={() => handleCitySelect('Chennai')}>
                            <ListItemText primary="Chennai" />
                        </ListItem>
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleLocationDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleLocationConfirm} color="primary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </>

    );
};

export default Header;
