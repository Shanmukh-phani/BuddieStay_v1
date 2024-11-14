import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Button,
  Typography,
  Box,
  Chip,
  Skeleton,
  AppBar,
  IconButton,
  InputAdornment,
  TextField,
  Tabs,
  Tab
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { styled } from '@mui/system';
import { ArrowBack } from '@mui/icons-material';
import profileImage from '../assets/buddie.jpg';
import { useNavigate } from 'react-router-dom';
import Header_sub from '../Header_sub';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import SearchIcon from '@mui/icons-material/Search';
import UnpaidBuddiesList from './UnpaidBuddies';
import CloseIcon from '@mui/icons-material/Close';
import notFound from '../assets/notFound.png';
import AddPaymentPage from './AddPayment';
// import { DataTable, Column } from 'primereact/datatable';


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

const LocationChip1 = styled(Chip)({

  // marginTop: '15px',
  fontFamily: 'Anta',
  fontSize: '18px',
  textAlign:'center',
  // backgroundColor:'#f0c674'
});


const statusColors = {
  pending: 'warning',
  accepted: 'success',
  rejected: 'error',
};

const AdminPayments = () => {

  const navigate = useNavigate(); // Initialize navigate function

  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };

  const [search, setSearch] = useState('');


  const [filters, setFilters] = useState({
    global: { value: null, matchMode: 'contains' },
    buddie: { value: null, matchMode: 'contains' },
    amount: { value: null, matchMode: 'contains' },
    status: { value: null, matchMode: 'contains' },
  });


  const [paymentRequests, setPaymentRequests] = useState([]);
  const [pendingPayments, setPendingPayments] = useState([]);
  const [acceptedPayments, setAcceptedPayments] = useState([]);
  const [pagePending, setPagePending] = useState(0);
  const [rowsPerPagePending, setRowsPerPagePending] = useState(3);
  const [pageAccepted, setPageAccepted] = useState(0);
  const [rowsPerPageAccepted, setRowsPerPageAccepted] = useState(3);
  const [loading, setLoading] = useState(true);
  const [buddieNames, setBuddieNames] = useState({}); // Object to store buddie names

  const [value, setValue] = useState(0); // State to control the active tab

  

  const token = localStorage.getItem('authToken');
  const hostelId = localStorage.getItem('hostel_id');


  const fetchBuddieName = async (buddieId) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/admin/buddieName/${buddieId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.name;
    } catch (error) {
      console.error('Error fetching buddie name:', error);
      return 'Unknown'; // Fallback value
    }
  };

  const fetchPayments = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/admin/payments/hostel/${hostelId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const payments = response.data;
      setPaymentRequests(payments);
      
      // Fetch names for all unique buddie_ids
      const buddieIds = [...new Set(payments.map(payment => payment.buddie_id))];
      const names = await Promise.all(
        buddieIds.map(async (buddieId) => {
          const name = await fetchBuddieName(buddieId);
          return { id: buddieId, name };
        })
      );
      
      const buddieNameMap = names.reduce((acc, { id, name }) => {
        acc[id] = name;
        return acc;
      }, {});

      setBuddieNames(buddieNameMap);
      
      setPendingPayments(payments.filter(payment => payment.status === 'pending'));
      setAcceptedPayments(payments.filter(payment => payment.status === 'accepted'));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching payments', error);
      toast.error('Error fetching payments');
      setLoading(false);
    }
  };
  useEffect(() => {
    if (hostelId && token) {
      fetchPayments();
    }
  }, [hostelId, token]);
  // useEffect(() => {
  //   if (hostelId && token) {
  //     fetchPayments();
    
  //   }
  // }, [hostelId, token]);

  const acceptPayment = async (paymentId) => {
    try {
      await axios.put(`${process.env.REACT_APP_URL}/admin/payments/${paymentId}/accept`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Payment accepted!');
      fetchPayments(); // Refresh payment requests after acceptance
    } catch (error) {
      console.error('Error accepting payment', error);
      toast.error('Error accepting payment');
    }
  };


  const rejectPayment = async (paymentId) => {
    try {
      // Send a PUT request to change the payment status to 'rejected'
      await axios.put(`${process.env.REACT_APP_URL}/admin/payments/${paymentId}/reject`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      // Success message
      toast.success('Payment rejected successfully!');
  
      // Refresh the payments list after rejection
      fetchPayments(); // Call your function to fetch updated payments
    } catch (error) {
      console.error('Error rejecting payment:', error);
      toast.error('Error rejecting payment');
    }
  };
  
  const handleChangePagePending = (event, newPage) => {
    setPagePending(newPage);
  };

  const handleChangeRowsPerPagePending = (event) => {
    setRowsPerPagePending(parseInt(event.target.value, 10));
    setPagePending(0);
  };

  const handleChangePageAccepted = (event, newPage) => {
    setPageAccepted(newPage);
  };

  const handleChangeRowsPerPageAccepted = (event) => {
    setRowsPerPageAccepted(parseInt(event.target.value, 10));
    setPageAccepted(0);
  };



  const handleOpenSearchPage = () => {
    navigate('/admin/search-payments');
  };




  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };





  return (

    
    <Box p={3}>
                  <Header_sub/>


      

            <Box  onClick={handleOpenSearchPage} sx={{ cursor: 'pointer',marginTop:'80px' }} >
      <TextField
        fullWidth
        label="Search Payments"
        variant="outlined"
        // disabled
        // onClick={handleOpenSearchPage}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Box>

<AddPaymentPage hostelId={hostelId}/>

  <Tabs value={value} onChange={handleChangeTab} aria-label="Payment Tabs" centered style={{marginTop:'50px'}}>
        <Tab label="Requests" />
        <Tab label="Payments" />
      </Tabs>

    


  {/* Tab Panel for Pending Payments (Requests) */}
  <Box role="tabpanel" hidden={value !== 0}>
{/*       
        <TableContainer component={Paper} sx={{ mb: 4 ,mt:3}}>
          {pendingPayments.length === 0 ? (
            <Skeleton variant="rectangular" width="100%" height={300} />
          ) : (
            <Table>
              <TableHead>
                <TableRow style={{ backgroundColor: 'tomato', fontWeight: 'bold', color: 'white' }}>
                  <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Buddie</TableCell>
                  <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Amount</TableCell>
                  <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Month</TableCell>
                  <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Date</TableCell>
                  <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
                  <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pendingPayments
                  .slice(pagePending * rowsPerPagePending, pagePending * rowsPerPagePending + rowsPerPagePending)
                  .map((payment) => (
                    <TableRow key={payment._id}>
                      <TableCell>{buddieNames[payment.buddie_id]}</TableCell>
                      <TableCell>{payment.amount}</TableCell>
                      <TableCell>{payment.month}</TableCell>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>
                        <Chip label={payment.status} color={statusColors[payment.status]} />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton
                            onClick={() => acceptPayment(payment._id)}
                            sx={{
                              backgroundColor: 'green',
                              color: 'white',
                              '&:hover': { backgroundColor: '#FFB300' },
                              boxShadow: 1,
                            }}
                          >
                            <CheckIcon color="white" />
                          </IconButton>
                          <IconButton
                            onClick={() => rejectPayment(payment._id)}
                            sx={{
                              backgroundColor: 'red',
                              color: 'white',
                              '&:hover': { backgroundColor: '#E57373' },
                              boxShadow: 1,
                            }}
                          >
                            <CloseIcon />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          )}
          <TablePagination
            rowsPerPageOptions={[3, 10, 25]}
            component="div"
            count={pendingPayments.length}
            rowsPerPage={rowsPerPagePending}
            page={pagePending}
            onPageChange={handleChangePagePending}
          />
        </TableContainer> */}

<TableContainer component={Paper} sx={{ mb: 4, mt: 3 }}>
      {pendingPayments.length === 0 ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 300 }}>
          <img src={notFound} alt="No Data Found" style={{ width: '200px', height: 'auto' }} />
          <p>No Data Found</p>
        </Box>
      ) : (
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: 'tomato', fontWeight: 'bold', color: 'white' }}>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Buddie</TableCell>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Amount</TableCell>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Month</TableCell>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Date</TableCell>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pendingPayments
              .slice(pagePending * rowsPerPagePending, pagePending * rowsPerPagePending + rowsPerPagePending)
              .map((payment) => (
                <TableRow key={payment._id}>
                  <TableCell>{buddieNames[payment.buddie_id]}</TableCell>
                  <TableCell>{payment.amount}</TableCell>
                  <TableCell>{payment.month}</TableCell>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>
                    <Chip label={payment.status} color={statusColors[payment.status]} />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton
                        onClick={() => acceptPayment(payment._id)}
                        sx={{
                          backgroundColor: 'green',
                          color: 'white',
                          '&:hover': { backgroundColor: '#FFB300' },
                          boxShadow: 1,
                        }}
                      >
                        <CheckIcon color="white" />
                      </IconButton>
                      <IconButton
                        onClick={() => rejectPayment(payment._id)}
                        sx={{
                          backgroundColor: 'red',
                          color: 'white',
                          '&:hover': { backgroundColor: '#E57373' },
                          boxShadow: 1,
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      )}
      <TablePagination
        rowsPerPageOptions={[3, 10, 25]}
        component="div"
        count={pendingPayments.length}
        rowsPerPage={rowsPerPagePending}
        page={pagePending}
        onPageChange={handleChangePagePending}
      />
    </TableContainer>


{/* <DataTable
      value={pendingPayments}
      paginator
      rows={rowsPerPagePending}
      dataKey="id"
      filters={filters}
      filterDisplay="row"
      loading={loading}
      globalFilterFields={['buddie', 'amount', 'status']}
      header="Pending Payments"
      emptyMessage="No data found"
      onPage={(e) => setPagePending(e.page)}
    >
      <Column
        field="buddie"
        header="Buddie"
        filter
        filterPlaceholder="Search by Buddie"
        style={{ minWidth: '12rem' }}
      />
      <Column
        field="amount"
        header="Amount"
        filter
        filterPlaceholder="Search by Amount"
        style={{ minWidth: '12rem' }}
      />
      <Column
        field="month"
        header="Month"
        filter
        filterPlaceholder="Search by Month"
        style={{ minWidth: '12rem' }}
      />
      <Column
        field="date"
        header="Date"
        filter
        filterPlaceholder="Search by Date"
        style={{ minWidth: '12rem' }}
      />
      <Column
        field="status"
        header="Status"
        body={(rowData) => <Chip label={rowData.status} color={statusColors[rowData.status]} />}
        filter
        filterPlaceholder="Search by Status"
        style={{ minWidth: '12rem' }}
      />
      <Column
        header="Action"
        body={(rowData) => (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton
              onClick={() => acceptPayment(rowData._id)}
              sx={{
                backgroundColor: 'green',
                color: 'white',
                '&:hover': { backgroundColor: '#FFB300' },
                boxShadow: 1,
              }}
            >
              <CheckIcon color="white" />
            </IconButton>
            <IconButton
              onClick={() => rejectPayment(rowData._id)}
              sx={{
                backgroundColor: 'red',
                color: 'white',
                '&:hover': { backgroundColor: '#E57373' },
                boxShadow: 1,
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        )}
        style={{ minWidth: '14rem' }}
      />
    </DataTable> */}

      {/* <UnpaidBuddiesList hostelId={hostelId} /> */}


      </Box>

      {/* Tab Panel for Accepted Payments (Payments) */}
      <Box role="tabpanel" hidden={value !== 1} mt={2}>
    
        {/* <TableContainer component={Paper} >
          {acceptedPayments.length === 0 ? (
            <Skeleton variant="rectangular" width="100%" height={300} />
          ) : (
            <Table>
              <TableHead>
                <TableRow style={{ backgroundColor: 'darkcyan', fontWeight: 'bold', color: 'white' }}>
                  <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Buddie</TableCell>
                  <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Amount</TableCell>
                  <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Month</TableCell>
                  <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Date</TableCell>
                  <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {acceptedPayments
                  .slice(pageAccepted * rowsPerPageAccepted, pageAccepted * rowsPerPageAccepted + rowsPerPageAccepted)
                  .map((payment) => (
                    <TableRow key={payment._id}>
                      <TableCell>{buddieNames[payment.buddie_id]}</TableCell>
                      <TableCell>{payment.amount}</TableCell>
                      <TableCell>{payment.month}</TableCell>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>
                        <Chip label={payment.status} color={statusColors[payment.status]} />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          )}
          <TablePagination
            rowsPerPageOptions={[3, 10, 25]}
            component="div"
            count={acceptedPayments.length}
            rowsPerPage={rowsPerPageAccepted}
            page={pageAccepted}
            onPageChange={handleChangePageAccepted}
          />
        </TableContainer> */}

<TableContainer component={Paper} sx={{ mb: 4, mt: 3 }}>
      {acceptedPayments.length === 0 ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 300 }}>
          <img src={notFound} alt="No Data Found" style={{ width: '200px', height: 'auto' }} />
          <p>No Data Found</p>
        </Box>
      ) : (
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: 'darkcyan', fontWeight: 'bold', color: 'white' }}>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Buddie</TableCell>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Amount</TableCell>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Month</TableCell>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Date</TableCell>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {acceptedPayments
              .slice(pageAccepted * rowsPerPageAccepted, pageAccepted * rowsPerPageAccepted + rowsPerPageAccepted)
              .map((payment) => (
                <TableRow key={payment._id}>
                  <TableCell>{buddieNames[payment.buddie_id]}</TableCell>
                  <TableCell>{payment.amount}</TableCell>
                  <TableCell>{payment.month}</TableCell>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>
                    <Chip label={payment.status} color={statusColors[payment.status]} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      )}
      <TablePagination
        rowsPerPageOptions={[3, 10, 25]}
        component="div"
        count={acceptedPayments.length}
        rowsPerPage={rowsPerPageAccepted}
        page={pageAccepted}
        onPageChange={handleChangePageAccepted}
      />
    </TableContainer>
      </Box>



      <ToastContainer />
    </Box>
  );
};

export default AdminPayments;
