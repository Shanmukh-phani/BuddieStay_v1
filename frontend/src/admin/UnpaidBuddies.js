import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Button,
  Chip,
  useMediaQuery,
  useTheme,
  styled,
} from '@mui/material';

// Styled Chip for title
const LocationChip1 = styled(Chip)({
  fontFamily: 'Anta',
  fontSize: '18px',
  textAlign: 'left',
});

// Main Component
const UnpaidPayments = ({ hostelId }) => {
  const [loading, setLoading] = useState(true);
  const [unpaidData, setUnpaidData] = useState(null);
  const [error, setError] = useState(null);
  
  // Pagination states
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchUnpaidPayments = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_URL}/admin/unpaid-payments/${hostelId}`);
        setUnpaidData(response.data); // Directly accessing the response data
        setLoading(false);
      } catch (err) {
        setError("Error fetching unpaid payments data.");
        setLoading(false);
      }
    };

    fetchUnpaidPayments();
  }, [hostelId]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const openWhatsApp = (contactNumber) => {
    const message = "Hello, can you please pay the rent for this month?";
    const url = `https://wa.me/${contactNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  if (!unpaidData || !unpaidData.unpaidBuddies) {
    return <Typography>No unpaid payment data available.</Typography>;
  }

  // Group and get the last payment date for each unique buddie
  const uniqueUnpaidBuddies = unpaidData.unpaidBuddies.reduce((acc, buddy) => {
    const existingBuddy = acc.find(b => b.buddie_id === buddy.buddie_id);
    
    if (!existingBuddy) {
      acc.push({
        ...buddy,
        last_payment_date: buddy.last_payment_date || 'NA', // If last_payment_date is missing, show 'NA'
      });
    }
    
    return acc;
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h6" gutterBottom>
        <LocationChip1 label={'Unpaid Payments for Last Three Months'} />
      </Typography>

      <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
        <Table size={isSmallScreen ? 'small' : 'medium'}>
          <TableHead>
            <TableRow style={{ backgroundColor: 'tomato', fontWeight: 'bold' }}>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Buddie Name</TableCell>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Buddie Room</TableCell>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Buddie Phone</TableCell>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Last Payment Date</TableCell>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Request</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {uniqueUnpaidBuddies.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((buddy, index) => (
              <TableRow key={index}>
                <TableCell>{buddy.buddie_name}</TableCell>
                <TableCell>{buddy.room_no}</TableCell>
                <TableCell>{buddy.buddie_contact}</TableCell>
                <TableCell>{buddy.last_payment_date}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: 'darkcyan' }}
                    onClick={() => openWhatsApp(buddy.buddie_contact)}
                  >
                    Request
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {uniqueUnpaidBuddies.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">No unpaid buddies.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {uniqueUnpaidBuddies.length > 0 && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={uniqueUnpaidBuddies.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </TableContainer>
    </div>
  );
};

export default UnpaidPayments;
