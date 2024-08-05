import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Home.css';

const Home = () => {
  return (
    <div className="home">
      <h1 className="title">Railway Management System</h1>
      <div className="buttons">
        <Link to="/auth" className="button">Login / Register</Link>
        <Link to="/trains" className="button">View Trains</Link>
      </div>
    </div>
  );
};

export default Home;
