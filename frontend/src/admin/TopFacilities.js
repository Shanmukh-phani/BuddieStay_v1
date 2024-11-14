import React, { useEffect, useState } from 'react';
import { Box, Chip, Grid, List, ListItem, styled, Typography } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import LoadingScreen from '../LoadingScreen'; // Ensure this component exists



// Import Chart.js components
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';




const LocationChip1 = styled(Chip)({
  // marginTop: '15px',
  fontFamily: 'Anta',
  fontSize: '18px',
  textAlign:'center'
});

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

// TopFacilities Component
const TopFacilities = () => {
  const [facilitiesData, setFacilitiesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch top facilities data
  useEffect(() => {
    const fetchTopFacilities = async () => {
      try {
        const hostel_id = localStorage.getItem('hostel_id');
        const authToken = localStorage.getItem('authToken');

        if (!hostel_id) {
          throw new Error('Hostel ID not found in localStorage');
        }

        if (!authToken) {
          throw new Error('Authentication token not found');
        }

        const response = await axios.get(`${process.env.REACT_APP_URL}/admin/top-facilities`, {
          params: { hostel_id },
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        setFacilitiesData(response.data.topFacilities);
      } catch (error) {
        console.error('Error fetching top facilities:', error);
        setError(error.response?.data?.message || error.message || 'Failed to fetch top facilities');
      } finally {
        setLoading(false);
      }
    };

    fetchTopFacilities();
  }, []);

  if (loading) return <LoadingScreen />;
  if (error) return <Typography color="error" variant="h6" align="center">{error}</Typography>;

  // Prepare data for the pie chart
  // const chartData = {
  //   labels: facilitiesData.map(facility => facility.name),
  //   datasets: [
  //     {
  //       label: 'Facility Count',
  //       data: facilitiesData.map(facility => facility.count),
  //       backgroundColor: [
  //         '#ff6384',
  //         '#36a2eb',
  //         '#cc65fe',
  //         '#ffce56',
  //         '#4bc0c0',
  //       ],
  //     },
  //   ],
  // };
  // Prepare the data for the Top 5 List
const topFacilitiesData = facilitiesData.slice(0, 5).map(facility => ({
  name: facility.name,
  count: facility.count,
}));


  return (
    <Box padding={2} textAlign={'center'}>
      
      <LocationChip1 label={'Top 5 Hostel Facilities'} />
      <Grid container justifyContent="center" spacing={2} mb={4} mt={4}>
  <Grid item xs={12} sm={10} md={8} lg={6}>
    <Box
      sx={{
        width: '100%',
        maxWidth: '100%',
        backgroundColor: '#fff', // Background color for the list container
        borderRadius: '8px', // Rounded corners for a clean look
        boxShadow: 3, // Subtle shadow for depth
      }}
    >


      {/* List of Top 5 Facilities */}
      <List>
        {topFacilitiesData.map((facility, index) => (
          <ListItem
            key={index}
            sx={{
              display: 'flex',
              justifyContent: 'space-between', // Aligns the facility and value
              padding: '12px 16px',
              borderBottom: '1px solid #f0f0f0', // Subtle divider between items
              '&:last-child': {
                borderBottom: 'none', // Removes border from the last item
              },
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: '500', color: '#555' }}>
              {facility.name}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  </Grid>
</Grid>

    </Box>
  );
};

export default TopFacilities;
