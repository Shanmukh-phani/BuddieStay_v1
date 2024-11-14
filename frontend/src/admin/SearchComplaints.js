// import React, { useState, useEffect, useCallback,useRef } from 'react';
// import {
//   AppBar,
//   Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField,
//   Grid, Card, CardContent, Typography, IconButton, InputAdornment,
//   Chip,
//   CircularProgress,
//   TableCell,
//   TableRow,
//   TableHead,
//   Table,
//   TableBody,
//   Paper,
//   TableContainer,
//   TablePagination
// } from '@mui/material';
// // import { Box, Card, CardContent, Chip, Grid, IconButton, Typography, CircularProgress, Skeleton, TextField } from '@mui/material';
// import { DoorBack, People, HomeWork, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
// import axios from 'axios';
// import { Skeleton } from '@mui/material';
// import { ToastContainer, toast } from 'react-toastify';
// import ConfirmDialog from './ConfirmDelete'; // Adjust the path as necessary
// import Header_sub from '../Header_sub'; // Adjust the path as necessary
// import searchImg from '../assets/search.png';
// import Footer from '../Footer';
// import { Check as CheckIcon } from '@mui/icons-material';
// import notFound from '../assets/notFound.png';
// import { useNavigate } from 'react-router-dom';




// const PaymentsSearchPage = () => {


//       // Status color mapping for chips
//   const statusColors = {
//     pending: 'warning',
//     accepted: 'success',
//     rejected: 'error',
//   };


//   const token = localStorage.getItem('authToken');
//   const hostelId = localStorage.getItem('hostel_id');
//   const hostel_id = localStorage.getItem('hostel_id');


//   const navigate = useNavigate();

//   const [pendingComplaints, setPendingComplaints] = useState([]);
// //   const [complaints, setcomplaints] = useState([]);
//   const [loadingPending, setLoadingPending] = useState(true);
//   const [loadingResolved, setLoadingResolved] = useState(true);
//   const [pagePending, setPagePending] = useState(0);
//   const [pageResolved, setPageResolved] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [resolvedComplaints, setResolvedComplaints] = useState([]);

 
//   const [searchQuery, setSearchQuery] = useState('');
//   const [complaints, setComplaints] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [noResults, setNoResults] = useState(false);

//   const [buddieNames, setBuddieNames] = useState({});

//   // const handleSearch = async (query, hostelId) => {

//   //   if (query.trim() === '' || !hostelId) return; // Ensure both query and hostelId are provided
//   //   setLoading(true);
//   //   setNoResults(false);

//   //   try {
//   //     const response = await axios.get(`${process.env.REACT_APP_URL}/admin/search-complaint`, {
//   //       params: { query, hostel_id: hostelId }
//   //     });
//   //     setComplaints(response.data);
//   //     setNoResults(response.data.length === 0);
//   //   } catch (error) {
//   //     console.error('Failed to fetch complaint data:', error);
//   //     setNoResults(true);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   // useEffect(() => {
//   //   if (!hostelId) {
//   //     setComplaints([]); // Clear complaints if hostelId is missing
//   //     return;
//   //   }

//   //   const delayDebounce = setTimeout(() => {
//   //     if (searchQuery) {
//   //       handleSearch(searchQuery, hostelId); // Call search with both parameters
//   //     } else {
//   //       setComplaints([]); // Clear complaints if searchQuery is empty
//   //     }
//   //   }, 300); // debounce delay of 300ms

//   //   return () => clearTimeout(delayDebounce);
//   // }, [searchQuery, hostelId]);






//   // const fetchBuddieName = async (buddie_id) => {
//   //   try {
//   //     const response = await axios.get(`${process.env.REACT_APP_URL}/admin/buddieName/${buddie_id}`);
//   //     return response.data.name;
//   //   } catch (error) {
//   //     console.error('Error fetching buddie name:', error);
//   //     return 'Unknown';
//   //   }
//   // };


//   // Example API call structure
  
//   const handleSearch = async (query, hostelId) => {
//     if (query.trim() === '' || !hostelId) return; // Ensure both query and hostelId are provided
//     setLoading(true);
//     setNoResults(false);
  
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_URL}/admin/search-complaint`, {
//         params: { query, hostel_id: hostelId }
//       });
//       setComplaints(response.data);
//       setNoResults(response.data.length === 0);
//     } catch (error) {
//       console.error('Failed to fetch complaint data:', error);
//       setNoResults(true);
//       // Optionally show an error message to the user here
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   useEffect(() => {
//     const delayDebounce = setTimeout(() => {
//       if (searchQuery && hostelId) {
//         handleSearch(searchQuery, hostelId); // Call search with both parameters
//       } else {
//         setComplaints([]); // Clear complaints if searchQuery is empty or hostelId is missing
//       }
//     }, 300); // debounce delay of 300ms
  
//     return () => clearTimeout(delayDebounce);
//   }, [searchQuery, hostelId]);
  
  
//   const fetchBuddieName = async (buddie_id) => {
//     console.log('Buddie ID:', buddie_id); // Check the value here
//     try {
//         const response = await axios.get(`${process.env.REACT_APP_URL}/admin/buddieName/${buddie_id}`);
//         return response.data.name;
//     } catch (error) {
//         console.error('Error fetching buddie name:', error);
//         return 'Unknown';
//     }
// };



//   // useEffect(() => {
//   //   const fetchAllBuddieNames = async () => {
//   //     const names = {};
//   //     for (const complaint of complaints) {
//   //       if (!names[complaint.buddie_id]) { // Check if we already have this name
//   //         console.log(complaint.buddie_id);
//   //         const name = await fetchBuddieName(complaint.buddie_id.toString());
//   //         names[complaint.buddie_id] = name;
//   //       }
//   //     }
//   //     setBuddieNames(names);
//   //   };

//   //   if (complaints.length > 0) {
//   //     fetchAllBuddieNames();
//   //   }
//   // }, [complaints]);

//   useEffect(() => {
//     const fetchAllBuddieNames = async () => {
//       const names = {};
//       for (const complaint of complaints) {
//         // Access the _id property from buddie_id
//         const buddieId = complaint.buddie_id?._id; // Use optional chaining to safely access _id
  
//         if (buddieId && !names[buddieId]) { // Check if we already have this name
//           console.log(buddieId); // Now this should log the actual ID string
//           const name = await fetchBuddieName(buddieId.toString()); // Convert buddieId to string if needed
//           names[buddieId] = name; // Store the name using the buddieId
//         }
//       }
//       setBuddieNames(names);
//     };
  
//     if (complaints.length > 0) {
//       fetchAllBuddieNames();
//     }
//   }, [complaints]);
  



//   const inputRef = useRef(null);

//   useEffect(() => {
//     // Focus on the input field when the component mounts
//     if (inputRef.current) {
//       inputRef.current.focus();
//     }
//   }, []);
  

//   const handleChangePagePending = (event, newPage) => setPagePending(newPage);
//   const handleChangePageResolved = (event, newPage) => setPageResolved(newPage);
//   const handleChangeRowsPerPage = (event) => setRowsPerPage(+event.target.value);



//   return (
//     <Box padding={2} display="flex" flexDirection="column" gap={2} mb={6}>
//         <Header_sub/>
//       <TextField
//         variant="outlined"
//         label="Search Complaint"
//         fullWidth
//         inputRef={inputRef}
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//         style={{marginTop:'70px'}}
//       />



// <Box display="flex" flexDirection="column" alignItems="center" padding={2}>

//   {/* Display no results found */}
//   {!loadingResolved && complaints.length === 0 && searchQuery.trim() !== '' && (
//     <Box display="flex" flexDirection="column" alignItems="center">
//       <img src={notFound} alt="No Complaints Found" style={{ width: '350px', height: '350px', marginBottom: '16px' }} />
//       <Typography variant="h6" color="textSecondary">No Complaints Found</Typography>
//     </Box>
//   )}

//   {/* Display results table */}
//   {complaints.length > 0 && (
//     <TableContainer component={Paper} sx={{ marginTop: 2, width: '100%' }}>
//       <Table>
//         <TableHead>
//           <TableRow style={{ backgroundColor: 'darkcyan', fontWeight: 'bold' }}>
//             <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Buddie Name</TableCell>
//             <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Room No</TableCell>
//             <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Complaint Name</TableCell>
//             <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Description</TableCell>
//             <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {complaints
//             .slice(pageResolved * rowsPerPage, pageResolved * rowsPerPage + rowsPerPage)
//             .map((complaint) => (
//               <TableRow key={complaint._id}>

//                 {/* <TableCell>{complaint.buddie_id.buddie_name}</TableCell> */}
//                 <TableCell>{buddieNames[complaint.buddie_id] || 'Loading...'}</TableCell>
//                 <TableCell>{complaint.room_no}</TableCell>
//                 <TableCell>{complaint.complaint_name}</TableCell>
//                 <TableCell>{complaint.description}</TableCell>
//                 <TableCell>
//                   <Chip label={complaint.status} color={complaint.status === 'resolved' ? 'success' : 'error'} />
//                 </TableCell>
//               </TableRow>
//             ))}
//         </TableBody>
//       </Table>
//       <TablePagination
//         rowsPerPageOptions={[5, 10, 25]}
//         component="div"
//         count={complaints.length}
//         rowsPerPage={rowsPerPage}
//         page={pageResolved}
//         onPageChange={handleChangePageResolved}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </TableContainer>
//   )}
// </Box>


//         <ToastContainer />

// <Footer/>

//     </Box>




//   );
// };

// export default PaymentsSearchPage;



import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Box,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Chip,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import Header_sub from '../Header_sub'; // Adjust the path as necessary
import Footer from '../Footer';
import notFound from '../assets/notFound.png';
import { useNavigate } from 'react-router-dom';

const PaymentsSearchPage = () => {
  const token = localStorage.getItem('authToken');
  const hostelId = localStorage.getItem('hostel_id');
  const navigate = useNavigate();

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [buddieNames, setBuddieNames] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSearch = async (query, hostelId) => {
    if (query.trim() === '' || !hostelId) return; // Ensure both query and hostelId are provided
    setLoading(true);
    setNoResults(false);

    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/admin/search-complaint`, {
        params: { query, hostel_id: hostelId },
        headers: { Authorization: `Bearer ${token}` }, // Ensure to send the token
      });
      setComplaints(response.data);
      setNoResults(response.data.length === 0);
    } catch (error) {
      console.error('Failed to fetch complaint data:', error);
      setNoResults(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery && hostelId) {
        handleSearch(searchQuery, hostelId); // Call search with both parameters
      } else {
        setComplaints([]); // Clear complaints if searchQuery is empty or hostelId is missing
      }
    }, 300); // debounce delay of 300ms

    return () => clearTimeout(delayDebounce);
  }, [searchQuery, hostelId]);

  const fetchBuddieName = async (buddie_id) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/admin/buddieName/${buddie_id}`);
      return response.data.name;
    } catch (error) {
      console.error('Error fetching buddie name:', error);
      return 'Unknown';
    }
  };

  useEffect(() => {
    const fetchAllBuddieNames = async () => {
      const names = {};
      for (const complaint of complaints) {
        const buddieId = complaint.buddie_id?._id; // Access _id safely
        if (buddieId && !names[buddieId]) { // Only fetch if name is not already fetched
          const name = await fetchBuddieName(buddieId.toString());
          names[buddieId] = name; // Store the name using the buddieId
        }
      }
      setBuddieNames(names);
    };

    if (complaints.length > 0) {
      fetchAllBuddieNames();
    }
  }, [complaints]);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => setRowsPerPage(+event.target.value);

  return (
    <Box padding={2} display="flex" flexDirection="column" gap={2} mb={6}>
      <Header_sub />
      <TextField
        variant="outlined"
        label="Search Complaint"
        fullWidth
        inputRef={inputRef}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginTop: '70px' }}
      />

      <Box display="flex" flexDirection="column" alignItems="center" padding={2}>
        {/* Display no results found */}
        {noResults && searchQuery.trim() !== '' && (
          <Box display="flex" flexDirection="column" alignItems="center">
            <img src={notFound} alt="No Complaints Found" style={{ width: '350px', height: '350px', marginBottom: '16px' }} />
            <Typography variant="h6" color="textSecondary">No Complaints Found</Typography>
          </Box>
        )}

        {/* Display results table */}
        {complaints.length > 0 && (
          <TableContainer component={Paper} sx={{ marginTop: 2, width: '100%' }}>
            <Table>
              <TableHead>
                <TableRow style={{ backgroundColor: 'darkcyan', fontWeight: 'bold' }}>
                  <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Buddie Name</TableCell>
                  <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Room No</TableCell>
                  <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Complaint Name</TableCell>
                  <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Description</TableCell>
                  <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {complaints
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((complaint) => (
                    <TableRow key={complaint._id}>
                      <TableCell>{buddieNames[complaint.buddie_id?._id] || 'Loading...'}</TableCell>
                      <TableCell>{complaint.room_no}</TableCell>
                      <TableCell>{complaint.complaint_name}</TableCell>
                      <TableCell>{complaint.description}</TableCell>
                      <TableCell>
                        <Chip label={complaint.status} color={complaint.status === 'resolved' ? 'success' : 'error'} />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={complaints.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        )}
      </Box>

      <ToastContainer />
      <Footer />
    </Box>
  );
};

export default PaymentsSearchPage;
