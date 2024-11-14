import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton, DialogContent, DialogTitle,DialogActions,Card, Dialog, CardContent, Grid, Box, Link, Button } from '@mui/material';
import { styled } from '@mui/system';
import profileImage from './assets/buddie.jpg';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { List, ListItem, ListItemText } from '@mui/material';
import { ArrowBack, Place as PlaceIcon } from '@mui/icons-material';
import { Notifications } from '@mui/icons-material';
import SBLOGO from './assets/SBLOGO1.jpeg';




import ImgHostel1 from './assets/hostel1.jpg';
import { useNavigate } from 'react-router-dom';


const HeaderContainer = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    mb: 4,
    // boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '14px 16px',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    boxSizing: 'border-box',
    backgroundColor: 'darkcyan',
    // backgroundColor: '#ff6f61',
    //  backgroundColor: '#ffcc00',
    //backgroundColor: '#273746',
    zIndex: 1000,
});

const StayText = styled(Typography)({
    fontFamily: '"Sofia", sans-serif',
    fontSize: '24px',
    fontWeight: 'bold',
    // color: '#ffdb00',
    // color: '#ffd1a9',
    // color: 'lavender',
     color:'white'
    //    color: '#ffffff',
    //   color: '#a8e6cf',
});

const BuddieText = styled(Typography)({
    fontFamily: '"Sofia", sans-serif',
    fontSize: '24px',
    fontWeight: 'bold',
    //  color: '#FFFFFF', --
    // color: '#ff7f00',
    // color: '#ff6800',
    // color: 'lightsalmon'
    color: '#f0c674',
    // color:'tomato'
    //    color: '#273746'
});

const ProfileIcon = styled(IconButton)({
    borderRadius: '50%',
    backgroundColor: 'grey',
    width: '40px',
    height: '40px',
});





// Home component
const Header = () => {

    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1);
    };


    const hostel_id = localStorage.getItem('hostel_id'); // Example of getting it from local storage


    const [counts, setCounts] = useState({ pendingComplaints: 0, pendingPayments: 0, unapprovedBuddies: 0 });

    const fetchCounts = async (hostel_id) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_URL}/admin/status-count?hostel_id=${hostel_id}`); // Add hostel_id to the URL
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setCounts(data);
        } catch (error) {
            console.error('Error fetching counts:', error);
        }
    };

    useEffect(() => {
        fetchCounts(hostel_id); // Fetch counts when the component mounts
    }, [hostel_id]);

    // Navigate to settings page on bell icon click
    const handleBellClick = () => {
        navigate('/admin/settings'); // Adjust this route to your settings page route
    };




    return (
       
<>
<AppBar position="static">
                            <HeaderContainer>
                                <Box display="flex" alignItems="center">
                                    {/* <IconButton
                                        edge="start"
                                        aria-label="back"
                                        style={{
                                            backgroundColor: '#ffffff',
                                            color: '#006399',
                                            // borderRadius: '50%',
                                            // boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                            padding: '8px',
                                            // marginRight: '20px',
                                        }}
                                        onClick={handleBackClick}
                                    > */}
                                        {/* <ArrowBack /> */}
                                    {/* </IconButton> */}
                                    <StayText variant="h4" component="h1" style={{ marginLeft: '0px' }}>
                                        Stay
                                    </StayText>
                                    <BuddieText variant="h4" component="h1">
                                        Buddie
                                    </BuddieText>

                                </Box>

                                <Box display="flex" alignItems="center">
                        <IconButton
                            aria-label="notifications"
                            style={{ color: '#ffffff',}}
                            onClick={handleBellClick} // Call handleBellClick on click
                        >
                            <Notifications style={{fontSize:'35px'}}/>
                            {/* Show count badge */}
                            {counts.pendingComplaints + counts.pendingPayments + counts.unapprovedBuddies > 0 && (
                                <span
                                    style={{
                                        position: 'absolute',
                                        top: '8px',
                                        right: '8px',
                                        backgroundColor: 'tomato',
                                        color: 'white',
                                        borderRadius: '50%',
                                        padding: '2px 5px',
                                        fontSize: '12px',
                                    }}
                                >
                                    {counts.pendingComplaints + counts.pendingPayments + counts.unapprovedBuddies}
                                </span>
                            )}
                        </IconButton>

                        <ProfileIcon>
                            <img src={SBLOGO} alt="Profile" style={{ width: '150%', height: '150%', borderRadius: '50%' }} />
                        </ProfileIcon>
                    </Box>
                            

                            </HeaderContainer>
                        </AppBar>


        </>

    );
};

export default Header;
