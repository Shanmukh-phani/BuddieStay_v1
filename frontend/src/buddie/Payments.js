import {
    TextField,
    Button,
    Box,
    Typography,
    Alert,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    Chip,
    Skeleton,
    AppBar,
    IconButton,
  } from '@mui/material';
  import axios from 'axios';
  import { useState, useEffect } from 'react';
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import profileImage from '../assets/buddie.jpg';
  import { useNavigate } from 'react-router-dom';
  import { styled } from '@mui/system';
import { ArrowBack } from '@mui/icons-material';
import Header_sub_buddie from '../Header_sub_Buddie';
import Footer from '../Footer';

  

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
  
  
  const statusColors = {
    pending: 'warning',
    accepted: 'success',
    rejected: 'error',
  };
  
  const Payments = () => {
    const [hostelId, setHostelId] = useState('');
    const [amount, setAmount] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState(new Date().getFullYear());
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [payments, setPayments] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(3);
  
    const token = localStorage.getItem('buddieAuthToken');
    const buddie_id = localStorage.getItem('buddie_id');
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_URL}/buddie/getHostelId`, {
            params: { buddie_id },
            headers: { Authorization: `Bearer ${token}` },
          });
          setHostelId(response.data.hostel_id);
        } catch (error) {
          console.error('Error fetching hostel ID:', error);
          toast.error('Error fetching hostel information');
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
      fetchPayments();
    }, [token, buddie_id]);
  
    const fetchPayments = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_URL}/buddie/payments`, {
            params: { buddie_id },
            headers: { Authorization: `Bearer ${token}` },
          });
          if (response.data.payments && response.data.payments.length > 0) {
            setPayments(response.data.payments);
          } else {
            setPayments([]);
            toast.info('No payments found.');
          }
        } catch (error) {
          console.error('Error fetching payments:', error);
          // toast.error('Error fetching payments');
        }
      };
      
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setSuccess(false);
      try {
        await axios.post(
          `${process.env.REACT_APP_URL}/buddie/payments/request`,
          {
            buddie_id,
            amount,
            month: `${month} ${year}`,
            hostel_id: hostelId,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setSuccess(true);
        toast.success('Payment request sent successfully');
        fetchPayments();
      } catch (error) {
        if (error.response && error.response.status === 400) {
          toast.error('Rent for this month is already paid');
        } else {
          toast.error('Error submitting payment request');
        }
        console.error('Error:', error);
      }
    };
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];


  const navigate = useNavigate(); // Initialize navigate function

  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };
  
    return (
      <div>
<Header_sub_buddie/>


      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        p={3}
        sx={{ maxWidth: '600px', margin: '0 auto',marginTop:'80px' }}
      >
        <Typography variant="h5" gutterBottom>
          Pay Your Rent
        </Typography>
  
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>Payment request sent successfully!</Alert>}
  
        {loading ? (
          <>
            <Skeleton variant="text" width={300} height={50} />
            <Skeleton variant="rectangular" width={600} height={40} sx={{ mt: 2 }} />
            <Skeleton variant="rectangular" width={600} height={40} sx={{ mt: 2 }} />
            <Skeleton variant="rectangular" width={600} height={50} sx={{ mt: 2 }} />
          </>
        ) : (
          <>
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Month</InputLabel>
                <Select
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  required
                  label="Month"
                >
                  {months.map((month, index) => (
                    <MenuItem key={index} value={month}>{month}</MenuItem>
                  ))}
                </Select>
              </FormControl>
  
              <TextField
                label="Amount"
                variant="outlined"
                type="number"
                fullWidth
                margin="normal"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter the rent amount"
                required
              />
  
              <TextField
                label="Year"
                variant="outlined"
                type="number"
                fullWidth
                margin="normal"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="Enter the year"
                InputProps={{
                  readOnly: true,
                }}
              />
  
              <Button
                type="submit"
                variant="contained"
                // color="primary"
                fullWidth
                disabled={!hostelId || !amount || !month}
                sx={{ mt: 2 }}
                style={{backgroundColor:'tomato',color:'white'}}
              >
                {hostelId ? 'Pay Rent' : 'Loading Hostel Info...'}
              </Button>
            </form>
  
            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
              Payment History
            </Typography>
  
            {payments.length > 0 ? (
              <>
                <TableContainer component={Paper} sx={{ mt: 2 }}>
                  <Table>
                    <TableHead style={{backgroundColor:'darkcyan',color:'white'}}>
                      <TableRow>
                        <TableCell style={{color:'white',fontWeight:'bold'}}>Month</TableCell>
                        <TableCell style={{color:'white',fontWeight:'bold'}}>Amount</TableCell>
                        <TableCell style={{color:'white',fontWeight:'bold'}}>Status</TableCell>
                        <TableCell style={{color:'white',fontWeight:'bold'}}>Date</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {payments
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((payment) => (
                          <TableRow key={payment._id}>
                            <TableCell>{payment.month}</TableCell>
                            <TableCell>{payment.amount}</TableCell>
                            <TableCell>
                              <Chip label={payment.status} color={statusColors[payment.status]} />
                            </TableCell>
                            <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  component="div"
                  count={payments.length}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  rowsPerPageOptions={[3, 10, 25, 50, 100]}
                />
              </>
            ) : (
              <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                No payments found.
              </Typography>
            )}
          </>
        )}
  
        <ToastContainer />
      </Box>
      <Footer/>

      </div>
    );
  };
  
  export default Payments;
  