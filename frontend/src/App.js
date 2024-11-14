// App.js


// #e5993f
// #385850
// #f3f3f3

// Style - regular
// Font - helvetica
// Font - verdana
// Font - times


import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import AdminLogin from './admin/AdminLogin';
import Dashboard from './admin/Dashboard';
import Hostel from './Hostel';
import AddingHostel from './admin/AddingHostel';
import AddBuddie from './admin/AddBuddie';
import AddRoom from './admin/AddRoom';
import HostelProfile from './admin/HostelProfile';
import ThankYouScreen from './admin/ThankYouScreen';
import Hostels from './Hostels';
import AboutUs from './AboutUs';
// import Login from './Login';

import ProtectedRoute from './ProtectedRoute';
import BuddieProtectedRoute from './BuddieProtectedRoute';

import TermsAndConditions from './TermsAndConditions';
import Settings from './admin/settings';
import HostelFees from './admin/HostelFees';
import FoodMenu from './admin/FoodMenu';
import BuddieLogin from './buddie/BuddieLogin';
import BuddieHome from './buddie/BuddieHome';
import BuddieProfile from './buddie/BuddieProfile';
import Payments from './buddie/Payments';
import AdminPayments from './admin/AdminPayments';
import Complaints from './admin/AdminComplaints';
import Complaint from './buddie/Complaint';
import BuddieRating from './buddie/BuddieRating';
import DhobiCloths from './buddie/DhobiCloths';
import AddingBuddie from './AddingBuddie';
import UnapprovedBuddies from './admin/UnapprovedBuddies';
import BuddieDetails from './admin/BuddieDetails';
import SearchRoom from './admin/SearchRoom';
import SearchBuddie from './admin/SearchBuddie';
import SearchPayments from './admin/SearchPayments';
import SearchComplaints from './admin/SearchComplaints';
import SearchHostels from './SearchHostel';
import HelpCenter from './HelpCenter';
import AdminTerms from './admin/AdminTerms'
import AdminHelp from './admin/AdminHelp'
import AdminDhobiCloths from './admin/AdminDhobiCloths'




const App = () => {
  const isAuthenticated = !!localStorage.getItem('authToken');
  const isBuddieAuthenticated = !!localStorage.getItem('buddieAuthToken');
  

  return (
    <Router>
      <Routes>                        
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
        <Route path="/hostel/:id" element={<Hostel />} />
        <Route path="/addBuddie/:hostel_id" element={<AddingBuddie />} />

        <Route path="/a" element={<AddingHostel />} />
        <Route path="/thanks" element={<ThankYouScreen />} />
        <Route path="/hostels" element={<Hostels />} />

        <Route path="/search-hostels" element={<SearchHostels />} /> {/* Add the search route */}

        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/buddie-login" element={<BuddieLogin />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/help" element={<HelpCenter />} />


        



        {/* Protected Routes */}
        <Route path="/admin/*" element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="home" element={<Dashboard />} />
          <Route path="add-buddie" element={<AddBuddie />} />
          <Route path="search-buddies" element={<SearchBuddie />} />
          <Route path="add-room" element={<AddRoom />} />
          <Route path="search-rooms" element={<SearchRoom />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<HostelProfile />} />
          <Route path="hostel-fees" element={<HostelFees />} />
          <Route path="food-menu" element={<FoodMenu />} />
          <Route path="payments" element={<AdminPayments />} />
          <Route path="search-payments" element={<SearchPayments />} />
          <Route path="complaints" element={<Complaints />} />
          <Route path="search-complaints" element={<SearchComplaints />} />
          <Route path="pendingRequests" element={<UnapprovedBuddies />} />
          <Route path="buddie/:id" element={<BuddieDetails />} />
          <Route path="terms-conditions" element={<AdminTerms />} />
          <Route path="help-center" element={<AdminHelp />} />
          <Route path="dhobi" element={<AdminDhobiCloths />} />
          </Route>


                 {/* Protected Routes */}
         <Route path="/buddie/*" element={<BuddieProtectedRoute isBuddieAuthenticated={isBuddieAuthenticated} />}>
          <Route path="home" element={<BuddieHome />} />
          <Route path="profile" element={<BuddieProfile />} />
          <Route path="payments" element={<Payments />} />
          <Route path="complaint" element={<Complaint />} />
          <Route path="rating" element={<BuddieRating />} />
          <Route path="dhobi" element={<DhobiCloths />} />




          {/* <Route path="add-buddie" element={<AddBuddie />} />
          <Route path="add-room" element={<AddRoom />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<HostelProfile />} />
          <Route path="hostel-fees" element={<HostelFees />} />
          <Route path="food-menu" element={<FoodMenu />} /> */}
          </Route>
  
      </Routes>
    </Router>
  );
};

export default App;
