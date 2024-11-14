import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Box,
  TextField,
  CircularProgress,
  IconButton,
  AppBar,
  Skeleton,
  Chip,
} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { Edit, Save, Delete, ArrowBack } from '@mui/icons-material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import profileImage from '../assets/buddie.jpg';
import Header_sub from '../Header_sub';


// Styled Components
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
  color: '#006399',
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
  '& img': {
    borderRadius: '50%',
    width: '100%',
    height: '100%',
  },
});

// Skeleton Loader Styles
const SkeletonTableCell = styled(TableCell)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const SkeletonWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  padding: '20px',
});


const LocationChip1 = styled(Chip)({
  // marginTop: '15px',
  fontFamily: 'Anta',
  fontSize: '18px',
  textAlign:'center',
  // backgroundColor:'#f0c674'
});


const SkeletonTable = () => (
  <SkeletonWrapper>
    <Skeleton variant="rectangular" width="100%" height={40} />
    <Skeleton variant="rectangular" width="100%" height={200} />
  </SkeletonWrapper>
);

const HostelFees = () => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState([]);

  // Fetch profile data (including hostel fee details)
  const getProfile = async () => {
    setLoading(true);
    setError(null);

    try {
      const hostel_id = localStorage.getItem('hostel_id');
      const token = localStorage.getItem('authToken');

      if (!hostel_id || !token) {
        toast.error('No hostel_id or token found.');
        setError('No hostel_id or token found.');
        return;
      }

      const response = await axios.get(`${process.env.REACT_APP_URL}/admin/hostelProfile`, {
        params: { hostel_id },
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setProfile(response.data);
        setFormValues(response.data.sharing_prices || []);
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to fetch profile. Please try again.');
      setError('Failed to fetch profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const hostel_id = localStorage.getItem('hostel_id');
      const token = localStorage.getItem('authToken');

      const response = await axios.put(
        `${process.env.REACT_APP_URL}/admin/updateHostelFees`,
        { hostel_id, sharing_prices: formValues },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success('Prices updated successfully');
        setIsEditing(false);
        getProfile();  // Refresh the data after saving
      } else {
        throw new Error('Failed to update prices');
      }
    } catch (error) {
      console.error('Error updating prices:', error);
      toast.error('Failed to update prices. Please try again.');
    }
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedFormValues = [...formValues];
    updatedFormValues[index][name] = value;
    setFormValues(updatedFormValues);
  };

  const handleAddNewClick = () => {
    setFormValues([...formValues, { share_type: '', price: '' }]);
  };

  const handleDeleteClick = (index) => {
    const updatedFormValues = formValues.filter((_, i) => i !== index);
    setFormValues(updatedFormValues);
  };

  const navigate = useNavigate(); // Initialize navigate function

  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <>
      {/* <AppBar position="static">
        <HeaderContainer>
          <Box display="flex" alignItems="center">
            <IconButton edge="start" color="inherit" aria-label="back" style={{ color: 'black' }} onClick={handleBackClick}>
              <ArrowBack />
            </IconButton>
            <StayText variant="h4" component="h1">
              Stay
            </StayText>
            <BuddieText variant="h4" component="h1">
              Buddie
            </BuddieText>
          </Box>
          <Box>
            <ProfileIcon>
              <img src={profileImage} alt="Profile" />
            </ProfileIcon>
          </Box>
        </HeaderContainer>
      </AppBar> */}
      <Header_sub/>

      <Box sx={{ mt: 15, p: 2 }}>
        <Typography variant="h6" gutterBottom>
          <LocationChip1 label={'Sharing Prices'}/>
        </Typography>

        {loading ? (
          <SkeletonTable />
        ) : (
          <TableContainer component={Paper} sx={{ boxShadow: 3, marginBottom: '40px', borderRadius: '10px' }}>
            <Table>
              <TableHead >
                <TableRow style={{backgroundColor:'darkcyan'}}>
                  <TableCell style={{color:'white',fontWeight:'bold'}}>Share Type</TableCell>
                  <TableCell style={{color:'white',fontWeight:'bold'}}>Price per Month</TableCell>
                  {isEditing && <TableCell style={{color:'white',fontWeight:'bold'}}>Actions</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {formValues.length > 0 ? (
                  formValues.map((price, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {isEditing ? (
                          <TextField
                            fullWidth
                            name="share_type"
                            value={price.share_type}
                            onChange={(event) => handleInputChange(index, event)}
                            required
                            variant="outlined"
                            size="small"
                            sx={{ borderRadius: '5px' }}
                          />
                        ) : (
                          price.share_type
                        )}
                      </TableCell>
                      <TableCell>
                        {isEditing ? (
                          <TextField
                            fullWidth
                            name="price"
                            value={price.price}
                            onChange={(event) => handleInputChange(index, event)}
                            required
                            variant="outlined"
                            size="small"
                            sx={{ borderRadius: '5px' }}
                          />
                        ) : (
                          price.price
                        )}
                      </TableCell>
                      {isEditing && (
                        <TableCell>
                          <IconButton onClick={() => handleDeleteClick(index)} color="error">
                            <Delete />
                          </IconButton>
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={isEditing ? 3 : 2} align="center">No sharing prices available</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          {isEditing ? (
            <>
              <Button variant="contained" style={{backgroundColor:'green',color:'white'}} onClick={handleSaveClick} sx={{ borderRadius: '5px' }}>
                Save Prices
              </Button>
              <Button variant="contained" style={{backgroundColor:'tomato',color:'white'}} onClick={handleAddNewClick} sx={{ borderRadius: '5px' }}>
                Add New Share
              </Button>
            </>
          ) : (
            <Button variant="contained" style={{backgroundColor:'tomato',color:'white'}} onClick={handleEditClick} sx={{ borderRadius: '5px' }}>
              Edit Prices
            </Button>
          )}
        </Box>
        <ToastContainer />
      </Box>
    </>
  );
};

export default HostelFees;
