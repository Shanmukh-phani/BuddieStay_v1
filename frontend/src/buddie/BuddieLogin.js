// // import React, { useEffect, useState } from 'react';
// // import {
// //   Box,
// //   Button,
// //   TextField,
// //   Typography,
// //   Container,
// //   Paper,
// //   InputAdornment,
// //   Snackbar,
// //   Alert,
// //   AppBar,
// //   IconButton
// // } from '@mui/material';
// // import { Phone, Lock, ArrowBack, Visibility, VisibilityOff } from '@mui/icons-material';
// // import { styled } from '@mui/system';
// // import profileImage from '../assets/buddie.jpg';
// // import { useNavigate } from 'react-router-dom';
// // import axios from 'axios';

// // const HeaderContainer = styled(Box)({
// //   display: 'flex',
// //   alignItems: 'center',
// //   justifyContent: 'space-between',
// //   boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
// //   padding: '14px 16px',
// //   position: 'fixed',
// //   top: 0,
// //   left: 0,
// //   width: '100%',
// //   boxSizing: 'border-box',
// //   backgroundColor: '#fff',
// //   zIndex: 1000,
// // });

// // const StayText = styled(Typography)({
// //   fontFamily: '"Sofia", sans-serif',
// //   fontSize: '24px',
// //   fontWeight: 'bold',
// //   color: '#006399',
// // });

// // const BuddieText = styled(Typography)({
// //   fontFamily: '"Sofia", sans-serif',
// //   fontSize: '24px',
// //   fontWeight: 'bold',
// //   color: '#333',
// // });

// // const ProfileIcon = styled(IconButton)({
// //   borderRadius: '50%',
// //   backgroundColor: '#ddd',
// //   width: '40px',
// //   height: '40px',
// // });

// // const BuddieLogin = () => {
// //   const navigate = useNavigate();

// //   // Check if the authToken exists
// //   useEffect(() => {
// //     const authToken = localStorage.getItem('buddieAuthToken');
// //     if (authToken) {
// //       navigate('/buddie/home'); // Redirect to admin home if authToken exists
// //     }
// //   }, [navigate]);


// //   const [buddiePhone, setBuddiePhone] = useState('');
// //   const [buddiePassword, setbuddiePassword] = useState('');
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [errors, setErrors] = useState({});
// //   const [toast, setToast] = useState({ open: false, message: '', severity: '' });

// //   const handleBackClick = () => {
// //     navigate(-1);
// //   };

// //   const validatePhoneNumber = (value) => {
// //     if (!value) {
// //       return 'Phone number is required';
// //     } else if (!/^\d{10}$/.test(value)) {
// //       return 'Phone number must be 10 digits';
// //     }
// //     return '';
// //   };

// //   const validatePassword = (value) => {
// //     if (!value) {
// //       return 'Password is required';
// //     } else if (value.length < 6) {
// //       return 'Password must be at least 6 characters';
// //     }
// //     return '';
// //   };

// //   const handlePhoneNumberChange = (e) => {
// //     const value = e.target.value;
// //     setBuddiePhone(value);
// //     setErrors((prevErrors) => ({
// //       ...prevErrors,
// //       phoneNumber: validatePhoneNumber(value),
// //     }));
// //   };

// //   const handlePasswordChange = (e) => {
// //     const value = e.target.value;
// //     setbuddiePassword(value);
// //     setErrors((prevErrors) => ({
// //       ...prevErrors,
// //       password: validatePassword(value),
// //     }));
// //   };

// //   const handleLogin = async () => {
// //     // Validate the phone number and password inputs
// //     const phoneNumberError = validatePhoneNumber(buddiePhone);
// //     const passwordError = validatePassword(buddiePassword);
  
// //     // If there are validation errors, set them in state and return
// //     if (phoneNumberError || passwordError) {
// //       setErrors({
// //         phoneNumber: phoneNumberError,
// //         password: passwordError,
// //       });
// //       return;
// //     }
  
// //     // Clear previous errors if validation passes
// //     setErrors({});
  
// //     try {
// //       // Make the login request to the backend API
// //       const loginResponse = await axios.post(`${process.env.REACT_APP_URL}/buddie/login`, {
// //         buddie_contact: buddiePhone,
// //         buddie_password: buddiePassword,
// //       },{
// //         headers: {
// //           'Content-Type': 'application/json'
// //         }
// //     });
  
// //       console.log('Login Response:', loginResponse.data);
  
// //       // Check for successful login and presence of token and buddie_id
// //       if (loginResponse.status === 200 && loginResponse.data.token && loginResponse.data.buddie_id) {
// //         // Store token and buddie_id in localStorage
// //         localStorage.setItem('buddieAuthToken', loginResponse.data.token);
// //         localStorage.setItem('buddie_id', loginResponse.data.buddie_id);
  
// //         // Show a success toast message
// //         setToast({ open: true, message: 'Login successful', severity: 'success' });
  
// //         // Navigate to the home page after successful login
// //         navigate('/buddie/home');
// //       } else {
// //         // Handle unexpected response structure
// //         throw new Error('Unexpected response structure');
// //       }
// //     } catch (error) {
// //       // Log error and show error message in a toast
// //       console.error('Login Error:', error);
// //       setToast({ open: true, message: error.response?.data?.message || 'An error occurred', severity: 'error' });
// //     }
// //   };
  



// //   const handleToastClose = () => {
// //     setToast({ ...toast, open: false });
// //   };

// //   return (
// //     <div>


// //       <AppBar position="static">
// //         <HeaderContainer>
// //           <Box display="flex" alignItems="center">
// //             <IconButton edge="start" color="inherit" aria-label="back" style={{ color: 'black' }} onClick={handleBackClick}>
// //               <ArrowBack />
// //             </IconButton>
// //             <StayText variant="h4" component="h1" style={{ marginLeft: '25px', color: '#006399' }}>
// //               Stay
// //             </StayText>
// //             <BuddieText variant="h4" component="h1">
// //               Buddie
// //             </BuddieText>
// //           </Box>

// //           <Box >
// //             <ProfileIcon>
// //               <img src={profileImage} alt="Profile" style={{ width: '100%', height: '100%' }} />
// //             </ProfileIcon>
// //           </Box>
// //         </HeaderContainer>
// //       </AppBar>

// //       <Container maxWidth="xs">
// //         <Paper elevation={3} sx={{ padding: 4, mt: 15 }}>
// //           <Typography variant="h4" align="center" gutterBottom>
// //             Buddie Login
// //           </Typography>
// //           <Box component="form" sx={{ mt: 3 }}>
// //             <TextField
// //               fullWidth
// //               variant="outlined"
// //               label="Phone Number"
// //               value={buddiePhone}
// //               onChange={handlePhoneNumberChange}
// //               margin="normal"
// //               InputProps={{
// //                 startAdornment: (
// //                   <InputAdornment position="start">
// //                     <Phone />
// //                   </InputAdornment>
// //                 ),
// //               }}
// //               error={Boolean(errors.phoneNumber)}
// //               helperText={errors.phoneNumber}
// //             />
// //             <TextField
// //               fullWidth
// //               variant="outlined"
// //               label="Password"
// //               type={showPassword ? 'text' : 'password'}
// //               value={buddiePassword}
// //               onChange={handlePasswordChange}
// //               margin="normal"
// //               InputProps={{
// //                 startAdornment: (
// //                   <InputAdornment position="start">
// //                     <Lock />
// //                   </InputAdornment>
// //                 ),
// //                 endAdornment: (
// //                   <InputAdornment position="end">
// //                     <IconButton onClick={() => setShowPassword(!showPassword)}>
// //                       {showPassword ? <VisibilityOff /> : <Visibility />}
// //                     </IconButton>
// //                   </InputAdornment>
// //                 ),
// //               }}
// //               error={Boolean(errors.password)}
// //               helperText={errors.password}
// //             />
// //             <Button
// //               fullWidth
// //               variant="contained"
// //               color="primary"
// //               onClick={handleLogin}
// //               sx={{ mt: 3 }}
// //             >
// //               Login
// //             </Button>
// //           </Box>
// //         </Paper>
// //       </Container>

// //       <Snackbar open={toast.open} autoHideDuration={6000} onClose={handleToastClose}>
// //         <Alert onClose={handleToastClose} severity={toast.severity} sx={{ width: '100%' }}>
// //           {toast.message}
// //         </Alert>
// //       </Snackbar>
// //     </div>
// //   );
// // };

// // export default BuddieLogin;


// import React, { useEffect, useState } from 'react';
// import {
//   Box,
//   Button,
//   TextField,
//   Typography,
//   Container,
//   Paper,
//   InputAdornment,
//   Snackbar,
//   Alert,
//   IconButton,
// } from '@mui/material';
// import { Phone, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
// import { styled } from '@mui/system';
// import profileImage from '../assets/buddie.jpg'; // Add your new image here
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const FormContainer = styled(Paper)({
//   padding: '24px',
//   marginTop: '20px',
//   borderRadius: '12px',
//   boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
// });

// const ImageContainer = styled(Box)({
//   display: 'flex',
//   justifyContent: 'center',
//   marginTop: '40px',
// });

// const StyledImage = styled('img')({
//   width: '150px',
//   height: '150px',
//   borderRadius: '50%',
//   border: '5px solid #006399',
// });

// const BuddieLogin = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const authToken = localStorage.getItem('buddieAuthToken');
//     if (authToken) {
//       navigate('/buddie/home');
//     }
//   }, [navigate]);

//   const [buddiePhone, setBuddiePhone] = useState('');
//   const [buddiePassword, setBuddiePassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [toast, setToast] = useState({ open: false, message: '', severity: '' });

//   const validatePhoneNumber = (value) => {
//     if (!value) {
//       return 'Phone number is required';
//     } else if (!/^\d{10}$/.test(value)) {
//       return 'Phone number must be 10 digits';
//     }
//     return '';
//   };

//   const validatePassword = (value) => {
//     if (!value) {
//       return 'Password is required';
//     } else if (value.length < 6) {
//       return 'Password must be at least 6 characters';
//     }
//     return '';
//   };

//   const handlePhoneNumberChange = (e) => {
//     const value = e.target.value;
//     setBuddiePhone(value);
//     setErrors((prevErrors) => ({
//       ...prevErrors,
//       phoneNumber: validatePhoneNumber(value),
//     }));
//   };

//   const handlePasswordChange = (e) => {
//     const value = e.target.value;
//     setBuddiePassword(value);
//     setErrors((prevErrors) => ({
//       ...prevErrors,
//       password: validatePassword(value),
//     }));
//   };

//   const handleLogin = async () => {
//     const phoneNumberError = validatePhoneNumber(buddiePhone);
//     const passwordError = validatePassword(buddiePassword);

//     if (phoneNumberError || passwordError) {
//       setErrors({
//         phoneNumber: phoneNumberError,
//         password: passwordError,
//       });
//       return;
//     }

//     setErrors({});

//     try {
//       const loginResponse = await axios.post(`${process.env.REACT_APP_URL}/buddie/login`, {
//         buddie_contact: buddiePhone,
//         buddie_password: buddiePassword,
//       });

//       if (loginResponse.status === 200 && loginResponse.data.token && loginResponse.data.buddie_id) {
//         localStorage.setItem('buddieAuthToken', loginResponse.data.token);
//         localStorage.setItem('buddie_id', loginResponse.data.buddie_id);
//         setToast({ open: true, message: 'Login successful', severity: 'success' });
//         navigate('/buddie/home');
//       } else {
//         throw new Error('Unexpected response structure');
//       }
//     } catch (error) {
//       setToast({ open: true, message: error.response?.data?.message || 'An error occurred', severity: 'error' });
//     }
//   };

//   const handleToastClose = () => {
//     setToast({ ...toast, open: false });
//   };

//   return (
//     <Container maxWidth="xs">
//       <ImageContainer>
//         <StyledImage src={profileImage} alt="Buddie Profile" />
//       </ImageContainer>

//       <FormContainer elevation={3}>
//         <Typography variant="h4" align="center" gutterBottom>
//           Buddie Login
//         </Typography>
//         <Box component="form" sx={{ mt: 3 }}>
//           <TextField
//             fullWidth
//             variant="outlined"
//             label="Phone Number"
//             value={buddiePhone}
//             onChange={handlePhoneNumberChange}
//             margin="normal"
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <Phone />
//                 </InputAdornment>
//               ),
//             }}
//             error={Boolean(errors.phoneNumber)}
//             helperText={errors.phoneNumber}
//           />
//           <TextField
//             fullWidth
//             variant="outlined"
//             label="Password"
//             type={showPassword ? 'text' : 'password'}
//             value={buddiePassword}
//             onChange={handlePasswordChange}
//             margin="normal"
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <Lock />
//                 </InputAdornment>
//               ),
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton onClick={() => setShowPassword(!showPassword)}>
//                     {showPassword ? <VisibilityOff /> : <Visibility />}
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//             error={Boolean(errors.password)}
//             helperText={errors.password}
//           />
//           <Button
//             fullWidth
//             variant="contained"
//             color="primary"
//             onClick={handleLogin}
//             sx={{ mt: 3 }}
//           >
//             Login
//           </Button>
//         </Box>
//       </FormContainer>

//       <Snackbar open={toast.open} autoHideDuration={6000} onClose={handleToastClose}>
//         <Alert onClose={handleToastClose} severity={toast.severity} sx={{ width: '100%' }}>
//           {toast.message}
//         </Alert>
//       </Snackbar>
//     </Container>
//   );
// };

// export default BuddieLogin;

import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  InputAdornment,
  Snackbar,
  Alert,
  Chip,
  IconButton,
  AppBar,
} from '@mui/material';
import { Phone, Lock, Visibility, VisibilityOff, ArrowBack } from '@mui/icons-material';
import { styled } from '@mui/system';
import profileImage from '../assets/buddie.jpg'; // Your top image
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header_sub_buddie from '../Header_sub_Buddie';

const LocationChip = styled(Chip)({
  marginTop: '80px',
  fontFamily: 'Anta',
  fontSize: '25px',
  // fontWeight: 'bold',
  marginLeft: '0px',
  // color: '#000000',
  // color: '#ff7f00',
  // color: '#ff6800',
  // color: 'lightsalmon'
    backgroundColor:'white',

});

const LocationChip1 = styled(Chip)({
  marginTop: '15px',
  fontFamily: 'Anta',
  fontSize: '18px',
  // fontWeight: 'bold',
  // backgroundColor:'lightsalmon',
  marginLeft: '0px',
  // color: '#000000', 
  float:'right'
});





const LoginContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
});

const ProfileImage = styled('img')({
  width: '120px',
  height: '120px',
  borderRadius: '50%',
  marginBottom: '16px',
  objectFit: 'cover',
});

const FormContainer = styled(Box)({
  width: '100%',
  maxWidth: '400px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

const InputField = styled(TextField)({
  // backgroundColor: '#f9f9f9',
  // borderRadius: '8px',
  padding:'10px'
});

const LoginButton = styled(Button)({
  backgroundColor: 'lightsalmon',
  color: '#fff',
  fontWeight:'bold',
  textTransform: 'none',
  padding: '8px 8px',
  marginLeft:'10px',
  marginRight:'10px',
  borderRadius: '8px',
  fontSize: '16px',

  '&:hover': {
    backgroundColor: '#004f80',
  },
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
  color:'white'
});

const BuddieText = styled(Typography)({
  fontFamily: '"Sofia", sans-serif',
  fontSize: '24px',
  fontWeight: 'bold',
  // color: '#f0c674',
  color:'tomato'
});
  




const BuddieLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem('buddieAuthToken');
    if (authToken) {
      navigate('/buddie/home');
    }
  }, [navigate]);

  const [buddiePhone, setBuddiePhone] = useState('');
  const [buddiePassword, setbuddiePassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({ open: false, message: '', severity: '' });

  const validatePhoneNumber = (value) => {
    if (!value) {
      return 'Phone number is required';
    } else if (!/^\d{10}$/.test(value)) {
      return 'Phone number must be 10 digits';
    }
    return '';
  };

  const validatePassword = (value) => {
    if (!value) {
      return 'Password is required';
    } else if (value.length < 6) {
      return 'Password must be at least 6 characters';
    }
    return '';
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    setBuddiePhone(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      phoneNumber: validatePhoneNumber(value),
    }));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setbuddiePassword(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      password: validatePassword(value),
    }));
  };

  const handleLogin = async () => {


    const phoneNumberError = validatePhoneNumber(buddiePhone);
    const passwordError = validatePassword(buddiePassword);
    
    if (phoneNumberError || passwordError) {
      setErrors({ phoneNumber: phoneNumberError, password: passwordError });
      return;
    }

    // console.log(buddiePhone,buddiePassword)
    
    setErrors({});
    try {
      const loginResponse = await axios.post(`${process.env.REACT_APP_URL}/buddie/login`, {
        buddie_contact: buddiePhone,
        buddie_password: buddiePassword,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

     

      if (loginResponse.status === 200 && loginResponse.data.token && loginResponse.data.buddie_id) {
        localStorage.setItem('buddieAuthToken', loginResponse.data.token);
        localStorage.setItem('buddie_id', loginResponse.data.buddie_id);
        setToast({ open: true, message: 'Login successful', severity: 'success' });
        navigate('/buddie/home');
      } else {
        throw new Error('Unexpected response structure');
      }
    } catch (error) {
      setToast({ open: true, message: error.response?.data?.message || 'An error occurred', severity: 'error' });
    }
  };

  const handleToastClose = () => {
    setToast({ ...toast, open: false });
  };

  const handleBackClick1 = () => {
    navigate('/'); // Adjust this route to your settings page route
};


  return (
<div>
{/* <Header_sub_buddie/> */}


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
                            onClick={handleBackClick1}
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

              
                </HeaderContainer>
            </AppBar>

<Box display="flex" alignItems="center" justifyContent="space-between" mt={6} ml={1}>
                            <LocationChip label={'Login as Buddie'} />
                        </Box>


        {/* <ProfileImage src={profileImage} alt="Profile" />
       */}


<Box component="form" sx={{ mt: 1,p:1 }}>
      <FormContainer mt={3}>
        <InputField
          variant="outlined"
          label="Phone Number"
          value={buddiePhone}
          onChange={handlePhoneNumberChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Phone />
              </InputAdornment>
            ),
          }}
          error={Boolean(errors.phoneNumber)}
          helperText={errors.phoneNumber}
        />
        <InputField
          variant="outlined"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={buddiePassword}
          onChange={handlePasswordChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          error={Boolean(errors.password)}
          helperText={errors.password}
        />
        <LoginButton onClick={handleLogin}>Login</LoginButton>
      </FormContainer>
      <Link to={'/admin-login'}>
                            <LocationChip1   label={'Login as Owner.. ?'} />
                            </Link>
      </Box>

      <Snackbar open={toast.open} autoHideDuration={6000} onClose={handleToastClose}>
        <Alert onClose={handleToastClose} severity={toast.severity} sx={{ width: '100%' }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </div>
 
  );
};

export default BuddieLogin;
