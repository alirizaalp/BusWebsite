import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-container">
      <h2 className="welcome-text">OTOBUSTATE</h2>
      <div className="link-container">
        <Link to="/SignUp" className="link-button">Register</Link>
      </div>

      <div className="link-container">
        <Link to="/Login" className="link-button">Login</Link>
      </div>

      <div className="link-container">
        <Link to="/Hakkında" className="link-button">About</Link>
      </div>

      <div className="link-container">
        <Link to="/Seferler" className="link-button">Expedition List</Link>
      </div>

      <div className="link-container">
        <Link to="/YolcumNerede" className="link-button">Where İs My Passenger ?</Link>
      </div>
    </div>
  );
};

export default HomePage;



