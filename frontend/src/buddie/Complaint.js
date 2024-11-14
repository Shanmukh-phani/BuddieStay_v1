import {
    TextField,
    Button,
    Box,
    Typography,
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
    CircularProgress,
    AppBar,
    IconButton
  } from '@mui/material';
  import { useState, useEffect } from 'react';
  import axios from 'axios';
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

  

  const ComplaintFormAndList = () => {
    
    const [hostelId, setHostelId] = useState('');
    const [complaintName, setComplaintName] = useState('');
    const [description, setDescription] = useState('');
    const [roomNo, setRoomNo] = useState('');
    const [loading, setLoading] = useState(false);
    const [complaints, setComplaints] = useState([]);
    const [tableLoading, setTableLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
  
    const token = localStorage.getItem('buddieAuthToken');
    const buddie_id = localStorage.getItem('buddie_id');
  
    // useEffect(() => {
    //   const fetchHostelId = async () => {
    //     try {
    //       const response = await axios.get(`${process.env.REACT_APP_URL}/buddie/getHostelId`, {
    //         params: { buddie_id },
    //         headers: { Authorization: `Bearer ${token}` },
    //       });
    //       setHostelId(response.data.hostel_id);
    //     } catch (error) {
    //       console.error('Error fetching hostel ID:', error);
    //       toast.error('Error fetching hostel information');
    //     }
    //   };
  
    //   const fetchComplaints = async () => {
    //     setTableLoading(true);
    //     try {
    //       const response = await axios.get(`${process.env.REACT_APP_URL}/buddie/complaints`, {
    //         params: { buddie_id },
    //         headers: { Authorization: `Bearer ${token}` }
    //       });
    //       setComplaints(response.data);
    //     //   console.log(response.data);
    //     } catch (error) {
    //       console.error('Error fetching complaints:', error);
    //       toast.error('Error fetching complaints');
    //     } finally {
    //       setTableLoading(false);
    //     }
    //   };
  
    //   fetchHostelId();
    //   fetchComplaints();
    // }, [token, buddie_id]);
  
    // const handleSubmit = async (e) => {
    //   e.preventDefault();
    //   setLoading(true);
  
    //   try {
    //     await axios.post(`${process.env.REACT_APP_URL}/buddie/complaint`, {
    //       buddie_id,
    //       hostel_id: hostelId,
    //       complaint_name: complaintName,
    //       description,
    //       room_no: roomNo
    //     }, {
    //       headers: {
    //         Authorization: `Bearer ${token}`
    //       }
    //     });
    //     toast.success('Complaint submitted successfully');
    //     setComplaintName('');
    //     setDescription('');
    //     setRoomNo('');
    //     // Fetch updated complaints after submitting
    //     const response = await axios.get(`${process.env.REACT_APP_URL}/buddie/complaints`, {
    //       headers: { Authorization: `Bearer ${token}` }
    //     });
    //     setComplaints(response.data);
    //   } catch (error) {
    //     toast.error('Error submitting complaint');
    //   } finally {
    //     setLoading(false);
    //   }
    // };
  


    useEffect(() => {
      const fetchHostelId = async () => {
          try {
              const response = await axios.get(`${process.env.REACT_APP_URL}/buddie/getHostelId`, {
                  params: { buddie_id },
                  headers: { Authorization: `Bearer ${token}` },
              });
              setHostelId(response.data.hostel_id);
          } catch (error) {
              console.error('Error fetching hostel ID:', error);
              toast.error('Error fetching hostel information');
          }
      };

      const fetchComplaints = async () => {
          setTableLoading(true);
          try {
              const response = await axios.get(`${process.env.REACT_APP_URL}/buddie/complaints`, {
                  params: { buddie_id },
                  headers: { Authorization: `Bearer ${token}` }
              });
              setComplaints(response.data);
          } catch (error) {
              console.error('Error fetching complaints:', error);
              toast.error('Error fetching complaints');
          } finally {
              setTableLoading(false);
          }
      };

      fetchHostelId();
      fetchComplaints(); // Fetch complaints on mount
  }, [token, buddie_id]);

  const fetchComplaints = async () => {
      setTableLoading(true);
      try {
          const response = await axios.get(`${process.env.REACT_APP_URL}/buddie/complaints`, {
              params: { buddie_id },
              headers: { Authorization: `Bearer ${token}` }
          });
          setComplaints(response.data);
      } catch (error) {
          console.error('Error fetching complaints:', error);
          toast.error('Error fetching complaints');
      } finally {
          setTableLoading(false);
      }
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);

      try {
          await axios.post(`${process.env.REACT_APP_URL}/buddie/complaint`, {
              buddie_id,
              hostel_id: hostelId,
              complaint_name: complaintName,
              description,
              room_no: roomNo
          }, {
              headers: {
                  Authorization: `Bearer ${token}`
              }
          });
          toast.success('Complaint submitted successfully');
          // Clear input fields
          setComplaintName('');
          setDescription('');
          setRoomNo('');
          // Refresh complaints after submitting
          await fetchComplaints();
      } catch (error) {
          toast.error('Error submitting complaint');
      } finally {
          setLoading(false);
      }
  };


    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
    const getStatusChipColor = (status) => {
      switch (status) {
        case 'pending':
          return 'warning';
        case 'resolved':
          return 'success';
        default:
          return 'default';
      }
    };


  const navigate = useNavigate(); // Initialize navigate function

  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };
  
    return (
      <Box p={3} sx={{ maxWidth: '800px', margin: '0 auto' }}>
              {/* <AppBar position="static">
                <HeaderContainer>
                    <Box display="flex" alignItems="center">
                        <IconButton edge="start" color="inherit" aria-label="back" style={{ color: 'black' }} onClick={handleBackClick}>
                            <ArrowBack  />
                        </IconButton>
                        <StayText variant="h4" component="h1" style={{ marginLeft: '25px',color:'#006399' }}>
                            Stay
                        </StayText>
                        <BuddieText variant="h4" component="h1">
                            Buddie
                        </BuddieText>
                    </Box>

                    <Box >
            <ProfileIcon>
              <img src={profileImage} alt="Profile" style={{ width: '100%', height: '100%' }} />
            </ProfileIcon>
          </Box>
                </HeaderContainer>
            </AppBar> */}
            <Header_sub_buddie/>

        {/* Complaint Form */}
        <Typography variant="h5" gutterBottom mt={10}>
          Raise a Complaint
        </Typography>
  
        <form onSubmit={handleSubmit}>
          <TextField
            label="Complaint Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={complaintName}
            onChange={(e) => setComplaintName(e.target.value)}
            required
          />
  
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
  
          <TextField
            label="Room No"
            variant="outlined"
            fullWidth
            margin="normal"
            value={roomNo}
            onChange={(e) => setRoomNo(e.target.value)}
            required
          />
  
          <Button
            type="submit"
            variant="contained"
            // color="primary"
            style={{backgroundColor:'tomato'}}
            fullWidth
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Submit Complaint'}
          </Button>
        </form>
  
        {/* Complaint List */}
        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          Complaint History
        </Typography>
  
        {tableLoading ? (
          <>
            <Skeleton variant="text" width={300} height={50} />
            <Skeleton variant="rectangular" width={800} height={40} sx={{ mt: 2 }} />
            <Skeleton variant="rectangular" width={800} height={40} sx={{ mt: 2 }} />
            <Skeleton variant="rectangular" width={800} height={40} sx={{ mt: 2 }} />
          </>
        ) : (
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead style={{backgroundColor:'darkcyan'}}>
                <TableRow>
                  <TableCell style={{color:'white',fontWeight:'bold'}}>Complaint Name</TableCell>
                  <TableCell style={{color:'white',fontWeight:'bold'}}>Description</TableCell>
                  <TableCell style={{color:'white',fontWeight:'bold'}}>Room No</TableCell>
                  <TableCell style={{color:'white',fontWeight:'bold'}}>Status</TableCell>
                  <TableCell style={{color:'white',fontWeight:'bold'}}>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {complaints
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((complaint) => (
                    <TableRow key={complaint._id}>
                      <TableCell>{complaint.complaint_name}</TableCell>
                      <TableCell>{complaint.description}</TableCell>
                      <TableCell>{complaint.room_no}</TableCell>
                      <TableCell>
                        <Chip
                          label={complaint.status}
                          color={getStatusChipColor(complaint.status)}
                        />
                      </TableCell>
                      <TableCell>{new Date(complaint.createdAt).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={complaints.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25, 50]}
            />
          </TableContainer>
        )}
  
        <ToastContainer />
        <Footer/>
      </Box>
    );
  };
  
  export default ComplaintFormAndList;
  