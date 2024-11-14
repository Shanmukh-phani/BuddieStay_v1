import React, { useState } from 'react';
import { Box, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate(); // Hook to access navigate function

  const handleSearchClick = () => {
    // Navigate to the SearchRoom page with the search query
    navigate(`/search-rooms?query=${search}`);
  };

  return (
    <Box padding={2}>
      <TextField
        fullWidth
        label="Search Rooms"
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onClick={handleSearchClick} // Handle click to redirect
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default SearchBar;
