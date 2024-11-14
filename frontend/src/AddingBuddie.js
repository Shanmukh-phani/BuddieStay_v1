import React, { useEffect, useState } from 'react';
import {
  AppBar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField,
  Grid, Card, Typography, IconButton, InputAdornment, Chip,
  Autocomplete
} from '@mui/material';
import {
  MenuItem, Select, InputLabel, FormControl
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Phone as PhoneIcon } from '@mui/icons-material';
import { styled } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import { toast } from 'react-toastify';
import axios from 'axios';
import  Avatar  from 'react-avatar';


import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toastify styles

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import Skeleton from '@mui/material/Skeleton';
import { useParams } from 'react-router-dom';





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

const AddingBuddie = () => {
const {hostel_id} = useParams();


  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const [buddies, setBuddies] = useState([]);




  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedBuddieId, setSelectedBuddieId] = useState(null);

  // Function to handle open dialog for deletion
  const openConfirmDialog = (buddieId) => {
    setSelectedBuddieId(buddieId);
    setDialogOpen(true);
  };






  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteBuddieId, setDeleteBuddieId] = useState(null);
  const [search, setSearch] = useState('');
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    buddie_name: '',
    buddie_dob: '',
    buddie_gender: '',
    buddie_contact: '',
    buddie_email: '',
    buddie_profession: '',
    buddie_guardian_name: '',
    buddie_emergency_contact: '',
    buddie_id_proof: null,
    buddie_bike_no: '',
    buddie_photo: null,
    buddie_password: '',
    buddie_confirm_password: '',
    room_no: '',
    buddie_doj:''// Add room_no here
  });
  const [editFormData, setEditFormData] = useState(null);


  const [errors, setErrors] = useState({});



  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleEditClose = () => setEditOpen(false);
  const handleEdit = (buddie) => {
    setEditFormData(buddie);
    setEditOpen(true);
  };



  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleProfileIconClick = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };





  // Function to fetch rooms
  const getRooms = async () => {
    try {
        // console.log(hostel_id);
      const response = await fetch(`${ process.env.REACT_APP_URL}/admin/outRooms?hostel_id=${hostel_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        //   'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const roomsData = await response.json();
      setRooms(roomsData); // Update the state with the fetched rooms


    } catch (error) {
      console.error('Error fetching rooms:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch rooms when the component mounts
  useEffect(() => {
    getRooms();
  }, []);






  const validateField = (name, value) => {
    switch (name) {
      case 'buddie_contact':
        if (!/^\d{10}$/.test(value)) {
          return 'Phone number must be 10 digits.';
        }
        break;
      case 'buddie_email':
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return 'Invalid email address.';
        }
        break;
      case 'buddie_name':
        if (!value) {
          return 'Name is required.';
        }
        break;
      case 'buddie_password':
        if (!value) {
          return 'Password is required.';
        }
        break;
      case 'buddie_confirm_password':
        if (value !== formData.buddie_password) {
          return 'Passwords do not match.';
        }
        break;
      case 'buddie_id_proof':
        if (!value) {
          return 'ID Proof is required.';
        }
        break;
      case 'room_no':
        if (!value) {
          return 'Room number is required.';
        }
        break;
      default:
        return '';
    }
  };





  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const errorMsg = validateField(name, value);
    setErrors({ ...errors, [name]: errorMsg });

  };



  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({ ...prevData, [name]: reader.result.split(',')[1] }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: null }));
    }

    const errorMsg = validateField(name, file ? file.name : '');
    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMsg }));
  };





  const handleEditFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditFormData((prevData) => ({ ...prevData, [name]: reader.result.split(',')[1] }));
      };
      reader.readAsDataURL(file);
    } else {
      setEditFormData((prevData) => ({ ...prevData, [name]: null }));
    }

    const errorMsg = validateField(name, file ? file.name : '');
    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMsg }));
  };





  const handleAddBuddie = async () => {
    let isValid = true;
    const newErrors = {};
  
    // Validate each field
    Object.keys(formData).forEach((key) => {
      const errorMsg = validateField(key, formData[key]);
      if (errorMsg) {
        isValid = false;
        newErrors[key] = errorMsg;
      }
    });

    setErrors(newErrors);
  
    if (isValid) {
      try {

        if (!hostel_id) {
          throw new Error('Missing hostel_id or token.');
        }
  
        // Prepare the data to send, including hostel_id
        const dataToSend = { ...formData, hostel_id: hostel_id };
  
        // Send POST request to add a new buddie
        const response = await axios.post(`${ process.env.REACT_APP_URL}/admin/addOutsideBuddie`, dataToSend, {
          headers: {
            // 'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
            'Content-Type': 'application/json',
          },
        });
  
        // Update the state with the new buddie
        setBuddies((prevBuddies) => [...prevBuddies, response.data]);
        toast.success('Buddie added successfully!');
       setFormData({
          buddie_name: '',
          buddie_dob: '',
          buddie_gender: '',
          buddie_contact: '',
          buddie_email: '',
          buddie_profession: '',
          buddie_guardian_name: '',
          buddie_emergency_contact: '',
          buddie_id_proof: null,
          buddie_bike_no: '',
          buddie_photo: null,
          buddie_password: '',
          buddie_confirm_password: '',
          room_no: '', // Add room_no here,
          buddie_doj:'',
        });


        setOpen(false); // Close the modal or form
      } catch (error) {
        console.error('Error adding buddie:', error);
        
        // Check if error response exists and contains a message
        if (error.response && error.response.data && error.response.data.message) {
          toast.error(`Failed to add the buddie: ${error.response.data.message}`);
        } else {
          toast.error('Failed to add the buddie. Please try again.');
        }
      }
    } else {
      toast.error('Please correct the highlighted errors.');
    }
  };
  
  

  const [selectedRoomNo, setSelectedRoomNo] = useState('');
  const [aniloading, anisetLoading] = useState(true);




  const filteredBuddies = buddies.filter(buddie =>
    buddie.buddie_name.toLowerCase().includes(search.toLowerCase()) ||
    buddie.buddie_contact.includes(search) ||
    buddie.room_no.includes(search) 
  );


  useEffect(() => {
    // Simulate a loading delay (e.g., data fetching)
    setTimeout(() => anisetLoading(false), 3000);
  }, []);


  return (

    // <>
    // {aniloading ? (
    // <LoadingScreen />
    // ) : (
    

    <div style={{ marginTop: '80px' }}>
      
      <Box>
      <AppBar position="static">
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
            {/* <img src={profileImage} alt="Profile" style={{ width: '100%', height: '100%' }} /> */}
          </ProfileIcon>
        </HeaderContainer>
      </AppBar>

      <div
  style={{
    display: 'flex',
    justifyContent: 'center', // Center horizontally
    alignItems: 'center', // Center vertically
    height: '80vh', // Full height of the viewport, adjust as needed
  }}
>
  <Button
    variant="contained"
    onClick={handleOpen}
    style={{
      backgroundColor: 'orange',
      color: 'white',
      display: 'flex',
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    Add New Buddie
  </Button>
</div>




        {/* Form Dialog */}
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
          <DialogTitle>Add New Buddie</DialogTitle>
          <DialogContent>
            {step === 1 && (
              <>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="buddie_name"
                      label="Buddie Name"
                      value={formData.buddie_name}
                      onChange={handleChange}
                      error={!!errors.buddie_name}
                      helperText={errors.buddie_name}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="buddie_dob"
                      label="Date of Birth"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      value={formData.buddie_dob}
                      onChange={handleChange}
                    />

                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Gender</InputLabel>
                      <Select
                        name="buddie_gender"
                        value={formData.buddie_gender}
                        onChange={handleChange}
                      >
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="buddie_contact"
                      label="Contact Number"
                      value={formData.buddie_contact}
                      onChange={handleChange}
                      error={!!errors.buddie_contact}
                      helperText={errors.buddie_contact}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="buddie_email"
                      label="Email Address"
                      value={formData.buddie_email}
                      onChange={handleChange}
                      error={!!errors.buddie_email}
                      helperText={errors.buddie_email}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id="buddie-profession-label">Profession</InputLabel>
                      <Select
                        labelId="buddie-profession-label"
                        name="buddie_profession"
                        value={formData.buddie_profession}
                        onChange={handleChange}
                        label="Profession"
                      >
                        <MenuItem value="Work">Work</MenuItem>
                        <MenuItem value="Student">Student</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Box display="flex" justifyContent="space-between" marginTop={2}>
                  <Button onClick={() => setStep(2)} variant="contained" color="primary">
                    Next
                  </Button>
                </Box>
              </>
            )}
            {step === 2 && (
              <>
                <Grid container spacing={2}>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <Autocomplete
                        options={rooms} // Array of room objects
                        getOptionLabel={(option) => option.room_number} // Displayed option label
                        value={rooms.find((room) => room.room_number === selectedRoomNo) || null} // Correctly set value
                        onChange={(event, newValue) => {
                          setSelectedRoomNo(newValue ? newValue.room_number : '');
                          setFormData((prevData) => ({
                            ...prevData,
                            room_no: newValue ? newValue.room_number : '' // Update formData with selected room number
                          }));
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Room Number"
                            variant="outlined"
                            fullWidth
                          />
                        )}
                        isOptionEqualToValue={(option, value) => option.room_number === value.room_number} // Correctly compare options
                      />
                    </FormControl>
                  </Grid>



                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="buddie_guardian_name"
                      label="Guardian Name"
                      value={formData.buddie_guardian_name}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="buddie_emergency_contact"
                      label="Emergency Contact"
                      value={formData.buddie_emergency_contact}
                      onChange={handleChange}
                      error={!!errors.buddie_emergency_contact}
                      helperText={errors.buddie_emergency_contact}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="buddie-photo-upload"
                        type="file"
                        name="buddie_photo"
                        onChange={handleFileChange}
                      />
                      <label htmlFor="buddie-photo-upload">
                        <Button variant="contained" component="span">
                          Upload Photo
                        </Button>
                        {formData.buddie_photo && (
                          <Chip
                            label={formData.buddie_photo.name}
                            onDelete={() => setFormData({ ...formData, buddie_photo: null })}
                            style={{ marginLeft: '10px' }}
                          />
                        )}
                      </label>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="buddie_bike_no"
                      label="Bike Number"
                      value={formData.buddie_bike_no}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="buddie-id-proof-upload"
                        type="file"
                        name="buddie_id_proof"
                        onChange={handleFileChange}
                      />
                      <label htmlFor="buddie-id-proof-upload">
                        <Button variant="contained" component="span">
                          Upload ID Proof
                        </Button>
                        {formData.buddie_id_proof && (
                          <Chip
                            label={formData.buddie_id_proof.name}
                            onDelete={() => setFormData({ ...formData, buddie_id_proof: null })}
                            style={{ marginLeft: '10px' }}
                          />
                        )}
                      </label>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="buddie_password"
                      label="Password"
                      type="password"
                      value={formData.buddie_password}
                      onChange={handleChange}
                      error={!!errors.buddie_password}
                      helperText={errors.buddie_password}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="buddie_confirm_password"
                      label="Confirm Password"
                      type="password"
                      value={formData.buddie_confirm_password}
                      onChange={handleChange}
                      error={!!errors.buddie_confirm_password}
                      helperText={errors.buddie_confirm_password}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <TextField
                      fullWidth
                      name="buddie_doj"
                      label="Date of Joining"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      value={formData.buddie_doj}
                      onChange={handleChange}
                    />
                    </Grid>
                </Grid>
                <Box display="flex" justifyContent="space-between" marginTop={2}>
                  <Button onClick={() => setStep(1)} variant="outlined" color="primary">
                    Back
                  </Button>
                  {/* <Button onClick={handleAddBuddie} variant="contained" color="primary">
                    Submit
                  </Button> */}
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleAddBuddie}>Submit</Button>
                  </DialogActions>

                </Box>
              </>
            )}
          </DialogContent>
        </Dialog>


      </Box>

    </div>
//     )}
// </>
  );
}

export default AddingBuddie;

