import React from 'react';
import {  Route, Routes } from 'react-router-dom';
import Auth from './components/Auth';
import Home from './components/Home';
import TrainList from './components/TrainList';
import TrainDetails from './components/TrainDetails';
import Booking from './components/Booking';
import Profile from './components/Profile';
import AdminDashboard from './components/AdminDashboard';
import './App.css';
import ProtectedRoute from './components/ProtectedRoute';
import UserDashboard from './components/UserDashboard';

const App = () => {
  return (
    
      <div className="app">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/auth" element={<Auth/>} />
          <Route path="/trains" element={<TrainList/>} />
          <Route path="/trains/:id" element={<TrainDetails/>} />
          <Route path="/bookings" element={<Booking/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/admin" element={
          <ProtectedRoute allowedRoles={"[admin]"}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/user" element={
          <ProtectedRoute allowedRoles={['user', 'admin']}>
            <UserDashboard />
          </ProtectedRoute>
        } />
        </Routes>
      </div>
    
  );
};

export default App;
