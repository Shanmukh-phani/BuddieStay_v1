import React, { useState, useEffect } from 'react';
import { AppBar,IconButton,Box, Typography, Grid, Card, CardContent, Avatar, Container } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import Sidebar from './sidebar';
import Footer from './Footer';

import { ArrowBack, Place as PlaceIcon } from '@mui/icons-material';


import img1 from './assets/about1.png';
import img2 from './assets/about2.png';
import img3 from './assets/about3.png';



const HeaderContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  mb: 4,
  padding: '14px 16px',
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  boxSizing: 'border-box',
  backgroundColor: 'darkcyan',
  zIndex: 1000,
});

const StayText = styled(Typography)({
  fontFamily: '"Sofia", sans-serif',
  fontSize: '24px',
  fontWeight: 'bold',
  // color: 'lavender',
  color:'white'
});

const BuddieText = styled(Typography)({
  fontFamily: '"Sofia", sans-serif',
  fontSize: '24px',
  fontWeight: 'bold',
  // color: '#f0c674',
  color:'tomato'
});
  



const StyledContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4, 2),
  backgroundColor: '#f0f4f8',
  borderRadius: '8px',
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '2rem',
  fontWeight: 'bold',
  marginBottom: theme.spacing(3),
  color: '#006399',
}));

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(2),
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
  borderRadius: theme.spacing(2),
  textAlign: 'center',
  backgroundColor: '#ffffff',
  border: '1px solid #e0e0e0',
}));

const IconAvatar = styled(Avatar)(({ theme }) => ({
  width: 100,
  height: 100,
  marginBottom: theme.spacing(2),
  backgroundColor: '#e0f7fa',
}));

const AboutUs = () => {

    useEffect(() => {
        // Check if a city is stored in local storage
        const storedCity = localStorage.getItem('selectedCity');
        if (storedCity) {
          setSelectedCity(storedCity);
        } else {
          // If no city is stored, open the location dialog
          setIsLocationDialogOpen(true);
        }
      }, []);
    
    
    
      const [open, setOpen] = useState(false);
    
      const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    


  // Inside your component
  const navigate = useNavigate();

  const handleCityClick = (city) => {
    // Navigate to the hostels page with the city name as a query parameter
    navigate(`/hostels?city=${city.name}`);
  };



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

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleProfileIconClick = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };


  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };


  return (
<div>

<AppBar position="static">
                <HeaderContainer>
                    <Box display="flex" alignItems="center">
                        <IconButton
                            edge="start"
                            aria-label="back"
                            style={{
                                backgroundColor: '#ffffff',
                                color: '#006399',
                                padding: '8px',
                            }}
                            onClick={handleBackClick}
                        >
                            <ArrowBack />
                        </IconButton>
                        <StayText variant="h4" component="h1" style={{ marginLeft: '25px' }}>
                            Stay
                        </StayText>
                        <BuddieText variant="h4" component="h1">
                            Buddie
                        </BuddieText>
                    </Box>
                    <Sidebar open={drawerOpen} onClose={handleDrawerClose} />

                    {/* <ProfileIcon>
                            <img src={SBLOGO} alt="Profile" style={{ width: '150%', height: '150%', borderRadius: '50%' }} />
                        </ProfileIcon> */}
              
                </HeaderContainer>
            </AppBar>



    <StyledContainer maxWidth="lg" style={{marginTop:'60px'}}>
      <SectionTitle variant="h2" align="center" style={{color:'darkcyan'}}> 
        About Us
      </SectionTitle>

      <Typography variant="h6" align="center" paragraph>
        We provide software to hostels to streamline their management processes, allowing owners to focus on creating a comfortable and efficient environment for their residents.
      </Typography>

      <Grid container spacing={4} justifyContent="center" sx={{ marginTop: '20px' }}>
        <Grid item xs={12} md={4}>
          <StyledCard>
          <IconAvatar style={{ width: '200px', height: '200px', overflow: 'hidden' }}>
  <img 
    src={img3} 
    alt="Our Mission" 
    style={{
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center'
    }} 
  />
</IconAvatar>

            <Typography variant="h6" gutterBottom style={{color:'tomato',fontWeight:'bold'}}>
              OUR MISSION
            </Typography>
            <Typography variant="body2">
              To empower hostel owners with innovative software that simplifies management tasks and optimizes resources.
            </Typography>
          </StyledCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <StyledCard>
          <IconAvatar style={{ width: '200px', height: '200px', overflow: 'hidden' }}>
  <img 
    src={img2} 
    alt="Our Vision" 
    style={{
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center'
    }} 
  />
</IconAvatar>
<Typography variant="h5" gutterBottom style={{color:'tomato',fontWeight:'bold'}}>
              OUR VISION
            </Typography>
            <Typography variant="body2">
              To be the global leader in hostel management solutions, known for our user-friendly interface and exceptional customer support.
            </Typography>
          </StyledCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <StyledCard>
          <IconAvatar style={{ width: '200px', height: '200px', overflow: 'hidden' }}>
  <img 
    src={img1} 
    alt="Our Values" 
    style={{
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center'
    }} 
  />
</IconAvatar>
            <Typography variant="h6" gutterBottom style={{color:'tomato',fontWeight:'bold'}}>
              OUR VALUES
            </Typography>
            <Typography variant="body2">
              Innovation, integrity, and customer satisfaction are at the heart of everything we do.
            </Typography>
          </StyledCard>
        </Grid>
      </Grid>

      <Box mt={6} textAlign="center" bgcolor="#e3f2fd" p={4} borderRadius="8px">
        <Typography variant="h4" color="primary" gutterBottom  style={{color:'darkcyan'}}>
          Why Choose Us?
        </Typography>
        <Typography variant="body1" paragraph>
          Our software is designed specifically for hostel management, offering features like automated booking, resident management, financial tracking, and real-time reporting.
        </Typography>
        <Typography variant="body1">
          Join hundreds of hostel owners who have streamlined their operations and increased profitability with our software.
        </Typography>
      </Box>
    </StyledContainer>
    <Footer/>

    </div>
  );
};

export default AboutUs;
