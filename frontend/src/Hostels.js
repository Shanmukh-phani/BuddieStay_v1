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
import Header_sub from './Header_sub';
import SBLOGO from './assets/SBLOGO1.jpeg';
import InfiniteScroll from 'react-infinite-scroll-component';
import notFound from './assets/notFound.png';
import FilterPage from './FilterHostel';


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

const LocationChip1 = styled(Chip)({
    fontFamily: 'Anta',
    fontSize: '18px',
    color: '#000000',
    marginRight: '0px',
    marginBottom: '10px'

});

const FilterButton = styled(IconButton)({
    marginRight: '16px',
    marginTop: '100px',
    color: '#006399',
});

const HostelCard = styled(Card)({
    marginBottom: '20px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    position: 'relative',
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






const HostelsScreen = () => {
    const [selectedFilters, setSelectedFilters] = useState({ gender: '', area: '' });
    const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
    const [aniloading, anisetLoading] = useState(true);


    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const cityName = queryParams.get('city');
    const navigate = useNavigate();

    const [areas, setAreas] = useState([]);
    const [search, setSearch] = useState('');

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // State to hold error messages




    const LIMIT = 5;
    const [page, setPage] = useState(1); // Initialize page state
    const [hostels, setHostels] = useState([]); // Hostels data
    const [totalHostels, setTotalHostels] = useState(0); // Total hostels count


    useEffect(() => {
        fetchHostels();
    }, [cityName]); // Empty dependency array to run only on component mount



    const fetchHostels = () => {
        axios
            .get(`${process.env.REACT_APP_URL}/hostels`, {
                params: { city: cityName, page, size: LIMIT }, // Make sure city matches the server's expected parameter
            })
            .then(({ data }) => {

                // Handle successful response
                setPage(page + 1);
                const newHostels = data.records.filter(newHostel => !hostels.some(existingHostel => existingHostel._id === newHostel._id));
                setHostels([...hostels, ...data.records]);
                setTotalHostels(data.total);
                setLoading(false);
                setError(null); // Reset error state on successful fetch
                // console.log(data.records);

            })
            .catch((error) => {
                // console.error('Error fetching hostels:', error);
                console.log('Error fetching hostels', error.message);

                setLoading(false); // Ensure loading is set to false in case of error
            });
    };









    const handleFilterClick = () => {
        setIsFilterDialogOpen(true);
    };

    const handleDialogClose = () => {
        setIsFilterDialogOpen(false);
    };

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setSelectedFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    };

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleHostelClick = (hostelId) => {
        navigate(`/hostel/${hostelId}`);
    };


    // const handleFilterApply = () => {
    //     // fetchFilteredHostels(selectedFilters); // Fetch hostels based on selected filters
    //     setIsFilterDialogOpen(false);
    // };


    useEffect(() => {
        // Simulate a loading delay (e.g., data fetching)
        setTimeout(() => anisetLoading(false), 1000);
    }, []);


    // const [search, setSearch] = useState('');

    const handleOpenSearchPage = () => {
        navigate('/search-hostels');
    };

    const handleApplyFilters = async (filters) => {
        try {
          const { minPrice, maxPrice, amenities, type, area } = filters;
      
          // Build query parameters based on filters
          const queryParams = new URLSearchParams();
      
          if (minPrice) queryParams.append('minPrice', minPrice);
          if (maxPrice) queryParams.append('maxPrice', maxPrice);
          if (amenities && amenities.length > 0) queryParams.append('amenities', amenities.join(','));
          if (type) queryParams.append('type', type);
          if (area) queryParams.append('area', area);
      
          const response = await fetch(`${process.env.REACT_APP_URL}/hostels/filter?${queryParams.toString()}`);
          const data = await response.json();
      
          if (data.success) {
            // console.log('Filtered data:', data.data);
            // Set this data to state to display it in the UI
            setHostels(data.data);
          } else {
            console.error('Error fetching filtered data:', data.message);
          }
        } catch (error) {
          console.error('Error applying filters:', error);
        }
      };
      
    
  


    return (

        <div>
            <Container maxWidth={false} sx={{ paddingX: { xs: 0, lg: 20 } }}>
                <>

                    {aniloading ? (
                        <LoadingScreen />
                    ) : (
                        <div>



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

{/* 
                            <Box variant="contained" onClick={handleOpen}>
      <FilterListIcon />
      </Box> */}





                            <Box display="flex" alignItems="center" justifyContent="space-between">
                                <LocationChip label={cityName || 'Select City'} />
                                <Box >
                                <FilterPage onApplyFilters={handleApplyFilters}>
                                    <FilterListIcon />
                                </FilterPage>
                                </Box>
                            </Box>



                            {/* Search Bar */}
                            <Box padding={2} onClick={handleOpenSearchPage} sx={{ cursor: 'pointer' }}>
                                <TextField
                                    fullWidth
                                    label="Search Hostels"
                                    variant="outlined"
                                  

                                    // disabled
                                    // onClick={handleOpenSearchPage}
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <SearchIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Box>







                            {/* <Box padding={2}>
                                {loading ? (
                                    [...Array(3)].map((_, index) => (
                                        <SkeletonCard key={index}>
                                            <Skeleton variant="rectangular" height={200} />
                                            <Skeleton variant="text" />
                                            <Skeleton variant="text" />
                                            <Skeleton variant="text" />
                                        </SkeletonCard>
                                    ))
                                ) : (
                                    <InfiniteScroll
                                    dataLength={hostels.length}
                                    next={fetchHostels}
                                    hasMore={hostels.length < totalHostels}
                                    loader={<Typography align="center">Loading...</Typography>}
                                    endMessage={
                                      <Typography align="center" color="textSecondary" marginY={2}>
                                        <b>You've reached the end!</b>
                                      </Typography>
                                    }
                                  >
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
                                    </InfiniteScroll>
                                )}



                            </Box> */}











                            <Box padding={2}>
                                {loading ? (
                                    [...Array(3)].map((_, index) => (
                                        <SkeletonCard key={index}>
                                            <Skeleton variant="rectangular" height={200} />
                                            <Skeleton variant="text" />
                                            <Skeleton variant="text" />
                                            <Skeleton variant="text" />
                                        </SkeletonCard>
                                    ))
                                ) : hostels.length === 0 ? ( // Check if there are no hostels
                                    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="400px">
                                        <img src={notFound} alt="Not Found" style={{ maxWidth: '100%', height: 'auto' }} />
                                        <Typography variant="h6" style={{ marginTop: '16px', color: '#333' }}>
                                            No Hostels Found
                                        </Typography>
                                    </Box>
                                ) : (
                                    <InfiniteScroll
                                        dataLength={hostels.length}
                                        next={fetchHostels}
                                        hasMore={hostels.length < totalHostels}
                                        loader={<Typography align="center">Loading...</Typography>}
                                        endMessage={
                                            <Typography align="center" color="textSecondary" marginY={2}>
                                                <b>You've reached the end!</b>
                                            </Typography>
                                        }
                                    >
                                        <Grid container spacing={2}>
                                            {hostels.map((hostel, index) => (
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
                                                            <div>
                                                                <Typography variant="body2" color="textSecondary">
                                                                    Security Deposit:
                                                                </Typography>
                                                                <Chip
                                                                    label={`₹ ${hostel.hostel_security_deposit}`}
                                                                    style={{
                                                                        marginTop: '8px', // Space between Typography and Chip
                                                                        backgroundColor: '#e0f7fa', // Light blue background for the chip
                                                                        color: '#00796b', // Darker text color
                                                                        fontWeight: 'bold',
                                                                        fontSize: '1em', // Adjust font size if necessary
                                                                    }}
                                                                />
                                                            </div>

                                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                <Typography variant="body2" color="textSecondary">
                                                                    {/* Availability: */}
                                                                </Typography>
                                                                <LocationChip1
                                                                    label={hostel.hostel_vacancy_available ? "Available" : "Not Available"}
                                                                    style={{
                                                                        backgroundColor: hostel.hostel_vacancy_available ? 'darkcyan' : 'tomato',
                                                                        color: 'white', // Change text color for better visibility
                                                                    }}
                                                                />
                                                            </div>
                                                        </HostelCardContent>
                                                    </HostelCard>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </InfiniteScroll>
                                )}
                            </Box>






                        
                        </div>
                    )}
                </>
            </Container>

        </div>
    );
};

export default HostelsScreen;
