import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/UserDashboard.css';

const UserDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [trains, setTrains] = useState([]);
  const navigate = useNavigate();

  /*const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/user/bookings', {
        headers: { Authorization: `${token}` }
      });
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      alert('Failed to load bookings');
    }
  };*/

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/user/bookings', {
        headers: { Authorization: `${token}` }
      });
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      alert('Failed to load bookings');
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);


  const handleSearch = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/trains/search?source=${source}&destination=${destination}`);
      setTrains(res.data);
    } catch (err) {
      console.error(err);
      alert('Error fetching trains');
    }
  };

  const handleBook = async (train_id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      try {
        await axios.post('http://localhost:5000/api/bookings/book', { train_id }, { headers: { Authorization: `${token}` } });
        alert('Seat booked successfully');
        fetchBookings(); // Refresh bookings after successful booking
      } catch (error) {
        console.error('Error booking seat:', error);
        alert('Failed to book seat');
      }
    }
  };

  const handleCancel = async (booking_id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/bookings/cancel/${booking_id}`, {
        headers: { Authorization: `${token}` }
      });
      alert('Booking cancelled successfully');
      fetchBookings(); // Refresh bookings after successful cancellation
    } catch (error) {
      console.error('Error cancelling booking:', error);
      alert('Failed to cancel booking');
    }
  };

  return (
    <div className="user-dashboard">
      <h2>Welcome to Your Dashboard</h2>
      <div className="bookings-section">
        <h3>Your Bookings</h3>
        {bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          <ul>
            {bookings.map((booking) => (
              <li key={booking.booking_id}>
                Booking ID: {booking.booking_id} - Train Name: {booking.train_name} - Source: {booking.source} - Destination: {booking.destination} - Date: {new Date(booking.created_at).toLocaleDateString()}
                <button onClick={() => handleCancel(booking.booking_id)}>Cancel Booking</button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="search-section">
        <h3>Search Trains</h3>
        <input
          type="text"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          placeholder="Source"
          required
        />
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Destination"
          required
        />
        <button onClick={handleSearch}>Search</button>
        <ul className="train-list">
          {trains.map((train) => (
            <li key={train.id}>
              <div>{train.name}</div>
              <div>Available Seats: {train.seats}</div>
              <button onClick={() => handleBook(train.id)}>Book Seat</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserDashboard;
