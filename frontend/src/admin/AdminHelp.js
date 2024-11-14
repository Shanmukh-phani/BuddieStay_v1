import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Paper, Divider } from '@mui/material';
import { AppBar,IconButton,Grid, Card, CardContent, Avatar } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { ArrowBack, Place as PlaceIcon } from '@mui/icons-material';
import Footer from '../Footer';
import Header_sub from '../Header_sub';



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
  
  
const HelpCenter = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How do I add a new hostel to the system?",
      answer: "Navigate to the 'Hostels' section in the admin dashboard, and click on 'Add New Hostel.' Fill in the necessary details, such as name, location, and contact information, then save.",
    },
    {
      question: "How do I manage room availability?",
      answer: "In the 'Rooms' section, you can add, edit, or mark rooms as occupied or available. You can also view room details and assign specific tenants to each room.",
    },
    {
      question: "What should I do if I encounter a technical issue?",
      answer: "If you encounter an issue, try refreshing the page or clearing your cache. If the problem persists, contact support at support@hostelmanage.com.",
    },
    {
      question: "How can I view and manage tenant payments?",
      answer: "In the 'Payments' section, you can view all payment transactions, including pending and completed payments. You can also generate reports for specific tenants or time periods.",
    },

  ];

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Inside your component
const navigate = useNavigate();


const handleBackClick = () => {
  navigate(-1); // Go back to the previous page
};


const [drawerOpen, setDrawerOpen] = useState(false);


const handleDrawerClose = () => {
setDrawerOpen(false);
};




  return (
    <div style={{
      padding: '40px',
      fontFamily: 'Roboto, Arial, sans-serif',
    //   backgroundColor: '#f5f7fa',
      color: '#333',
      borderRadius: '8px',
    //   boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
      maxWidth: '800px',
      margin: '20px auto'
    }}>
<Header_sub/>

      <h1 style={{
        fontFamily: 'Lora, serif',
        fontWeight: '500',
        fontSize: '2em',
        color: 'darkcyan',
        marginBottom: '30px',
        marginTop:'50px',
        textAlign: 'center'
      }}>Help Center</h1>
      {faqs.map((faq, index) => (
        <div key={index} style={{
          marginBottom: '15px',
          padding: '15px',
          border: '1px solid #ddd',
          borderRadius: '5px',
          backgroundColor: '#fff',
          cursor: 'pointer'
        }}>
          <h3 onClick={() => handleToggle(index)} style={{
            fontFamily: 'Lora, serif',
            fontWeight: '500',
            fontSize: '1.1em',
            color: activeIndex === index ? '#007BFF' : '#2d2d2d',
            marginBottom: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            {faq.question}
            <span style={{
              fontSize: '1.2em',
              transform: activeIndex === index ? 'rotate(180deg)' : 'rotate(0)',
              transition: 'transform 0.2s ease'
            }}>⌄</span>
          </h3>
          {activeIndex === index && (
            <p style={{
              fontSize: '1em',
              lineHeight: '1.6',
              color: '#555',
              fontWeight: '300',
              paddingTop: '10px'
            }}>{faq.answer}</p>
          )}
        </div>
      ))}
      <Footer/>
    </div>
  );
};

export default HelpCenter;
