import React from 'react';
import { Box, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

const Branding = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100px',
        textAlign: 'center',
        position: 'relative',
        p: 4,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontFamily: `'Montserrat', sans-serif`, 
          // fontWeight: 'bold',
          color: 'lightgrey', // Dark color for the main title
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 1,
        }}
      >
        ST
        <HomeIcon
          sx={{
            fontSize: '40px',
            color: '#333',
            mx: 0.5,
            color:'lightgrey'
          }}
        />
        Y BUDDIE
      </Typography>
      <Typography
        variant="h6"
        sx={{
          fontFamily: `'Roboto', sans-serif`, // Changed to Roboto
          fontWeight: '300',
          color: 'lightgrey', // Light grey color for the tagline
          // fontStyle: 'italic',
        }}
      >
        Gateway to the Perfect Stay
      </Typography>
    </Box>
  );
};

export default Branding;
