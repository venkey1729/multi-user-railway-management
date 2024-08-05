import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/Profile.css';

const Profile = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/user/profile', {
          headers: { Authorization: token }
        });
        setEmail(res.data.email);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:5000/api/user/profile', { email, password }, {
        headers: { Authorization: token }
      });
      alert('Profile updated successfully');
    } catch (err) {
      console.error(err);
      alert('Error updating profile');
    }
  };

  return (
    <div className="profile">
      <h2>User Profile</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="input"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="New Password"
        className="input"
      />
      <button onClick={handleUpdate} className="button">
        Update Profile
      </button>
    </div>
  );
};

export default Profile;
