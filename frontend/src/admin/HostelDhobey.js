import React, { useState, useEffect } from 'react';
import { Switch, Typography } from '@mui/material';
import axios from 'axios';

const HostelDobeyToggle = ({ hostelId }) => {
  const [hostelDobey, setHostelDobey] = useState(false); // Default to false
  const [isLoading, setIsLoading] = useState(true); // Loading state for initial fetch

  useEffect(() => {
    const fetchDobeyStatus = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_URL}/admin/hostel/dhobi/${hostelId}`);
        if (response.data.hostel_dhobi !== undefined) {
          setHostelDobey(response.data.hostel_dhobi);
        }
      } catch (error) {
        console.error('Error fetching dobey status:', error);
      } finally {
        setIsLoading(false); // Set loading to false after fetch
      }
    };
    fetchDobeyStatus();
  }, [hostelId]);

  const handleToggle = async () => {
    try {
      const newStatus = !hostelDobey;
      await axios.put(`${process.env.REACT_APP_URL}/admin/hostel/dhobi/${hostelId}`, { hostel_dhobi: newStatus });
      setHostelDobey(newStatus);
    } catch (error) {
      console.error('Error updating dobey status:', error);
    }
  };

  if (isLoading) return <Typography>Loading...</Typography>;

  return (
    <div>
      <Switch
        checked={hostelDobey}
        onChange={handleToggle}
        color="primary"
        inputProps={{ 'aria-label': 'Toggle Dobey Status' }}
      />
      <Typography>{hostelDobey ? 'Enabled' : 'Disabled'}</Typography>
    </div>
  );
};

export default HostelDobeyToggle;
