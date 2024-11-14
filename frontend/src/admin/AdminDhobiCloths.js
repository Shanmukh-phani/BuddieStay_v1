// import React, { useEffect, useState } from 'react';
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Collapse,
//     Box,
//     Typography,
//     TextField,
//     Button,
// } from '@mui/material';
// import axios from 'axios';
// import Header_sub_buddie from '../Header_sub_Buddie';
// import Footer from '../Footer';

// const LIMIT = 5;

// const AdminDhobiCloths = () => {
//     const [registeredClothes, setRegisteredClothes] = useState([]);
//     const [filteredClothes, setFilteredClothes] = useState([]);
//     const [searchDate, setSearchDate] = useState('');
//     const [page, setPage] = useState(1);
//     const [expandedRow, setExpandedRow] = useState(null);
//     const [totalClothes, setTotalClothes] = useState(0);
//     const hostelId = localStorage.getItem('hostel_id');
//     const token = localStorage.getItem('authToken');

//     useEffect(() => {
//         fetchClothingData();
//     }, [hostelId]);

//     const fetchClothingData = async () => {
//         try {
//             const response = await axios.get(`${process.env.REACT_APP_URL}/admin/get-clothes-by-hostel`, {
//                 params: { hostel_id: hostelId, page, size: LIMIT },
//                 headers: { 'Authorization': `Bearer ${token}` },
//             });

//             const clothesWithBuddieNames = await Promise.all(
//                 response.data.records.map(async (cloth) => {
//                     const buddieName = await fetchBuddieName(cloth.buddie_id);
//                     return { ...cloth, buddie_name: buddieName };
//                 })
//             );

//             setRegisteredClothes([...registeredClothes, ...clothesWithBuddieNames]);
//             setFilteredClothes([...filteredClothes, ...clothesWithBuddieNames]);
//             setTotalClothes(response.data.total);
//             setPage(page + 1);
//         } catch (error) {
//             console.error('Error fetching clothing data:', error);
//         }
//     };

//     const fetchBuddieName = async (buddieId) => {
//         try {
//             const response = await axios.get(`${process.env.REACT_APP_URL}/admin/buddieName/${buddieId}`);
//             return response.data.name;
//         } catch (error) {
//             console.error('Error fetching buddie name:', error);
//             return 'Unknown Buddie';
//         }
//     };

//     const handleRowClick = (index) => {
//         setExpandedRow(expandedRow === index ? null : index);
//     };

//     const handleDateChange = (event) => {
//         setSearchDate(event.target.value);
//     };

//     const handleSearch = () => {
//         if (searchDate) {
//             const filteredData = registeredClothes.filter((cloth) => {
//                 const clothDate = new Date(cloth.date).toISOString().split('T')[0];
//                 return clothDate === searchDate;
//             });
//             setFilteredClothes(filteredData);
//         } else {
//             setFilteredClothes(registeredClothes);
//         }
//     };

//     return (
//         <div>
//             <Header_sub_buddie />

//             <Box display="flex" justifyContent="center" alignItems="center" my={2} mt={10}>
//                 <TextField
//                     label="Search by Date"
//                     type="date"
//                     InputLabelProps={{ shrink: true }}
//                     value={searchDate}
//                     onChange={handleDateChange}
//                     sx={{ marginRight: 2 }}
//                 />
//                 <Button variant="contained" onClick={handleSearch}>Search</Button>
//             </Box>

//             <TableContainer>
//                 <Table style={{ marginTop: '20px' }}>
//                     <TableHead>
//                         <TableRow style={{ backgroundColor: 'darkcyan', color: 'white' }}>
//                             <TableCell style={{ color: 'white' }}>Date</TableCell>
//                             <TableCell style={{ color: 'white' }}>Buddie Name</TableCell>
//                             <TableCell style={{ color: 'white' }}>Clothing Details</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {filteredClothes
//                             .sort((a, b) => new Date(b.date) - new Date(a.date))
//                             .map((cloth, index) => (
//                                 <React.Fragment key={index}>
//                                     <TableRow onClick={() => handleRowClick(index)}>
//                                         <TableCell>
//                                             {new Date(cloth.date).toLocaleDateString('en-US', {
//                                                 weekday: 'long',
//                                                 year: 'numeric',
//                                                 month: 'long',
//                                                 day: 'numeric',
//                                             })}
//                                         </TableCell>
//                                         <TableCell>
//                                             {cloth.buddie_name || 'Unknown Buddie'}
//                                         </TableCell>
//                                         <TableCell>
//                                             {expandedRow === index
//                                                 ? <Typography>Clothing Registered!</Typography>
//                                                 : <Typography>{Object.keys(cloth.clothing_details).length > 0 ? '✨ Click below for details! ✨' : 'No Clothing Registered'}</Typography>}
//                                         </TableCell>
//                                     </TableRow>
//                                     <TableRow>
//                                         <TableCell colSpan={3} sx={{ padding: 0 }}>
//                                             <Collapse in={expandedRow === index}>
//                                                 <Box sx={{ padding: 1 }}>
//                                                     <Typography variant="subtitle2">Detailed Clothing Count:</Typography>
//                                                     <Box sx={{ marginLeft: 2 }}>
//                                                         {Object.entries(cloth.clothing_details).map(([key, value]) => (
//                                                             <Typography key={key}>
//                                                                 {key}: {value}
//                                                             </Typography>
//                                                         ))}
//                                                     </Box>
//                                                 </Box>
//                                             </Collapse>
//                                         </TableCell>
//                                     </TableRow>
//                                 </React.Fragment>
//                             ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//             <Footer />
//         </div>
//     );
// };

// export default AdminDhobiCloths;




import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Collapse,
    Box,
    Typography,
    TextField,
    Button,
    Skeleton,
    TablePagination
} from '@mui/material';
import axios from 'axios';
import Header_sub_buddie from '../Header_sub_Buddie';
import Footer from '../Footer';

const LIMIT = 5;

const AdminDhobiCloths = () => {
    const [registeredClothes, setRegisteredClothes] = useState([]);
    const [filteredClothes, setFilteredClothes] = useState([]);
    const [searchDate, setSearchDate] = useState('');
    const [page, setPage] = useState(0); // Updated to 0-based index
    const [expandedRow, setExpandedRow] = useState(null);
    const [totalClothes, setTotalClothes] = useState(0);
    const [loading, setLoading] = useState(true); // State to manage loading
    const hostelId = localStorage.getItem('hostel_id');
    const token = localStorage.getItem('authToken');

    useEffect(() => {
        fetchClothingData();
    }, [hostelId, page]); // Include page in the dependency array

    const fetchClothingData = async () => {
        setLoading(true); // Set loading to true before fetching
        try {
            const response = await axios.get(`${process.env.REACT_APP_URL}/admin/get-clothes-by-hostel`, {
                params: { hostel_id: hostelId, page: page + 1, size: LIMIT }, // Adjusted to 1-based page
                headers: { 'Authorization': `Bearer ${token}` },
            });

            const clothesWithBuddieNames = await Promise.all(
                response.data.records.map(async (cloth) => {
                    const buddieName = await fetchBuddieName(cloth.buddie_id);
                    return { ...cloth, buddie_name: buddieName };
                })
            );

            setRegisteredClothes(clothesWithBuddieNames);
            setFilteredClothes(clothesWithBuddieNames);
            setTotalClothes(response.data.total);
            setLoading(false); // Set loading to false after fetching
        } catch (error) {
            console.error('Error fetching clothing data:', error);
            setLoading(false); // Ensure loading is false on error
        }
    };

    const fetchBuddieName = async (buddieId) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_URL}/admin/buddieName/${buddieId}`);
            return response.data.name;
        } catch (error) {
            console.error('Error fetching buddie name:', error);
            return 'Unknown Buddie';
        }
    };

    const handleRowClick = (index) => {
        setExpandedRow(expandedRow === index ? null : index);
    };

    const handleDateChange = (event) => {
        setSearchDate(event.target.value);
    };

    const handleSearch = () => {
        if (searchDate) {
            const filteredData = registeredClothes.filter((cloth) => {
                const clothDate = new Date(cloth.date).toISOString().split('T')[0];
                return clothDate === searchDate;
            });
            setFilteredClothes(filteredData);
        } else {
            setFilteredClothes(registeredClothes);
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <div>
            <Header_sub_buddie />

            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mt={10}
                sx={{ padding: 2, borderRadius: '8px' }}
            >
                <TextField
                    label="Search by Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={searchDate}
                    onChange={handleDateChange}
                    sx={{ flex: 1, marginRight: 2, backgroundColor: 'white', borderRadius: '4px' }}
                    variant="outlined"
                />
                <Button variant="contained" onClick={handleSearch} sx={{ height: '56px', padding: '0 16px' }} style={{backgroundColor:'tomato',color:'white'}}>
                    Search
                </Button>
            </Box>

            <TableContainer>
                <Table style={{ marginTop: '20px' }}>
                    <TableHead>
                        <TableRow style={{ backgroundColor: 'darkcyan', color: 'white' }}>
                            <TableCell style={{ color: 'white' }}>Date</TableCell>
                            <TableCell style={{ color: 'white' }}>Buddie Name</TableCell>
                            <TableCell style={{ color: 'white' }}>Clothing Details</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            Array.from(new Array(LIMIT)).map((_, index) => (
                                <TableRow key={index}>
                                    <TableCell colSpan={3}>
                                        <Skeleton variant="text" width="100%" height={40} />
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            filteredClothes
                                .sort((a, b) => new Date(b.date) - new Date(a.date))
                                .map((cloth, index) => (
                                    <React.Fragment key={index}>
                                        <TableRow onClick={() => handleRowClick(index)}>
                                            <TableCell>
                                                {new Date(cloth.date).toLocaleDateString('en-US', {
                                                    weekday: 'long',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
                                            </TableCell>
                                            <TableCell>
                                                {cloth.buddie_name || 'Unknown Buddie'}
                                            </TableCell>
                                            <TableCell>
                                                {expandedRow === index
                                                    ? <Typography>Clothing Registered!</Typography>
                                                    : <Typography>{Object.keys(cloth.clothing_details).length > 0 ? '✨ Click below for details! ✨' : 'No Clothing Registered'}</Typography>}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell colSpan={3} sx={{ padding: 0 }}>
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
                                    </React.Fragment>
                                ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[LIMIT]}
                component="div"
                count={totalClothes}
                rowsPerPage={LIMIT}
                page={page}
                onPageChange={handleChangePage}
            />
            <Footer />
        </div>
    );
};

export default AdminDhobiCloths;
