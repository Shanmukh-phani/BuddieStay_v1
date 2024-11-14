import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography, Box, Rating, CircularProgress, AppBar, IconButton } from '@mui/material';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Skeleton from '@mui/material/Skeleton';
import profileImage from '../assets/buddie.jpg';
  import { useNavigate } from 'react-router-dom';
  import { styled } from '@mui/system';
import { ArrowBack } from '@mui/icons-material';
import Header_sub_buddie from '../Header_sub_Buddie';
import Footer from '../Footer';


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
  

const BuddieRating = () => {
  const [rating, setRating] = useState({
    security: 0,
    food: 0,
    facilities: 0,
    value_for_money: 0,
    cleanliness: 0,
    comment: ''
  });
  const [hostelId, setHostelId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [rated, setRated] = useState(false);
  const [ratingId, setRatingId] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const buddie_id = localStorage.getItem('buddie_id');
  const token = localStorage.getItem('buddieAuthToken');

  // Fetch hostel_id using buddie_id
  useEffect(() => {
    const fetchHostelId = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_URL}/buddie/getHostelId`, {
          params: { buddie_id },
          headers: { Authorization: `Bearer ${token}` }
        });
        setHostelId(response.data.hostel_id);
        fetchRatings(response.data.hostel_id);
      } catch (error) {
        console.error('Error fetching hostel_id', error);
        if (error.response && error.response.status === 401) {
          toast.error('Unauthorized access, please log in again.');
        }
      }
    };
    fetchHostelId();
  }, [buddie_id, token]);

  // Fetch existing ratings based on buddie_id and hostel_id
  const fetchRatings = async (hostel_id) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/buddie/ratings/${buddie_id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const ratings = response.data;

      setLoading(false);

      if (ratings.length > 0) {
        const userRating = ratings.find(rate => rate.hostel_id === hostel_id);
        if (userRating) {
          setRating(userRating);
          setRated(true);
          setRatingId(userRating._id);
        }
      } else {
        setRated(false);
      }
    } catch (error) {
      console.error('Error fetching ratings', error);
      setLoading(false);
      if (error.response && error.response.status === 401) {
        toast.error('Unauthorized access, please log in again.');
      }
    }
  };

  const handleRatingChange = (field, newValue) => {
    setRating(prev => ({ ...prev, [field]: newValue }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      if (rated) {
        await axios.put(
          `${process.env.REACT_APP_URL}/buddie/ratings/${ratingId}`,
          {
            hostel_id: hostelId,
            ...rating
          },
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        toast.success('Rating updated successfully!');
      } else {
        await axios.post(
          `${process.env.REACT_APP_URL}/buddie/ratings`,
          {
            buddie_id,
            hostel_id: hostelId,
            ...rating
          },
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        toast.success('Rating submitted successfully!');
      }
      fetchRatings(hostelId);
      setEditMode(false);
      setSubmitting(false);
    } catch (error) {
      console.error('Error submitting rating', error);
      setSubmitting(false);
      toast.error('Error submitting rating.');
    }
  };

  const navigate = useNavigate(); // Initialize navigate function

  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <Box p={3} sx={{ border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                      {/* <AppBar position="static">
                <HeaderContainer>
                    <Box display="flex" alignItems="center">
                        <IconButton edge="start" color="inherit" aria-label="back" style={{ color: 'black' }} onClick={handleBackClick}>
                            <ArrowBack  />
                        </IconButton>
                        <StayText variant="h4" component="h1" style={{ marginLeft: '25px',color:'#006399' }}>
                            Stay
                        </StayText>
                        <BuddieText variant="h4" component="h1">
                            Buddie
                        </BuddieText>
                    </Box>

                    <Box >
            <ProfileIcon>
              <img src={profileImage} alt="Profile" style={{ width: '100%', height: '100%' }} />
            </ProfileIcon>
          </Box>
                </HeaderContainer>
            </AppBar> */}

            <Header_sub_buddie/>

      {/* Toast Container */}
      <ToastContainer />

      {/* Rating Form */}
      {loading ? (
        <Box mt={15}>
          <Skeleton variant="text" sx={{ fontSize: '1rem', marginBottom: 2 }} />
          <Skeleton variant="rectangular" height={118} sx={{ marginBottom: 2 }} />
          <Skeleton variant="text" sx={{ fontSize: '1rem', marginBottom: 2 }} />
          <Skeleton variant="rectangular" height={118} sx={{ marginBottom: 2 }} />
          <Skeleton variant="text" sx={{ fontSize: '1rem', marginBottom: 2 }} />
          <Skeleton variant="rectangular" height={118} sx={{ marginBottom: 2 }} />
          <Skeleton variant="text" sx={{ fontSize: '1rem', marginBottom: 2 }} />
          <Skeleton variant="rectangular" height={118} sx={{ marginBottom: 2 }} />
          <Skeleton variant="text" sx={{ fontSize: '1rem', marginBottom: 2 }} />
        </Box>
      ) : (
        <Grid container spacing={2} mt={10}>
          {['security', 'food', 'facilities', 'value_for_money', 'cleanliness'].map(field => (
            <Grid item xs={12} key={field}>
              <Typography variant="h6" sx={{ marginBottom: 1 }}>{field.replace('_', ' ').toUpperCase()}</Typography>
              <Box sx={{ border: '1px solid #ddd', borderRadius: '8px', padding: 2, backgroundColor: '#f9f9f9' }}>
                <Rating
                  name={field}
                  value={rating[field]}
                  precision={0.5}
                  onChange={(event, newValue) => handleRatingChange(field, newValue)}
                  disabled={!editMode || submitting} // Disable if not in edit mode or submitting
                />
              </Box>
            </Grid>
          ))}
          <Grid item xs={12}>
            <TextField
              label="Comment"
              fullWidth
              multiline
              rows={4}
              value={rating.comment}
              onChange={e => handleRatingChange('comment', e.target.value)}
              disabled={!editMode || submitting} // Disable if not in edit mode or submitting
              sx={{ marginTop: 2 }}
            />
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              {!editMode ? (
                <Button
                  // variant="contained"
                  style={{backgroundColor:'darkcyan',color:'white'}}
                  onClick={() => setEditMode(true)} // Enter edit mode
                  disabled={submitting} // Disable while submitting
                  sx={{ marginRight: 2 }}
                >
                  Edit Rating
                </Button>
              ) : (
                <>
                  <Button
                    // variant="contained"
                    style={{backgroundColor:'darkcyan',color:'white'}}
                    onClick={handleSubmit}
                    disabled={submitting} // Disable while submitting
                    sx={{ marginRight: 2 }}
                  >
                    {submitting ? <CircularProgress size={24} /> : 'Update Rating'}
                  </Button>
                  <Button
                    // variant="outlined"
                    onClick={() => setEditMode(false)} // Exit edit mode
                    disabled={submitting} // Disable while submitting
                    style={{backgroundColor:'tomato',color:'white'}}
                  >
                    Cancel
                  </Button>
                </>
              )}
            </Box>
          </Grid>
        </Grid>
      )}
      <Footer/>
    </Box>
  );
};

export default BuddieRating;
