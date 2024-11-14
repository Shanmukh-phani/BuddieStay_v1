import React, { useEffect, useState } from 'react';
import { AppBar, Box, Button, Card, Chip, Dialog, DialogContent, DialogTitle, DialogActions, Typography, IconButton, TableContainer, TableHead, Table, TableRow, TableCell, TableBody, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import { ArrowBack, Wifi as WifiIcon, LocalParking as LocalParkingIcon, LocalDining as LocalDiningIcon, Verified as VerifiedIcon, ExpandMore as ExpandMoreIcon, Star as StarIcon, FilterList as FilterListIcon } from '@mui/icons-material';
import Slider from 'react-slick';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import profileImage from './assets/buddie.jpg';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Skeleton } from '@mui/material';
import Header_sub from './Header_sub';
import SBLOGO from './assets/SBLOGO1.jpeg';

import { Rating as MuiRating, Paper } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';  // Corrected import

import { toast, ToastContainer } from 'react-toastify';




const carouselSettings = {
  // dots: true,
  infinite: true,
  speed: 200,
  autoplay: true, // Auto-scroll
  autoplaySpeed: 3000, // Speed of auto-scroll
  slidesToShow: 1,
  slidesToScroll: 1,
};


const CarouselContainer = styled('div')({
  height: '350px',
  position: 'relative',
  overflow: 'hidden',
});





const SectionContainer = styled(Box)({
  backgroundColor: '#fff',
  padding: '16px',
  borderRadius: '10px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  marginBottom: '20px',
});

const SectionTitle = styled(Typography)({
  fontWeight: 'bold',
  fontSize: '20px',
  marginBottom: '16px',
});


const ProfileIcon = styled(IconButton)({
  borderRadius: '50%',
  width: '40px',
  height: '40px',
  overflow: 'hidden',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
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




const HostelScreen = () => {

  const params = useParams(); // Extract parameters from the URL
  const hostelId = params.id; // Correctly access 'id' from params object


  const [hostel, setHostel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);





  useEffect(() => {
    if (!hostelId) {
      setError('Hostel ID is missing');
      setLoading(false);
      return;
    }

    const fetchHostelDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_URL}/hostel/${hostelId}`);

        setHostel(response.data);
        // console.log(response.data);
      } catch (err) {
        setError('Error fetching hostel details');
        console.error('Error fetching hostel details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHostelDetails();
  }, []);



  const [loading1, setLoading1] = useState(true);
  const [overallRating, setOverallRating] = useState(0);
  const [categoryRatings, setCategoryRatings] = useState(null);
  const [error1, setError1] = useState(null);

  // const fetchHostelRating = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await axios.get(`${process.env.REACT_APP_URL}/hostel-rating/${hostelId}`);
  //     setOverallRating(response.data.overallRating);
  //     setCategoryRatings(response.data.averages);
  //   } catch (err) {
  //     console.error('Error fetching hostel rating:', err);
  //     setError('Unable to fetch ratings.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   if (hostelId) {
  //     fetchHostelRating();
  //   }
  // }, [hostelId]);

  // if (loading) return <CircularProgress />;
  // if (error) return <Typography color="error">{error}</Typography>;



  const [foodMenu, setFoodMenu] = useState([]); // Ensure foodMenu is initialized as an empty array
  // const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);




  useEffect(() => {
    fetchFoodMenu();
  }, []);




  const fetchFoodMenu = async () => {
    try {
      // Fetch the food menu from your API and update `foodMenu`
      const menuImage = await axios.get(`${process.env.REACT_APP_URL}/FoodMenu/${hostelId}`);
      // console.log(menuImage.data);
      setFoodMenu([menuImage.data]);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch food menu", error);
      setLoading(false);
    }
  };

  // const handleImageClick = (image) => {
  //   setSelectedImage(image);
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  //   setSelectedImage(null);
  // };


  const handleImageClick = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const [comments, setComments] = useState([]);
  // const [loading, setLoading] = useState(true);

  // Fetch hostel comments
  const fetchComments = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/hostel-comments/${hostelId}`);
      setComments(response.data.comments);
    } catch (error) {
      toast.error('Failed to fetch comments');
    } finally {
      setLoading(false);
    }
  };

  // Fetch comments on component mount
  useEffect(() => {
    fetchComments();
  }, [hostelId]);





  const fetchHostelRating = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/hostel-rating/${hostelId}`);
      setOverallRating(response.data.overallRating || 0); // Set default to 0 if no rating
      setCategoryRatings(response.data.averages || {}); // Set default to empty object if no data
    } catch (err) {
      console.error('Error fetching hostel rating:', err);
      setError('Unable to fetch ratings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hostelId) {
      fetchHostelRating();
    }
  }, [hostelId]);


  const navigate = useNavigate(); // Initialize navigate function

  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };

  const amenities = hostel.hostel_facilities || [];



  // Component to display sharing prices in a table
  const SharingPricesTable = ({ sharingPrices = [] }) => {
    // Defensive check to handle empty or undefined sharingPrices
    if (!sharingPrices.length) {
      return (
        <Typography variant="body1" color="textSecondary" align="center">
          No sharing prices available.
        </Typography>
      );
    }








    return (
      <TableContainer component={Paper} elevation={3} style={{ margin: '20px 0' }}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: 'darkcyan' }}>
              <TableCell>
                <Typography variant="h6" style={{ fontWeight: 'bold', color: 'white' }}>
                  Share Type
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" style={{ fontWeight: 'bold', color: 'white' }}>
                  Price (₹)
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sharingPrices.map((price, index) => (
              <TableRow key={index} style={{ '&:hover': { backgroundColor: 'tomato' } }}>
                <TableCell>
                  <Typography variant="body1" style={{ fontWeight: '500' }}>
                    {price.share_type}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1" style={{ fontWeight: '500' }}>
                    {price.price}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };




  const handleBookAppointment = () => {
    // Replace with your WhatsApp number and message
    const phoneNumber = hostel.hostel_phone; // e.g., '+1234567890'
    const message = encodeURIComponent('I would like to book an appointment.');

    // WhatsApp API URL
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    // Redirect to WhatsApp
    window.open(whatsappUrl, '_blank');
  };

  return (
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




      <CarouselContainer style={{ marginTop: '4px' }}>
        {loading ? (
          <Skeleton variant="rectangular" height={350} />
        ) : (
          // <Slider {...carouselSettings}>
          //   <div>
          //     <img src={`data:image/png;base64,${hostel.hostel_image}`} alt="Hostel" style={{
          //       width: '100%',
          //       // height: '100%',
          //       height: '350px',
          //       objectFit: 'contain',
          //     }} />
          //   </div>
          //   <div>
          //     <img src={`data:image/png;base64,${hostel.hostel_image1}`} alt="Slide 2" style={{
          //       width: '100%',
          //       // height: '100%',
          //       height: '350px',
          //       objectFit: 'contain',
          //     }} />
          //   </div>
          //   <div>
          //     <img src={`data:image/png;base64,${hostel.hostel_image2}`} alt="Slide 3" style={{
          //       width: '100%',
          //       // height: '100%',
          //       height: '350px',
          //       objectFit: 'contain',
          //     }} />
          //   </div>
          // </Slider>
          <Slider {...carouselSettings}>
            {/* Use a utility function to render each image */}
            {[
              { src: hostel.hostel_image, alt: "Hostel" },
              { src: hostel.hostel_image1, alt: "Slide 2" },
              { src: hostel.hostel_image2, alt: "Slide 3" },
            ].map((image, index) => (
              <div key={index}>
                {image.src ? ( // Check if image source exists
                  <img
                    src={`data:image/png;base64,${image.src}`}
                    alt={image.alt}
                    style={{
                      width: '100%',
                      height: '350px',
                      objectFit: 'contain',
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: '100%',
                      height: '350px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#f0f0f0', // Light grey background for fallback
                      color: '#666', // Grey text color
                      fontSize: '1.2em'
                    }}
                  >
                    No Image Available
                  </div>
                )}
              </div>
            ))}
          </Slider>

        )}
      </CarouselContainer>


      <Box p={2}>
        {loading ? (
          <>
            <Skeleton variant="text" width="60%" height={30} />
            <Skeleton variant="text" width="40%" height={20} />
            <Skeleton variant="text" width="80%" height={20} />
            <Skeleton variant="rectangular" width="100%" height={100} style={{ margin: '16px 0' }} />
          </>
        ) : (
          <>
            <SectionContainer>
              <SectionTitle style={{ color: 'darkcyan' }}>Hostel Information</SectionTitle>


              <Typography variant="h5" fontWeight="bold">{hostel.hostel_name}</Typography>
              {/* <Typography variant="body2" color="textSecondary" style={{ margin: '8px 0' }}>
                <StarIcon style={{ color: '#ffd700', marginRight: '4px' }} /> 4.5/5 Rating
              </Typography> */}







              <Typography variant="h6" sx={{ marginLeft: 1, fontWeight: 'bold', display: 'flex', alignItems: 'center', float: 'right' }}>
                {[...Array(Math.floor(overallRating))].map((_, index) => (
                  <StarIcon key={index} style={{ color: '#ffd700', marginRight: '4px' }} />
                ))}
                {overallRating}
              </Typography>


              <Typography variant="body2" color="textSecondary">{hostel.hostel_area}, {hostel.hostel_city}</Typography>
              <Typography variant="body2" color="textSecondary">Owner: {hostel.hostel_owner_name}</Typography>
              <Typography variant="body2" color="textSecondary">Since: {hostel.hostel_year}</Typography>
              {/* <Box component="img" src={hostel.hostel_qr_code} alt="Fabulous or Free" sx={{ height: '60px', borderRadius: '10px' }} /> */}

            </SectionContainer>

            <SectionContainer>
              <SectionTitle>About the Hostel</SectionTitle>
              <Typography variant="body2" color="textSecondary">
                {hostel.hostel_about}
              </Typography>
              <Box mt={2}>
                {/* <Typography variant="body2" color="textSecondary">Amenities Rated: 3.5/5</Typography> */}
                <Box display="flex" flexWrap="wrap" alignItems="center" mt={1}>
                  {amenities.map((facility, idx) => (
                    <Chip key={idx} label={facility} style={{ margin: '4px', backgroundColor: 'lightgrey' }} />
                  ))}
                </Box>
              </Box>
            </SectionContainer>
          </>
        )}





        {loading ? (
          <Skeleton variant="rectangular" width="100%" height={200} style={{ marginTop: '16px' }} />
        ) : (
          <Paper
            elevation={3}
            sx={{
              padding: 2,
              borderRadius: 2,
              backgroundColor: '#f5f5f5',
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              marginBottom: 3,
              maxWidth: '400px',
            }}
          >
            <StarIcon sx={{ fontSize: 50, color: '#FFD700' }} />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Overall Rating
              </Typography>
              <Box display="flex" alignItems="center">
                <MuiRating
                  value={parseFloat(overallRating) || 0}
                  precision={0.1}
                  readOnly
                  size="large"
                  sx={{ color: '#FFD700' }}
                />
                <Typography variant="h6" sx={{ marginLeft: 1, fontWeight: 'bold' }}>
                  {overallRating || 0} / 5
                </Typography>
              </Box>
            </Box>
          </Paper>

        )}

        <Box mt={2} mb={2}>

          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Sharing Prices
          </Typography>
          <SharingPricesTable sharingPrices={hostel.sharing_prices} />
        </Box>



        {loading ? (
          <Skeleton variant="rectangular" width="100%" height={300} style={{ marginTop: '16px' }} />
        ) : (
          <SectionContainer >
            <SectionTitle>Location Map</SectionTitle>
            <iframe
              src={hostel.hostel_google_map_location}
              width="100%"
              height="300"
              style={{ border: '0', marginTop: '16px', marginBottom: '80px' }}
              allowFullScreen=""
              loading="lazy"

            >
            </iframe>
          </SectionContainer>
        )}





      </Box>






      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'white',
          boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.1)',
          padding: '10px', // Optional padding
        }}
      >
        <Button
          // variant="contained" 
          style={{ backgroundColor: 'tomato', color: 'white', fontWeight: 'bold' }}
          onClick={handleBookAppointment}
          fullWidth // Makes the button full width
        >
          Book an Appointment
        </Button>
      </Box>

      <Box p={3}>
        {/* <Typography variant="h5" gutterBottom></Typography> */}
        <SectionTitle>Comments</SectionTitle>

        {loading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          <Box>
            {comments.length > 0 ? (
              <Swiper
                spaceBetween={20}
                slidesPerView={1}
                loop={true}
                autoplay={{ delay: 3000 }} // Auto-scroll every 3 seconds
                pagination={{ clickable: true }}
              >
                {comments.map((comment, index) => (
                  <SwiperSlide key={index}>
                    <Paper elevation={3} sx={{ padding: 2, display: 'flex', flexDirection: 'column' }}>
                      <Typography variant="body1">{comment.comment}</Typography>
                      <Typography variant="caption" color="textSecondary">
                        {new Date(comment.createdAt).toLocaleString()}
                      </Typography>
                    </Paper>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <Typography variant="body2" color="textSecondary">No comments available for this hostel.</Typography>
            )}
          </Box>
        )}

        {/* Uncomment to enable toast notifications */}
        {/* <ToastContainer /> */}
      </Box>






      <Box p={3} mb={10}>
        {/* <Typography variant="h5" gutterBottom>Food Menu</Typography> */}
        <SectionTitle>Food Menu</SectionTitle>

        {loading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          <Box>
            {foodMenu ? (
              <img
                src={foodMenu}
                alt="Food Menu"
                style={{ maxHeight: '200px', objectFit: 'contain', cursor: 'pointer' }}
                onClick={handleImageClick}
              />
            ) : (
              <Typography variant="body2" color="textSecondary">
                No food menu available for this hostel.
              </Typography>
            )}
          </Box>
        )}

        {/* Dialog for full-screen image view */}
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
          <DialogContent>
            {foodMenu && (
              <img
                src={foodMenu}
                alt="Food Menu Full View"
                style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
              />
            )}
          </DialogContent>
        </Dialog>
      </Box>



    </div>
  );
};

export default HostelScreen;