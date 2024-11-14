import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Paper, Divider } from '@mui/material';
import { AppBar,IconButton,Grid, Card, CardContent, Avatar } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { ArrowBack, Place as PlaceIcon } from '@mui/icons-material';
import Footer from '../Footer';
import Header_sub from '../Header_sub';





const StyledContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(0),
  backgroundColor: '#f9f9f9',
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: '#ffffff',
  // boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Default shadow
  borderRadius: theme.shape.borderRadius,
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  marginBottom: theme.spacing(3),
  color: '#006399',
}));

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
  



const TermsAndConditions = () => {



  const terms = [
    {
      title: "Acceptance of Terms",
      description:
        "By accessing and using our software, you agree to comply with and be bound by these terms and conditions. If you disagree with any part of the terms, you may not use our services.",
    },
    {
      title: "User Responsibilities",
      description:
        "Users are responsible for maintaining the confidentiality of their account credentials and for all activities that occur under their account.",
    },
    {
      title: "Service Availability",
      description:
        "We strive to ensure the software is available 24/7; however, we do not guarantee uninterrupted access and reserve the right to suspend the service for maintenance or updates.",
    },
    {
      title: "Data Privacy",
      description:
        "We are committed to protecting your personal information. All data collected is used solely for providing and improving our services, in accordance with our Privacy Policy.",
    },
    {
      title: "Subscription & Payment",
      description:
        "Access to certain features of the software may require a subscription. Users agree to provide accurate payment information and comply with the payment terms.",
    },
    {
      title: "Cancellation & Refunds",
      description:
        "Users may cancel their subscription at any time. Refunds will be issued only in accordance with our refund policy.",
    },
    {
      title: "Intellectual Property",
      description:
        "All content and software provided by us are protected by intellectual property laws. Users are prohibited from copying, distributing, or creating derivative works without our permission.",
    },
    {
      title: "Limitation of Liability",
      description:
        "We are not liable for any indirect, incidental, or consequential damages arising from the use of our software.",
    },
    {
      title: "Amendments",
      description:
        "We reserve the right to modify these terms at any time. Users will be notified of significant changes, and continued use of the service constitutes acceptance of the new terms.",
    },
    {
      title: "Governing Law",
      description:
        "These terms are governed by and construed in accordance with the laws of the relevant jurisdiction.",
    },
  ];






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


const handleBackClick = () => {
  navigate(-1); // Go back to the previous page
};




const [selectedCity, setSelectedCity] = useState('');
const [isLocationDialogOpen, setIsLocationDialogOpen] = useState(false);
// Store the selected city in local storage

const [drawerOpen, setDrawerOpen] = useState(false);


const handleDrawerClose = () => {
setDrawerOpen(false);
};



  return (


    <div style={{
      padding: '30px',
      fontFamily: 'Roboto, Arial, sans-serif',
      color: '#333',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
    }}>
   
   <Header_sub/>

      <h2 style={{
        fontFamily: 'Lora, serif',
        fontWeight: '500',
        fontSize: '1.8em',
        color: 'darkcyan',
        marginBottom: '20px',
        marginTop:'70px',
        textAlign: 'center'
      }}>Terms and Conditions</h2>
      {terms.map((term, index) => (
        <div key={index} style={{ marginBottom: '25px' }}>
          <h3 style={{
            fontFamily: 'Lora, serif',
            fontWeight: '500',
            fontSize: '1.2em',
            color: '#2d2d2d',
            marginBottom: '10px'
          }}>{term.title}</h3>
          <p style={{
            fontSize: '1em',
            lineHeight: '1.6',
            color: '#555',
            fontWeight: '300'
          }}>{term.description}</p>
        </div>
      ))}
      <Footer/>
    </div>

  );
};

export default TermsAndConditions;
