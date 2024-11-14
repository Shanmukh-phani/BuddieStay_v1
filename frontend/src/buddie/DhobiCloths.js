
import React, { useEffect, useState } from 'react';
import {
    Modal,
    Button,
    RadioGroup,
    FormControlLabel,
    Radio,
    TextField,
    Box,
    Typography,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Collapse,
    Slide,
    Card,
    CardContent,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import axios from 'axios';
import Header_sub_buddie from '../Header_sub_Buddie';
import Footer from '../Footer';

const clothingOptionsMen = [
    'Pants', 'Shirts', 'Track Pants', 'Shorts', 'T-Shirts', 'Towels', 'Blanket', 'Other'
];

const clothingOptionsWomen = [
    'Pants', 'Shirts', 'Tops', 'Track Pants', 'T-Shirts', 'Towels', 'Blanket', 'Other'
];

const ClothingRegistration = () => {
    const [open, setOpen] = useState(false);
    const [gender, setGender] = useState('men');
    const [clothingCounts, setClothingCounts] = useState({});
    const [registeredClothes, setRegisteredClothes] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [expandedRow, setExpandedRow] = useState(null);
    const buddieId = localStorage.getItem('buddie_id');
    const [hostelId, setHostelId] = useState(null);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleGenderChange = (event) => {
        setGender(event.target.value);
        setClothingCounts({});
    };

    const clothingOptions = gender === 'men' ? clothingOptionsMen : clothingOptionsWomen;

    const handleCountChange = (item, delta) => {
        setClothingCounts((prev) => ({
            ...prev,
            [item]: (prev[item] || 0) + delta >= 0 ? (prev[item] || 0) + delta : 0
        }));
    };

    useEffect(() => {
        const fetchHostelInfo = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_URL}/buddie/getHostelInfo/${buddieId}`);
                setHostelId(response.data.hostel_id);
            } catch (error) {
                console.error('Error fetching hostel info:', error);
            }
        };

        if (buddieId) {
            fetchHostelInfo();
            fetchClothingData();
        }
    }, [buddieId]);

    const fetchClothingData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_URL}/buddie/get-clothes/${buddieId}`);
            setRegisteredClothes(response.data);
        } catch (error) {
            console.error('Error fetching clothing data:', error);
        }
    };

    const handleSubmit = async () => {
        const dataToSubmit = {
            hostel_id: hostelId,
            buddie_id: buddieId,
            date: new Date().toISOString(),
            clothing_details: clothingCounts,
        };
    
        try {
            const response = await axios.post(`${process.env.REACT_APP_URL}/buddie/register-cloths`, dataToSubmit);
            setRegisteredClothes([...registeredClothes, response.data]);
            handleClose();
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleRowClick = (index) => {
        setExpandedRow(expandedRow === index ? null : index);
    };

    return (
        <div>
              <Header_sub_buddie/>
            <Button variant="contained" onClick={handleOpen} style={{marginTop:'100px',float:'right',color:'white',backgroundColor:'tomato',marginRight:'10px'}}>Register Clothes</Button>

            <Modal open={open} onClose={handleClose}>
                <Slide direction="up" in={open}>
                    <Box sx={{ padding: 2, width: '100%', maxWidth: 400, backgroundColor: 'white', position: 'absolute', bottom: 0 }}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>Register Your Cloths..!</Typography>
                                <RadioGroup row value={gender} onChange={handleGenderChange}>
                                    <FormControlLabel value="men" control={<Radio />} label="Men" />
                                    <FormControlLabel value="women" control={<Radio />} label="Women" />
                                </RadioGroup>

                                {clothingOptions.map((item) => (
                                    <Box key={item} display="flex" alignItems="center" justifyContent="space-between" sx={{ marginBottom: 1 }}>
                                        <Typography variant="body1">{item}</Typography>
                                        <Box display="flex" alignItems="center">
                                            <IconButton onClick={() => handleCountChange(item, -1)}>
                                                <RemoveIcon />
                                            </IconButton>
                                            <TextField
                                                value={clothingCounts[item] || 0}
                                                variant="outlined"
                                                size="small"
                                                sx={{ width: '40px', textAlign: 'center', marginX: 1 }}
                                                InputProps={{ readOnly: true }}
                                            />
                                            <IconButton onClick={() => handleCountChange(item, 1)}>
                                                <AddIcon />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                ))}

                                <Button variant="contained" onClick={handleSubmit} sx={{ marginTop: 2 }} style={{backgroundColor:'tomato'}}>Submit</Button>
                            </CardContent>
                        </Card>
                    </Box>
                </Slide>
            </Modal>

            {/* <TableContainer>
                <Table style={{marginTop:'30px'}}>
                    <TableHead>
                        <TableRow style={{backgroundColor:'darkcyan',color:'white'}}>
                            <TableCell style={{color:'white'}}>Date</TableCell>
                            <TableCell style={{color:'white'}}>Clothing Details</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {registeredClothes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((cloth, index) => (
                            <>
                                <TableRow key={index} onClick={() => handleRowClick(index)} >
                                    <TableCell>{new Date(cloth.date).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        {expandedRow === index 
                                            ? <Typography>Clothing Registered!</Typography>
                                            : <Typography>{Object.keys(cloth.clothing_details).length > 0 ? '✨ Click below for details! ✨' : 'No Clothing Registered'}</Typography>}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={2} sx={{ padding: 0 }}>
                                        <Collapse in={expandedRow === index}>
                                            <Box sx={{ padding: 1 }}>
                                                <Typography variant="subtitle2">Detailed Clothing Count:</Typography>
                                                <Box sx={{ marginLeft: 2 }}>
                                                    {Object.entries(cloth.clothing_details).map(([key, value]) => (
                                                        <Typography key={key}>
                                                            {key}: {value}
                                                        </Typography>
                                                    ))}
                                                </Box>
                                            </Box>
                                        </Collapse>
                                    </TableCell>
                                </TableRow>
                            </>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer> */}

<TableContainer>
    <Table style={{ marginTop: '30px' }}>
        <TableHead>
            <TableRow style={{ backgroundColor: 'darkcyan', color: 'white' }}>
                <TableCell style={{ color: 'white' }}>Date</TableCell>
                <TableCell style={{ color: 'white' }}>Clothing Details</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {registeredClothes
                // Sort registered clothes by date in descending order
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((cloth, index) => (
                    <>
                        <TableRow key={index} onClick={() => handleRowClick(index)}>
                            <TableCell>
                                {/* Format date to include day of the week */}
                                {new Date(cloth.date).toLocaleDateString('en-US', {
                                    weekday: 'long', // 'long' for full name, 'short' for abbreviated name
                                    year: 'numeric',
                                    month: 'long', // You can use 'numeric' for month as a number
                                    day: 'numeric',
                                })}
                            </TableCell>
                            <TableCell>
                                {expandedRow === index 
                                    ? <Typography>Clothing Registered!</Typography>
                                    : <Typography>{Object.keys(cloth.clothing_details).length > 0 ? '✨ Click below for details! ✨' : 'No Clothing Registered'}</Typography>}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2} sx={{ padding: 0 }}>
                                <Collapse in={expandedRow === index}>
                                    <Box sx={{ padding: 1 }}>
                                        <Typography variant="subtitle2">Detailed Clothing Count:</Typography>
                                        <Box sx={{ marginLeft: 2 }}>
                                            {Object.entries(cloth.clothing_details).map(([key, value]) => (
                                                <Typography key={key}>
                                                    {key}: {value}
                                                </Typography>
                                            ))}
                                        </Box>
                                    </Box>
                                </Collapse>
                            </TableCell>
                        </TableRow>
                    </>
                ))}
        </TableBody>
    </Table>
</TableContainer>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={registeredClothes.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <Footer/>
        </div>
    );
};

export default ClothingRegistration;
