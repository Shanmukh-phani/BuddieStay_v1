import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Typography,
  CircularProgress,
  Avatar,
  IconButton,
  Dialog,
  DialogContent,
  Chip,
  Card,
  CardContent,
  Grid,
  Skeleton, // Import Skeleton from Material-UI
} from '@mui/material';
import Header_sub from '../Header_sub';


const BuddieDetails = () => {
  const { id } = useParams();
  const [buddie, setBuddie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openAvatar, setOpenAvatar] = useState(false);
  const [openIdProof, setOpenIdProof] = useState(false);

  useEffect(() => {
    const fetchBuddieDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_URL}/admin/buddie/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
        });
        if (response.data.buddie_photo) {
          response.data.buddie_photo = `data:image/jpeg;base64,${response.data.buddie_photo}`;
        }
        if (response.data.buddie_id_proof) {
          response.data.buddie_id_proof = `data:image/jpeg;base64,${response.data.buddie_id_proof}`;
        }
        setBuddie(response.data);
      } catch (err) {
        setError('Error fetching buddie details');
      } finally {
        setLoading(false);
      }
    };

    fetchBuddieDetails();
  }, [id]);

  const handleClickOpenAvatar = () => setOpenAvatar(true);
  const handleCloseAvatar = () => setOpenAvatar(false);
  const handleClickOpenIdProof = () => setOpenIdProof(true);
  const handleCloseIdProof = () => setOpenIdProof(false);

  // Display loading skeleton while fetching data
  if (loading) {
    return (
      <Box padding={4} maxWidth="900px" margin="0 auto" sx={{  borderRadius: 3 }}>
        <Skeleton variant="rectangular" width={150} height={150} sx={{ margin: '0 auto', borderRadius: '50%' }} />
        <Skeleton variant="text" width="60%" sx={{ margin: '20px auto' }} />
        <Skeleton variant="text" width="40%" sx={{ margin: '20px auto' }} />
        <Skeleton variant="text" width="80%" sx={{ margin: '20px auto' }} />
        <Skeleton variant="text" width="80%" sx={{ margin: '20px auto' }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <Typography variant="h6" color="error">{error}</Typography>
      </Box>
    );
  }

  return (

    buddie && (
      
      <Box padding={4} maxWidth="900px" margin="0 auto" sx={{ borderRadius: 3 }}>

<Header_sub/>   
 


        <Box display="flex" justifyContent="center" marginBottom={4} marginTop={6}>
          <IconButton onClick={handleClickOpenAvatar}>
            <Avatar
              src={buddie.buddie_photo}
              alt={buddie.buddie_name}
              sx={{ width: 150, height: 150, border: '4px solid #1976d2' }}
            />
          </IconButton>
        </Box>
        <Typography variant="h4" align="center" gutterBottom>{buddie.buddie_name}</Typography>
        <Typography variant="h6" align="center" color="text.secondary" gutterBottom>
          {buddie.buddie_profession} - {buddie.buddie_gender}
        </Typography>
        <Chip label={`Contact: ${buddie.buddie_contact}`} variant="filled" color="primary" sx={{ marginBottom: 2 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 2, backgroundColor: '#ffffff' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Personal Details</Typography>
                {loading ? (
                  <>
                    <Skeleton variant="text" width="80%" />
                    <Skeleton variant="text" width="80%" />
                    <Skeleton variant="text" width="80%" />
                    <Skeleton variant="text" width="80%" />
                  </>
                ) : (
                  <>
                    <Typography variant="body2">Date of Birth: {new Date(buddie.buddie_dob).toLocaleDateString()}</Typography>
                    <Typography variant="body2">Email: {buddie.buddie_email || 'N/A'}</Typography>
                    <Typography variant="body2">Gender: {buddie.buddie_gender}</Typography>
                    <Typography variant="body2">Room No: {buddie.room_no}</Typography>
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 2, backgroundColor: '#ffffff' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Professional Details</Typography>
                {loading ? (
                  <>
                    <Skeleton variant="text" width="80%" />
                  </>
                ) : (
                  <Typography variant="body2">Profession: {buddie.buddie_profession}</Typography>
                )}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card sx={{ borderRadius: 2, backgroundColor: '#ffffff' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Emergency Details</Typography>
                {loading ? (
                  <>
                    <Skeleton variant="text" width="80%" />
                    <Skeleton variant="text" width="80%" />
                    <Skeleton variant="text" width="80%" />
                  </>
                ) : (
                  <>
                    <Typography variant="body2">Guardian Name: {buddie.buddie_guardian_name}</Typography>
                    <Typography variant="body2">Emergency Contact: {buddie.buddie_emergency_contact}</Typography>
                    <Typography variant="body2">ID Proof:</Typography>
                    <IconButton onClick={handleClickOpenIdProof}>
                      <img
                        src={buddie.buddie_id_proof}
                        alt="ID Proof"
                        style={{ width: 100, height: 60, borderRadius: 4, marginTop: 8, cursor: 'pointer' }}
                      />
                    </IconButton>
                    <Typography variant="body2">Bike No: {buddie.buddie_bike_no || 'N/A'}</Typography>
                    <Typography variant="body2">Date of Joining: {new Date(buddie.buddie_doj).toLocaleDateString()}</Typography>
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Dialog for full-screen image of the avatar */}
        <Dialog open={openAvatar} onClose={handleCloseAvatar} maxWidth="lg">
          <DialogContent>
            <Box display="flex" justifyContent="center" alignItems="center">
              <img
                src={buddie.buddie_photo}
                alt={buddie.buddie_name}
                style={{ maxWidth: '100%', maxHeight: '80vh' }}
              />
            </Box>
          </DialogContent>
        </Dialog>

        {/* Dialog for full-screen image of the ID proof */}
        <Dialog open={openIdProof} onClose={handleCloseIdProof} maxWidth="lg">
          <DialogContent>
            <Box display="flex" justifyContent="center" alignItems="center">
              <img
                src={buddie.buddie_id_proof}
                alt="ID Proof"
                style={{ maxWidth: '100%', maxHeight: '80vh' }}
              />
            </Box>
          </DialogContent>
        </Dialog>
      </Box>
    )
  );
};

export default BuddieDetails;
