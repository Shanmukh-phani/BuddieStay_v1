import React, { useState } from 'react';
import {
  TextField,
  Button,
  MenuItem,
  Typography,
  Box,
  InputLabel,
  Select,
  FormControl,
  Snackbar,
  Alert,
  Grid,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  IconButton,
  ListItemText,
  CircularProgress
} from '@mui/material';
import { styled } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useNavigate } from 'react-router-dom';

const HeaderContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  mb: 4,
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  padding: '14px 16px',
  borderRadius: '8px',
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

const hostelTypes = ['Male', 'Female', 'Co-living'];

const initialFormState = {
  hostel_name: '',
  hostel_type: '',
  hostel_city: '',
  hostel_area: '',
  hostel_pin_code: '',
  hostel_phone: '',
  hostel_mail: '',
  hostel_owner_name: '',
  hostel_password: '',
  hostel_confirm_password: '',
  hostel_security_deposit: '',
  hostel_image: '',
  hostel_image1: '',
  hostel_image2: '',
  hostel_image3: '',
  hostel_year: '',
  hostel_owner_languages: {
    telugu: false,
    hindi: false,
    english: false,
  },
  hostel_message: '',
  hostel_about: '',
  hostel_facilities: [],
  hostel_google_map_location: '',
  sharing_prices: [{ share_type: '', price: '' }] // Start with one empty entry
};

const AddHostelForm = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [imagePreview1, setImagePreview1] = useState(null);
  const [imagePreview2, setImagePreview2] = useState(null);
  const [imagePreview3, setImagePreview3] = useState(null);
  const [loading, setLoading] = useState(false);


  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');


  const facilitiesOptions = ['Wi-Fi', 'Laundry', '24/7 Power Backup', 'Parking', 'Food', 'Gym', 'Hot Water','Room Cleaning','Washing Machine','Fridge',
    'T.V','No Gate Closing Time','Bus Facility','CC Camera','Self Cooking','Co-Livin','A.C','Locker','Games Zone','Balcony','Pent house',
    'Power Bill Seperate','South & North Indian Food','Lunch Box Service','Daywise Stay'
  ];



  const handleSharingPriceChange = (index, event) => {
    const { name, value } = event.target;
    const newSharingPrices = [...formData.sharing_prices];
    newSharingPrices[index] = { ...newSharingPrices[index], [name]: value };
    setFormData(prevData => ({ ...prevData, sharing_prices: newSharingPrices }));
  };

  const handleAddSharingPrice = () => {
    setFormData(prevData => ({
      ...prevData,
      sharing_prices: [...prevData.sharing_prices, { share_type: '', price: '' }]
    }));
  };

  const handleRemoveSharingPrice = (index) => {
    setFormData(prevData => ({
      ...prevData,
      sharing_prices: prevData.sharing_prices.filter((_, i) => i !== index)
    }));
  };

  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'hostel_name':
        if (!value.trim()) error = 'Hostel name is required';
        break;
      case 'hostel_type':
        if (!value.trim()) error = 'Hostel type is required';
        break;
      case 'hostel_city':
        if (!value.trim()) error = 'Hostel city is required';
        break;
      case 'hostel_area':
        if (!value.trim()) error = 'Hostel area is required';
        break;
      case 'hostel_pin_code':
        if (!/^[0-9]{6}$/.test(value)) error = 'Valid pin code is required';
        break;
      case 'hostel_phone':
        if (!/^[0-9]{10}$/.test(value)) error = 'Valid phone number is required';
        break;
      case 'hostel_mail':
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) error = 'Valid email is required';
        break;
      case 'hostel_owner_name':
        if (!value.trim()) error = 'Owner name is required';
        break;
      case 'hostel_password':
        if (value.length < 6) error = 'Password must be at least 6 characters';
        break;
      case 'hostel_confirm_password':
        if (value !== formData.hostel_password) error = 'Passwords do not match';
        break;
      case 'hostel_security_deposit':
        if (!/^[0-9]+$/.test(value)) error = 'Valid security deposit is required';
        break;
      case 'hostel_year':
        if (!value.trim() || !/^\d{4}$/.test(value)) error = 'Valid year is required';
        break;
      case 'hostel_google_map_location':
        if (!value.trim()) error = 'Google Map location is required';
        break;
      default:
        break;
    }

    setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        hostel_owner_languages: {
          ...formData.hostel_owner_languages,
          [name]: checked,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
      validateField(name, value);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(',')[1]; // Get the base64 string without the "data:image/*;base64," prefix
        setFormData(prevData => ({
          ...prevData,
          hostel_image: base64String, // Store the base64 string in formData
        }));
        setImagePreview(URL.createObjectURL(file)); // Set preview if needed
      };
      reader.readAsDataURL(file); // Read the image file as a data URL
    }
  };

  const handleImageChange1 = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(',')[1]; // Get the base64 string without the "data:image/*;base64," prefix
        setFormData(prevData => ({
          ...prevData,
          hostel_image1: base64String, // Store the base64 string in formData
        }));
        setImagePreview1(URL.createObjectURL(file)); // Set preview if needed
      };
      reader.readAsDataURL(file); // Read the image file as a data URL
    }
  };


  const handleImageChange2 = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(',')[1]; // Get the base64 string without the "data:image/*;base64," prefix
        setFormData(prevData => ({
          ...prevData,
          hostel_image2: base64String, // Store the base64 string in formData
        }));
        setImagePreview2(URL.createObjectURL(file)); // Set preview if needed
      };
      reader.readAsDataURL(file); // Read the image file as a data URL
    }
  };

  const handleImageChange3 = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(',')[1]; // Get the base64 string without the "data:image/*;base64," prefix
        setFormData(prevData => ({
          ...prevData,
          hostel_image3: base64String, // Store the base64 string in formData
        }));
        setImagePreview3(URL.createObjectURL(file)); // Set preview if needed
      };
      reader.readAsDataURL(file); // Read the image file as a data URL
    }
  };
  

  const handleFacilitiesChange = (event) => {
    const {
      target: { value },
    } = event;
    setFormData({
      ...formData,
      hostel_facilities: typeof value === 'string' ? value.split(',') : value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const isValid = Object.values(errors).every(error => !error) &&
                    Object.values(formData).every(field => field !== '' && field !== null);

    if (isValid) {
      try {
        const response = await fetch(`${ process.env.REACT_APP_URL}/admin/create`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const result = await response.json();
        if (response.ok) {
          setAlertMessage('Form submitted successfully');
          setAlertSeverity('success');
          navigate('/thanks'); 
          
        } else {
          setAlertMessage(result.message || 'An error occurred');
          setAlertSeverity('error');
        }
      } catch (err) {
        setAlertMessage('An error occurred');
        setAlertSeverity('error');
      }
      setSnackbarOpen(true);
    } else {
      setAlertMessage('Please fill out all required fields');
      setAlertSeverity('error');
      setSnackbarOpen(true);
    }
    setLoading(false); // Hide loading spinner
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };



  const navigate = useNavigate();

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ margin: '0 auto', mt: 1, p: 2, boxShadow: 3, borderRadius: 2, backgroundColor: '#fff' }}
    >
      <HeaderContainer>
        <Box display="flex" alignItems="center">
          <StayText variant="h4" component="h1">
            Stay
          </StayText>
          <BuddieText variant="h4" component="h1">
            Buddie
          </BuddieText>
        </Box>
      </HeaderContainer>

      <Typography
        variant="h5"
        component="h2"
        gutterBottom
        style={{ marginTop: '80px', fontFamily: 'Anta', fontSize: '24px', color: '#ff9933', marginLeft: '3px' }}
      >
        Add Hostel
      </Typography>

      <Typography
        style={{ fontFamily: '"Sofia", sans-serif', color: 'grey', marginLeft: '5px' }}
      >
        Let's get started with adding your hostel details!
      </Typography>

      <TextField
        label="Hostel Name"
        name="hostel_name"
        value={formData.hostel_name}
        onChange={handleChange}
        error={Boolean(errors.hostel_name)}
        helperText={errors.hostel_name}
        fullWidth
        margin="normal"
      />

      <FormControl fullWidth margin="normal" error={Boolean(errors.hostel_type)}>
        <InputLabel>Hostel Type</InputLabel>
        <Select
          name="hostel_type"
          value={formData.hostel_type}
          onChange={handleChange}
        >
          {hostelTypes.map((type, index) => (
            <MenuItem key={index} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
        {errors.hostel_type && <Typography color="error">{errors.hostel_type}</Typography>}
      </FormControl>

      <TextField
        label="City"
        name="hostel_city"
        value={formData.hostel_city}
        onChange={handleChange}
        error={Boolean(errors.hostel_city)}
        helperText={errors.hostel_city}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Area"
        name="hostel_area"
        value={formData.hostel_area}
        onChange={handleChange}
        error={Boolean(errors.hostel_area)}
        helperText={errors.hostel_area}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Pin Code"
        name="hostel_pin_code"
        value={formData.hostel_pin_code}
        onChange={handleChange}
        error={Boolean(errors.hostel_pin_code)}
        helperText={errors.hostel_pin_code}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Phone Number"
        name="hostel_phone"
        value={formData.hostel_phone}
        onChange={handleChange}
        error={Boolean(errors.hostel_phone)}
        helperText={errors.hostel_phone}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Email"
        name="hostel_mail"
        value={formData.hostel_mail}
        onChange={handleChange}
        error={Boolean(errors.hostel_mail)}
        helperText={errors.hostel_mail}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Owner Name"
        name="hostel_owner_name"
        value={formData.hostel_owner_name}
        onChange={handleChange}
        error={Boolean(errors.hostel_owner_name)}
        helperText={errors.hostel_owner_name}
        fullWidth
        margin="normal"
      />

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Password"
            name="hostel_password"
            type="password"
            value={formData.hostel_password}
            onChange={handleChange}
            error={Boolean(errors.hostel_password)}
            helperText={errors.hostel_password}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Confirm Password"
            name="hostel_confirm_password"
            type="password"
            value={formData.hostel_confirm_password}
            onChange={handleChange}
            error={Boolean(errors.hostel_confirm_password)}
            helperText={errors.hostel_confirm_password}
            fullWidth
            margin="normal"
          />
        </Grid>
      </Grid>

      <TextField
        label="Security Deposit"
        name="hostel_security_deposit"
        value={formData.hostel_security_deposit}
        onChange={handleChange}
        error={Boolean(errors.hostel_security_deposit)}
        helperText={errors.hostel_security_deposit}
        fullWidth
        margin="normal"
      />

   {/* Hostel Facilities Multi-Select Field */}
   <FormControl margin="normal" fullWidth>
        <InputLabel>Hostel Facilities</InputLabel>
        <Select
          multiple
          value={formData.hostel_facilities}
          onChange={handleFacilitiesChange}
          renderValue={(selected) => selected.join(', ')}
        >
          {facilitiesOptions.map((facility) => (
            <MenuItem key={facility} value={facility}>
              <Checkbox checked={formData.hostel_facilities.includes(facility)} />
              <ListItemText primary={facility} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Google Map Location"
        name="hostel_google_map_location"
        value={formData.hostel_google_map_location}
        onChange={handleChange}
        error={Boolean(errors.hostel_google_map_location)}
        helperText={errors.hostel_google_map_location}
        fullWidth
        margin="normal"
      />

      <Box margin="normal">
        <FormLabel component="legend">Owner Languages Spoken</FormLabel>
        <FormGroup row>
          <FormControlLabel
            control={<Checkbox checked={formData.hostel_owner_languages.telugu} onChange={handleChange} name="telugu" />}
            label="Telugu"
          />
          <FormControlLabel
            control={<Checkbox checked={formData.hostel_owner_languages.hindi} onChange={handleChange} name="hindi" />}
            label="Hindi"
          />
          <FormControlLabel
            control={<Checkbox checked={formData.hostel_owner_languages.english} onChange={handleChange} name="english" />}
            label="English"
          />
        </FormGroup>
      </Box>

      <Box margin="normal">
        <FormLabel component="legend">Sharing Prices</FormLabel>
        {formData.sharing_prices.map((price, index) => (
          <Grid container spacing={2} key={index}>
            <Grid item xs={5}>
              <TextField
                label="Share Type"
                name="share_type"
                value={price.share_type}
                onChange={(e) => handleSharingPriceChange(index, e)}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                label="Price"
                name="price"
                value={price.price}
                onChange={(e) => handleSharingPriceChange(index, e)}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={2}>
              <IconButton onClick={() => handleRemoveSharingPrice(index)} color="error" size="large">
                <RemoveIcon />
              </IconButton>
            </Grid>
          </Grid>
        ))}
        <Button onClick={handleAddSharingPrice} color="primary" variant="outlined" startIcon={<AddIcon />}>
          Add Another Share
        </Button>
      </Box>

      <TextField
        label="Year Established"
        name="hostel_year"
        value={formData.hostel_year}
        onChange={handleChange}
        error={Boolean(errors.hostel_year)}
        helperText={errors.hostel_year}
        fullWidth
        margin="normal"
      />

      <TextField
        label="About Hostel"
        name="hostel_about"
        value={formData.hostel_about}
        onChange={handleChange}
        fullWidth
        multiline
        rows={3}
        margin="normal"
      />

      <TextField
        label="Message for Users"
        name="hostel_message"
        value={formData.hostel_message}
        onChange={handleChange}
        fullWidth
        multiline
        rows={2}
        margin="normal"
      />

      <Box mt={2} mb={2}>
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="raised-button-file"
          type="file"
          onChange={handleImageChange}
        />
        <label htmlFor="raised-button-file">
          <Button variant="contained" component="span" color="primary">
            Upload Hostel Image
          </Button>
        </label>
      </Box>

      {imagePreview && (
        <Box mt={2} mb={2}>
          <img src={imagePreview} alt="Hostel Preview" style={{ maxWidth: '100%' }} />
        </Box>
      )}




<Box mt={2} mb={2}>
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="raised-button-file1"
          type="file"
          onChange={handleImageChange1}
        />
        <label htmlFor="raised-button-file1">
          <Button variant="contained" component="span" color="primary">
            Upload Hostel Image
          </Button>
        </label>
</Box>

      {imagePreview1 && (
        <Box mt={2} mb={2}>
          <img src={imagePreview1} alt="Hostel Preview" style={{ maxWidth: '100%' }} />
        </Box>
      )}



<Box mt={2} mb={2}>
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="raised-button-file2"
          type="file"
          onChange={handleImageChange2}
        />
        <label htmlFor="raised-button-file2">
          <Button variant="contained" component="span" color="primary">
            Upload Hostel Image
          </Button>
        </label>
      </Box>

      {imagePreview2 && (
        <Box mt={2} mb={2}>
          <img src={imagePreview2} alt="Hostel Preview" style={{ maxWidth: '100%' }} />
        </Box>
      )}



<Box mt={2} mb={2}>
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="raised-button-file3"
          type="file"
          onChange={handleImageChange3}
        />
        <label htmlFor="raised-button-file3">
          <Button variant="contained" component="span" color="primary">
            Upload Hostel Image
          </Button>
        </label>
      </Box>

      {imagePreview3 && (
        <Box mt={2} mb={2}>
          <img src={imagePreview3} alt="Hostel Preview" style={{ maxWidth: '100%' }} />
        </Box>
      )}




      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        style={{ backgroundColor: '#ff9933', marginTop: '10px' }}
      >
       {loading ? (
          <CircularProgress size={24} style={{ color: 'white' }} /> // Show spinner while loading
        ) : (
          'Submit'
        )}
      </Button>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={alertSeverity} sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddHostelForm;





