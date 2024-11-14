import React, { useEffect, useState } from 'react';
import { AppBar, Box, Typography, Chip, Grid } from '@mui/material';
import { Home, Chair, People } from '@mui/icons-material';
import { styled } from '@mui/system';
import { Bar, Pie } from 'react-chartjs-2';
import axios from 'axios';
import LoadingScreen from '../LoadingScreen';
import BottomNavBar from './BottomNavBar';
import { Line } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import TopFacilities from './TopFacilities';
import HeaderSub from '../HeaderSub';
import PaymentStatistics from './PaymentStatistics';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);



const LocationChip1 = styled(Chip)({
  // marginTop: '15px',
  fontFamily: 'Anta',
  fontSize: '18px',
  textAlign: 'center'
});


const Dashboard = () => {
  const [data, setData] = useState({
    totalRooms: 0,
    totalBuddies: 0,
    totalVacancies: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);




  // Inside your Dashboard component
  const [paymentData, setPaymentData] = useState([]);
  const [paymentLoading, setPaymentLoading] = useState(true);
  const [paymentError, setPaymentError] = useState(null);


  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const hostel_id = localStorage.getItem('hostel_id');
        const authToken = localStorage.getItem('authToken');

        if (!hostel_id) {
          throw new Error('Hostel ID not found in localStorage');
        }

        if (!authToken) {
          throw new Error('Authentication token not found');
        }

        const response = await axios.get(`${process.env.REACT_APP_URL}/admin/dashboard`, {
          params: { hostel_id },
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        setData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError(error.response?.data?.message || error.message || 'Failed to fetch dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  // Calculate derived values based on response data
  const totalCapacity = data.totalVacancies + data.totalBuddies;
  const totalOccupied = data.totalBuddies;

  // Prepare data for the bar chart
  const chartData = {
    labels: ['Vacancies', 'Occupied'],
    datasets: [
      {
        label: 'Number of Rooms',
        data: [data.totalVacancies, totalOccupied],
        backgroundColor: ['#42a5f5', '#66bb6a'],
        borderColor: ['#1e88e5', '#43a047'],
        borderWidth: 1,
      },
    ],
  };



  // Prepare data for the pie chart
  const pieChartData = {
    labels: ['Vacancies', 'Occupied'],
    datasets: [
      {
        label: 'Room Status',
        data: [data.totalVacancies, totalOccupied],
        backgroundColor: ['#42a5f5', '#66bb6a'],
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Room Status Distribution',
      },
    },
  };

  if (loading) return <LoadingScreen />;

  if (error) return <Typography color="error" variant="h6" align="center" mt={4}>{error}</Typography>;



  return (
    <div style={{marginTop:'100px',padding:'10px'}}>
      <HeaderSub />


        <LocationChip1 label={'Hostel Dashboard'} />


        <Grid container spacing={4} mb={6} mt={4} justifyContent="center">
          <Grid item xs={6} sm={6} md={3} lg={2}>
            <Typography
              variant="h6"
              align="center"
              sx={{
                fontWeight: 'bold', // Make the text bold
                fontSize: '1.25rem', // Adjust font size
                letterSpacing: '0.5px', // Add letter spacing for better readability
                color: 'text.primary', // Ensures the text color is consistent with theme
                lineHeight: 1.5, // Adjust line height for better readability
                marginBottom: 1, // Space below the typography
              }}
            >
              Vacancies
            </Typography>
            <Chip
              icon={<Home />}
              label={data.totalVacancies}
              color="primary"
              variant="outlined"
              sx={{
                borderRadius: '20px',
                fontSize: '1rem',
                padding: '12px 24px',
                backgroundColor: '#e3f2fd',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                mb: 1,
              }}
            />
          </Grid>
          <Grid item xs={6} sm={6} md={3} lg={2}>
            <Typography
              variant="h6"
              align="center"
              sx={{
                fontWeight: 'bold', // Make the text bold
                fontSize: '1.25rem', // Adjust font size
                letterSpacing: '0.5px', // Add letter spacing for better readability
                color: 'text.primary', // Ensures the text color is consistent with theme
                lineHeight: 1.5, // Adjust line height for better readability
                marginBottom: 1, // Space below the typography
              }}
            >
              Buddies
            </Typography>
            <Chip
              icon={<People />}
              label={data.totalBuddies}
              color="secondary"
              variant="outlined"
              sx={{
                borderRadius: '20px',
                fontSize: '1rem',
                padding: '12px 24px',
                backgroundColor: '#fce4ec',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                mb: 1,
              }}
            />
          </Grid>
          <Grid item xs={6} sm={6} md={3} lg={2}>
            <Typography
              variant="h6"
              align="center"
              sx={{
                fontWeight: 'bold', // Make the text bold
                fontSize: '1.25rem', // Adjust font size
                letterSpacing: '0.5px', // Add letter spacing for better readability
                color: 'text.primary', // Ensures the text color is consistent with theme
                lineHeight: 1.5, // Adjust line height for better readability
                marginBottom: 1, // Space below the typography
              }}
            >
              Capacity
            </Typography>
            <Chip
              icon={<Chair />}
              label={totalCapacity}
              color="success"
              variant="outlined"
              sx={{
                borderRadius: '20px',
                fontSize: '1rem',
                padding: '12px 24px',
                backgroundColor: '#e8f5e9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                mb: 1,
              }}
            />
          </Grid>
          <Grid item xs={6} sm={6} md={3} lg={2}>
            <Typography
              variant="h6"
              align="center"
              sx={{
                fontWeight: 'bold', // Make the text bold
                fontSize: '1.25rem', // Adjust font size
                letterSpacing: '0.5px', // Add letter spacing for better readability
                color: 'text.primary', // Ensures the text color is consistent with theme
                lineHeight: 1.5, // Adjust line height for better readability
                marginBottom: 1, // Space below the typography
              }}
            >
              Occupied
            </Typography>

            <Chip
              icon={<People />}
              label={totalOccupied}
              color="warning"
              variant="outlined"
              sx={{
                borderRadius: '20px',
                fontSize: '1rem',
                padding: '12px 24px',
                backgroundColor: '#fff3e0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                mb: 1,
              }}
            />
          </Grid>
        </Grid>



        {/* <Grid container justifyContent="center" spacing={2} mb={4} mt={2}>
          <Grid item xs={12} sm={10} md={8} lg={6}>
            <Box mb={4} sx={{ width: '100%', maxWidth: '100%', padding: '16px' }}>
              <Pie data={pieChartData} options={pieOptions} />
            </Box>
          </Grid>
        </Grid> */}

<Grid container justifyContent="center" mb={4} mt={4}>
  <Grid item xs={12} sm={10} md={8} lg={6}>
    <Box
      sx={{
        width: '100%',
        maxWidth: '100%',
        // padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Center the content horizontally
        justifyContent: 'center', // Center the content vertically if needed
        backgroundColor: '#f5f5f5', // Light background for contrast
        borderRadius: '8px', // Rounded corners for a modern look
        boxShadow: 3, // Add a subtle shadow for depth
      }}
    >


      {/* Pie Chart */}
      <Box sx={{ width: '100%', maxWidth: '100%'}}>
        <Pie data={pieChartData} options={pieOptions} />
      </Box>
    </Box>
  </Grid>
</Grid>



        <Grid container justifyContent="center" spacing={2} mb={4} mt={2}>
          <Grid item xs={12} sm={10} md={8} lg={6}>
            <Box mb={4} sx={{ width: '100%', maxWidth: '100%'}}>
              <TopFacilities />
            </Box>
          </Grid>
        </Grid>

      <BottomNavBar />
    </div>
  );
};

export default Dashboard;
