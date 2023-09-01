import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-container">
      <h2 className="welcome-text">Welcome</h2>
      <div className="link-container">
        <p>Hoş geldiniz! Kaydolmak için aşağıdaki bağlantıya tıklayabilirsiniz:</p>
        <Link to="/signUp" className="link-button">Kaydol</Link>
      </div>

      <div className="link-container">
        <p>Hakkında sayfasına gitmek için aşağıdaki bağlantıyı kullanabilirsiniz:</p>
        <Link to="/hakkında" className="link-button">Hakkında</Link>
      </div>

      <div className="link-container">
        <p>Otobüs sefer listesine göz atmak için aşağıdaki bağlantıyı kullanabilirsiniz:</p>
        <Link to="/seferler" className="link-button">Sefer Listesi</Link>
      </div>
    </div>
  );
};

export default HomePage;


