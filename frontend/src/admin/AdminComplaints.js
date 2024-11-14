// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   Typography,
//   Chip,
//   TablePagination,
//   Skeleton,
//   IconButton,
//   Box,
//   styled,
//   TextField,
//   InputAdornment
// } from '@mui/material';
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate } from 'react-router-dom';
// import Header_sub from '../Header_sub';
// import DeleteIcon from '@mui/icons-material/Delete';
// import CheckIcon from '@mui/icons-material/Check';
// import SearchIcon from '@mui/icons-material/Search';




// const LocationChip1 = styled(Chip)({

//   // marginTop: '15px',
//   fontFamily: 'Anta',
//   fontSize: '18px',
//   textAlign: 'center',
//   // backgroundColor:'#f0c674'
// });


// const ComplaintList = () => {
//   const navigate = useNavigate();

//   const [pendingComplaints, setPendingComplaints] = useState([]);
//   const [resolvedComplaints, setResolvedComplaints] = useState([]);
//   const [loadingPending, setLoadingPending] = useState(true);
//   const [loadingResolved, setLoadingResolved] = useState(true);
//   const [pagePending, setPagePending] = useState(0);
//   const [pageResolved, setPageResolved] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);


//   const [search, setSearch] = useState('');

//   const token = localStorage.getItem('authToken');
//   const hostel_id = localStorage.getItem('hostel_id');

//   const fetchBuddieName = async (buddie_id) => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_URL}/admin/buddieName/${buddie_id}`);
//       return response.data.name;
//     } catch (error) {
//       console.error('Error fetching buddie name:', error);
//       return 'Unknown';
//     }
//   };

//   const fetchComplaints = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_URL}/admin/complaints/${hostel_id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const pendingComplaintsWithNames = await Promise.all(
//         response.data
//           .filter((complaint) => complaint.status === 'pending')
//           .map(async (complaint) => {
//             const buddie_name = await fetchBuddieName(complaint.buddie_id._id);
//             return { ...complaint, buddie_name };
//           })
//       );

//       const resolvedComplaintsWithNames = await Promise.all(
//         response.data
//           .filter((complaint) => complaint.status === 'resolved')
//           .map(async (complaint) => {
//             const buddie_name = await fetchBuddieName(complaint.buddie_id._id);
//             return { ...complaint, buddie_name };
//           })
//       );

//       setPendingComplaints(pendingComplaintsWithNames);
//       setResolvedComplaints(resolvedComplaintsWithNames);
//     } catch (error) {
//       console.error('Error fetching complaints:', error);
//       toast.error('Error fetching complaints');
//     } finally {
//       setLoadingPending(false);
//       setLoadingResolved(false);
//     }
//   };

//   useEffect(() => {
//     fetchComplaints();
//   }, []);

//   const handleResolve = async (complaintId) => {
//     try {
//       await axios.patch(`${process.env.REACT_APP_URL}/admin/complaints/${complaintId}/resolve`, null, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       toast.success('Complaint marked as resolved');

//       setPendingComplaints((prev) => prev.filter((complaint) => complaint._id !== complaintId));
//       const resolvedComplaint = pendingComplaints.find((complaint) => complaint._id === complaintId);
//       setResolvedComplaints((prev) => [...prev, { ...resolvedComplaint, status: 'resolved' }]);
//     } catch (error) {
//       console.error('Error resolving complaint:', error);
//       toast.error('Error resolving complaint');
//     }
//   };


//   // Function to handle complaint deletion
//   const handleDelete = async (complaintId) => {
//     try {
//       await axios.delete(`${process.env.REACT_APP_URL}/admin/complaints/${complaintId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       toast.success('Complaint deleted successfully');

//       // Update state to remove the deleted complaint from the list
//       setPendingComplaints((prev) => prev.filter((complaint) => complaint._id !== complaintId));
//       setResolvedComplaints((prev) => prev.filter((complaint) => complaint._id !== complaintId)); // If you track resolved complaints too
//     } catch (error) {
//       console.error('Error deleting complaint:', error);
//       toast.error('Error deleting complaint');
//     }
//   };


//   const handleOpenSearchPage = () => {
//     navigate('/admin/search-complaints');
//   };



//   const handleChangePagePending = (event, newPage) => setPagePending(newPage);
//   const handleChangePageResolved = (event, newPage) => setPageResolved(newPage);
//   const handleChangeRowsPerPage = (event) => setRowsPerPage(+event.target.value);

//   // const renderSkeletonRow = () => (
//   //   <TableRow>
//   //     <TableCell>
//   //       <Skeleton variant="text" width="70%" />
//   //     </TableCell>
//   //     <TableCell>
//   //       <Skeleton variant="text" width="40%" />
//   //     </TableCell>
//   //     <TableCell>
//   //       <Skeleton variant="text" width="60%" />
//   //     </TableCell>
//   //     <TableCell>
//   //       <Skeleton variant="text" width="80%" />
//   //     </TableCell>
//   //     <TableCell>
//   //       <Skeleton variant="rectangular" width={60} height={24} />
//   //     </TableCell>
//   //     <TableCell>
//   //       <Skeleton variant="rectangular" width={100} height={36} />
//   //     </TableCell>
//   //   </TableRow>
//   // );

//   return (
//     <div>
//       <Header_sub />

//       <Box padding={2} onClick={handleOpenSearchPage} sx={{ cursor: 'pointer' }} mt={10}>
//         <TextField
//           fullWidth
//           label="Search Complaints"
//           variant="outlined"
//           // disabled
//           // onClick={handleOpenSearchPage}
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           InputProps={{
//             endAdornment: (
//               <InputAdornment position="end">
//                 <SearchIcon />
//               </InputAdornment>
//             ),
//           }}
//         />
//       </Box>



//       <Typography variant="h5" gutterBottom mt={1}  >

//         <LocationChip1 label={'Pending Complaints'} />
//       </Typography>

//       <Box p={1}>
//         <TableContainer component={Paper} >
//           <Table>
//             <TableHead style={{ backgroundColor: 'tomato' }}>
//               <TableRow>
//                 <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Buddie Name</TableCell>
//                 <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Room No</TableCell>
//                 <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Complaint Name</TableCell>
//                 <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Description</TableCell>
//                 <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
//                 <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Action</TableCell>
//               </TableRow>
//             </TableHead>


//             <TableBody>
//               {loadingPending ? (
//                 // [...Array(5)].map((_, index) => renderSkeletonRow())
//                 <Typography>Loading</Typography>
//               ) : (
//                 pendingComplaints
//                   .slice(pagePending * rowsPerPage, pagePending * rowsPerPage + rowsPerPage)
//                   .map((complaint) => (
//                     <TableRow key={complaint._id}>
//                       <TableCell >{complaint.buddie_id.buddie_name}</TableCell>
//                       <TableCell>{complaint.buddie_id.room_no}</TableCell>
//                       <TableCell>{complaint.complaint_name}</TableCell>
//                       <TableCell>{complaint.description}</TableCell>
//                       <TableCell>
//                         <Chip label={complaint.status} color="warning" />
//                       </TableCell>


//                       <TableCell >
//                         <Box sx={{ display: 'flex', gap: 1 }}>
//                           <IconButton
//                             // onClick={() => handleEdit(room)}
//                             onClick={() => handleResolve(complaint._id)}
//                             sx={{
//                               backgroundColor: 'green',
//                               color: 'white',
//                               '&:hover': { backgroundColor: '#FFB300' },
//                               boxShadow: 1,
//                             }}
//                           >
//                             <CheckIcon color="white" />
//                           </IconButton>
//                           <IconButton
//                             // onClick={() => openConfirmDialog(room._id)}
//                             onClick={() => handleDelete(complaint._id)}
//                             sx={{
//                               backgroundColor: 'red',
//                               color: 'white',
//                               '&:hover': { backgroundColor: '#E57373' },
//                               boxShadow: 1,
//                             }}
//                           >
//                             <DeleteIcon />
//                           </IconButton>
//                         </Box>
//                       </TableCell>



//                     </TableRow>
//                   ))
//               )}
//             </TableBody>


//           </Table>
//           <TablePagination
//             rowsPerPageOptions={[5, 10, 25]}
//             component="div"
//             count={pendingComplaints.length}
//             rowsPerPage={rowsPerPage}
//             page={pagePending}
//             onPageChange={handleChangePagePending}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//           />
//         </TableContainer>


//       </Box>



//       <Typography variant="h5" gutterBottom style={{ marginTop: '2rem' }}>
//         <LocationChip1 label={'Resolved Complaints'} />
//       </Typography>

//       <Box p={1}>
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow style={{ backgroundColor: 'darkcyan', fontWeight: 'bold' }}>
//                 <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Buddie Name</TableCell>
//                 <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Room No</TableCell>
//                 <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Complaint Name</TableCell>
//                 <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Description</TableCell>
//                 <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {loadingResolved ? (
//                 // [...Array(5)].map((_, index) => renderSkeletonRow())
//                 <Typography>Loading</Typography>
//               ) : (
//                 resolvedComplaints
//                   .slice(pageResolved * rowsPerPage, pageResolved * rowsPerPage + rowsPerPage)
//                   .map((complaint) => (
//                     <TableRow key={complaint._id}>
//                       <TableCell>{complaint.buddie_id.buddie_name}</TableCell>
//                       <TableCell>{complaint.buddie_id.room_no}</TableCell>
//                       <TableCell>{complaint.complaint_name}</TableCell>
//                       <TableCell>{complaint.description}</TableCell>
//                       <TableCell>
//                         <Chip label={complaint.status} color="success" />
//                       </TableCell>
//                     </TableRow>
//                   ))
//               )}
//             </TableBody>
//           </Table>
//           <TablePagination
//             rowsPerPageOptions={[5, 10, 25]}
//             component="div"
//             count={resolvedComplaints.length}
//             rowsPerPage={rowsPerPage}
//             page={pageResolved}
//             onPageChange={handleChangePageResolved}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//           />
//         </TableContainer>
//       </Box>
//       <ToastContainer />
//     </div>
//   );
// };

// export default ComplaintList;




import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Chip,
  TablePagination,
  Skeleton,
  IconButton,
  Box,
  styled,
  TextField,
  InputAdornment,
  Tabs,
  Tab
} from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Header_sub from '../Header_sub';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import SearchIcon from '@mui/icons-material/Search';
import notFound from '../assets/notFound.png';


const LocationChip1 = styled(Chip)({
  fontFamily: 'Anta',
  fontSize: '18px',
  textAlign: 'center',
});

const ComplaintList = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0); // For tabs
  const [pendingComplaints, setPendingComplaints] = useState([]);
  const [resolvedComplaints, setResolvedComplaints] = useState([]);
  const [loadingPending, setLoadingPending] = useState(true);
  const [loadingResolved, setLoadingResolved] = useState(true);
  const [pagePending, setPagePending] = useState(0);
  const [pageResolved, setPageResolved] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState('');

  const token = localStorage.getItem('authToken');
  const hostel_id = localStorage.getItem('hostel_id');

  const fetchBuddieName = async (buddie_id) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/admin/buddieName/${buddie_id}`);
      return response.data.name;
    } catch (error) {
      console.error('Error fetching buddie name:', error);
      return 'Unknown';
    }
  };

  const fetchComplaints = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/admin/complaints/${hostel_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const pendingComplaintsWithNames = await Promise.all(
        response.data
          .filter((complaint) => complaint.status === 'pending')
          .map(async (complaint) => {
            const buddie_name = await fetchBuddieName(complaint.buddie_id._id);
            return { ...complaint, buddie_name };
          })
      );

      const resolvedComplaintsWithNames = await Promise.all(
        response.data
          .filter((complaint) => complaint.status === 'resolved')
          .map(async (complaint) => {
            const buddie_name = await fetchBuddieName(complaint.buddie_id._id);
            return { ...complaint, buddie_name };
          })
      );

      setPendingComplaints(pendingComplaintsWithNames);
      setResolvedComplaints(resolvedComplaintsWithNames);
    } catch (error) {
      console.error('Error fetching complaints:', error);
      toast.error('Error fetching complaints');
    } finally {
      setLoadingPending(false);
      setLoadingResolved(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleResolve = async (complaintId) => {
    try {
      await axios.patch(`${process.env.REACT_APP_URL}/admin/complaints/${complaintId}/resolve`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Complaint marked as resolved');

      setPendingComplaints((prev) => prev.filter((complaint) => complaint._id !== complaintId));
      const resolvedComplaint = pendingComplaints.find((complaint) => complaint._id === complaintId);
      setResolvedComplaints((prev) => [...prev, { ...resolvedComplaint, status: 'resolved' }]);
    } catch (error) {
      console.error('Error resolving complaint:', error);
      toast.error('Error resolving complaint');
    }
  };

  const handleReject = async (complaintId) => {
    try {
      await axios.patch(
        `${process.env.REACT_APP_URL}/admin/complaints/${complaintId}/reject`,
        { status: 'rejected' }, // Update the status to 'rejected'
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success('Complaint marked as rejected');
  
      // Move the complaint from pending or resolved lists to the rejected list
      setPendingComplaints((prev) => prev.filter((complaint) => complaint._id !== complaintId));
      setResolvedComplaints((prev) => prev.filter((complaint) => complaint._id !== complaintId));
    } catch (error) {
      console.error('Error rejecting complaint:', error);
      toast.error('Error rejecting complaint');
    }
  };
  

  const handleOpenSearchPage = () => {
    navigate('/admin/search-complaints');
  };

  const handleChangeTab = (event, newValue) => setActiveTab(newValue);
  const handleChangePagePending = (event, newPage) => setPagePending(newPage);
  const handleChangePageResolved = (event, newPage) => setPageResolved(newPage);
  const handleChangeRowsPerPage = (event) => setRowsPerPage(+event.target.value);


  
  const renderTableContent = (complaints, loading, isPending = true) => (
    loading ? (
      <TableRow>
        <TableCell colSpan={6} align="center">
          <Typography>Loading...</Typography>
        </TableCell>
      </TableRow>
    ) : complaints.length === 0 ? (
      <TableRow>
        <TableCell colSpan={6} align="center">
          <img src={notFound} alt="No data found" style={{ width: '150px', margin: '20px 0' }} />
          <Typography>No complaints found</Typography>
        </TableCell>
      </TableRow>
    ) : (
      complaints
        .slice(
          isPending ? pagePending * rowsPerPage : pageResolved * rowsPerPage,
          (isPending ? pagePending : pageResolved) * rowsPerPage + rowsPerPage
        )
        .map((complaint) => (
          <TableRow key={complaint._id}>
            <TableCell>{complaint.buddie_id.buddie_name}</TableCell>
            <TableCell>{complaint.buddie_id.room_no}</TableCell>
            <TableCell>{complaint.complaint_name}</TableCell>
            <TableCell>{complaint.description}</TableCell>
            <TableCell>
              <Chip label={complaint.status} color={isPending ? "warning" : "success"} />
            </TableCell>
            {isPending && (
              <TableCell>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton
                    onClick={() => handleResolve(complaint._id)}
                    sx={{ backgroundColor: 'green', color: 'white', '&:hover': { backgroundColor: '#FFB300' }, boxShadow: 1 }}
                  >
                    <CheckIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleReject(complaint._id)}
                    sx={{ backgroundColor: 'red', color: 'white', '&:hover': { backgroundColor: '#E57373' }, boxShadow: 1 }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </TableCell>
            )}
          </TableRow>
        ))
    )
  );
  


  return (
    <div>
      <Header_sub />
      <Box padding={2} onClick={handleOpenSearchPage} sx={{ cursor: 'pointer' }} mt={10}>
        <TextField
          fullWidth
          label="Search Complaints"
          variant="outlined"
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

      <Tabs value={activeTab} onChange={handleChangeTab} centered>
        <Tab label="Pending Complaints" />
        <Tab label="Resolved Complaints" />
      </Tabs>


      {activeTab === 0 && (
  <Box p={1}>
    <TableContainer component={Paper}>
      <Table>
        <TableHead style={{ backgroundColor: 'tomato' }}>
          <TableRow>
            <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Buddie Name</TableCell>
            <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Room No</TableCell>
            <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Complaint Name</TableCell>
            <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Description</TableCell>
            <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
            <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {renderTableContent(pendingComplaints, loadingPending, true)}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
      rowsPerPageOptions={[5, 10, 25]}
      component="div"
      count={pendingComplaints.length}
      rowsPerPage={rowsPerPage}
      page={pagePending}
      onPageChange={handleChangePagePending}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  </Box>
)}

{activeTab === 1 && (
  <Box p={1}>
    <TableContainer component={Paper}>
      <Table>
        <TableHead style={{ backgroundColor: 'tomato' }}>
          <TableRow>
            <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Buddie Name</TableCell>
            <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Room No</TableCell>
            <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Complaint Name</TableCell>
            <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Description</TableCell>
            <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {renderTableContent(resolvedComplaints, loadingResolved, false)}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
      rowsPerPageOptions={[5, 10, 25]}
      component="div"
      count={resolvedComplaints.length}
      rowsPerPage={rowsPerPage}
      page={pageResolved}
      onPageChange={handleChangePageResolved}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  </Box>
)}


      <ToastContainer />
    </div>
  );
};

export default ComplaintList;
