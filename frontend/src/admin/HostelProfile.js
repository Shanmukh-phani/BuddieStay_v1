import React, { useState, useEffect } from 'react';
import {
  AppBar, IconButton, Box, Typography, Avatar, Card, CardContent,
  Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Chip, Skeleton
} from '@mui/material';
import { ArrowBack, LocationOn } from '@mui/icons-material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, useTheme } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BottomNavBar from './BottomNavBar';
import img1 from './../assets/hostel1.jpg';
import AdminSidebar from './AdminSidebar';

import profileImage from '../assets/buddie.jpg';
import { useNavigate } from 'react-router-dom';
import Header_sub from '../Header_sub';
import HostelDobeyToggle from './HostelDhobey';


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

const LocationChip1 = styled(Chip)({
  // marginTop: '15px',
  fontFamily: 'Anta',
  fontSize: '18px',
  textAlign:'center',
  // backgroundColor:'#f0c674'
});


const HostelProfile = () => {



  const [formValues, setFormValues] = useState({
    hostel_name: '',
    hostel_type: '',
    hostel_city: '',
    hostel_area: '',
    hostel_pin_code: '',
    hostel_phone: '',
    hostel_mail: '',
    hostel_owner_name: '',
    hostel_security_deposit: '',
    hostel_year: '',
    hostel_owner_languages: { telugu: false, hindi: false, english: false },
    hostel_message: '',
    hostel_about: '',
    hostel_facilities: [],
    hostel_google_map_location: '',
    sharing_prices: [{ share_type: '', price: '' }],
    hostel_image: ''
  });


  // Fetch profile data
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
      const hostel_id = localStorage.getItem('hostel_id');
      const token = localStorage.getItem('authToken');
  
      if (!hostel_id || !token) {
        toast.error('No hostel_id or token found.');
        return;
      }
  
      // Update the hostel profile
      const response = await axios.put(`${process.env.REACT_APP_URL}/admin/updateHostelProfile`, {
        hostel_id, // Include hostel_id in the request body
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
      const hostelId = localStorage.getItem('hostel_id');

  const [drawerOpen, setDrawerOpen] = useState(false);



  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = profile.hostel_qr_code; // Use the base64 string as the href
    link.download = 'hostel_qr_code.png'; // Name for the downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

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

  const hostelOwnerLanguages = profile.hostel_owner_languages || {};
  const knownLanguages = Object.keys(hostelOwnerLanguages).filter(lang => hostelOwnerLanguages[lang]);





  return (
    <div>
      <Box>

<Header_sub/>

        <Box sx={{
          position: 'relative',
          height: '300px',
          backgroundImage: `url(${img1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
          <Avatar
            alt="Owner Name"
            src={`data:image/jpeg;base64,${profile.hostel_image}`}
            sx={{
              width: 100,
              height: 100,
              position: 'absolute',
              bottom: '-50px',
              left: '20px',
              border: '4px solid white'
            }}
          />
        </Box>

        <Box sx={{ padding: '60px 20px 20px' }}>
          <Typography variant="h4" style={{color:'black',fontWeight:'bold'}}>{profile.hostel_name}</Typography>
          <Typography variant="body2" color="textSecondary">Since {profile.hostel_year}</Typography>
          <Box display="flex" alignItems="center" sx={{ mt: 1 }}>
            <LocationOn fontSize="small" sx={{ mr: 1 }} style={{color:'darkcyan'}}/>
            <Typography variant="body2">
              {profile.hostel_area}, {profile.hostel_city}, {profile.hostel_pin_code}
            </Typography>
          </Box>

          <Typography variant="body1" sx={{ mt: 2 }} style={{color:'grey'}}>{profile.hostel_message}</Typography>

          <Box sx={{ marginTop: '20px' }}>
            <Typography variant="h5">
            <LocationChip1 variant="h5" label={'Security Deposit'}/>
            </Typography>


            <Chip
              label={`₹ ${profile.hostel_security_deposit}`}
              sx={{
                marginTop: '10px',
                borderRadius: '16px',
                padding: '8px 12px',
                backgroundColor: 'darkcyan',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '16px',
              }}
            />
          </Box>

          <Box marginTop={3}>
            {/* <Typography variant="h5">Languages Known :</Typography> */}
            <LocationChip1 variant="h5" label={'Languages Known'}/>
            {knownLanguages.length > 0 ? (
              <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
                {knownLanguages.map((lang, index) => (
                  <Chip key={index} label={lang} style={{backgroundColor:'darkgrey',color:'white',fontWeight:'bold'}}/>
                ))}
              </Box>
            ) : (
              <Typography>No languages specified</Typography>
            )}
          </Box>
        </Box>

        <Box sx={{ padding: '20px' }}>
          <Typography variant="h6" gutterBottom>
          <LocationChip1 variant="h5" label={'Facilities'}/>
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {profile.hostel_facilities && profile.hostel_facilities.length > 0 ? (
              profile.hostel_facilities.map((facility, index) => (
                <Chip
                  key={index}
                  label={facility}
                  sx={{
                    borderRadius: '16px',
                    padding: '4px 8px',
                    // backgroundColor: '#f0f0f0',
                    color: '#333',
                    fontWeight: 'bold',
                    border: '1px solid #dcdcdc',
                  }}
                  style={{backgroundColor:'darkgrey',color:'white',fontWeight:'bold'}}
                />
              ))
            ) : (
              <Typography variant="body1" color="textSecondary">No facilities available</Typography>
            )}
          </Box>




          <Box mt={5}>
          <Typography variant="h6" gutterBottom>
          <LocationChip1 variant="h5" label={'Hostel Dobhi'}/>
          </Typography>
                <HostelDobeyToggle hostelId={hostelId}/>

</Box>
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
          // color="primary"
          style={{backgroundColor:'tomato',fontWeight:'bold'}}
          onClick={handleEditOpen}
          sx={{
            mt: 4,
            width: '100%',
            padding: '12px',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            ':hover': {
              backgroundColor: '#0056b3',
            },
          }}
          
        >
          Edit Profile
        </Button>
      </Box>







<Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography variant="h6" gutterBottom>
            <LocationChip1 variant="h5" label={'Hostel QR Code'}/>
            </Typography>
            <Box component="img" 
                src={profile.hostel_qr_code} 
                alt="QR Code" 
                sx={{ height: '300px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: 2 }} 
            />
            <Box sx={{ mt: 2 }}>
                <Button 
                    variant="contained" 
                    // color="primary" 
                    style={{backgroundColor:'darkcyan'}}
                    onClick={handleDownload}
                >
                    Download QR Code
                </Button>
            </Box>
        </Box>



      <Dialog open={isEditOpen} onClose={handleEditClose}>
        <DialogTitle>Edit Hostel Profile</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="hostel_name"
            label="Hostel Name"
            fullWidth
            variant="standard"
            value={formValues.hostel_name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="hostel_type"
            label="Hostel Type"
            fullWidth
            variant="standard"
            value={formValues.hostel_type}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="hostel_city"
            label="City"
            fullWidth
            variant="standard"
            value={formValues.hostel_city}
            onChange={handleInputChange}
          />
          <TextField
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
          />
          <TextField
            margin="dense"
            name="hostel_phone"
            label="Phone"
            fullWidth
            variant="standard"
            value={formValues.hostel_phone}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="hostel_mail"
            label="Email"
            fullWidth
            variant="standard"
            value={formValues.hostel_mail}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="hostel_owner_name"
            label="Owner Name"
            fullWidth
            variant="standard"
            value={formValues.hostel_owner_name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="hostel_security_deposit"
            label="Security Deposit"
            fullWidth
            variant="standard"
            value={formValues.hostel_security_deposit}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="hostel_year"
            label="Established Year"
            fullWidth
            variant="standard"
            value={formValues.hostel_year}
            onChange={handleInputChange}
          />
          <TextField
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
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} style={{backgroundColor:'tomato',color:'white'}}>Cancel</Button>
          <Button onClick={handleSave} style={{backgroundColor:'darkcyan',color:'white'}}>Save</Button>
        </DialogActions>
      </Dialog>

      </Box>
      </Box>

      <ToastContainer />
    </div>
  );
};

export default HostelProfile;





// import React, { useState, useEffect } from 'react';
// import {
//   AppBar, IconButton, Box, Typography, Avatar, Card, CardContent,
//   Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Chip, Skeleton
// } from '@mui/material';
// import { LocationOn } from '@mui/icons-material';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, useTheme } from '@mui/material';
// import { styled } from '@mui/system';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import BottomNavBar from './BottomNavBar';
// import img1 from './../assets/hostel1.jpg';
// import AdminSidebar from './AdminSidebar';

// const HeaderContainer = styled(Box)({
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'space-between',
//   mb: 4,
//   boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//   padding: '14px 16px',
//   position: 'fixed',
//   top: 0,
//   left: 0,
//   width: '100%',
//   boxSizing: 'border-box',
//   backgroundColor: '#fff',
//   zIndex: 1000,
// });

// const StayText = styled(Typography)({
//   fontFamily: '"Sofia", sans-serif',
//   fontSize: '24px',
//   fontWeight: 'bold',
//   color: 'orange',
// });

// const BuddieText = styled(Typography)({
//   fontFamily: '"Sofia", sans-serif',
//   fontSize: '24px',
//   fontWeight: 'bold',
//   color: '#333',
// });

// const ProfileIcon = styled(IconButton)({
//   borderRadius: '50%',
//   backgroundColor: '#ddd',
//   width: '40px',
//   height: '40px',
// });

// const HostelProfile = () => {

//   const [isEditOpen, setIsEditOpen] = useState(false);
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [formValues, setFormValues] = useState({
//     hostel_name: '',
//     hostel_type: '',
//     hostel_city: '',
//     hostel_area: '',
//     hostel_pin_code: '',
//     hostel_phone: '',
//     hostel_mail: '',
//     hostel_owner_name: '',
//     hostel_security_deposit: '',
//     hostel_year: '',
//     hostel_owner_languages: { telugu: false, hindi: false, english: false },
//     hostel_message: '',
//     hostel_about: '',
//     hostel_facilities: [],
//     hostel_google_map_location: '',
//     sharing_prices: [{ share_type: '', price: '' }],
//     hostel_image: ''
//   });

//   const [drawerOpen, setDrawerOpen] = useState(false);

//   // Fetch profile data
//   const getProfile = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const hostel_id = localStorage.getItem('hostel_id');
//       const token = localStorage.getItem('authToken');

//       if (!hostel_id || !token) {
//         toast.error('No hostel_id or token found.');
//         setError('No hostel_id or token found.');
//         return;
//       }

//       const response = await axios.get(`${process.env.REACT_APP_URL}/admin/hostelProfile`, {
//         params: { hostel_id },
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });

//       if (response.status === 200) {
//         setProfile(response.data);
//         setFormValues(response.data);
//       } else {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//     } catch (error) {
//       console.error('Error fetching profile:', error);
//       toast.error('Failed to fetch profile. Please try again.');
//       setError('Failed to fetch profile. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getProfile();
//   }, []);

//   const handleEditOpen = () => {
//     setIsEditOpen(true);
//   };

//   const handleEditClose = () => {
//     setIsEditOpen(false);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormValues({ ...formValues, [name]: value });
//   };

//   const handleSave = async () => {
//     try {
//       // Retrieve hostel_id and token from local storage
//       const hostel_id = localStorage.getItem('hostel_id');
//       const token = localStorage.getItem('authToken');
  
//       if (!hostel_id || !token) {
//         toast.error('No hostel_id or token found.');
//         return;
//       }
  
//       // Update the hostel profile
//       const response = await axios.put(`${process.env.REACT_APP_URL}/admin/updateHostelProfile`, {
//         hostel_id, // Include hostel_id in the request body
//         ...formValues // Spread the form values into the request body
//       }, {
//         headers: {
//           'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
//         },
//       });
  
//       if (response.status === 200) {
//         toast.success('Profile updated successfully.');
//         setProfile(response.data); // Update the profile with the response data
//         setIsEditOpen(false); // Close the edit dialog
//       } else {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//     } catch (error) {
//       console.error('Error updating profile:', error);
//       toast.error('Failed to update profile. Please try again.');
//     }
//   };
  

//   const handleProfileIconClick = () => {
//     setDrawerOpen(!drawerOpen);
//   };

//   const handleDrawerClose = () => {
//     setDrawerOpen(false);
//   };

//   const theme = useTheme();

//   if (loading) {
//     return (
//       <Box>
//         <Skeleton variant="rectangular" width="100%" height={300} />
//         <Box padding="20px">
//           <Skeleton variant="circular" width={100} height={100} sx={{ marginBottom: 2 }} />
//           <Skeleton variant="text" height={40} width="60%" />
//           <Skeleton variant="text" height={20} width="40%" />
//           <Skeleton variant="rectangular" height={40} width="80%" sx={{ marginTop: 2 }} />
//           <Skeleton variant="rectangular" height={40} width="50%" sx={{ marginTop: 2 }} />
//         </Box>
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
//         <Typography color="error">{error}</Typography>
//       </Box>
//     );
//   }

//   if (!profile) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
//         <Typography>No profile data available.</Typography>
//       </Box>
//     );
//   }

//   const hostelOwnerLanguages = profile.hostel_owner_languages || {};
//   const knownLanguages = Object.keys(hostelOwnerLanguages).filter(lang => hostelOwnerLanguages[lang]);

//   return (
//     <div>
//       <Box>
//         <AppBar position="static">
//           <HeaderContainer>
//             <Box display="flex" alignItems="center">
//               <StayText variant="h4" component="h1">
//                 Stay
//               </StayText>
//               <BuddieText variant="h4" component="h1">
//                 Buddie
//               </BuddieText>
//             </Box>
//             <ProfileIcon onClick={handleProfileIconClick}>
//               {/* <img src={profileImage} alt="Profile" style={{ width: '100%', height: '100%' }} /> */}
//               <AdminSidebar open={drawerOpen} onClose={handleDrawerClose} />
//             </ProfileIcon>
//           </HeaderContainer>
//         </AppBar>

//         <Box
//         sx={{
//           position: 'relative',
//           height: '300px',
//           backgroundImage: `url(${img1})`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           borderRadius: '8px',
//           overflow: 'hidden',
//         }}
//       >
//         <Avatar
//           alt="Owner Name"
//           src={`data:image/jpeg;base64,${profile.hostel_image}`}
//           sx={{
//             width: '120px',
//             height: '120px',
//             position: 'absolute',
//             bottom: '-60px',
//             left: '20px',
//             border: '4px solid #ffffff',
//             boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
//           }}
//         />
//       </Box>

//       {/* Profile Details */}
//       <Box sx={{ marginTop: '80px', padding: '20px', backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
//         <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
//           {profile.hostel_name}
//         </Typography>
//         <Typography variant="h6" gutterBottom sx={{ color: '#757575' }}>
//           {profile.hostel_type}
//         </Typography>
//         <Typography variant="body1" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
//           <LocationOn sx={{ mr: 1 }} /> {profile.hostel_area}, {profile.hostel_city}, {profile.hostel_pin_code}
//         </Typography>
//         <Typography variant="body1" gutterBottom>
//           Established in: {profile.hostel_year}
//         </Typography>
//         <Typography variant="body1" gutterBottom>
//           Security Deposit: ₹{profile.hostel_security_deposit}
//         </Typography>
//         <Typography variant="body1" gutterBottom>
//           {profile.hostel_message}
//         </Typography>
//         <Typography variant="body1" gutterBottom>
//           {profile.hostel_about}
//         </Typography>

//         {/* Facilities */}
//         <Box sx={{ mt: 2 }}>
//           <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
//             Facilities:
//           </Typography>
//           <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
//             {profile.hostel_facilities.map((facility, index) => (
//               <Chip
//                 key={index}
//                 label={facility}
//                 sx={{
//                   backgroundColor: '#d32f2f',
//                   color: '#ffffff',
//                   borderRadius: '16px',
//                   fontWeight: 'bold',
//                 }}
//               />
//             ))}
//           </Box>
//         </Box>

//         {/* Owner Details */}
//         <Box sx={{ mt: 3 }}>
//           <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
//             Owner Details:
//           </Typography>
//           <Typography variant="body2" gutterBottom>
//             Name: {profile.hostel_owner_name}
//           </Typography>
//           <Typography variant="body2" gutterBottom>
//             Phone: {profile.hostel_phone}
//           </Typography>
//           <Typography variant="body2" gutterBottom>
//             Email: {profile.hostel_mail}
//           </Typography>
//           <Typography variant="body2" gutterBottom>
//             Languages Known: {knownLanguages.join(', ')}
//           </Typography>
//         </Box>

//         {/* Edit Button */}
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={handleEditOpen}
//           sx={{
//             mt: 4,
//             width: '100%',
//             padding: '12px',
//             borderRadius: '8px',
//             boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//             ':hover': {
//               backgroundColor: '#0056b3',
//             },
//           }}
          
//         >
//           Edit Profile
//         </Button>
//       </Box>
//     </Box>

//       <Dialog open={isEditOpen} onClose={handleEditClose}>
//         <DialogTitle>Edit Hostel Profile</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             name="hostel_name"
//             label="Hostel Name"
//             fullWidth
//             variant="standard"
//             value={formValues.hostel_name}
//             onChange={handleInputChange}
//           />
//           <TextField
//             margin="dense"
//             name="hostel_type"
//             label="Hostel Type"
//             fullWidth
//             variant="standard"
//             value={formValues.hostel_type}
//             onChange={handleInputChange}
//           />
//           <TextField
//             margin="dense"
//             name="hostel_city"
//             label="City"
//             fullWidth
//             variant="standard"
//             value={formValues.hostel_city}
//             onChange={handleInputChange}
//           />
//           <TextField
//             margin="dense"
//             name="hostel_area"
//             label="Area"
//             fullWidth
//             variant="standard"
//             value={formValues.hostel_area}
//             onChange={handleInputChange}
//           />
//           <TextField
//             margin="dense"
//             name="hostel_pin_code"
//             label="Pin Code"
//             fullWidth
//             variant="standard"
//             value={formValues.hostel_pin_code}
//             onChange={handleInputChange}
//           />
//           <TextField
//             margin="dense"
//             name="hostel_phone"
//             label="Phone"
//             fullWidth
//             variant="standard"
//             value={formValues.hostel_phone}
//             onChange={handleInputChange}
//           />
//           <TextField
//             margin="dense"
//             name="hostel_mail"
//             label="Email"
//             fullWidth
//             variant="standard"
//             value={formValues.hostel_mail}
//             onChange={handleInputChange}
//           />
//           <TextField
//             margin="dense"
//             name="hostel_owner_name"
//             label="Owner Name"
//             fullWidth
//             variant="standard"
//             value={formValues.hostel_owner_name}
//             onChange={handleInputChange}
//           />
//           <TextField
//             margin="dense"
//             name="hostel_security_deposit"
//             label="Security Deposit"
//             fullWidth
//             variant="standard"
//             value={formValues.hostel_security_deposit}
//             onChange={handleInputChange}
//           />
//           <TextField
//             margin="dense"
//             name="hostel_year"
//             label="Established Year"
//             fullWidth
//             variant="standard"
//             value={formValues.hostel_year}
//             onChange={handleInputChange}
//           />
//           <TextField
//             margin="dense"
//             name="hostel_message"
//             label="Message"
//             fullWidth
//             multiline
//             rows={4}
//             variant="standard"
//             value={formValues.hostel_message}
//             onChange={handleInputChange}
//           />
//           <TextField
//             margin="dense"
//             name="hostel_about"
//             label="About"
//             fullWidth
//             multiline
//             rows={4}
//             variant="standard"
//             value={formValues.hostel_about}
//             onChange={handleInputChange}
//           />
//           <TextField
//             margin="dense"
//             name="hostel_google_map_location"
//             label="Google Map Location"
//             fullWidth
//             variant="standard"
//             value={formValues.hostel_google_map_location}
//             onChange={handleInputChange}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleEditClose}>Cancel</Button>
//           <Button onClick={handleSave}>Save</Button>
//         </DialogActions>
//       </Dialog>

//       <BottomNavBar />
//       <ToastContainer />
//     </div>
//   );
// };

// export default HostelProfile;
