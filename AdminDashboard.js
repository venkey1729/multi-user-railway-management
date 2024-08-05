 // src/components/AdminDashboard.js
/*
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [trains, setTrains] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [newTrain, setNewTrain] = useState({ name: '', source: '', destination: '', seats: 0 });
  const [editingTrain, setEditingTrain] = useState(null);
  const [editFormData, setEditFormData] = useState({
    trainName: '',
    source: '',
    destination: '',
    seats: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const trainsRes = await axios.get('http://localhost:5000/api/admin/trains', {
          headers: { Authorization: token }
        });
        setTrains(trainsRes.data);

        const bookingsRes = await axios.get('http://localhost:5000/api/admin/bookings', {
          headers: { Authorization: token }
        });
        setBookings(bookingsRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();

  }, []);

  const handleAddTrain = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:5000/api/admin/trains', newTrain, {
        headers: { Authorization: token }
      });
      // Reload trains
    } catch (err) {
      console.error(err);
    }
  };

   // Handle input changes for the new train form
   const handleNewTrainChange = (e) => {
    const { name, value } = e.target;
    setNewTrain(prevState => ({ ...prevState, [name]: value }));
  };

  // Handle input changes for the editing form
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingTrain(prevState => ({ ...prevState, [name]: value }));
  };


const handleDelete = (trainId) => {
    axios.delete(`http://localhost:5000/api/admin/trains/${trainId}`)
      .then(() => setTrains(trains.filter(train => train.id !== trainId)))
      .catch(error => console.error('Error deleting train:', error));
  };

  const handleEdit = (train) => {
    setEditingTrain(train);
  };

  const handleUpdate = () => {
    axios.put(`http://localhost:5000/api/admin/trains/${editingTrain.id}`, editingTrain)
      .then(response => {
        setTrains(trains.map(train => train.id === editingTrain.id ? editingTrain : train));
        setEditingTrain(null);
      })
      .catch(error => console.error('Error updating train:', error));
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <div>
        <h3>Add Train</h3>
        <input type="text" placeholder="Train Name" onChange={(e) => setNewTrain({ ...newTrain, name: e.target.value })} />
        <input type="text" placeholder="Source" onChange={(e) => setNewTrain({ ...newTrain, source: e.target.value })} />
        <input type="text" placeholder="Destination" onChange={(e) => setNewTrain({ ...newTrain, destination: e.target.value })} />
        <input type="number" placeholder="Seats" onChange={(e) => setNewTrain({ ...newTrain, seats: parseInt(e.target.value) })} />
        <button onClick={handleAddTrain}>Add Train</button>
      </div>
      
      <h2>Trains</h2>
      <ul>
        {trains.map(train => (
          <li key={train.id}>
            {train.name} - {train.source} to {train.destination} ({train.seats} seats)
            <button onClick={() => handleEdit(train)}>Edit</button>
            <button onClick={() => handleDelete(train.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {editingTrain && (
        <div>
          <h2>Edit Train</h2>
          <form onSubmit={handleUpdate}>
            <input
              type="text"
              value={editingTrain.name}
              name="trainName"
              onChange={e => setEditingTrain({ ...editingTrain, name: e.target.value })}
            />
            <input
              type="text"
              name="source"
              value={editingTrain.source}
              onChange={e => setEditingTrain({ ...editingTrain, source: e.target.value })}
            />
            <input
              type="text"
              name="destination"
              value={editingTrain.destination}
              onChange={e => setEditingTrain({ ...editingTrain, destination: e.target.value })}
            />
            <input
              type="number"
              name="seats"
              value={editingTrain.seats}
              onChange={e => setEditingTrain({ ...editingTrain, seats: e.target.value })}
            />
            <button type="submit">Update Train</button>
          </form>
        </div>
      )}
    </div>
  );
}; 

export default AdminDashboard;  */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [trains, setTrains] = useState([]);
  const [newTrain, setNewTrain] = useState({ name: '', source: '', destination: '', seats: 0 });
  const [editingTrain, setEditingTrain] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      try {
        const trainsRes = await axios.get('http://localhost:5000/api/admin/trains', {
          headers: { Authorization: `${token}` } // Ensure "Bearer" is included
        });
        setTrains(trainsRes.data);
      } catch (err) {
        console.error('Error fetching trains:', err);
        if (err.response) {
          console.error('Server response:', err.response.data);
        }
      }
    };
    fetchData();
  }, []);

  const handleAddTrain = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/admin/trains', newTrain, {
        headers: { Authorization: `${token}` }
      });
      setNewTrain({ name: '', source: '', destination: '', seats: 0 });
      setTrains([...trains, response.data]); // Add the new train to the list
    } catch (err) {
      console.error('Error adding train:', err);
      if (err.response) {
        console.error('Server response:', err.response.data);
        alert(`Error: ${err.response.data.message}`);
      }
    }
  };

  const handleDeleteTrain = async (trainId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/admin/trains/${trainId}`, {
        headers: { Authorization: `${token}` }
      });
      setTrains(trains.filter(train => train.id !== trainId));
    } catch (err) {
      console.error('Error deleting train:', err);
      if (err.response) {
        console.error('Server response:', err.response.data);
        alert(`Error: ${err.response.data.message}`);
      }
    }
  };
  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(`http://localhost:5000/api/admin/trains/${editingTrain.id}`, editingTrain, {
        headers: { Authorization: token }
      });
      setTrains(trains.map(train => train.id === editingTrain.id ? editingTrain : train));
      setEditingTrain(null);
    } catch (error) {
      console.error('Error updating train:', error);
    }
  };
  const handleEditTrain = (train) => {
    setEditingTrain(train);
    setIsEditing(true);
  };

  const handleUpdateTrain = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/admin/trains/${editingTrain.id}`, editingTrain, {
        headers: { Authorization: `${token}` }
      });
      setTrains(trains.map(train => train.id === editingTrain.id ? response.data : train));
      setEditingTrain(null);
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating train:', err);
      if (err.response) {
        console.error('Server response:', err.response.data);
        alert(`Error: ${err.response.data.message}`);
      }
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <div>
        <h3>Add Train</h3>
        <input type="text" placeholder="Train Name" onChange={(e) => setNewTrain({ ...newTrain, name: e.target.value })} />
        <input type="text" placeholder="Source" onChange={(e) => setNewTrain({ ...newTrain, source: e.target.value })} />
        <input type="text" placeholder="Destination" onChange={(e) => setNewTrain({ ...newTrain, destination: e.target.value })} />
        <input type="number" placeholder="Seats" onChange={(e) => setNewTrain({ ...newTrain, seats: parseInt(e.target.value) })} />
        <button onClick={handleAddTrain}>Add Train</button>
      </div>
      
      <div className="add-train">
      
        <button onClick={isEditing ? handleUpdateTrain : handleAddTrain}>
          {isEditing ? 'Update Train' : 'Add Train'}
        </button>
      </div>
      
      <h2>Trains</h2>
      
      
      <ul>
        {trains.map(train => (
          <li key={train.id}>
            {train.name} - {train.source} to {train.destination} ({train.seats} seats)
            <button onClick={() => handleEditTrain(train)}>Edit</button>
            <button onClick={() => handleDeleteTrain(train.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {editingTrain && (
        <div>
          <h2>Edit Train</h2>
          <form onSubmit={handleUpdate}>
            <input
              type="text"
              value={editingTrain.name}
              name="trainName"
              onChange={e => setEditingTrain({ ...editingTrain, name: e.target.value })}
            />
            <input
              type="text"
              name="source"
              value={editingTrain.source}
              onChange={e => setEditingTrain({ ...editingTrain, source: e.target.value })}
            />
            <input
              type="text"
              name="destination"
              value={editingTrain.destination}
              onChange={e => setEditingTrain({ ...editingTrain, destination: e.target.value })}
            />
            <input
              type="number"
              name="seats"
              value={editingTrain.seats}
              onChange={e => setEditingTrain({ ...editingTrain, seats: e.target.value })}
            />
            <button type="submit">Update Train</button>
          </form>
        </div>
      )}
     
    </div>
  );
};

export default AdminDashboard;
/*
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [trains, setTrains] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [newTrain, setNewTrain] = useState({ name: '', source: '', destination: '', seats: 0 });
  const [editingTrain, setEditingTrain] = useState(null);
  const [editFormData, setEditFormData] = useState({
    trainName: '',
    source: '',
    destination: '',
    seats: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const trainsRes = await axios.get('http://localhost:5000/api/admin/trains', {
          headers: { Authorization: token }
        });
        setTrains(trainsRes.data);

        const bookingsRes = await axios.get('http://localhost:5000/api/admin/bookings', {
          headers: { Authorization: token }
        });
        setBookings(bookingsRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();

  }, []);

  const handleAddTrain = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:5000/api/admin/trains', newTrain, {
        headers: { Authorization: token }
      });
      // Reload trains
    } catch (err) {
      console.error(err);
    }
  };

   // Handle input changes for the new train form
   const handleNewTrainChange = (e) => {
    const { name, value } = e.target;
    setNewTrain(prevState => ({ ...prevState, [name]: value }));
  };

  // Handle input changes for the editing form
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingTrain(prevState => ({ ...prevState, [name]: value }));
  };


const handleDelete = (trainId) => {
    axios.delete(`http://localhost:5000/api/admin/trains/${trainId}`)
      .then(() => setTrains(trains.filter(train => train.id !== trainId)))
      .catch(error => console.error('Error deleting train:', error));
  };

  const handleEdit = (train) => {
    setEditingTrain(train);
  };

  const handleUpdate = () => {
    axios.put(`http://localhost:5000/api/admin/trains/${editingTrain.id}`, editingTrain)
      .then(response => {
        setTrains(trains.map(train => train.id === editingTrain.id ? editingTrain : train));
        setEditingTrain(null);
      })
      .catch(error => console.error('Error updating train:', error));
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <div>
        <h3>Add Train</h3>
        <input type="text" placeholder="Train Name" onChange={(e) => setNewTrain({ ...newTrain, name: e.target.value })} />
        <input type="text" placeholder="Source" onChange={(e) => setNewTrain({ ...newTrain, source: e.target.value })} />
        <input type="text" placeholder="Destination" onChange={(e) => setNewTrain({ ...newTrain, destination: e.target.value })} />
        <input type="number" placeholder="Seats" onChange={(e) => setNewTrain({ ...newTrain, seats: parseInt(e.target.value) })} />
        <button onClick={handleAddTrain}>Add Train</button>
      </div>
      
      <h2>Trains</h2>
      <ul>
        {trains.map(train => (
          <li key={train.id}>
            {train.name} - {train.source} to {train.destination} ({train.seats} seats)
            <button onClick={() => handleEdit(train)}>Edit</button>
            <button onClick={() => handleDelete(train.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {editingTrain && (
        <div>
          <h2>Edit Train</h2>
          <form onSubmit={handleUpdate}>
            <input
              type="text"
              value={editingTrain.name}
              name="trainName"
              onChange={e => setEditingTrain({ ...editingTrain, name: e.target.value })}
            />
            <input
              type="text"
              name="source"
              value={editingTrain.source}
              onChange={e => setEditingTrain({ ...editingTrain, source: e.target.value })}
            />
            <input
              type="text"
              name="destination"
              value={editingTrain.destination}
              onChange={e => setEditingTrain({ ...editingTrain, destination: e.target.value })}
            />
            <input
              type="number"
              name="seats"
              value={editingTrain.seats}
              onChange={e => setEditingTrain({ ...editingTrain, seats: e.target.value })}
            />
            <button type="submit">Update Train</button>
          </form>
        </div>
      )}
    </div>
  );
}; 

export default AdminDashboard;  */