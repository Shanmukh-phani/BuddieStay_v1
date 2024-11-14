import React, { useState, useEffect } from 'react';
import { AppBar, Button, Card, CardContent, Typography, IconButton, Box, Grid, Skeleton } from '@mui/material';
import { ArrowBack, CheckCircle, Delete } from '@mui/icons-material';
import { styled } from '@mui/system';
import profileImage from '../assets/buddie.jpg';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Header_sub from '../Header_sub';


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

const UnapprovedBuddies = () => {
    const [unapprovedBuddies, setUnapprovedBuddies] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUnapprovedBuddies = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_URL}/admin/unapprovedBuddies`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();
            setUnapprovedBuddies(data);
        } catch (error) {
            console.error('Error fetching unapproved buddies:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUnapprovedBuddies();
    }, []);

    const approveBuddie = async (buddieId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_URL}/admin/approveBuddie/${buddieId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            setUnapprovedBuddies(unapprovedBuddies.filter(b => b._id !== buddieId));
        } catch (error) {
            console.error('Error approving buddie:', error);
        }
    };

    const deleteBuddie = async (buddieId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_URL}/admin/deleteBuddie/${buddieId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            setUnapprovedBuddies(unapprovedBuddies.filter(b => b._id !== buddieId));
        } catch (error) {
            console.error('Error deleting buddie:', error);
        }
    };

    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1);
    };

    return (
        <div>
            <>
                {/* <AppBar position="static">
                    <HeaderContainer>
                        <Box display="flex" alignItems="center">
                            <IconButton edge="start" color="inherit" aria-label="back" style={{ color: 'black' }} onClick={handleBackClick}>
                                <ArrowBack />
                            </IconButton>
                            <StayText variant="h4" component="h1" style={{ marginLeft: '25px', color: '#006399' }}>
                                Stay
                            </StayText>
                            <BuddieText variant="h4" component="h1">
                                Buddie
                            </BuddieText>
                        </Box>

                        <Box>
                            <ProfileIcon>
                                <img src={profileImage} alt="Profile" style={{ width: '100%', height: '100%' }} />
                            </ProfileIcon>
                        </Box>
                    </HeaderContainer>
                </AppBar> */}

<Header_sub/>
                <Box sx={{ padding: 3, mt: 10 }}>
                    <Typography variant="h5" gutterBottom>Pending Requests</Typography>
                    {loading ? (
                        <Grid container spacing={3}>
                            {/* Skeleton loading placeholder for multiple cards */}
                            {[...Array(6)].map((_, index) => (
                                <Grid item xs={12} md={6} lg={4} key={index}>
                                    <Card variant="outlined" sx={{ padding: 2 }}>
                                        <Skeleton variant="rectangular" width="100%" height={40} />
                                        <Skeleton variant="text" width="80%" height={30} sx={{ mt: 2 }} />
                                        <Skeleton variant="text" width="60%" height={30} />
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    ) : (
                        unapprovedBuddies.length === 0 ? (
                            <Typography variant="body1">No unapproved buddies found.</Typography>
                        ) : (
                            <Grid container spacing={3}>
                                {unapprovedBuddies.map(buddie => (
                                    <Grid item xs={12} md={6} lg={4} key={buddie._id}>
                                        <Card variant="outlined" sx={{ display: 'flex', justifyContent: 'space-between', padding: 2 }}>
                                            <CardContent>
                                                <Typography variant="h6">{buddie.buddie_name}</Typography>
                                                <Typography variant="body2" color="textSecondary">{buddie.buddie_email}</Typography>
                                            </CardContent>
                                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                                                <IconButton color="primary" onClick={() => approveBuddie(buddie._id)}>
                                                    <CheckCircle />
                                                </IconButton>
                                                <IconButton color="error" onClick={() => deleteBuddie(buddie._id)}>
                                                    <Delete />
                                                </IconButton>
                                            </Box>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        )
                    )}
                </Box>
            </>
            <ToastContainer />
        </div>
    );
};

export default UnapprovedBuddies;
