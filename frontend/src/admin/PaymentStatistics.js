import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Box, Typography } from '@mui/material';
import LoadingScreen from '../LoadingScreen';

const PaymentStatistics = ({ hostel_id }) => {
  const [paymentData, setPaymentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaymentStatistics = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        
        const response = await axios.get(`${process.env.REACT_APP_URL}/admin/payment-statistics`, {
          params: { hostel_id },
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        setPaymentData(response.data);
      } catch (error) {
        console.error('Error fetching payment statistics:', error);
        setError(error.response?.data?.message || error.message || 'Failed to fetch payment statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentStatistics();
  }, [hostel_id]);

  if (loading) return <LoadingScreen />;
  if (error) return <Typography color="error">{error}</Typography>;

  // Prepare data for the bar chart
  const chartData = {
    labels: paymentData.map(item => item._id), // Month-Year
    datasets: [
      {
        label: 'Total Payments',
        data: paymentData.map(item => item.totalPayments),
        backgroundColor: '#42a5f5',
      },
      {
        label: 'Total Amount',
        data: paymentData.map(item => item.totalAmount),
        backgroundColor: '#66bb6a',
      },
      {
        label: 'Accepted Payments',
        data: paymentData.map(item => item.acceptedPayments),
        backgroundColor: '#ff7043',
      },
      {
        label: 'Pending Payments',
        data: paymentData.map(item => item.pendingPayments),
        backgroundColor: '#ffca28',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Payment Statistics',
      },
    },
  };

  return (
    <Box sx={{ padding: '16px' }}>
      <Typography variant="h6" align="center" mb={2}>Payment Statistics</Typography>
      <Bar data={chartData} options={options} />
    </Box>
  );
};

export default PaymentStatistics;
