// import { Box, Card, CardContent, Chip, Grid, IconButton, Typography, CircularProgress, Skeleton, TextField } from '@mui/material';
import { DoorBack, People, HomeWork, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import notFound from './assets/notFound.png';
import searchImg from './assets/search.png';
import Footer from './Footer';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
    Container,
    AppBar,
    IconButton,
    Typography,
    Box,
    Card,
    Chip,
    CardContent,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Skeleton,
    TextField,
    InputAdornment,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Toolbar,
    Grid,
    CircularProgress
} from '@mui/material';
import axios from 'axios';
import { styled } from '@mui/system';
import { ArrowBack, FilterList as FilterListIcon, Wifi, LocalDining, LocalParking, LocalLaundryService, BatteryChargingFull, CleanHands } from '@mui/icons-material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import LoadingScreen from './LoadingScreen';
// import Header_sub from './HeaderSub_Buddie';
import SBLOGO from './assets/SBLOGO1.jpeg';
import InfiniteScroll from 'react-infinite-scroll-component';

const HostelCard = styled(Card)({
    marginBottom: '20px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    position: 'relative',
});
const LocationChip = styled(Chip)({
    marginTop: '100px',
    fontFamily: 'Anta',
    fontSize: '18px',
    // fontWeight: 'bold',
    marginLeft: '14px',
    color: '#000000',
    // color: '#ff7f00',
    // color: '#ff6800',
    // color: 'lightsalmon'
});

const FilterButton = styled(IconButton)({
    marginRight: '16px',
    marginTop: '100px',
    color: '#006399',
});


const FacilityChip = styled(Chip)({
    margin: '4px',
    display: 'flex',
    alignItems: 'center',
});

const HostelCardContent = styled(CardContent)({
    padding: '16px',
});

const SkeletonCard = styled(Card)({
    marginBottom: '20px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    position: 'relative',
});



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
    color: 'white'
});

const BuddieText = styled(Typography)({
    fontFamily: '"Sofia", sans-serif',
    fontSize: '24px',
    fontWeight: 'bold',
    // color: '#f0c674',
    color: 'tomato'
});
const ProfileIcon = styled(IconButton)({
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    overflow: 'hidden',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
});


const HostelSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);


// Search handler with debounce, including hostelId
const handleSearch = async (query) => {
    if (query.trim() === '') return;
    setLoading(true);
    setNoResults(false);
  
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/search-hostel`, {
        params: { query } // Pass both query and hostelId
      });
      setHostels(response.data);
      setNoResults(response.data.length === 0);
    } catch (error) {
      console.error('Failed to fetch Hostel data:', error);
      setNoResults(true);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery) {
        handleSearch(searchQuery); // Pass hostelId here
      } else {
        setHostels([]);
      }
    }, 300); // debounce delay of 300ms
  
    return () => clearTimeout(delayDebounce);
  }, [searchQuery]); // Add hostelId as a dependency
  
  const navigate = useNavigate();
  const handleHostelClick = (hostelId) => {
    navigate(`/hostel/${hostelId}`);
};

const handleBackClick = () => {
    navigate(-1);
};

const inputRef = useRef(null);

useEffect(() => {
  // Focus on the input field when the component mounts
  if (inputRef.current) {
    inputRef.current.focus();
  }
}, []);


  return (
    <Box padding={2} display="flex" flexDirection="column" gap={2} mb={6}>
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

                                    <ProfileIcon>
                                        <img src={SBLOGO} alt="Profile" style={{ width: '150%', height: '150%', borderRadius: '50%' }} />
                                    </ProfileIcon>

                                </HeaderContainer>
                            </AppBar>

      <TextField
        variant="outlined"
        label="Search by Room Number"
        fullWidth
        inputRef={inputRef}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{marginTop:'70px'}}
      />


<Box padding={0}>
  {/* Skeleton Loading Effect */}
  {loading && hostels.length === 0 ? (
    Array.from(new Array(3)).map((_, index) => (
      <Card key={index} variant="outlined" sx={{ display: 'flex', flexDirection: 'column', padding: 2, boxShadow: 3 }}>
        <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 2, marginBottom: 2 }} />
        <Skeleton variant="text" width="60%" height={20} sx={{ marginBottom: 1 }} />
        <Skeleton variant="text" width="40%" height={20} sx={{ marginBottom: 1 }} />
        <Skeleton variant="text" width="80%" height={20} />
      </Card>
    ))
  ) : (

    <Grid container spacing={2}>
    {hostels.map((hostel,index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={`${hostel._id}-${index}`}>
            <HostelCard onClick={() => handleHostelClick(hostel._id)}>
                <Box position="relative">
                    <img
                        src={`data:image/jpeg;base64,${hostel.hostel_image}`}
                        alt={hostel.hostel_name}
                        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                    />
                    <Box position="absolute" top="10px" right="10px" bgcolor="#ffd700" color="#000" padding="8px 12px" fontWeight="bold" fontSize="14px" boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)">
                        {hostel.hostel_type}
                    </Box>
                </Box>
                <HostelCardContent>
                    <Typography variant="h6" style={{ fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>
                        {hostel.hostel_name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" style={{ marginBottom: '16px' }}>
                        {hostel.hostel_area}, {hostel.hostel_city}
                    </Typography>
                    <Box display="flex" flexWrap="wrap" marginBottom="16px">
                        {hostel.hostel_facilities.slice(0, 6).map((facility, index) => {
                            const icons = {
                                wifi: <Wifi />,
                                dining: <LocalDining />,
                                parking: <LocalParking />,
                                laundry: <LocalLaundryService />,
                                charging: <BatteryChargingFull />,
                                cleaning: <CleanHands />,
                            };
                            return (
                                <FacilityChip key={index} label={facility} icon={icons[facility]} />
                            );
                        })}
                    </Box>
                    <Typography variant="body2" color="textSecondary">
                        Security Deposit: ₹{hostel.hostel_security_deposit}
                    </Typography>
                </HostelCardContent>
            </HostelCard>
        </Grid>
    ))}
</Grid>
  )}
</Box>





        <ToastContainer />

<Footer/>

    </Box>




  );
};

export default HostelSearch;
