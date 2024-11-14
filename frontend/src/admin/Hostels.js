import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Button, Grid, Alert, Avatar, Box, Paper } from '@mui/material';

const Hostels = () => {
    const [hostels, setHostels] = useState([]);
    const [error, setError] = useState('');
    const token = localStorage.getItem('authToken'); // Retrieve the token
    const phone = localStorage.getItem('phone'); // Assuming phone number is saved here
    const currentHostelId = localStorage.getItem('hostel_id'); // Get the current hostel ID

    useEffect(() => {
        const fetchHostels = async () => {
            if (!token || !phone) {
                setError('Missing token or phone number.');
                return;
            }

            try {
                const response = await axios.get(`${process.env.REACT_APP_URL}/admin/hostels/phone`, {
                    params: { phone },
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setHostels(response.data);
            } catch (error) {
                console.error(error);
                setError('Could not fetch hostels. Please try again.');
            }
        };

        fetchHostels();
    }, [phone, token]);

    const handleSwitchHostel = (newHostelId) => {
        // Update hostel_id in localStorage
        localStorage.setItem('hostel_id', newHostelId);
        
        // Refresh the page to load data for the new hostel
        window.location.reload();
    };

    return (
        <div style={{ padding: '1px' }}>
            {/* <Typography variant="h4" gutterBottom>
                Switch Hostels
            </Typography>
 */}


            {error && <Alert severity="error" style={{ marginBottom: '20px' }}>{error}</Alert>}
            
  
            {/* <Grid container spacing={3}>
  {hostels.map((hostel) => (
    <Grid item xs={12} sm={6} md={4} key={hostel._id}>
      <Paper elevation={3} sx={{ display: 'flex', alignItems: 'center', padding: 2, transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.05)', boxShadow: 6 } }}>
        <Avatar
          src="/path/to/hostel/image.jpg" // Replace with dynamic image URL if available
          alt={hostel.hostel_name}
          sx={{ width: 70, height: 70, marginRight: 2 }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            {hostel.hostel_name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {hostel.hostel_city}
          </Typography>
        </CardContent>
        {currentHostelId !== hostel._id && (
          <Box>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleSwitchHostel(hostel._id)}
              sx={{ '&:hover': { backgroundColor: 'darkblue' } }} // Change button hover color
            >
              Switch
            </Button>
          </Box>
        )}
      </Paper>
    </Grid>
  ))}
</Grid> */}


<Grid container spacing={2}>
  {hostels.map((hostel) => (
    <Grid item xs={12} key={hostel._id}>
      <Paper 
        elevation={3} 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          padding: 1, 
          borderRadius: 2,
          backgroundColor: currentHostelId === hostel._id ? '#f0c674' : '#ffffff',
 // Light background color for active
          transition: 'transform 0.2s',
          '&:hover': { 
            transform: 'scale(1.02)', 
            boxShadow: 6 
          }
        }}
      >
        {/* Active indicator */}
        {currentHostelId === hostel._id && (
          <Box sx={{ 
            width: 20, 
            height: 20, 
            borderRadius: '50%', 
            backgroundColor: 'green', 
            marginRight: 2,
            position:'absolute',
            right:'40px',

          }} />
        )}
        <Avatar
          src="/path/to/hostel/image.jpg" // Replace with dynamic image URL if available
          alt={hostel.hostel_name}
          sx={{ width: 70, height: 70, marginRight: 2 }}
        />
        <Box sx={{ flexGrow: 1 }}>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ fontWeight: 'bold', fontSize: '0.875rem' }} // Reduced text size
          >
            {hostel.hostel_name}
          </Typography>
          <Typography 
            variant="subtitle1" 
            color="text.secondary" 
            sx={{ fontSize: '0.75rem' }} // Smaller subtitle text size
          >
            {hostel.hostel_area}
          </Typography>
        </Box>
        {currentHostelId !== hostel._id && (
          <Button
            variant="contained"
            // color="primary"
            style={{backgroundColor:'darkcyan'}}
            onClick={() => handleSwitchHostel(hostel._id)}
            sx={{ 
              '&:hover': { backgroundColor: 'darkblue' }, 
              paddingX: 2 
            }} // Change button hover color
          >
            Switch
          </Button>
        )}
      </Paper>
    </Grid>
  ))}
</Grid>



        </div>
    );
};

export default Hostels;




