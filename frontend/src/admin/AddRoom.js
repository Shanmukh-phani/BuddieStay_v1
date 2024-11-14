
import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  AppBar,
  Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField,
  Grid, Card, CardContent, Typography, IconButton, InputAdornment,
  Chip,
  CircularProgress
} from '@mui/material';
import BottomNavBar from './BottomNavBar';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { Add, DoorBack, HomeWork, People } from '@mui/icons-material';
import { Skeleton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import notFound from '../assets/notFound.png';
import InfiniteSroll from "react-infinite-scroll-component";




import { List, ListItem, ListItemText } from '@mui/material';
import profileImage from '../assets/buddie.jpg';
import { styled } from '@mui/system';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

import ConfirmDialog from './ConfirmDelete'; // Adjust the path as necessary
// import notFound from '../assets/notFound.png';

import AdminSidebar from './AdminSidebar';
import LoadingScreen from '../LoadingScreen';
import HeaderSub from '../HeaderSub';
import { useNavigate } from 'react-router-dom';



const RoomManagement = () => {


  // Add a validation function
  const validateRoomData = () => {
    if (roomData.room_vacancy > roomData.room_sharing) {
      toast.error('Room vacancy cannot be less than room sharing!');
      return false;
    }
    return true;
  };

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(null);

  // Function to handle open dialog for deletion
  const openConfirmDialog = (roomId) => {
    setSelectedRoomId(roomId);
    setDialogOpen(true);
  };


  // const [rooms, setRooms] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [aniloading, anisetLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [roomData, setRoomData] = useState({ room_number: '', room_sharing: '', room_vacancy: '' });
  const [editRoomData, setEditRoomData] = useState(null);




  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleEditClose = () => setEditOpen(false);
  const handleEdit = (room) => {
    setEditRoomData(room);
    setEditOpen(true);
  };




  const handleChange = (e) => {
    setRoomData({ ...roomData, [e.target.name]: e.target.value });
  };



  // const getRooms = async () => {

  //   setLoading(true); // Set loading state to true before fetching

  //   try {
  //     const hostel_id = localStorage.getItem('hostel_id');
  //     const token = localStorage.getItem('authToken');

  //     if (!hostel_id || ! process.env.REACT_APP_URL) {
  //       // toast.error('No hostel_id found.');
  //       console.log( process.env.REACT_APP_URL);
  //     }

  //     const response = await axios.get(`${ process.env.REACT_APP_URL}/admin/rooms`, {
  //       params: { hostel_id },
  //       headers: {
  //         'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
  //       },
  //     });

  //     if (response.status !== 200) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }

  //     const roomsData = response.data;
  //     setRooms(roomsData); // Update the state with the fetched rooms
  //   } catch (error) {
  //     console.error('Error fetching rooms:', error);
  //   } finally {
  //     setLoading(false); // Set loading state to false after fetching
  //   }
  // };

  // useEffect(() => {
  //   getRooms();
  // }, []);




  // Filtered rooms based on search term



  // Fetch rooms function




  // const [rooms, setRooms] = useState([]);
  // const [rooms, setrooms] = useState([]); // If you have filtering logic
  // const [page, setPage] = useState(1);
  // const [loading, setLoading] = useState(false);
  // const [hasMore, setHasMore] = useState(true);





  // const [rooms, setRooms] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [page, setPage] = useState(1);
  // const [hasMore, setHasMore] = useState(true);


  // const loadingRef = useRef(null);

  // const getRooms = useCallback(async (pageNumber = 1) => {
  //   try {
  //     const hostel_id = localStorage.getItem('hostel_id');
  //     const token = localStorage.getItem('authToken');

  //     if (!hostel_id || !process.env.REACT_APP_URL) {
  //       console.log('Hostel ID or API URL is missing.');
  //       return;
  //     }

  //     setLoading(true);

  //     const response = await axios.get(`${process.env.REACT_APP_URL}/admin/rooms`, {
  //       params: { hostel_id, page: pageNumber, limit: 10 },
  //       headers: {
  //         'Authorization': `Bearer ${token}`,
  //       },
  //     });

  //     if (response.status !== 200) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }

  //     const { rooms: fetchedRooms, currentPage, totalPages } = response.data;

  //     // Prevent duplicates by filtering out already existing rooms
  //     setRooms(prevRooms => {
  //       const newRooms = fetchedRooms.filter(
  //         fetchedRoom => !prevRooms.some(room => room._id === fetchedRoom._id)
  //       );
  //       return [...prevRooms, ...newRooms];
  //     });

  //     setPage(currentPage);
  //     setHasMore(currentPage < totalPages);
  //   } catch (error) {
  //     console.log('Error fetching rooms:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, []);

  // // Initial fetch
  // useEffect(() => {
  //   getRooms(page);
  // }, [getRooms, page]);

  // // Set up Intersection Observer
  // useEffect(() => {
  //   const observer = new IntersectionObserver(entries => {
  //     if (entries[0].isIntersecting && !loading && hasMore) {
  //       setPage(prevPage => prevPage + 1);
  //     }
  //   });

  //   if (loadingRef.current) {
  //     observer.observe(loadingRef.current);
  //   }

  //   return () => {
  //     if (loadingRef.current) {
  //       observer.unobserve(loadingRef.current);
  //     }
  //   };
  // }, [loading, hasMore]);




  // const [rooms, setRooms] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [page, setPage] = useState(1);
  // const [hasMore, setHasMore] = useState(true);

  // const loadingRef = useRef(null);

  // const getRooms = useCallback(async (pageNumber = 1) => {
  //   try {
  //     const hostel_id = localStorage.getItem('hostel_id');
  //     const token = localStorage.getItem('authToken');

  //     if (!hostel_id || !process.env.REACT_APP_URL) {
  //       console.log('Hostel ID or API URL is missing.');
  //       return;
  //     }

  //     setLoading(true);

  //     const response = await axios.get(`${process.env.REACT_APP_URL}/admin/rooms`, {
  //       params: { hostel_id, page: pageNumber, limit: 10 },
  //       headers: {
  //         'Authorization': `Bearer ${token}`,
  //       },
  //     });

  //     if (response.status !== 200) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }

  //     const { rooms: fetchedRooms, currentPage, totalPages } = response.data;

  //     // Prevent duplicates by filtering out already existing rooms
  //     setRooms(prevRooms => {
  //       const newRooms = fetchedRooms.filter(
  //         fetchedRoom => !prevRooms.some(room => room._id === fetchedRoom._id)
  //       );
  //       return [...prevRooms, ...newRooms];
  //     });

  //     setHasMore(currentPage < totalPages);
  //   } catch (error) {
  //     console.log('Error fetching rooms:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, []);

  // // Initial fetch when component mounts
  // useEffect(() => {
  //   getRooms(1);
  // }, [getRooms]);

  // // Intersection Observer for infinite scrolling
  // useEffect(() => {
  //   const observer = new IntersectionObserver(entries => {
  //     if (entries[0].isIntersecting && !loading && hasMore) {
  //       setPage(prevPage => prevPage + 1);
  //       getRooms(page + 1); // Fetch the next page explicitly here
  //     }
  //   });

  //   if (loadingRef.current) {
  //     observer.observe(loadingRef.current);
  //   }

  //   return () => {
  //     if (loadingRef.current) {
  //       observer.unobserve(loadingRef.current);
  //     }
  //   };
  // }, [loading, hasMore, getRooms, page]);




  // const [rooms, setRooms] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [page, setPage] = useState(1);
  // const [hasMore, setHasMore] = useState(true);

  // const loadingRef = useRef(null);

  // const getRooms = useCallback(async (pageNumber = 1) => {
  //   if (!hasMore || loading) return; // Exit if already loading or no more pages are available

  //   try {
  //     const hostel_id = localStorage.getItem('hostel_id');
  //     const token = localStorage.getItem('authToken');

  //     if (!hostel_id || !process.env.REACT_APP_URL) {
  //       console.log('Hostel ID or API URL is missing.');
  //       return;
  //     }

  //     setLoading(true);

  //     const response = await axios.get(`${process.env.REACT_APP_URL}/admin/rooms`, {
  //       params: { hostel_id, page: pageNumber, limit: 10 },
  //       headers: { 'Authorization': `Bearer ${token}` },
  //     });

  //     if (response.status !== 200) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }

  //     const { rooms: fetchedRooms, currentPage, totalPages } = response.data;

  //     // If no rooms are fetched, set `hasMore` to false
  //     if (fetchedRooms.length === 0) {
  //       setHasMore(false);
  //       return;
  //     }

  //     setRooms(prevRooms => [
  //       ...prevRooms,
  //       ...fetchedRooms.filter(fetchedRoom => !prevRooms.some(room => room._id === fetchedRoom._id)),
  //     ]);

  //     setHasMore(currentPage < totalPages); // Check if there are more pages
  //   } catch (error) {
  //     console.log('Error fetching rooms:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, [hasMore, loading]);

  // useEffect(() => {
  //   getRooms(1);
  // }, [getRooms]);

  // // Intersection Observer for infinite scrolling
  // useEffect(() => {
  //   const observer = new IntersectionObserver(entries => {
  //     if (entries[0].isIntersecting && !loading && hasMore) {
  //       setPage(prevPage => prevPage + 1);
  //       getRooms(page + 1); // Fetch the next page explicitly here
  //     }
  //   });

  //   if (loadingRef.current) {
  //     observer.observe(loadingRef.current);
  //   }

  //   return () => {
  //     if (loadingRef.current) {
  //       observer.unobserve(loadingRef.current);
  //     }
  //   };
  // }, [loading, hasMore, getRooms, page]);




  // Filtering rooms based on search
  // const rooms = rooms.filter(room => {
  //   const searchLower = search.toLowerCase();
  //   const roomNumber = String(room.room_number).toLowerCase();
  //   const roomVacancy = String(room.room_vacancy).toLowerCase();

  //   return roomNumber.includes(searchLower) || roomVacancy.includes(searchLower);
  // });


  // const getRooms = useCallback(async (pageNumber = 1) => {


  //   try {
  //     const hostel_id = localStorage.getItem('hostel_id');
  //     const token = localStorage.getItem('authToken');

  //     if (!hostel_id || !process.env.REACT_APP_URL) {
  //       // console.error('Hostel ID or API URL is missing.');
  //       console.log('Hostel ID or API URL is missing.');
  //       return;
  //     }

  //     setLoading(true);

  //     const response = await axios.get(`${process.env.REACT_APP_URL}/admin/rooms`, {
  //       params: { hostel_id, page: pageNumber, limit: 10 }, // Specify limit if needed
  //       headers: {
  //         'Authorization': `Bearer ${token}`,
  //       },
  //     });

  //     if (response.status !== 200) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //       setLoading(false);
  //     }

  //     const { rooms: fetchedRooms, currentPage, totalPages } = response.data;

  //     // Prevent duplicates by filtering out already existing rooms
  //     setRooms(prevRooms => {
  //       setLoading(true);
  //       const newRooms = fetchedRooms.filter(
  //         fetchedRoom => !prevRooms.some(room => room._id === fetchedRoom._id)
  //       );
  //       return [...prevRooms, ...newRooms];
  //     });

  //     setPage(currentPage);
  //     setHasMore(currentPage < totalPages);
  //   } catch (error) {
  //     // console.error('Error fetching rooms:', error);
  //     console.log('Error fetching rooms:', error);
  //     setLoading(false);

  //   } finally {
  //     setLoading(false);
  //   }
  // }, []);

  // // Initial fetch
  // useEffect(() => {
  //   getRooms(page);
  // }, [getRooms, page]);




  // // Handle scroll event for infinite scrolling
  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (
  //       window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
  //       !loading &&
  //       hasMore
  //     ) {
  //       setPage(prevPage => prevPage + 1);
  //     }
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, [loading, hasMore]);

  // // Optional: If you have filtering logic that affects `rooms`
  // useEffect(() => {
  //   // Example: simple filter based on some criteria
  //   // setrooms(rooms.filter(room => /* your filter condition */));
  //   setrooms(rooms); // If no filtering, directly set rooms
  // }, [rooms]);


  // const rooms1 = rooms.filter(room => {
  //   const searchLower = search.toLowerCase();
  //   const roomNumber = String(room.room_number).toLowerCase();
  //   const roomVacancy = String(room.room_vacancy).toLowerCase();

  //   return roomNumber.includes(searchLower) || roomVacancy.includes(searchLower);
  // });



  const hostel_id = localStorage.getItem('hostel_id');
  const token = localStorage.getItem('authToken');
  
  const [error, setError] = useState(null); // Error state
  
  // Initial state ensures rooms is an empty array
const [rooms, setRooms] = useState([]); 
const [loading, setLoading] = useState(true);
const [page, setPage] = useState(1);
const [totalRooms,setTotalRooms] = useState(0)

const LIMIT =5;



useEffect(() => {
  fetchRooms();
}, [hostel_id]);


const fetchRooms = () => {
    axios.get(`${process.env.REACT_APP_URL}/admin/rooms`, {
      params: { hostel_id ,page : page,size : LIMIT},
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }).then(({data})=>{
      setPage(page+1);
      setRooms([...rooms, ...data.records]); 
      setTotalRooms(data.total)
    }).catch (error => {
    console.error('Error fetching rooms:', error);
    })
}



  const handleSubmit = async () => {
    if (!validateRoomData()) return;

    try {
      const hostel_id = localStorage.getItem('hostel_id'); // Retrieve hostel_id from local storage
      const token = localStorage.getItem('authToken'); // Retrieve token from local storage

      if (!hostel_id) {
        toast.error('No hostel_id found.');
        return;
      }

      // Validate room data
      if (!roomData.room_number || !roomData.room_sharing || !roomData.room_vacancy) {
        toast.error('Incomplete room data.');
        return;
      }

      setLoading1(true);

      // console.log('Sending data:', { ...roomData, hostel_id });

      // Send POST request to add a new room
      const response = await fetch(`${process.env.REACT_APP_URL}/admin/addRoom`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Include the token in the Authorization header
        },
        body: JSON.stringify({ ...roomData, hostel_id }),
      });

      if (!response.ok) {
        setLoading1(false);
        const errorResponse = await response.json();
        toast.error(`Error: ${errorResponse.message || 'An error occurred'}`);
        throw new Error(`HTTP error! status: ${response.status} - ${errorResponse.message || 'An error occurred'}`);
      }

      const newRoom = await response.json();
      // console.log('New room added:', newRoom);

      // Update the rooms state with the new room
      setRooms((prevRooms) => [...prevRooms, { ...roomData, _id: newRoom._id }]);

      // Reset the form data
      setRoomData({
        room_number: '',
        room_sharing: '',
        room_vacancy: '',
      });

      handleClose(); // Close the modal or form after adding the room

      // Show success toast message
      toast.success('Room added successfully.');

    } catch (error) {
      console.error('Error adding room:', error);
      setLoading1(false);
    }
    setLoading1(false);
  };



  const validateEditRoomData = () => {
    if (editRoomData.room_vacancy > editRoomData.room_sharing) {
      toast.error('Room vacancy cannot be less than room sharing!');
      return false;
    }
    return true;
  };



  const handleEditSubmit = async () => {

    if (!validateEditRoomData()) return; // Prevent submission if validation fails

    try {
      setLoading2(true);
      const hostel_id = localStorage.getItem('hostel_id'); // Retrieve hostel_id from local storage
      const token = localStorage.getItem('authToken'); // Retrieve token from local storage

      if (!hostel_id) {
        toast.error('No hostel_id found.');
        setLoading2(false);
        return;

      }

      // console.log('Sending data:', editRoomData);

      // Send PUT request to update a room
      const response = await axios.put(

        `${process.env.REACT_APP_URL}/admin/updateRoom/${editRoomData._id}`,
        { ...editRoomData, hostel_id }, // Include hostel_id in the request body
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );

      // Check if response status is OK
      if (response.status === 200) {
        const updatedRoom = response.data;
        toast.success('Room updated successfully!');

        // Update the rooms state with the updated room
        setRooms((prevRooms) =>
          prevRooms.map((room) => (room._id === updatedRoom._id ? updatedRoom : room))
        );

        // Reset edit room data and close edit form
        setEditRoomData(null);
        setEditOpen(false);
        setLoading1(false);
      } else {
        setLoading1(false);
        // Handle different response statuses if needed
        const message = response.data.message || 'An error occurred';
        toast.error(`Error: ${message}`);
        throw new Error(`HTTP error! status: ${response.status} - ${message}`);

      }
    } catch (error) {
      setLoading1(false);
      // Display error message from the catch block
      toast.error(`Error updating room: ${error.response?.data?.message || error.message || 'An error occurred'}`);
      console.error('Error updating room:', error);

    }
    setLoading2(false);
  };






  const handleDelete = async () => {
    const token = localStorage.getItem('authToken');
    const hostelId = localStorage.getItem('hostel_id');

    if (!token || !hostelId) {
      toast.error('Authentication failed. Please log in again.');
      return;
    }

    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_URL}/admin/deleteRoom/${selectedRoomId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
            'Content-Type': 'application/json',
          },
          data: {
            hostel_id: hostelId, // Include hostel_id in the request body for verification
          },
        }
      );

      if (response.status === 200) {
        toast.success('Room deleted successfully!');
        // Optionally, update the state to remove the deleted room
        setRooms(prevRooms => prevRooms.filter(room => room._id !== selectedRoomId));
        setLoading2(false);

      } else {
        toast.error(`Error: ${response.data.message || 'An error occurred'}`);
        setLoading2(false);

      }
    } catch (error) {
      setLoading2(false);

      console.error('Error deleting room:', error);
      toast.error('Failed to delete the room. Please try again.');
    }
  };





  const [selectedCity, setSelectedCity] = useState('');
  const [isLocationDialogOpen, setIsLocationDialogOpen] = useState(false);

  // const handleLocationClick = () => {
  //   setIsLocationDialogOpen(true);
  // };

  const handleLocationDialogClose = () => {
    setIsLocationDialogOpen(false);
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

  const handleLocationConfirm = () => {
    // Store the selected city in local storage
    localStorage.setItem('selectedCity', selectedCity);
    setIsLocationDialogOpen(false);
  };


  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleProfileIconClick = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };


  useEffect(() => {
    // Simulate a loading delay (e.g., data fetching)
    setTimeout(() => anisetLoading(false), 3000);
  }, []);



  const navigate = useNavigate();
  // const [search, setSearch] = useState('');

  const handleOpenSearchPage = () => {
    navigate('/admin/search-rooms');
  };




  return (


    <div>
      {/* <>
{aniloading ? (
<LoadingScreen />
) : ( */}

      <div style={{ marginTop: '80px' }}>
        <Box>

          <>
            <HeaderSub />

            {/* <Dialog open={isLocationDialogOpen} onClose={handleLocationDialogClose} fullWidth={true} maxWidth="sm">
              <DialogTitle>Select a City</DialogTitle>
              <DialogContent>
                <List>
                  <ListItem button selected={selectedCity === 'Hyderabad'} onClick={() => handleCitySelect('Hyderabad')}>
                    <ListItemText primary="Hyderabad" />
                  </ListItem>
                  <ListItem button selected={selectedCity === 'Mumbai'} onClick={() => handleCitySelect('Mumbai')}>
                    <ListItemText primary="Mumbai" />
                  </ListItem>
                  <ListItem button selected={selectedCity === 'Chennai'} onClick={() => handleCitySelect('Chennai')}>
                    <ListItemText primary="Chennai" />
                  </ListItem>
                </List>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleLocationDialogClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleLocationConfirm} color="primary">
                  Confirm
                </Button>
              </DialogActions>
            </Dialog> */}
          </>



          <Button variant="contained" onClick={handleOpen} style={{ backgroundColor: 'orange', color: 'white', fontWeight: 'bold', float: 'right', margin: '30px' }}>
            <AddIcon />   New Room
          </Button>




          {/* Search Bar */}
          <Box padding={2} onClick={handleOpenSearchPage} sx={{ cursor: 'pointer' }}>
            <TextField
              fullWidth
              label="Search Rooms"
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

          {/* <Box padding={2} display="flex" flexDirection="column" gap={2} mb={6}>
            {loading ? (
              Array.from(new Array(5)).map((_, index) => (
                <Card
                  key={index}
                  variant="outlined"
                  sx={{ display: 'flex', justifyContent: 'space-between', padding: 2, alignItems: 'center', boxShadow: 3, borderRadius: 2 }}
                >
                  <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Skeleton variant="text" width={100} height={20} />
                    <Skeleton variant="text" width={80} height={20} />
                    <Skeleton variant="text" width={80} height={20} />
                  </CardContent>
                  <Box display="flex" flexDirection="column" justifyContent="center">
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton sx={{ backgroundColor: '#F57C00', color: 'white' }}>
                        <EditIcon />
                      </IconButton>
                      <IconButton sx={{ backgroundColor: '#D32F2F', color: 'white' }}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </Card>
              ))
            ) : rooms.length > 0 ? (
              rooms.map((room) => (
                <Card
                  key={room._id}
                  variant="outlined"
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: 2,
                    alignItems: 'center',
                    boxShadow: 3,
                    borderRadius: 2,
                  }}
                >
                  <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Chip
                      icon={<DoorBack />}
                      label={`Room ${room.room_number}`}
                      variant="outlined"
                      color="primary"
                      sx={{ fontSize: '0.875rem', fontWeight: 'bold' }}
                    />
                    <Box display="flex" alignItems="center" gap={1}>
                      <People color="action" />
                      <Typography variant="body2">Sharing: {room.room_sharing}</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                      <HomeWork color="action" />
                      <Typography variant="body2">Vacancy: {room.room_vacancy}</Typography>
                    </Box>
                  </CardContent>
                  <Box display="flex" flexDirection="column" justifyContent="center">
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton
                        onClick={() => handleEdit(room)}
                        sx={{
                          backgroundColor: '#F57C00',
                          color: 'white',
                          '&:hover': { backgroundColor: '#FFB300' },
                          boxShadow: 1,
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => openConfirmDialog(room._id)}
                        sx={{
                          backgroundColor: '#D32F2F',
                          color: 'white',
                          '&:hover': { backgroundColor: '#E57373' },
                          boxShadow: 1,
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </Card>
              ))
            ) : (
              <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" padding={4}>
                <img src={notFound} alt="No Rooms Found" style={{ width: '350px', height: '350px', marginBottom: '16px' }} />
                <Typography variant="h6" color="textSecondary">No Rooms Found</Typography>
              </Box>
            )}
         </Box> */}



          {/* <Box padding={2} display="flex" flexDirection="column" gap={2} mb={6}>
      {rooms.length === 0 && !loading ? (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" padding={4}>
          <img src={notFound} alt="No Rooms Found" style={{ width: '350px', height: '350px', marginBottom: '16px' }} />
          <Typography variant="h6" color="textSecondary">No Rooms Found</Typography>
        </Box>
      ) : (
        <>
          {rooms.map((room) => (
            <Card
              key={room._id}
              variant="outlined"
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: 2,
                alignItems: 'center',
                boxShadow: 3,
                borderRadius: 2,
              }}
            >
              <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Chip
                  icon={<DoorBack style={{color:'darkcyan'}}/>}
                  label={`Room ${room.room_number}`}
                  variant="outlined"
                  // color="primary"
                  style={{color:'darkcyan',borderColor:'darkcyan'}}
                  sx={{ fontSize: '0.875rem', fontWeight: 'bold' }}
                />
                <Box display="flex" alignItems="center" gap={1}>
                  <People color="action" />
                  <Typography variant="body2">Sharing: {room.room_sharing}</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <HomeWork color="action" />
                  <Typography variant="body2">Vacancy: {room.room_vacancy}</Typography>
                </Box>
              </CardContent>
              <Box display="flex" flexDirection="column" justifyContent="center">
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton
                    onClick={() => handleEdit(room)}
                    sx={{
                      backgroundColor: 'slategrey',
                      color: 'white',
                      '&:hover': { backgroundColor: '#FFB300' },
                      boxShadow: 1,
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => openConfirmDialog(room._id)}
                    sx={{
                      backgroundColor: 'tomato',
                      color: 'white',
                      '&:hover': { backgroundColor: '#E57373' },
                      boxShadow: 1,
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            </Card>
          ))}




          {loading && (


Array.from(new Array(5)).map((_, index) => (
  <Card
    key={index}
    variant="outlined"
    sx={{ display: 'flex', justifyContent: 'space-between', padding: 2, alignItems: 'center', boxShadow: 3, borderRadius: 2 }}
  >
    <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Skeleton variant="text" width={100} height={20} />
      <Skeleton variant="text" width={80} height={20} />
      <Skeleton variant="text" width={80} height={20} />
    </CardContent>
  </Card>
))
                   
          )}



        </>
      )}
    </Box> */}




          {/* <Box padding={2} display="flex" flexDirection="column" gap={2} mb={6}>
  {loading ? (
    // Show skeleton loaders while loading
    Array.from(new Array(5)).map((_, index) => (
      <Card
        key={index}
        variant="outlined"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: 2,
          alignItems: 'center',
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Skeleton variant="text" width={100} height={20} />
          <Skeleton variant="text" width={80} height={20} />
          <Skeleton variant="text" width={80} height={20} />
        </CardContent>
      </Card>
    ))
  ) : rooms.length === 0 ? (
    // Show no data image if loading is done and no data is available
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" padding={4}>
      <img src={notFound} alt="No Rooms Found" style={{ width: '350px', height: '350px', marginBottom: '16px' }} />
      <Typography variant="h6" color="textSecondary">No Rooms Found</Typography>
    </Box>
  ) : (
    // Display data if loading is done and data is available
    rooms.map((room) => (
      <Card
        key={room._id}
        variant="outlined"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: 2,
          alignItems: 'center',
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Chip
            icon={<DoorBack style={{ color: 'darkcyan' }} />}
            label={`Room ${room.room_number}`}
            variant="outlined"
            style={{ color: 'darkcyan', borderColor: 'darkcyan' }}
            sx={{ fontSize: '0.875rem', fontWeight: 'bold' }}
          />
          <Box display="flex" alignItems="center" gap={1}>
            <People color="action" />
            <Typography variant="body2">Sharing: {room.room_sharing}</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <HomeWork color="action" />
            <Typography variant="body2">Vacancy: {room.room_vacancy}</Typography>
          </Box>
        </CardContent>
        <Box display="flex" flexDirection="column" justifyContent="center">
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton
              onClick={() => handleEdit(room)}
              sx={{
                backgroundColor: 'slategrey',
                color: 'white',
                '&:hover': { backgroundColor: '#FFB300' },
                boxShadow: 1,
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() => openConfirmDialog(room._id)}
              sx={{
                backgroundColor: 'tomato',
                color: 'white',
                '&:hover': { backgroundColor: '#E57373' },
                boxShadow: 1,
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      </Card>
    ))
  )}
</Box> */}



          {/* <Box padding={2} display="flex" flexDirection="column" gap={2} mb={6}>
      {loading && (
        // Show skeleton loaders while loading
        Array.from(new Array(5)).map((_, index) => (
          <Card key={index} variant="outlined" sx={{ display: 'flex', padding: 2, boxShadow: 3 }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Skeleton variant="text" width={100} height={20} />
              <Skeleton variant="text" width={80} height={20} />
              <Skeleton variant="text" width={80} height={20} />
            </CardContent>
          </Card>
        ))
      )}

<Grid container spacing={2}>

      {rooms.length === 0 && !loading ? (
        // Show no data image if loading is done and no data is available
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" padding={4}>
          <img src="notFoundImage.png" alt="No Rooms Found" style={{ width: '350px', height: '350px', marginBottom: '16px' }} />
          <Typography variant="h6" color="textSecondary">No Rooms Found</Typography>
        </Box>
      ) : (
        // Display data if loading is done and data is available
       
        rooms.map((room) => (
          <Grid item xs={12} sm={6} md={3} key={room._id}>
          <Card
          key={room._id}
          variant="outlined"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: 2,
            alignItems: 'center',
            boxShadow: 3,
            borderRadius: 2,
          }}
        >
          <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Chip
              icon={<DoorBack style={{color:'darkcyan'}}/>}
              label={`Room ${room.room_number}`}
              variant="outlined"
              // color="primary"
              style={{color:'darkcyan',borderColor:'darkcyan'}}
              sx={{ fontSize: '0.875rem', fontWeight: 'bold' }}
            />
            <Box display="flex" alignItems="center" gap={1}>
              <People color="action" />
              <Typography variant="body2">Sharing: {room.room_sharing}</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <HomeWork color="action" />
              <Typography variant="body2">Vacancy: {room.room_vacancy}</Typography>
            </Box>
          </CardContent>
          <Box display="flex" flexDirection="column" justifyContent="center">
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton
                onClick={() => handleEdit(room)}
                sx={{
                  backgroundColor: 'slategrey',
                  color: 'white',
                  '&:hover': { backgroundColor: '#FFB300' },
                  boxShadow: 1,
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() => openConfirmDialog(room._id)}
                sx={{
                  backgroundColor: 'tomato',
                  color: 'white',
                  '&:hover': { backgroundColor: '#E57373' },
                  boxShadow: 1,
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        </Card>
        </Grid>
        ))
      )}
      </Grid>
      {hasMore && (
        <div ref={loadingRef} style={{ textAlign: 'center', padding: '16px' }}>
          {loading && <CircularProgress />} 
        </div>
      )}
    </Box> */}

          {/* <Box padding={2} display="flex" flexDirection="column" gap={2} mb={6}>
      {loading && Array.from(new Array(5)).map((_, index) => (
        <Card key={index} variant="outlined" sx={{ display: 'flex', padding: 2, boxShadow: 3 }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Skeleton variant="text" width={100} height={20} />
            <Skeleton variant="text" width={80} height={20} />
            <Skeleton variant="text" width={80} height={20} />
          </CardContent>
        </Card>
      ))}

      <Grid container spacing={2}>
        {rooms.length === 0 && !loading ? (
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" padding={4}>
            <img src="notFoundImage.png" alt="No Rooms Found" style={{ width: '350px', height: '350px', marginBottom: '16px' }} />
            <Typography variant="h6" color="textSecondary">No Rooms Found</Typography>
          </Box>
        ) : (
          rooms.map(room => (
            <Grid item xs={12} sm={6} md={3} key={room._id}>
              <Card variant="outlined" sx={{ display: 'flex', justifyContent: 'space-between', padding: 2, alignItems: 'center', boxShadow: 3, borderRadius: 2 }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Chip icon={<DoorBack style={{ color: 'darkcyan' }} />} label={`Room ${room.room_number}`} variant="outlined" style={{ color: 'darkcyan', borderColor: 'darkcyan' }} sx={{ fontSize: '0.875rem', fontWeight: 'bold' }} />
                  <Box display="flex" alignItems="center" gap={1}>
                    <People color="action" />
                    <Typography variant="body2">Sharing: {room.room_sharing}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <HomeWork color="action" />
                    <Typography variant="body2">Vacancy: {room.room_vacancy}</Typography>
                  </Box>
                </CardContent>
                <Box display="flex" flexDirection="column" justifyContent="center">
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton onClick={() => handleEdit(room)} sx={{ backgroundColor: 'slategrey', color: 'white', '&:hover': { backgroundColor: '#FFB300' }, boxShadow: 1 }}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => openConfirmDialog(room._id)} sx={{ backgroundColor: 'tomato', color: 'white', '&:hover': { backgroundColor: '#E57373' }, boxShadow: 1 }}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      {hasMore && (
        <div ref={loadingRef} style={{ textAlign: 'center', padding: '16px' }}>
          {loading && <CircularProgress />}
        </div>
      )}
    </Box> */}

<Box padding={2} display="flex" flexDirection="column" gap={2} mb={6}>
    {loading && rooms.length === 0 && Array.from(new Array(5)).map((_, index) => (
      <Card key={index} variant="outlined" sx={{ display: 'flex', padding: 2, boxShadow: 3 }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Skeleton variant="text" width={100} height={20} />
          <Skeleton variant="text" width={80} height={20} />
          <Skeleton variant="text" width={80} height={20} />
        </CardContent>
      </Card>
    ))}
<InfiniteSroll
dataLength={rooms.length}
next={fetchRooms}
hasMore={rooms.length<totalRooms}
loader={<h4>Loading...</h4>}
endMessage={
  <Typography align="center" color="textSecondary" marginY={2}>
  <b>You've reached the end!</b>
</Typography>
}
>
    <Grid container spacing={2}>
      {Array.isArray(rooms) && rooms.length === 0 && !loading ? (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" padding={4}>
          <img src={notFound} alt="No Rooms Found" style={{ width: '350px', height: '350px', marginBottom: '16px' }} />
          <Typography variant="h6" color="textSecondary">No Rooms Found</Typography>
        </Box>
      ) : (
        
        Array.isArray(rooms) && rooms.map(room => (
          <Grid item xs={12} sm={6} md={3} key={room._id}>
            <Card variant="outlined" sx={{ display: 'flex', justifyContent: 'space-between', padding: 2, alignItems: 'center', boxShadow: 3, borderRadius: 2 }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Chip icon={<DoorBack style={{ color: 'darkcyan' }} />} label={`Room ${room.room_number}`} variant="outlined" style={{ color: 'darkcyan', borderColor: 'darkcyan' }} sx={{ fontSize: '0.875rem', fontWeight: 'bold' }} />
                <Box display="flex" alignItems="center" gap={1}>
                  <People color="action" />
                  <Typography variant="body2">Sharing: {room.room_sharing}</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <HomeWork color="action" />
                  <Typography variant="body2">Vacancy: {room.room_vacancy}</Typography>
                </Box>
              </CardContent>
              <Box display="flex" flexDirection="column" justifyContent="center">
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton onClick={() => handleEdit(room)} sx={{ backgroundColor: 'slategrey', color: 'white', '&:hover': { backgroundColor: '#FFB300' }, boxShadow: 1 }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => openConfirmDialog(room._id)} sx={{ backgroundColor: 'tomato', color: 'white', '&:hover': { backgroundColor: '#E57373' }, boxShadow: 1 }}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            </Card>
          </Grid>
        ))
      )}
    </Grid>
    </InfiniteSroll>
  </Box>

















          {/* Dialog for adding a new room */}
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add New Room</DialogTitle>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Room Number"
                    name="room_number"
                    value={roomData.room_number}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Room Sharing"
                    name="room_sharing"
                    value={roomData.room_sharing}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Room Vacancy"
                    name="room_vacancy"
                    type="number"
                    value={roomData.room_vacancy}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="secondary" style={{ color: 'white', backgroundColor: 'tomato' }}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} color="primary" style={{ color: 'white', backgroundColor: 'darkcyan' }}>
                {loading1 ? (
                  <CircularProgress size={24} style={{ color: 'purple' }} /> // Show spinner while loading
                ) : (
                  'Add Room'
                )}
              </Button>
            </DialogActions>
          </Dialog>



        </Box>




        <Dialog open={editOpen} onClose={handleEditClose}>
          <DialogTitle>Edit Room Details</DialogTitle>
          <DialogContent>
            {editRoomData && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Room Number"
                    name="room_number"
                    value={editRoomData.room_number}
                    onChange={(e) => setEditRoomData({ ...editRoomData, room_number: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Room Sharing"
                    name="room_sharing"
                    value={editRoomData.room_sharing}
                    onChange={(e) => setEditRoomData({ ...editRoomData, room_sharing: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Room Vacancy"
                    name="room_vacancy"
                    type="number"
                    value={editRoomData.room_vacancy}
                    onChange={(e) => setEditRoomData({ ...editRoomData, room_vacancy: e.target.value })}
                  />
                </Grid>
              </Grid>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditClose} style={{ color: 'white', backgroundColor: 'tomato' }}>Cancel</Button>
            <Button onClick={handleEditSubmit} style={{ color: 'white', backgroundColor: 'darkcyan' }}>
              {loading2 ? (
                <CircularProgress size={24} style={{ color: 'purple' }} /> // Show spinner while loading
              ) : (
                'Update Room'
              )}

            </Button>
          </DialogActions>
        </Dialog>




        <BottomNavBar />
        {/* Confirmation Dialog */}
        <ConfirmDialog
          open={isDialogOpen}
          onClose={() => setDialogOpen(false)}
          onConfirm={handleDelete}
        />
        <ToastContainer />
      </div>


    </div>
  );
};

export default RoomManagement;
