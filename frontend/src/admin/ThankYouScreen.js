import React from 'react';
import { Button, Box, Typography, Container } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';

const ThankYouScreen = () => {
    const navigate = useNavigate();

    const handleBackToHome = () => {
      navigate('/'); // Redirect to home page
    };

  return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '100px' }}>
      <CheckCircleIcon style={{ fontSize: '80px', color: 'green' }} />
      <Typography variant="h4" style={{ marginTop: '20px' }}>
        Thank you for your registration!
      </Typography>
      <Box mt={4}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleBackToHome}
        >
          Back to Home
        </Button>
      </Box>
    </Container>
  );
};

export default ThankYouScreen;
