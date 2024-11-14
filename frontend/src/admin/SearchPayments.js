import React, { useState, useEffect, useRef } from 'react';
import {
  Box, TextField, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Chip
} from '@mui/material';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import searchImg from '../assets/search.png';
import notFound from '../assets/notFound.png';
import Header_sub from '../Header_sub'; // Adjust the path if necessary
import Footer from '../Footer';

const PaymentsSearchPage = () => {
  const token = localStorage.getItem('authToken');
  const hostelId = localStorage.getItem('hostel_id');
  const [searchQuery, setSearchQuery] = useState('');
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const statusColors = {
    pending: 'warning',
    accepted: 'success',
    rejected: 'error',
  };

  const handleSearch = async (query) => {
    if (!query.trim()) return;
  
    setLoading(true);
    setNoResults(false);
  
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/admin/search-payment`, {
        params: { query, hostel_id: hostelId },
        headers: { Authorization: `Bearer ${token}` },
      });
  
      const paymentsData = response.data;
        
      // If no payments are found, set noResults to true
      if (paymentsData.length === 0) {
        setNoResults(true);
      } else {
        setPayments(paymentsData);
      }
  
      setLoading(false);

    } catch (error) {
      console.error('Failed to fetch payment data:', error);
      // Check the error response
      if (error.response && error.response.status === 404) {
        setNoResults(true);
      }
      setLoading(false);
    }
  };
  

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.trim() !== '') {
        handleSearch(searchQuery);
      } else {
        setPayments([]); 
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);



  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);



  return (
    <Box padding={2} display="flex" flexDirection="column" gap={2} mb={6}>
      <Header_sub />
      <TextField
        variant="outlined"
        label="Search Payment"
        fullWidth
        inputRef={inputRef}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginTop: '70px' }}
      />

      {searchQuery.trim() === '' && (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" padding={4}>
          <img src={searchImg} alt="search" style={{ width: '350px', height: '350px', marginBottom: '16px' }} />
          <Typography variant="h6" color="textSecondary">Search for payments</Typography>
        </Box>
      )}

      {loading && payments.length === 0 && (
        <Box width="100%">
          {/* Show Skeleton Loader */}
        </Box>
      )}

      {payments.length === 0 && !loading && noResults && searchQuery.trim() !== '' && (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" padding={4}>
          <img src={notFound} alt="No Payments Found" style={{ width: '350px', height: '350px', marginBottom: '16px' }} />
          <Typography variant="h6" color="textSecondary">No Payments Found</Typography>
        </Box>
      )}

      {payments.length > 0 && !loading && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Buddie Name</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment._id}>
                  <TableCell>{payment.buddie_id.buddie_name || 'Loading...'}</TableCell>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>
                    <Chip label={payment.status} color={statusColors[payment.status]} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Footer />
    </Box>
  );
};

export default PaymentsSearchPage;
