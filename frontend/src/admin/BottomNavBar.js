// import React, { useState, useEffect, Profiler } from 'react';
// import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
// import HomeIcon from '@mui/icons-material/Home';
// import HotelIcon from '@mui/icons-material/Hotel';
// import AddBoxIcon from '@mui/icons-material/AddBox';
// import PeopleIcon from '@mui/icons-material/People';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { Person, Settings } from '@mui/icons-material';

// const BottomNavBar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [value, setValue] = useState(0);

//   useEffect(() => {
//     switch (location.pathname) {
//       case '/admin/home':
//         setValue(0);
//         break;
//       case '/admin/add-buddie':
//         setValue(1);
//         break;
//       case '/admin/add-room':
//         setValue(2);
//         break;
//       case '/admin/settings':
//         setValue(3);
//         break;
//       default:
//         setValue(0);
//     }
//   }, [location.pathname]);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//     switch (newValue) {
//       case 0:
//         navigate('/admin/home');
//         break;
//       case 1:
//         navigate('/admin/add-buddie');
//         break;
//       case 2:
//         navigate('/admin/add-room');
//         break;
//       case 3:
//         navigate('/admin/settings');
//         break;
//       default:
//         navigate('/admin/');
//     }
//   };

//   return (
//     <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
//       <BottomNavigation value={value} onChange={handleChange} showLabels>
//         <BottomNavigationAction label="Dashboard" icon={<HomeIcon />} />
//         <BottomNavigationAction label="Buddies" icon={<PeopleIcon />} />
//         <BottomNavigationAction label="Add Room" icon={<AddBoxIcon />} />
//         <BottomNavigationAction label="Settings" icon={<Settings />} />
//       </BottomNavigation>
//     </Paper>
//   );
// };

// export default BottomNavBar;




import React, { useState, useEffect } from 'react';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AddBoxIcon from '@mui/icons-material/AddBox';
import PeopleIcon from '@mui/icons-material/People';
import { useNavigate, useLocation } from 'react-router-dom';
import { Settings } from '@mui/icons-material';

const BottomNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(0);

  useEffect(() => {
    switch (location.pathname) {
      case '/admin/home':
        setValue(0);
        break;
      case '/admin/add-buddie':
        setValue(1);
        break;
      case '/admin/add-room':
        setValue(2);
        break;
      case '/admin/settings':
        setValue(3);
        break;
      default:
        setValue(0);
    }
  }, [location.pathname]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate('/admin/home');
        break;
      case 1:
        navigate('/admin/add-buddie');
        break;
      case 2:
        navigate('/admin/add-room');
        break;
      case 3:
        navigate('/admin/settings');
        break;
      default:
        navigate('/admin/');
    }
  };

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation value={value} onChange={handleChange} showLabels>
        <BottomNavigationAction 
          label="Dashboard" 
          icon={<HomeIcon />} 
          style={{ color: value === 0 ? 'darkcyan' : 'slategray'}}
        />
        <BottomNavigationAction 
          label="Buddies" 
          icon={<PeopleIcon />} 
          style={{ color: value === 1 ? 'darkcyan' : 'slategray'}}

        />
        <BottomNavigationAction 
          label="Add Room" 
          icon={<AddBoxIcon />} 
          style={{ color: value === 2 ? 'darkcyan' : 'slategray'}}
 
        />
        <BottomNavigationAction 
          label="Settings" 
          icon={<Settings />} 
          style={{ color: value === 3 ? 'darkcyan' : 'slategray'}}

        />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNavBar;
