// src/components/TrainList.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTrains } from '../api';
import './styles/TrainList.css';

const TrainList = () => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [trains, setTrains] = useState([]);
  const history = useNavigate();

  const handleSearch = async () => {
    try {
      const res = await getTrains(source, destination);
      setTrains(res.data);
    } catch (err) {
      console.error('Error fetching trains:', err);
      alert('Error fetching trains');
    }
  };

  const handleTrainClick = (id) => {
    history.push(`/trains/${id}`);
  };

  return (
    <div className="trainList">
      <h2>Search Trains</h2>
      <div className="search">
        <input
          type="text"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          placeholder="Source"
          className="input"
          required
        />
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Destination"
          className="input"
          required
        />
        <button onClick={handleSearch} className="button">
          Search
        </button>
      </div>
      <ul className="trainList">
        {trains.map((train) => (
          <li key={train.id} className="trainItem" onClick={() => handleTrainClick(train.id)}>
            <div className="trainName">{train.name}</div>
            <div className="seats">Available Seats: {train.seats}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrainList;
