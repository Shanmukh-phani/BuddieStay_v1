import React, { useEffect, useState } from "react";
import {
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    Box,
    Typography,
    Button,
    Container,
    Paper,
    AppBar,
    IconButton
} from "@mui/material";
import {
    AccountCircle,
    PrivacyTip,
    Gavel,
    HelpOutline,
    Payments,
    ReportProblem,
    Notifications,
    RestaurantMenu,
    ExitToApp,
    Star,
} from "@mui/icons-material";
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';

// import BottomNavBar from "./BottomNavBar";
import { ToastContainer } from "react-toastify";
import { styled } from '@mui/system';
// import AdminSidebar from './AdminSidebar';
import { Link } from "react-router-dom";
import profileImage from '../assets/buddie.jpg';
import { useNavigate } from 'react-router-dom';
import HeaderSub_Buddie from '../HeaderSub_Buddie';
import Footer from '../Footer';
import axios from "axios";


const HeaderContainer = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    mb: 4,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '14px 16px',
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


const BuddieHome = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const buddieId = localStorage.getItem('buddie_id');
    const [hasDhobi, setHasDhobi] = useState(false);
    const [hostelId, setHostelId] = useState(null);

    useEffect(() => {
        const fetchHostelInfo = async () => {
            try {
                // Fetch hostel info using the combined API
                const response = await axios.get(`${process.env.REACT_APP_URL}/buddie/getHostelInfo/${buddieId}`);
                setHostelId(response.data.hostel_id);
                setHasDhobi(response.data.hostel_dhobi || false); // Default to false if undefined
            } catch (error) {
                console.error('Error fetching hostel info:', error);
            }
        };

        if (buddieId) {
            fetchHostelInfo();
        }
    }, [buddieId]);


    const handleProfileIconClick = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };
    const navigate = useNavigate();


    const handleLogout = () => {
      // Clear the auth token from localStorage
      localStorage.removeItem('buddieAuthToken');
      localStorage.removeItem('buddie_id');
    
      // Optionally, you can also clear the entire localStorage like this (not recommended if there are other keys you want to keep):
      // localStorage.clear();
    
      // Redirect to the login page
      navigate('/buddie-login'); // Assuming you are using react-router for navigation
    };

    return (

        
        <Container maxWidth="sm" sx={{ mt: 4 }}>
      {/* <AppBar position="static">
        <HeaderContainer>
          <Box display="flex" alignItems="center">
            <StayText variant="h4" component="h1">
              Stay
            </StayText>
            <BuddieText variant="h4" component="h1">
              Buddie
            </BuddieText>
          </Box>
          <ProfileIcon onClick={handleProfileIconClick}>
            <img src={profileImage} alt="Profile" style={{ width: '100%', height: '100%' }} />
          </ProfileIcon>
        </HeaderContainer>
      </AppBar> */}

      <HeaderSub_Buddie/>

            <Typography variant="h5" align="center" gutterBottom mt={10}>
                Welocme Back!
            </Typography>

            <Grid container spacing={2} sx={{ mb: 3 ,mt:5}}>
                <Grid item xs={6} component={Link} to="/buddie/profile">
                    <Paper elevation={3} sx={{ p: 2, textAlign: "center" }}>
                        <AccountCircle fontSize="large" />
                        <Typography variant="subtitle1">Profile</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={6} component={Link} to="/buddie/payments">
                    <Paper elevation={3} sx={{ p: 2, textAlign: "center" }}>
                        <Payments fontSize="large" />
                        <Typography variant="subtitle1">Payments</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={6} component={Link} to="/buddie/complaint">
                    <Paper elevation={3} sx={{ p: 2, textAlign: "center" }}>
                        <ReportProblem fontSize="large" />
                        <Typography variant="subtitle1">Complaints</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={6} component={Link} to="/buddie/rating">
                    <Paper elevation={3} sx={{ p: 2, textAlign: "center" }} >
                        <Star fontSize="large" />

                        <Typography variant="subtitle1">Rate Hostel</Typography>
                    </Paper>
                </Grid>
                {hasDhobi && (
                <Grid item xs={6} component={Link} to="/buddie/dhobi">
                    <Paper elevation={3} sx={{ p: 2, textAlign: "center" }} >
                    <LocalLaundryServiceIcon fontSize="large" />
                        <Typography variant="subtitle1">Dhobi</Typography>
                    </Paper>
                </Grid>
                    )}
            </Grid>

            {/* <Box sx={{ bgcolor: "background.paper", borderRadius: 2, boxShadow: 3 }}>
                <List sx={{ py: 0 }}>
                    <ListItem button sx={{ py: 2 }}>
                        <ListItemIcon>
                            <Notifications />
                        </ListItemIcon>
                        <ListItemText primary="Notifications" />
                    </ListItem>
                    <Divider />
                    <ListItem button sx={{ py: 2 }}>
                        <ListItemIcon>
                            <Gavel />
                        </ListItemIcon>
                        <ListItemText primary="Terms and Conditions" />
                    </ListItem>
                    <Divider />
                    <ListItem button sx={{ py: 2 }}>
                        <ListItemIcon>
                            <HelpOutline />
                        </ListItemIcon>
                        <ListItemText primary="FAQs" />
                    </ListItem>
                    <Divider />
                    <ListItem button sx={{ py: 2 }}>
                        <ListItemIcon>
                            <PrivacyTip />
                        </ListItemIcon>
                        <ListItemText primary="Privacy Policy" />
                    </ListItem>
                </List>
            </Box> */}





            <Box sx={{ p: 2, mt: 3, display: "flex", justifyContent: "center", mb: 0, position: 'static' }}>
                <Button
                    variant="contained"
                    color="error"
                    startIcon={<ExitToApp />}
                    fullWidth
                    onClick={handleLogout}
                >
                    Logout
                </Button>
            </Box>
            {/* <BottomNavBar /> */}
            <ToastContainer />

            <Footer/>
        </Container>
    );
};

export default BuddieHome;
