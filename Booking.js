import React, { useState } from 'react';
import { bookSeat } from '../api';
import './styles/Booking.css';

const Booking = () => {
  const [trainId, setTrainId] = useState('');
  const [userId, setUserId] = useState('');

  const handleBooking = async () => {
    try {
      const token = localStorage.getItem('token');
      const data = { train_id: trainId, user_id: userId };
      await bookSeat(data, token);
      alert('Seat booked successfully');
    } catch (err) {
      console.error(err);
      alert('Error booking seat');
    }
  };

  return (
    <div className="booking">
      <h2>Book a Seat</h2>
      <input
        type="text"
        value={trainId}
        onChange={(e) => setTrainId(e.target.value)}
        placeholder="Train ID"
        className="input"
        required
      />
      <input
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="User ID"
        className="input"
        required
      />
      <button onClick={handleBooking} className="button">
        Book Seat
      </button>
    </div>
  );
};

export default Booking;
