// import React, { useState, useEffect } from 'react';
// import { AppBar, Toolbar, Typography, IconButton, DialogContent, DialogTitle,DialogActions,Card, Dialog, CardContent, Grid, Box, Link, Button } from '@mui/material';
// import { styled } from '@mui/system';
// import profileImage from './assets/buddie.jpg';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { List, ListItem, ListItemText } from '@mui/material';
// import { ArrowBack, Place as PlaceIcon } from '@mui/icons-material';




// import SBLOGO from './assets/hostel1.jpg';
// import { useNavigate } from 'react-router-dom';


// const HeaderContainer = styled(Box)({
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     mb: 4,
//     // boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//     padding: '14px 16px',
//     position: 'fixed',
//     top: 0,
//     left: 0,
//     width: '100%',
//     boxSizing: 'border-box',
//     backgroundColor: 'darkcyan',
//     // backgroundColor: '#ff6f61',
//     //  backgroundColor: '#ffcc00',
//     //backgroundColor: '#273746',
//     zIndex: 1000,
// });

// const StayText = styled(Typography)({
//     fontFamily: '"Sofia", sans-serif',
//     fontSize: '24px',
//     fontWeight: 'bold',
//     // color: '#ffdb00',
//     // color: '#ffd1a9',
//     color: 'lavender',
//     //    color: '#ffffff',
//     //   color: '#a8e6cf',
// });

// const BuddieText = styled(Typography)({
//     fontFamily: '"Sofia", sans-serif',
//     fontSize: '24px',
//     fontWeight: 'bold',
//     //  color: '#FFFFFF', --
//     // color: '#ff7f00',
//     // color: '#ff6800',
//     // color: 'lightsalmon'
//     color: '#f0c674',
//     //    color: '#273746'
// });

// const ProfileIcon = styled(IconButton)({
//     borderRadius: '50%',
//     backgroundColor: '#ddd',
//     width: '40px',
//     height: '40px',
// });





// // Home component
// const Header = () => {

//     const navigate = useNavigate();

//     const handleBackClick = () => {
//         navigate(-1);
//     };

//     return (
       
// <>
// <AppBar position="static">
//                             <HeaderContainer>
//                                 <Box display="flex" alignItems="center">
//                                     <IconButton
//                                         edge="start"
//                                         aria-label="back"
//                                         style={{
//                                             backgroundColor: '#ffffff',
//                                             color: '#006399',
//                                             // borderRadius: '50%',
//                                             // boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//                                             padding: '8px',
//                                             // marginRight: '20px',
//                                         }}
//                                         onClick={handleBackClick}
//                                     >
//                                         <ArrowBack />
//                                     </IconButton>
//                                     <StayText variant="h4" component="h1" style={{ marginLeft: '25px' }}>
//                                         Stay
//                                     </StayText>
//                                     <BuddieText variant="h4" component="h1">
//                                         Buddie
//                                     </BuddieText>

//                                 </Box>

//                                 <Box>
//                                     <ProfileIcon>
//                                         <img src={SBLOGO} alt="Profile" style={{ width: '175%', height: '175%', borderRadius: '50%' }} />
//                                     </ProfileIcon>
//                                 </Box>

//                             </HeaderContainer>
//                         </AppBar>
//         </>

//     );
// };

// export default Header;









import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import { styled } from '@mui/system';
import { ArrowBack, Notifications } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import SBLOGO from './assets/SBLOGO1.jpeg';

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
    color: '#f0c674',
    // color:'tomato'
});

const ProfileIcon = styled(IconButton)({
    borderRadius: '50%',
    backgroundColor: 'grey',
    width: '40px',
    height: '40px',
});


const Header = () => {
    const navigate = useNavigate();
    const [counts, setCounts] = useState({ pendingComplaints: 0, pendingPayments: 0, unapprovedBuddies: 0 });

    const handleBackClick = () => {
        navigate(-1);
    };

    const hostel_id = localStorage.getItem('hostel_id'); // Example of getting it from local storage




    // Navigate to settings page on bell icon click
    const handleBellClick = () => {
        // navigate('/admin/settings'); // Adjust this route to your settings page route
    };

    return (
        <>
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

                    <Box display="flex" alignItems="center">
                    

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
