import React, { useState, useEffect } from 'react';
import {
  AppBar, IconButton, Box, Typography, Avatar as Avataram, Card, CardContent,
  Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Chip, Skeleton
} from '@mui/material';
import { ArrowBack, LocationOn } from '@mui/icons-material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, useTheme } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import BottomNavBar from './BottomNavBar';
import img1 from './../assets/hostel1.jpg';
// import AdminSidebar from './AdminSidebar';
import  Avatar  from 'react-avatar';

import profileImage from '../assets/buddie.jpg';
import { useNavigate } from 'react-router-dom';
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



const BuddieProfile = () => {



  const [formValues, setFormValues] = useState({
    buddie_name: '',
    buddie_dob: '',
    buddie_gender: '',
    buddie_contact: '',
    buddie_email: '',
    buddie_profession: '',
    buddie_guardian_name: '',
    buddie_emergency_contact: '',
    buddie_id_proof: '',
    buddie_bike_no: '',
    buddie_photo: '',
    buddie_password: '',
    hostel_id: '',
    room_no: '',
    buddie_doj: '',
      });


  // Fetch profile data
  const getProfile = async () => {
    
    setLoading(true);
    setError(null);

    try {
      const buddie_id = localStorage.getItem('buddie_id');
      const token = localStorage.getItem('buddieAuthToken');

      if (!buddie_id || !token) {
        toast.error('No buddie_id or token found.');
        setError('No buddie_id or token found.');
        return;
      }
   


      const response = await axios.get(`${process.env.REACT_APP_URL}/buddie/buddieProfile`, {
        params: { buddie_id },
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
     

      if (response.status === 200) {
        setProfile(response.data);
        setFormValues(response.data);
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

  const handleEditOpen = () => {
    setIsEditOpen(true);
  };

  const handleEditClose = () => {
    setIsEditOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSave = async () => {
    try {
      // Retrieve hostel_id and token from local storage
      const buddie_id = localStorage.getItem('buddie_id');
      const token = localStorage.getItem('buddieAuthToken');
  
      if (!buddie_id || !token) {
        toast.error('No buddie_id or token found.');
        return;
      }
  
      // Update the hostel profile
      const response = await axios.put(`${process.env.REACT_APP_URL}/buddie/updateBuddieProfile`, {
        buddie_id, // Include buddie_id in the request body
        ...formValues // Spread the form values into the request body
      }, {
        headers: {
          'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        },
      });
  
      if (response.status === 200) {
        toast.success('Profile updated successfully.');
        setProfile(response.data); // Update the profile with the response data
        setIsEditOpen(false); // Close the edit dialog
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile. Please try again.');
    }
  };
  

  const handleProfileIconClick = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const theme = useTheme();


  const navigate = useNavigate(); // Initialize navigate function

  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };



  const [isEditOpen, setIsEditOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const [drawerOpen, setDrawerOpen] = useState(false);


  if (loading) {
    return (
      <Box>
        <Skeleton variant="rectangular" width="100%" height={300} />
        <Box padding="20px">
          <Skeleton variant="circular" width={100} height={100} sx={{ marginBottom: 2 }} />
          <Skeleton variant="text" height={40} width="60%" />
          <Skeleton variant="text" height={20} width="40%" />
          <Skeleton variant="rectangular" height={40} width="80%" sx={{ marginTop: 2 }} />
          <Skeleton variant="rectangular" height={40} width="50%" sx={{ marginTop: 2 }} />
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (!profile) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography>No profile data available.</Typography>
      </Box>
    );
  }

//   const hostelOwnerLanguages = profile.hostel_owner_languages || {};
//   const knownLanguages = Object.keys(hostelOwnerLanguages).filter(lang => hostelOwnerLanguages[lang]);





  return (
    <div>
      <Box>
            <Header_sub_buddie/>


        <Box sx={{
          position: 'relative',
          height: '300px',
          backgroundImage: `url(${img1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
    



<img
    alt={profile.buddie_name} // Provide an alt attribute for accessibility
    src={`data:image/jpeg;base64,${profile.buddie_photo}`} // Dynamically set the source
    style={{
        position: 'absolute',
        bottom: '-50px',
        left: '20px',
        border: '4px solid white', // Adjust border color or style as needed
        borderRadius: '50%', // Make it round
        width: '100px', // Set a width
        height: '100px', // Set a height
    }}
/>




        </Box>

        <Box sx={{ padding: '60px 20px 20px' }}>
          <Typography variant="h4">{profile.buddie_name}</Typography>

          <Typography variant="body2" color="textSecondary">DOB {new Date(profile.buddie_dob).toLocaleDateString()}</Typography>
          <Box display="flex" alignItems="center" sx={{ mt: 1 }}>
            {/* <LocationOn fontSize="small" sx={{ mr: 1 }} />
            <Typography variant="body2">
              {profile.hostel_area}, {profile.hostel_city}, {profile.hostel_pin_code}
            </Typography> */}
          </Box>

          {/* <Typography variant="body1" sx={{ mt: 2 }}>{profile.buddie_gender}</Typography> */}

          <Box sx={{ marginTop: '20px' }}>
            <Typography variant="h5">Personal Info</Typography>
                {/* <Typography variant="h5">Mobile:</Typography> */}
                <Chip
              label={`${profile.buddie_gender}`}
              sx={{
                marginTop: '10px',
                borderRadius: '16px',
                padding: '8px 12px',
                backgroundColor: '#FFB6C1',
                color: 'black',
                fontWeight: 'bold',
                fontSize: '16px',
              }}
            />
            <Chip
              label={`${profile.buddie_contact}`}
              sx={{
                marginTop: '10px',
                borderRadius: '16px',
                padding: '8px 12px',
                backgroundColor: '#F5FFFA',
                color: 'black',
                fontWeight: 'bold',
                fontSize: '16px',
              }}
            />
                       <Chip
              label={` ${profile.buddie_email}`}
              sx={{
                marginTop: '10px',
                borderRadius: '16px',
                padding: '8px 12px',
                backgroundColor: '#E6E6FA',
                color: 'black',
                fontWeight: 'bold',
                fontSize: '16px',
              }}
            />
                       <Chip
              label={` ${profile.buddie_profession}`}
              sx={{
                marginTop: '10px',
                borderRadius: '16px',
                padding: '8px 12px',
                backgroundColor: '#ADD8E6',
                color: 'black',
                fontWeight: 'bold',
                fontSize: '16px',
              }}
            />
                              <Chip
              label={` ${profile.buddie_bike_no}`}
              sx={{
                marginTop: '10px',
                borderRadius: '16px',
                padding: '8px 12px',
                backgroundColor: '#90EE90',
                color: 'black',
                fontWeight: 'bold',
                fontSize: '16px',
              }}
            />
</Box>

<Box sx={{ marginTop: '20px' }}>
            <Typography variant="h5">Guardian Info</Typography>
                {/* <Typography variant="h5">Mobile:</Typography> */}
                <Chip
              label={`${profile.buddie_guardian_name}`}
              sx={{
                marginTop: '10px',
                borderRadius: '16px',
                padding: '8px 12px',
                backgroundColor: '#FFFFE0',
                color: 'black',
                fontWeight: 'bold',
                fontSize: '16px',
              }}
            />
            <Chip
              label={`${profile.buddie_emergency_contact}`}
              sx={{
                marginTop: '10px',
                borderRadius: '16px',
                padding: '8px 12px',
                backgroundColor: '#F08080',
                color: 'black',
                fontWeight: 'bold',
                fontSize: '16px',
              }}
            />


          

          </Box>

          {/* <Box marginTop={1}>
            <Typography variant="h5">Languages Known :</Typography>
            {knownLanguages.length > 0 ? (
              <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
                {knownLanguages.map((lang, index) => (
                  <Chip key={index} label={lang} sx={{ backgroundColor: theme.palette.primary.light, color: theme.palette.primary.contrastText }} />
                ))}
              </Box>
            ) : (
              <Typography>No languages specified</Typography>
            )}
          </Box> */}
        </Box>

        <Box sx={{ padding: '20px' }}>
          {/* <Typography variant="h6" gutterBottom>Facilities</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {profile.hostel_facilities && profile.hostel_facilities.length > 0 ? (
              profile.hostel_facilities.map((facility, index) => (
                <Chip
                  key={index}
                  label={facility}
                  sx={{
                    borderRadius: '16px',
                    padding: '4px 8px',
                    backgroundColor: '#f0f0f0',
                    color: '#333',
                    fontWeight: 'bold',
                    border: '1px solid #dcdcdc',
                  }}
                />
              ))
            ) : (
              <Typography variant="body1" color="textSecondary">No facilities available</Typography>
            )}
          </Box> */}

          {/* <Typography variant="h6" gutterBottom style={{ marginTop: '30px'}}>Sharing Prices</Typography>
          <TableContainer component={Paper} sx={{ boxShadow: 3 ,marginBottom:'40px'}}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: theme.palette.primary.main, color: '#fff' }}>Share Type</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: theme.palette.primary.main, color: '#fff' }}>Price per Month</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {profile.sharing_prices && profile.sharing_prices.length > 0 ? (
                  profile.sharing_prices.map((price, index) => (
                    <TableRow key={index}>
                      <TableCell>{price.share_type}</TableCell>
                      <TableCell>{price.price}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2}>No sharing prices available</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer> */}


<Box mb={10}>

         <Button
          variant="contained"
          // color="warning"
          onClick={handleEditOpen}
          sx={{
            mt: 4,
            width: '100%',
            padding: '12px',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            ':hover': {
              backgroundColor: 'darkcyan',
            },
            backgroundColor:'tomato'
          }}
          
        >
          Edit Profile
        </Button>
      </Box>


      <Dialog open={isEditOpen} onClose={handleEditClose}>
        <DialogTitle>Edit Hostel Profile</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="buddie_name"
            label="Buddie Name"
            fullWidth
            variant="standard"
            value={formValues.buddie_name}
            onChange={handleInputChange}
          />
          {/* <TextField
            margin="dense"
            name="hostel_type"
            label="Hostel Type"
            fullWidth
            variant="standard"
            value={formValues.hostel_type}
            onChange={handleInputChange}
          /> */}
          {/* <TextField
            margin="dense"
            name="hostel_city"
            label="City"
            fullWidth
            variant="standard"
            value={formValues.hostel_city}
            onChange={handleInputChange}
          /> */}
          {/* <TextField
            margin="dense"
            name="hostel_area"
            label="Area"
            fullWidth
            variant="standard"
            value={formValues.hostel_area}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="hostel_pin_code"
            label="Pin Code"
            fullWidth
            variant="standard"
            value={formValues.hostel_pin_code}
            onChange={handleInputChange}
          /> */}
          <TextField
            margin="dense"
            name="buddie_contact"
            label="Phone"
            fullWidth
            variant="standard"
            value={formValues.buddie_contact}
            onChange={handleInputChange}
            disabled={true}
          />
          <TextField
            margin="dense"
            name="buddie_email"
            label="Email"
            fullWidth
            variant="standard"
            value={formValues.buddie_email}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="buddie_emergency_contact"
            label="Emergency Contact"
            fullWidth
            variant="standard"
            value={formValues.buddie_emergency_contact}
            onChange={handleInputChange}
        
          />
          <TextField
            margin="dense"
            name="buddie_bike_no"
            label="Bike No"
            fullWidth
            variant="standard"
            value={formValues.buddie_bike_no}
            onChange={handleInputChange}
          />
          {/* <TextField
            margin="dense"
            name="hostel_year"
            label="Established Year"
            fullWidth
            variant="standard"
            value={formValues.buddie}
            onChange={handleInputChange}
          /> */}
          {/* <TextField
            margin="dense"
            name="hostel_message"
            label="Message"
            fullWidth
            multiline
            rows={4}
            variant="standard"
            value={formValues.hostel_message}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="hostel_about"
            label="About"
            fullWidth
            multiline
            rows={4}
            variant="standard"
            value={formValues.hostel_about}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="hostel_google_map_location"
            label="Google Map Location"
            fullWidth
            variant="standard"
            value={formValues.hostel_google_map_location}
            onChange={handleInputChange}
          /> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} style={{backgroundColor:'tomato',color:'white'}}>Cancel</Button>
          <Button onClick={handleSave} style={{backgroundColor:'darkcyan',color:'white'}}>Save</Button>
        </DialogActions>
      </Dialog>

      </Box>
      </Box>

      <ToastContainer />
      <Footer/>
    </div>
  );
};

export default BuddieProfile;




