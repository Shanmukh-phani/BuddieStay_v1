import React from 'react';
import { Box, Typography, Chip, styled } from '@mui/material';
import Lottie from 'react-lottie';
import animationData from './assets/Animation1.json'; // Your Lottie JSON file

const LocationChip = styled(Chip)({
  // marginTop: '100px',
  fontFamily: 'Anta',
  fontSize: '18px',
  // fontWeight: 'bold',
  marginLeft: '14px',
  color: '#000000',
  backgroundColor:'white',
  // color: '#ff7f00',
  // color: '#ff6800',
  // color: 'lightsalmon'
});


const LoadingScreen = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#fff"
    >
      <Lottie options={defaultOptions} height={200} width={200} />

      <Box display="flex" alignItems="center" justifyContent="space-between">
        <LocationChip label={'Please Stay...!'} />
      </Box>
    </Box>
  );
};

export default LoadingScreen;
