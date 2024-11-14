import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Modal,
  Checkbox,
  FormControlLabel,
  Slider,
  FormGroup,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  TextField,
  Divider,
  Slide,
  IconButton
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';

const FilterPage = ({ onApplyFilters }) => {
    const [open, setOpen] = useState(false);
    const [priceRange, setPriceRange] = useState([1000, 10000]);
    const [selectedAmenities, setSelectedAmenities] = useState([]);
    const [type, setType] = useState('');
    // const [area, setArea] = useState('');
  
    const facilitiesOptions = [
    'Wi-Fi', 'Laundry', '24/7 Power Backup', 'Parking', 'Food', 'Gym', 'Hot Water','Room Cleaning','Washing Machine','Fridge',
    'T.V','No Gate Closing Time','Bus Facility','CC Camera','Self Cooking','Co-Livin','A.C','Locker','Games Zone','Balcony','Pent house',
    'Power Bill Seperate','South & North Indian Food','Lunch Box Service','Daywise Stay'
    ];
    const typeOptions = ['Male', 'Female', 'Co-living'];
  
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    const handlePriceChange = (event, newValue) => setPriceRange(newValue);
  
    const handleAmenityChange = (event) => {
      const { name, checked } = event.target;
      setSelectedAmenities((prev) =>
        checked ? [...prev, name] : prev.filter((amenity) => amenity !== name)
      );
    };
  
    const handleTypeChange = (event) => setType(event.target.value);
    // const handleAreaChange = (event) => setArea(event.target.value);
  
    const handleApplyFilters = () => {
      onApplyFilters({
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        amenities: selectedAmenities,
        type,
        // area,
      });
      handleClose();
    };
  
    const handleClearFilters = () => {
      setPriceRange([1000, 10000]);
      setSelectedAmenities([]);
      setType('');
    //   setArea('');
    };
  
    return (
      <Box style={{ marginTop: '95px', marginRight: '40px' }}>
        <IconButton onClick={handleOpen} style={{ color: 'darkcyan' }}>
          <FilterListIcon />
        </IconButton>
  
        <Modal open={open} onClose={handleClose}>
          <Slide direction="up" in={open} mountOnEnter unmountOnExit>
            <Box
              sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                bgcolor: 'background.paper',
                borderRadius: 2,
                boxShadow: 24,
                p: 4,
                maxHeight: '70vh',
                overflowY: 'auto'
              }}
            >
              <Typography variant="h6" gutterBottom>
                Apply Filters
              </Typography>
  
              {/* Price Range Slider */}
              <Box mt={2}>
                <Typography gutterBottom>Price Range (₹)</Typography>
                <Slider
                  value={priceRange}
                  onChange={handlePriceChange}
                  valueLabelDisplay="auto"
                  min={1000}
                  max={20000}
                  step={500}
                />
              </Box>
  
              <Divider sx={{ my: 2 }} />
  
              {/* Amenities */}
              <Box mt={2}>
                <Typography gutterBottom>Amenities</Typography>
                <FormGroup>
                  {facilitiesOptions.map((amenity) => (
                    <FormControlLabel
                      key={amenity}
                      control={
                        <Checkbox
                          checked={selectedAmenities.includes(amenity)}
                          onChange={handleAmenityChange}
                          name={amenity}
                        />
                      }
                      label={amenity}
                    />
                  ))}
                </FormGroup>
              </Box>
  
              <Divider sx={{ my: 2 }} />
  
              {/* Type */}
              <Box mt={2}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Type</FormLabel>
                  <RadioGroup value={type} onChange={handleTypeChange} row>
                    {typeOptions.map((option) => (
                      <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
                    ))}
                  </RadioGroup>
                </FormControl>
              </Box>
  
              <Divider sx={{ my: 2 }} />
  
              {/* Area */}
              {/* <Box mt={2}>
                <TextField
                  fullWidth
                  label="Area"
                  variant="outlined"
                  value={area}
                  onChange={handleAreaChange}
                />
              </Box> */}
  
              <Box mt={3} display="flex" justifyContent="space-between">
                <Button variant="outlined" onClick={handleClose} color="error">
                  Cancel
                </Button>
                <Button variant="contained" onClick={handleClearFilters} color="warning">
                  Clear
                </Button>
                <Button variant="contained" onClick={handleApplyFilters} style={{ backgroundColor: 'darkcyan', color: 'white' }}>
                  Apply
                </Button>
              </Box>
            </Box>
          </Slide>
        </Modal>
      </Box>
    );
  };
  
  export default FilterPage;
  