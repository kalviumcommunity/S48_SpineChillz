import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Logout from "./logout";
import "./Navbar.css";

const Navbar = ({ onSearchChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);

  // Fetch users from the backend
  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => console.error("Failed to fetch users:", error));
  }, []);

  // Handle search input changes
  const handleSearchInputChange = useCallback(
    (event) => {
      const { value } = event.target;
      setSearchTerm(value);
      onSearchChange(value);
    },
    [onSearchChange]
  );

  // Handle dropdown selection changes
  const handleDropdownChange = useCallback(
    (event) => {
      const { value } = event.target;
      setSearchTerm(value); // Update the search term to the selected username
      onSearchChange(value); // Update the parent component with the new search term
    },
    [onSearchChange]
  );

  return (
    <>
      <div className="navbardiv">
        <h1>Spinechillz</h1>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchInputChange}
          placeholder="Search games"
          aria-label="Search games"
        />
        <div className="dropdown-container">
          <select onChange={handleDropdownChange} value={searchTerm}>
            <option value="">Search by User</option>
            {users.map((user) => (
              <option key={user.username} value={user.username}>
                {user.username}
              </option>
            ))}
          </select>
        </div>
        <Logout />
      </div>
    </>
  );
};

export default Navbar;
