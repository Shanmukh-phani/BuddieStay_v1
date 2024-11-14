// import React, { useState, useRef } from 'react';
// import axios from 'axios';
// import { Box, Button, TextField, Grid, Typography, Avatar } from '@mui/material';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { styled } from '@mui/system';
// import profileImage from './assets/buddie.jpg';
// import { Link, useNavigate } from 'react-router-dom';
// import { AppBar, IconButton } from '@mui/material';
// import {ArrowBack, Wifi as WifiIcon, LocalDining as LocalDiningIcon, LocalParking as LocalParkingIcon, LocalLaundryService as LocalLaundryServiceIcon, BatteryChargingFull as BatteryChargingFullIcon, CleanHands as CleanHandsIcon, FilterList as FilterListIcon } from '@mui/icons-material';


// const HeaderContainer = styled(Box)({
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     mb: 4,
//     boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//     padding: '14px 16px',
//     position: 'fixed',
//     top: 0,
//     left: 0,
//     width: '100%',
//     boxSizing: 'border-box',
//     backgroundColor: '#fff',
//     zIndex: 1000,
// });

// const StayText = styled(Typography)({
//     fontFamily: '"Sofia", sans-serif',
//     fontSize: '24px',
//     fontWeight: 'bold',
//     color: 'orange',
// });

// const BuddieText = styled(Typography)({
//     fontFamily: '"Sofia", sans-serif',
//     fontSize: '24px',
//     fontWeight: 'bold',
//     color: '#333',
// });


// const ProfileIcon = styled(IconButton)({
//     borderRadius: '50%',
//     backgroundColor: '#ddd',
//     width: '40px',
//     height: '40px',
//   });







// const Login = () => {





//   const [email, setEmail] = useState('');
//   const [otp, setOtp] = useState(['', '', '', '']);
//   const [otpSent, setOtpSent] = useState(false);
//   const otpRefs = useRef([]);

//   const handleSendOtp = async () => {
//     try {
//       await axios.post('http://192.168.1.29:5000/admin/send-otp', { email });
//       setOtpSent(true);
//       toast.success('OTP sent successfully!');
//     } catch (error) {
//       toast.error('Error sending OTP');
//     }
//   };

//   const handleOtpChange = (index, value) => {
//     if (value.length > 1) return; // Ensure only a single digit is entered
//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     // Move to the next input box if the current one is filled
//     if (value !== '' && index < otpRefs.current.length - 1) {
//       otpRefs.current[index + 1].focus();
//     }
//   };

//   const handleVerifyOtp = async () => {
//     const enteredOtp = otp.join('');
//     try {
//       await axios.post('http://192.168.1.29:5000/admin/verify-otp', { email, otp: enteredOtp });
//       toast.success('OTP verified successfully');
//       setTimeout(() => {
//         window.location.href = '/admin'; // Redirect to home page
//       }, 2000);
//     } catch (error) {
//       toast.error('Invalid OTP');
//     }
//   };




// const navigate = useNavigate(); // Initialize navigate function

// const handleBackClick = () => {
//     navigate('/'); // Go back to the previous page
// };


// const handleClick = () => {
//   navigate('/admin-login');
// };

// // const onClick = () => {
// //   navigate('/buddie-login');
// // };





//   return (

//     <div>


// <AppBar position="static">
//                 <HeaderContainer>
//                     <Box display="flex" alignItems="center">
//                         <IconButton edge="start" color="inherit" aria-label="back" style={{ color: 'black' }} onClick={handleBackClick}>
//                             <ArrowBack  />
//                         </IconButton>
//                         <StayText variant="h4" component="h1" style={{ marginLeft: '25px',color:'#006399' }}>
//                             Stay
//                         </StayText>
//                         <BuddieText variant="h4" component="h1">
//                             Buddie
//                         </BuddieText>
//                     </Box>

//                     <Box >
//             <ProfileIcon>
//               <img src={profileImage} alt="Profile" style={{ width: '100%', height: '100%' }} />
//             </ProfileIcon>
//           </Box>
//                 </HeaderContainer>
//             </AppBar>




//     <Box sx={{ padding: '50px', maxWidth: '400px', marginTop: '60px', textAlign: 'center' }}>
//       <Avatar
//         src="https://example.com/path-to-login-image.jpg"
//         alt="Login Image"
//         sx={{ width: 100, height: 100, margin: 'auto', marginBottom: 2 }}
//       />
//       <Typography variant="h5" gutterBottom>
//         OTP Authentication
//       </Typography>
//       <Box sx={{ marginBottom: 3 }}>
//         <TextField
//           fullWidth
//           label="Enter your email"
//           variant="outlined"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           disabled={otpSent}
//         />
//         {!otpSent && (
//           <Button
//             fullWidth
//             variant="contained"
//             sx={{ marginTop: 2 }}
//             onClick={handleSendOtp}
//           >
//             Send OTP
//           </Button>
//         )}
//       </Box>
//       {otpSent && (
//         <Box>
//           <Grid container spacing={2} justifyContent="center">
//             {otp.map((digit, index) => (
//               <Grid item xs={3} key={index}>
//                 <TextField
//                   inputProps={{ maxLength: 1, style: { textAlign: 'center' } }}
//                   variant="outlined"
//                   value={digit}
//                   onChange={(e) => handleOtpChange(index, e.target.value)}
//                   inputRef={(el) => (otpRefs.current[index] = el)}
//                 />
//               </Grid>
//             ))}
//           </Grid>
//           <Button
//             fullWidth
//             variant="contained"
//             sx={{ marginTop: 2 }}
//             onClick={handleVerifyOtp}
//           >
//             Verify OTP
//           </Button>
//         </Box>
//       )}
//       <ToastContainer position="top-center" autoClose={3000} />    
//     </Box>
//     <Link to={('/buddie-login')}>Buddie Login..?</Link>



//     <Box
//       sx={{
//         position: 'fixed',
//         bottom: 0,
//         left: 0,
//         width: '100%',
//         backgroundColor: '#fff', // Optional: to give a background color for visibility
//         boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.1)', // Optional: to add a shadow for better visibility
//         padding: '10px 0',
//         zIndex: 1000,
//       }}
//     >
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={handleClick}
//         sx={{
//           width: '100%',
//           padding: '10px 0',
//           borderRadius: '0', // Remove border radius for full-width button
//           textTransform: 'none',
//           fontWeight: 'bold',
//         }}
//       >
//         Hostel Owner
//       </Button>
//     </Box>
//     </div>
//   );
// };

// export default Login;




import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Grid, Typography, Avatar, AppBar, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import profileImage from './assets/buddie.jpg';

import Header_sub from './Header_sub';


const HeaderContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  padding: '14px 16px',
  backgroundColor: '#0047AB',
  zIndex: 1000,
});

const StayText = styled(Typography)({
  fontFamily: '"Sofia", sans-serif',
  fontSize: '26px',
  fontWeight: 700,
  color: '#FF9800',
});

const BuddieText = styled(Typography)({
  fontFamily: '"Sofia", sans-serif',
  fontSize: '26px',
  fontWeight: 700,
  color: '#fff',
});

const ProfileIcon = styled(IconButton)({
  borderRadius: '50%',
  width: '40px',
  height: '40px',
  overflow: 'hidden',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
});

const LoginContainer = styled(Box)({
  padding: '20px',
  maxWidth: '400px',
  margin: '80px auto 0',
  backgroundColor: '#fff',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  borderRadius: '10px',
  textAlign: 'center',
});

const LoginButton = styled(Button)({
  marginTop: '15px',
  backgroundColor: '#FF9800',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#E67E22',
  },
  fontWeight: 'bold',
});

const OtpInput = styled(TextField)({
  '& input': {
    textAlign: 'center',
    fontSize: '18px',
  },
});

const BottomButton = styled(Button)({
  width: '100%',
  padding: '12px',
  borderRadius: '0',
  backgroundColor: '#0047AB',
  fontWeight: 'bold',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#003780',
  },
});

const Login = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [otpSent, setOtpSent] = useState(false);
  const otpRefs = useRef([]);

  const navigate = useNavigate();

  const handleSendOtp = async () => {
    try {
      await axios.post('http://192.168.1.29:5000/admin/send-otp', { email });
      setOtpSent(true);
      toast.success('OTP sent successfully!');
    } catch (error) {
      toast.error('Error sending OTP');
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value !== '' && index < otpRefs.current.length - 1) {
      otpRefs.current[index + 1].focus();
    }
  };

  const handleVerifyOtp = async () => {
    const enteredOtp = otp.join('');
    try {
      await axios.post('http://192.168.1.29:5000/admin/verify-otp', { email, otp: enteredOtp });
      toast.success('OTP verified successfully');
      setTimeout(() => {
        navigate('/admin');
      }, 2000);
    } catch (error) {
      toast.error('Invalid OTP');
    }
  };

  return (
    <div>
      {/* <AppBar position="static">
        <HeaderContainer>
          <Box display="flex" alignItems="center">
            <IconButton edge="start" color="inherit" aria-label="back" onClick={() => navigate('/')}>
              <ArrowBack style={{ color: '#fff' }} />
            </IconButton>
            <StayText variant="h4" component="h1">
              Stay
            </StayText>
            <BuddieText variant="h4" component="h1">
              Buddie
            </BuddieText>
          </Box>
          <ProfileIcon>
            <img src={profileImage} alt="Profile" />
          </ProfileIcon>
        </HeaderContainer>
      </AppBar> */}

<Header_sub/>

      <LoginContainer>
        <Avatar
          src="https://example.com/path-to-login-image.jpg"
          alt="Login Image"
          sx={{ width: 100, height: 100, margin: 'auto', marginBottom: 2 }}
        />
        <Typography variant="h5" gutterBottom>
          OTP Authentication
        </Typography>
        <TextField
          fullWidth
          label="Enter your email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={otpSent}
          sx={{ marginBottom: 2 }}
        />
        {!otpSent && (
          <LoginButton fullWidth variant="contained" onClick={handleSendOtp}>
            Send OTP
          </LoginButton>
        )}

        {otpSent && (
          <Box sx={{ marginTop: 2 }}>
            <Grid container spacing={2} justifyContent="center">
              {otp.map((digit, index) => (
                <Grid item xs={3} key={index}>
                  <OtpInput
                    variant="outlined"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    inputRef={(el) => (otpRefs.current[index] = el)}
                    inputProps={{ maxLength: 1 }}
                  />
                </Grid>
              ))}
            </Grid>
            <LoginButton fullWidth onClick={handleVerifyOtp}>
              Verify OTP
            </LoginButton>
          </Box>
        )}
      </LoginContainer>

      <ToastContainer position="top-center" autoClose={3000} />

      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          backgroundColor: '#fff',
          boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.1)',
          padding: '10px 0',
          zIndex: 1000,
        }}
      >
        <BottomButton onClick={() => navigate('/admin-login')}>Hostel Owner</BottomButton>
      </Box>

      {/* <Link to="/buddie-login" style={{ display: 'block', textAlign: 'center', marginTop: '15px', color: '#0047AB' }}>
        Buddie Login..?
      </Link> */}
      <Link 
  to="/buddie-login" 
  style={{ 
    display: 'inline-block', 
    textAlign: 'center', 
    marginTop: '20px', 
    color: 'black', 
    fontWeight: 'bold', 
    textDecoration: 'none',
    padding: '10px 20px', 
    borderRadius: '5px', 
    backgroundColor: '#f0f0f0',
    float:'right',
    transition: 'background-color 0.3s ease',
  }}
  onMouseEnter={(e) => e.target.style.backgroundColor = '#e0e0e0'}
  onMouseLeave={(e) => e.target.style.backgroundColor = '#f0f0f0'}
>
  Buddie Login..?
</Link>

    </div>
  );
};

export default Login;
