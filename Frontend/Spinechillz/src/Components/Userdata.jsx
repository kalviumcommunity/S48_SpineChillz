// Userdata.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Userdata.css'; // Import CSS file for styling

const Userdata = () => {
  // State to store users data and error
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  // useEffect to fetch data from server when component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Fetch data from server
        const response = await axios.get('http://localhost:3000/users');
        // Set users state with fetched data
        setUsers(response.data);
        // Reset error state if successful
        setError(null);
      } catch (error) {
        // Log and set error state if request fails
        console.error('Error fetching user data:', error);
        setError(error);
      }
    };

    // Call fetchUsers function when component mounts
    fetchUsers();
  }, []); // Dependency array is empty, so it only runs once when component mounts

  return (
    <div>
      <h2>User Data</h2>
      {/* Render error message if error state is not null */}
      {error ? (
        <div>Error: {error.message}</div>
      ) : (
        // Render user data if there are no errors
        <ul>
          {users.map((user, index) => (
            // Map through users array and render user details as list items
            <li key={index}>
              <strong>Username:</strong> {user.username}<br />
              <strong>Age:</strong> {user.age}<br />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Userdata;
