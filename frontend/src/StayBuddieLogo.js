import React from 'react';
import './logo.css'; // Import the CSS file
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS

const StayBuddieLogo = () => {
  return (
    <div className="logo-container">
      <span className="stay">ST</span>
      <i className="fas fa-home home-icon"></i> {/* Home icon replacing "A" */}
      <span className="buddie">YBUDDIE</span>
    </div>
  );
};

export default StayBuddieLogo;
