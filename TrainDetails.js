import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/TrainDetails.css';

const TrainDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [train, setTrain] = useState(null);

  useEffect(() => {
    const fetchTrainDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/trains/${id}`);
        setTrain(response.data);
      } catch (error) {
        console.error('Error fetching train details:', error);
        alert('Failed to load train details');
      }
    };

    fetchTrainDetails();
  }, [id]);

  const handleBook = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      axios.post(`http://localhost:5000/api/bookings/book`, { train_id: id }, { headers: { Authorization: token } })
        .then(() => alert('Seat booked successfully'))
        .catch(error => {
          console.error('Error booking seat:', error);
          alert('Failed to book seat');
        });
    }
  };

  if (!train) return <div>Loading...</div>;

  return (
    <div className="train-details">
      <h2>{train.name}</h2>
      <p>Source: {train.source}</p>
      <p>Destination: {train.destination}</p>
      <p>Available Seats: {train.seats}</p>
      <button onClick={handleBook}>Book Seat</button>
    </div>
  );
};

export default TrainDetails;
