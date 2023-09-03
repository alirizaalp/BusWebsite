import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; 

const HomePage = () => {
  return (
    <div className="home-container">
      <h2 className="welcome-text">Welcome</h2>
      <div className="link-container">
        <Link to="/SignUp" className="link-button">Kaydol</Link>
      </div>

      <div className="link-container">
        <Link to="/Hakkında" className="link-button">Hakkında</Link>
      </div>

      <div className="link-container">
        <Link to="/Seferler" className="link-button">Sefer Listesi</Link>
      </div>

      <div className="link-container">
        <Link to="/YolcumNerede" className="link-button">Yolcum Nerede ?</Link>
      </div>
    </div>
  );
};

export default HomePage;



