import React, { useState, useEffect } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, CircularProgress, Typography, Box, Autocomplete } from '@mui/material';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import styles

const AddPaymentPage = () => {
  const [open, setOpen] = useState(false);
  const [buddieName, setBuddieName] = useState('');
  const [buddieDetails, setBuddieDetails] = useState(null);
  const [buddieList, setBuddieList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().slice(0, 10)); // Current date
  const [rentAmount, setRentAmount] = useState(0);
  const hostelId = localStorage.getItem('hostel_id');

  // Fetch the list of buddies on page load to populate the dropdown
  useEffect(() => {
    const fetchBuddies = async () => {
      if (!hostelId) {
        console.error('Hostel ID is required');
        return;
      }

      setLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_URL}/admin/payment-buddies?hostelId=${hostelId}`);
        setBuddieList(response.data);
      } catch (err) {
        console.error('Error fetching buddies:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBuddies();
  }, [hostelId]);

  const handleBuddieChange = async (event, newValue) => {
    const selectedBuddieName = newValue?.buddie_name || '';
    setBuddieName(selectedBuddieName);

    if (selectedBuddieName) {
      setLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_URL}/admin/payment-details?buddie_name=${selectedBuddieName}`);
        setBuddieDetails(response.data);
      } catch (err) {
        console.error('Error fetching buddie details:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async () => {
    if (!buddieDetails) {
      toast.error('No buddy details found.');
      return;
    }

    // Validate that the rentAmount is a number and greater than 0
    if (!rentAmount || isNaN(rentAmount) || rentAmount <= 0) {
      toast.error('Invalid rent amount');
      return;
    }

    const paymentData = {
      buddie_name: buddieDetails.buddie_name,
      rent_amount: rentAmount, // Make sure rent_amount is passed correctly
      payment_date: paymentDate,
      hostel_id: hostelId, // The hostel_id should be passed as well
      month: paymentDate.slice(0, 7), // Example: "2024-11"
    };

    try {
      await axios.post(`${process.env.REACT_APP_URL}/admin/payments/add-payment`, paymentData); // Post payment to your API
      toast.success('Payment added successfully!');
      setOpen(false); // Close the dialog
    } catch (err) {
      toast.error('Error adding payment. Please try again.');
      console.error('Error adding payment:', err);
    }
  };

  return (
    <div>
      <Box>
        <Button
          variant="contained"
        //   color="primary"
        
          onClick={() => setOpen(true)}
          style={{
            marginTop: '10px',
            position:'absolute',
            right:'20px',
            backgroundColor:'tomato'

          }}
        >
          Add Payment
        </Button>
      </Box>

      {/* Dialog for adding payment */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Payment</DialogTitle>
        <DialogContent>


        <Autocomplete
            value={buddieList.find(buddie => buddie.buddie_name === buddieName) || null} // Set value as the matching object from the list
            onChange={handleBuddieChange}
            options={buddieList}
            getOptionLabel={(option) => option.buddie_name || ''}
            loading={loading}
            isOptionEqualToValue={(option, value) => option.buddie_name === value?.buddie_name} // Custom comparison function
            renderInput={(params) => (
              <TextField
                {...params}
                label="Buddie Name"
                variant="outlined"
                fullWidth
                margin="normal"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loading ? <CircularProgress color="inherit" size={24} /> : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
            fullWidth
            margin="normal"
          />


          {loading && !buddieDetails && (
            <Typography variant="body2" color="textSecondary">
              Loading buddy details...
            </Typography>
          )}

          {buddieDetails && (
            <>
              <TextField
                label="Buddie Room"
                value={buddieDetails.buddie_room}
                fullWidth
                margin="normal"
                disabled
              />
              <TextField
                label="Rent Amount"
                value={buddieDetails.rent_amount}
                onChange={(e) => setRentAmount(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Payment Date"
                value={paymentDate}
                fullWidth
                margin="normal"
                type="date"
                onChange={(e) => setPaymentDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} 
                        style={{backgroundColor:'tomato',color:'white'}}
>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            // color="primary"
            disabled={loading || !buddieDetails}
            style={{backgroundColor:'darkcyan',color:'white'}}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Toast Notifications Container */}
      <ToastContainer />
    </div>
  );
};

export default AddPaymentPage;
